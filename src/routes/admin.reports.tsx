import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { RequireAdmin } from "@/components/RequireAdmin";
import { supabase } from "@/integrations/supabase/client";
import { Button, Card, Input } from "@/design-system/hbk-career-brand-guidelines-4f1c39";

export const Route = createFileRoute("/admin/reports")({
  head: () => ({
    meta: [
      { title: "Student PDF reports — HBK Careers admin" },
      { name: "description", content: "Download saved aptitude test PDF reports." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <RequireAdmin>
      <AdminLayout>
        <ReportsAdmin />
      </AdminLayout>
    </RequireAdmin>
  ),
});

type Row = {
  id: string;
  student_name: string | null;
  grade: string | null;
  school_name: string | null;
  language: string | null;
  riasec_top: string[] | null;
  created_at: string;
};

function ReportsAdmin() {
  const [rows, setRows] = useState<Row[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase
      .from("psychometric_results")
      .select("id,student_name,grade,school_name,language,riasec_top,created_at")
      .order("created_at", { ascending: false })
      .limit(500)
      .then(({ data }) => {
        setRows((data ?? []) as Row[]);
        setLoading(false);
      });
  }, []);

  const download = async (r: Row) => {
    setMsg("");
    const { data, error } = await supabase.storage.from("report-pdfs").createSignedUrl(`${r.id}.pdf`, 120);
    if (error || !data) {
      setMsg(`No saved PDF for ${r.student_name ?? "this student"} (reports are saved from today onward).`);
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener");
  };

  const shown = rows.filter((r) =>
    `${r.student_name ?? ""} ${r.school_name ?? ""}`.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <h1 className="font-display text-title">Student PDF reports</h1>
      <Input placeholder="Search by student or school" value={q} onChange={(e) => setQ(e.target.value)} />
      {msg && <p className="text-caption text-muted-foreground">{msg}</p>}
      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : (
        <div className="space-y-3">
          {shown.map((r) => (
            <Card key={r.id}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-subheading">{r.student_name ?? "Student"}</div>
                  <div className="text-caption text-muted-foreground">
                    Grade {r.grade ?? "—"} · {r.school_name ?? "—"} · {(r.language ?? "en").toUpperCase()} ·{" "}
                    {r.riasec_top?.join("-") ?? ""} · {new Date(r.created_at).toLocaleDateString()}
                  </div>
                </div>
                <Button onClick={() => download(r)}>Download PDF</Button>
              </div>
            </Card>
          ))}
          {!shown.length && <p className="text-muted-foreground">No reports yet.</p>}
        </div>
      )}
    </div>
  );
}
