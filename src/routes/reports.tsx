import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { supabase } from "@/integrations/supabase/client";
import { RequireAdmin } from "@/components/RequireAdmin";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports — Outreach Mission Control" }] }),
  component: () => (
    <RequireAdmin>
      <AdminLayout>
        <Reports />
      </AdminLayout>
    </RequireAdmin>
  ),
});

interface Snapshot {
  schools: number;
  students: number;
  sessions: number;
  teachers: number;
  byProgram: { name: string; sessions: number; students_reached: number }[];
  bySchool: { name: string; village: string | null; students: number; sessions_held: number }[];
}

function Reports() {
  const { t } = useTranslation();
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [schoolsRes, sessionsCountRes, teachersRes, programsRes, schoolStatsRes] =
        await Promise.all([
          supabase.from("schools").select("num_students"),
          supabase.from("sessions").select("id", { count: "exact", head: true }),
          supabase.from("teachers").select("id", { count: "exact", head: true }).eq("active", true),
          supabase
            .from("programs")
            .select("name, sessions(id, students_present)")
            .order("name"),
          supabase
            .from("schools")
            .select("name, village, num_students, sessions(id)")
            .order("name"),
        ]);

      const studentsTotal =
        schoolsRes.data?.reduce((s, x) => s + (x.num_students || 0), 0) ?? 0;

      const byProgram = (programsRes.data ?? []).map((p: any) => ({
        name: p.name,
        sessions: p.sessions?.length ?? 0,
        students_reached:
          p.sessions?.reduce((s: number, x: any) => s + (x.students_present || 0), 0) ?? 0,
      }));

      const bySchool = (schoolStatsRes.data ?? []).map((s: any) => ({
        name: s.name,
        village: s.village,
        students: s.num_students || 0,
        sessions_held: s.sessions?.length ?? 0,
      }));

      setSnap({
        schools: schoolsRes.data?.length ?? 0,
        students: studentsTotal,
        sessions: sessionsCountRes.count ?? 0,
        teachers: teachersRes.count ?? 0,
        byProgram,
        bySchool,
      });
      setLoading(false);
    })();
  }, []);

  const exportPdf = () => {
    if (!snap) return;
    const doc = new jsPDF();
    const today = format(new Date(), "d MMMM yyyy");

    doc.setFontSize(20);
    doc.text("Outreach Impact Report", 14, 20);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("The H B Kapadia New High School, Ahmedabad", 14, 27);
    doc.text(today, 14, 32);

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text("Summary", 14, 44);
    autoTable(doc, {
      startY: 48,
      head: [["Metric", "Value"]],
      body: [
        ["Schools", String(snap.schools)],
        ["Students reached", snap.students.toLocaleString()],
        ["Sessions logged", String(snap.sessions)],
        ["Active teachers", String(snap.teachers)],
      ],
      theme: "grid",
      headStyles: { fillColor: [50, 50, 100] },
    });

    doc.text("Program-wise impact", 14, (doc as any).lastAutoTable.finalY + 12);
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 16,
      head: [["Program", "Sessions", "Students reached"]],
      body: snap.byProgram.map((p) => [p.name, p.sessions, p.students_reached]),
      theme: "grid",
      headStyles: { fillColor: [50, 50, 100] },
    });

    doc.addPage();
    doc.setFontSize(14);
    doc.text("School-wise activity", 14, 20);
    autoTable(doc, {
      startY: 26,
      head: [["School", "Village", "Students", "Sessions held"]],
      body: snap.bySchool.map((s) => [s.name, s.village || "—", s.students, s.sessions_held]),
      theme: "striped",
      headStyles: { fillColor: [50, 50, 100] },
      styles: { fontSize: 9 },
    });

    doc.save(`outreach-impact-${format(new Date(), "yyyy-MM-dd")}.pdf`);
    toast.success("PDF report downloaded");
  };

  const exportXlsx = () => {
    if (!snap) return;
    const wb = XLSX.utils.book_new();

    const summary = [
      ["Metric", "Value"],
      ["Schools", snap.schools],
      ["Students reached", snap.students],
      ["Sessions logged", snap.sessions],
      ["Active teachers", snap.teachers],
    ];
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(summary), "Summary");

    const prog = [
      ["Program", "Sessions", "Students reached"],
      ...snap.byProgram.map((p) => [p.name, p.sessions, p.students_reached]),
    ];
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(prog), "By Program");

    const sch = [
      ["School", "Village", "Students", "Sessions held"],
      ...snap.bySchool.map((s) => [s.name, s.village || "", s.students, s.sessions_held]),
    ];
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(sch), "By School");

    XLSX.writeFile(wb, `outreach-impact-${format(new Date(), "yyyy-MM-dd")}.xlsx`);
    toast.success("Excel report downloaded");
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl">{t("reports.title")}</h1>
          <p className="mt-1 text-muted-foreground text-sm">{t("reports.subtitle")}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportXlsx} disabled={!snap}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            {t("reports.downloadExcel")}
          </Button>
          <Button onClick={exportPdf} disabled={!snap}>
            <Download className="h-4 w-4 mr-2" />
            {t("reports.downloadPdf")}
          </Button>
        </div>
      </header>

      {loading || !snap ? (
        <p className="text-muted-foreground text-sm">{t("common.loading")}</p>
      ) : (
        <>
          <div className="rounded-xl border-2 border-border bg-card p-6">
            <h2 className="font-serif text-xl mb-4">{t("reports.impactReport")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Stat label={t("overview.schools")} value={snap.schools} />
              <Stat label={t("overview.students")} value={snap.students.toLocaleString()} />
              <Stat label={t("overview.sessions")} value={snap.sessions} />
              <Stat label={t("overview.teachers")} value={snap.teachers} />
            </div>
          </div>

          <div className="rounded-xl border-2 border-border bg-card overflow-hidden">
            <div className="px-5 py-4 border-b-2 border-border font-serif text-lg">
              By Program
            </div>
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-2 font-medium">Program</th>
                  <th className="text-right px-4 py-2 font-medium">Sessions</th>
                  <th className="text-right px-4 py-2 font-medium">Students reached</th>
                </tr>
              </thead>
              <tbody>
                {snap.byProgram.map((p) => (
                  <tr key={p.name} className="border-t-2 border-border">
                    <td className="px-4 py-2">{p.name}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{p.sessions}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{p.students_reached}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div className="font-serif text-3xl">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
