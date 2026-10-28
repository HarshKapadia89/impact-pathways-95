import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AdminLayout } from "@/components/AdminLayout";
import { RequireAdmin } from "@/components/RequireAdmin";
import { adminDeleteStudent, adminGetStudent, adminSignedPdfUrl, adminUpdateStudent } from "@/lib/admin.functions";
import { regenerateReportPdf } from "@/lib/adminReportPdf";
import { Alert, Badge, Button, Card, Field, Input, Select, Textarea } from "@/design-system/hbk-career-brand-guidelines-4f1c39";

export const Route = createFileRoute("/admin/students/$id")({
  head: () => ({ meta: [{ title: "Student detail — HBK Careers admin" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <RequireAdmin>
      <AdminLayout>
        <Detail />
      </AdminLayout>
    </RequireAdmin>
  ),
});

type Detail = {
  row: Record<string, any>;
  counsellorNote: string | null;
  legacyId: string | null;
  bookings: Record<string, any>[];
  orders: Record<string, any>[];
  hasSavedPdf: boolean;
};

const EDITABLE = [
  ["student_name", "Name"],
  ["grade", "Grade"],
  ["school_name", "School"],
  ["mobile", "Mobile"],
  ["email", "Email"],
  ["parent_email", "Parent email"],
] as const;

function Scores({ title, data }: { title: string; data: Record<string, unknown> | null }) {
  const entries = Object.entries(data ?? {}).map(([k, v]) => [k, typeof v === "number" ? v : Number((v as any)?.pct ?? 0)] as const);
  return (
    <Card variant="surface">
      <h3 className="font-display text-subheading mb-3">{title}</h3>
      {entries.length ? (
        <ul className="space-y-2">
          {entries.sort((a, b) => b[1] - a[1]).map(([k, v]) => (
            <li key={k} className="flex items-center gap-3 text-caption">
              <span className="w-32 shrink-0">{k}</span>
              <span className="h-2 flex-1 rounded-sm bg-muted">
                <span className="block h-2 rounded-sm bg-primary" style={{ width: `${Math.max(0, Math.min(100, v))}%` }} />
              </span>
              <span className="w-10 text-right tabular-nums">{Math.round(v)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-caption text-muted-foreground">No data.</p>
      )}
    </Card>
  );
}

function Detail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const get = useServerFn(adminGetStudent);
  const update = useServerFn(adminUpdateStudent);
  const del = useServerFn(adminDeleteStudent);
  const signed = useServerFn(adminSignedPdfUrl);
  const [d, setD] = useState<Detail | null | undefined>(undefined);
  const [form, setForm] = useState<Record<string, string>>({});
  const [note, setNote] = useState("");
  const [lang, setLang] = useState<"en" | "gu" | "hi" | "mr">("en");
  const [msg, setMsg] = useState<{ v: "success" | "danger"; t: string } | null>(null);
  const [busy, setBusy] = useState("");

  useEffect(() => {
    get({ data: { id } })
      .then((res) => {
        const r = res as Detail | null;
        setD(r);
        if (r) {
          setForm(Object.fromEntries(EDITABLE.map(([k]) => [k, r.row[k] ?? ""])));
          setNote(r.counsellorNote ?? "");
          if (["en", "gu", "hi", "mr"].includes(r.row.language)) setLang(r.row.language);
        }
      })
      .catch((e) => setMsg({ v: "danger", t: String(e?.message ?? e) }));
  }, [id, get]);

  if (d === undefined) return <p className="text-muted-foreground">Loading…</p>;
  if (d === null) return <Alert variant="warning">Student not found.</Alert>;
  const r = d.row;

  const save = async () => {
    setBusy("save");
    try {
      await update({ data: { id, fields: form, counsellorNote: note, legacyId: d.legacyId } });
      setMsg({ v: "success", t: "Saved." });
    } catch (e: any) {
      setMsg({ v: "danger", t: e?.message ?? "Save failed" });
    }
    setBusy("");
  };
  const remove = async () => {
    if (!confirm(`Delete ${r.student_name ?? "this student"} and their report permanently?`)) return;
    setBusy("del");
    try {
      await del({ data: { id } });
      navigate({ to: "/admin/students" });
    } catch (e: any) {
      setMsg({ v: "danger", t: e?.message ?? "Delete failed" });
      setBusy("");
    }
  };
  const openSaved = async () => {
    const { url } = await signed({ data: { id } });
    if (url) window.open(url, "_blank", "noopener");
    else setMsg({ v: "danger", t: "No saved copy for this test. Use Regenerate PDF instead." });
  };
  const regen = async () => {
    setBusy("pdf");
    try {
      await regenerateReportPdf(r as any, lang);
    } catch (e: any) {
      setMsg({ v: "danger", t: e?.message ?? "Could not build PDF" });
    }
    setBusy("");
  };

  return (
    <div className="space-y-6">
      <Link to="/admin/students" className="hbk-focus text-caption text-primary underline">← All test takers</Link>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-title">{r.student_name ?? "Student"}</h1>
          <p className="text-caption text-muted-foreground">
            Grade {r.grade ?? "—"} · {r.school_name ?? "—"} · Taken {new Date(r.taken_at).toLocaleString()}
          </p>
        </div>
        {r.paid_at ? <Badge variant="success">Paid ₹{r.payment_amount ?? ""}</Badge> : <Badge>Unpaid</Badge>}
      </div>
      {msg && <Alert variant={msg.v}>{msg.t}</Alert>}

      <Card variant="lifted">
        <h2 className="font-display text-heading mb-3">PDF report</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={openSaved} disabled={!d.hasSavedPdf}>
            {d.hasSavedPdf ? "Download saved PDF" : "No saved PDF"}
          </Button>
          <Select aria-label="Report language" value={lang} onChange={(e) => setLang(e.target.value as any)}>
            <option value="en">English</option>
            <option value="gu">Gujarati</option>
            <option value="hi">Hindi</option>
            <option value="mr">Marathi</option>
          </Select>
          <Button onClick={regen} loading={busy === "pdf"}>Regenerate PDF</Button>
          {r.report_token && (
            <a href={`/r/${r.report_token}`} target="_blank" rel="noopener" className="hbk-focus text-primary underline">
              Open share link
            </a>
          )}
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Scores title="Interest types (RIASEC)" data={r.riasec} />
        <Scores title="Multiple Intelligences" data={r.multiple_intelligences} />
        <Scores title="Aptitude" data={r.aptitude} />
      </div>

      <Card variant="surface">
        <h3 className="font-display text-subheading mb-2">Recommendations</h3>
        <p className="text-caption"><strong>Streams:</strong> {(r.recommended_streams ?? []).join(", ") || "—"}</p>
        <p className="text-caption"><strong>Careers:</strong> {(r.recommended_careers ?? []).join(", ") || "—"}</p>
      </Card>

      <Card variant="surface">
        <h3 className="font-display text-subheading mb-3">Edit details</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {EDITABLE.map(([k, label]) => (
            <Field key={k} htmlFor={k} label={label}>
              <Input id={k} value={form[k] ?? ""} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
            </Field>
          ))}
        </div>
        {d.legacyId && (
          <div className="mt-3">
            <Field htmlFor="note" label="Counsellor note">
              <Textarea id="note" value={note} onChange={(e) => setNote(e.target.value)} />
            </Field>
          </div>
        )}
        <div className="mt-4 flex flex-wrap gap-3">
          <Button onClick={save} loading={busy === "save"}>Save changes</Button>
          <Button variant="destructive" onClick={remove} loading={busy === "del"}>Delete student</Button>
        </div>
      </Card>

      <Card variant="surface">
        <h3 className="font-display text-subheading mb-2">Payments</h3>
        {d.orders.length ? (
          <ul className="space-y-1 text-caption">
            {d.orders.map((o) => (
              <li key={o.id}>
                {new Date(o.created_at).toLocaleString()} · ₹{(o.amount_paise / 100).toFixed(0)} · {o.status}
                {o.coupon ? ` · ${o.coupon}` : ""} · {o.razorpay_payment_id ?? o.razorpay_order_id ?? ""}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-caption text-muted-foreground">No payment orders found for this mobile or email.</p>
        )}
      </Card>

      <Card variant="surface">
        <h3 className="font-display text-subheading mb-2">Counsellor bookings</h3>
        {d.bookings.length ? (
          <ul className="space-y-1 text-caption">
            {d.bookings.map((b) => (
              <li key={b.id}>{b.preferred_date} · {b.preferred_slot} · {b.mode} · {b.status}</li>
            ))}
          </ul>
        ) : (
          <p className="text-caption text-muted-foreground">No bookings.</p>
        )}
      </Card>
    </div>
  );
}
