import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { RequireAdmin } from "@/components/RequireAdmin";
import { AdminLayout } from "@/components/AdminLayout";
import { format } from "date-fns";

export const Route = createFileRoute("/sessions")({
  head: () => ({ meta: [{ title: "Sessions — Outreach Mission Control" }] }),
  component: () => (
    <RequireAdmin>
      <AdminLayout>
        <Sessions />
      </AdminLayout>
    </RequireAdmin>
  ),
});

interface Row {
  id: string;
  scheduled_date: string;
  status: string;
  students_present: number | null;
  schools: { name: string } | null;
  teachers: { full_name: string } | null;
  programs: { name: string; color: string | null } | null;
}

function Sessions() {
  const { t } = useTranslation();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("sessions")
        .select(
          "id, scheduled_date, status, students_present, schools(name), teachers(full_name), programs(name, color)"
        )
        .order("scheduled_date", { ascending: false })
        .limit(200);
      if (error) console.error(error);
      setRows((data ?? []) as unknown as Row[]);
      setLoading(false);
    })();
  }, []);

  const statusColor: Record<string, string> = {
    scheduled: "bg-chart-5/15 text-chart-5",
    completed: "bg-success/15 text-success",
    missed: "bg-destructive/15 text-destructive",
    cancelled: "bg-muted text-muted-foreground",
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <header>
        <h1 className="font-serif text-3xl md:text-4xl">{t("sessions.title")}</h1>
        <p className="mt-1 text-muted-foreground text-sm">{t("sessions.subtitle")}</p>
      </header>

      <div className="rounded-xl border-2 border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-3 font-medium">{t("sessions.date")}</th>
                <th className="text-left px-4 py-3 font-medium">{t("sessions.school")}</th>
                <th className="text-left px-4 py-3 font-medium">{t("sessions.teacher")}</th>
                <th className="text-left px-4 py-3 font-medium">{t("sessions.program")}</th>
                <th className="text-right px-4 py-3 font-medium">{t("sessions.present")}</th>
                <th className="text-left px-4 py-3 font-medium">{t("sessions.status")}</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                    {t("common.loading")}
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                    {t("sessions.empty")}
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="border-t-2 border-border hover:bg-muted/30">
                    <td className="px-4 py-3">{format(new Date(r.scheduled_date), "d MMM yyyy")}</td>
                    <td className="px-4 py-3 font-medium">{r.schools?.name || "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {r.teachers?.full_name || "—"}
                    </td>
                    <td className="px-4 py-3">
                      {r.programs && (
                        <span className="inline-flex items-center gap-1.5">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: r.programs.color || "var(--primary)" }}
                          />
                          {r.programs.name}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">{r.students_present ?? 0}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                          statusColor[r.status] ?? "bg-muted"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
