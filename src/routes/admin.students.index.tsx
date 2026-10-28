import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import * as XLSX from "xlsx";
import { AdminLayout } from "@/components/AdminLayout";
import { RequireAdmin } from "@/components/RequireAdmin";
import { adminListStudents } from "@/lib/admin.functions";
import { Alert, Badge, Button, Input, Select } from "@/design-system/hbk-career-brand-guidelines-4f1c39";

export const Route = createFileRoute("/admin/students/")({
  head: () => ({ meta: [{ title: "All test takers — HBK Careers admin" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <RequireAdmin>
      <AdminLayout>
        <Students />
      </AdminLayout>
    </RequireAdmin>
  ),
});

type Row = {
  id: string;
  student_name: string | null;
  grade: string | null;
  school_name: string | null;
  mobile: string | null;
  email: string | null;
  language: string | null;
  riasec_top: string[] | null;
  recommended_streams: string[] | null;
  payment_amount: number | null;
  payment_coupon: string | null;
  paid_at: string | null;
  taken_at: string;
};

function Students() {
  const list = useServerFn(adminListStudents);
  const [rows, setRows] = useState<Row[] | null>(null);
  const [err, setErr] = useState("");
  const [q, setQ] = useState("");
  const [grade, setGrade] = useState("");
  const [lang, setLang] = useState("");
  const [paid, setPaid] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    list().then((r) => setRows(r as Row[])).catch((e) => setErr(String(e?.message ?? e)));
  }, [list]);

  const grades = useMemo(() => Array.from(new Set((rows ?? []).map((r) => r.grade).filter(Boolean))) as string[], [rows]);

  const shown = (rows ?? []).filter((r) => {
    const hay = `${r.student_name ?? ""} ${r.school_name ?? ""} ${r.mobile ?? ""} ${r.email ?? ""}`.toLowerCase();
    if (q && !hay.includes(q.toLowerCase())) return false;
    if (grade && r.grade !== grade) return false;
    if (lang && (r.language ?? "en") !== lang) return false;
    if (paid === "paid" && !r.paid_at) return false;
    if (paid === "unpaid" && r.paid_at) return false;
    const d = r.taken_at.slice(0, 10);
    if (from && d < from) return false;
    if (to && d > to) return false;
    return true;
  });

  const exportXlsx = () => {
    const data = shown.map((r) => ({
      Name: r.student_name,
      Grade: r.grade,
      School: r.school_name,
      Mobile: r.mobile,
      Email: r.email,
      Language: r.language,
      "Taken on": new Date(r.taken_at).toLocaleString(),
      Paid: r.paid_at ? "Yes" : "No",
      Amount: r.payment_amount,
      Coupon: r.payment_coupon,
      "Interest code": (r.riasec_top ?? []).join("-"),
      "Top stream": r.recommended_streams?.[0] ?? "",
    }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data), "Test takers");
    XLSX.writeFile(wb, `hbk-test-takers-${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-title">All test takers</h1>
          <p className="text-caption text-muted-foreground">{rows ? `${shown.length} of ${rows.length}` : "Loading…"}</p>
        </div>
        <Button variant="outline" onClick={exportXlsx} disabled={!shown.length}>Download Excel</Button>
      </div>
      {err && <Alert variant="danger">{err}</Alert>}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <Input aria-label="Search" placeholder="Search name, school, mobile, email" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <Select aria-label="Grade" value={grade} onChange={(e) => setGrade(e.target.value)}>
          <option value="">All grades</option>
          {grades.map((g) => <option key={g} value={g}>{g}</option>)}
        </Select>
        <Select aria-label="Language" value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="">All languages</option>
          <option value="en">English</option>
          <option value="gu">Gujarati</option>
          <option value="hi">Hindi</option>
          <option value="mr">Marathi</option>
        </Select>
        <Select aria-label="Payment" value={paid} onChange={(e) => setPaid(e.target.value)}>
          <option value="">Paid and unpaid</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </Select>
        <div className="flex gap-2">
          <Input aria-label="From date" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          <Input aria-label="To date" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-caption">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              {["Student", "Grade", "School", "Contact", "Lang", "Taken", "Payment", "Results", ""].map((h) => (
                <th key={h} className="px-3 py-2 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.id} className="border-t border-border">
                <td className="px-3 py-2 text-foreground">{r.student_name ?? "—"}</td>
                <td className="px-3 py-2">{r.grade ?? "—"}</td>
                <td className="px-3 py-2">{r.school_name ?? "—"}</td>
                <td className="px-3 py-2">{r.mobile ?? ""}<div className="text-muted-foreground">{r.email ?? ""}</div></td>
                <td className="px-3 py-2">{(r.language ?? "en").toUpperCase()}</td>
                <td className="px-3 py-2">{new Date(r.taken_at).toLocaleDateString()}</td>
                <td className="px-3 py-2">
                  {r.paid_at ? <Badge variant="success">₹{r.payment_amount ?? ""}{r.payment_coupon ? ` · ${r.payment_coupon}` : ""}</Badge> : <Badge>Unpaid</Badge>}
                </td>
                <td className="px-3 py-2">{(r.riasec_top ?? []).join("-")}<div className="text-muted-foreground">{r.recommended_streams?.[0] ?? ""}</div></td>
                <td className="px-3 py-2">
                  <Link to="/admin/students/$id" params={{ id: r.id }} className="hbk-focus text-primary underline">Open</Link>
                </td>
              </tr>
            ))}
            {rows && !shown.length && (
              <tr><td colSpan={9} className="px-3 py-6 text-center text-muted-foreground">No matching students.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
