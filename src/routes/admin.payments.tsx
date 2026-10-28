import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import * as XLSX from "xlsx";
import { AdminLayout } from "@/components/AdminLayout";
import { RequireAdmin } from "@/components/RequireAdmin";
import { adminListPayments } from "@/lib/admin.functions";
import { Alert, Badge, Button, Select } from "@/design-system/hbk-career-brand-guidelines-4f1c39";

export const Route = createFileRoute("/admin/payments")({
  head: () => ({ meta: [{ title: "Payments — SRMD Disha admin" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <RequireAdmin>
      <AdminLayout>
        <Payments />
      </AdminLayout>
    </RequireAdmin>
  ),
});

type Order = Record<string, any>;

function Payments() {
  const list = useServerFn(adminListPayments);
  const [rows, setRows] = useState<Order[] | null>(null);
  const [status, setStatus] = useState("");
  const [err, setErr] = useState("");
  useEffect(() => {
    list().then((r) => setRows(r as Order[])).catch((e) => setErr(String(e?.message ?? e)));
  }, [list]);
  const shown = (rows ?? []).filter((r) => !status || r.status === status);
  const total = shown.filter((r) => r.status === "paid").reduce((s, r) => s + r.amount_paise / 100, 0);

  const exportXlsx = () => {
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      wb,
      XLSX.utils.json_to_sheet(
        shown.map((r) => ({
          Created: r.created_at, Status: r.status, Amount: r.amount_paise / 100, Coupon: r.coupon,
          Student: r.student_name, Mobile: r.mobile, Email: r.email, School: r.school_name,
          "Razorpay order": r.razorpay_order_id, "Razorpay payment": r.razorpay_payment_id, "Paid at": r.paid_at,
        })),
      ),
      "Payments",
    );
    XLSX.writeFile(wb, `hbk-payments-${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-title">Payments</h1>
          <p className="text-caption text-muted-foreground">{shown.length} orders · ₹{total.toLocaleString()} collected</p>
        </div>
        <div className="flex gap-2">
          <Select aria-label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All statuses</option>
            <option value="paid">Paid</option>
            <option value="created">Created (not paid)</option>
            <option value="failed">Failed</option>
          </Select>
          <Button variant="outline" onClick={exportXlsx} disabled={!shown.length}>Download Excel</Button>
        </div>
      </div>
      {err && <Alert variant="danger">{err}</Alert>}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-caption">
          <thead className="bg-muted text-muted-foreground">
            <tr>{["Date", "Student", "Contact", "Amount", "Coupon", "Status", "Razorpay IDs"].map((h) => <th key={h} className="px-3 py-2 text-left font-medium">{h}</th>)}</tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.id} className="border-t border-border">
                <td className="px-3 py-2">{new Date(r.created_at).toLocaleString()}</td>
                <td className="px-3 py-2">{r.student_name ?? "—"}<div className="text-muted-foreground">{r.school_name ?? ""}</div></td>
                <td className="px-3 py-2">{r.mobile ?? ""}<div className="text-muted-foreground">{r.email ?? ""}</div></td>
                <td className="px-3 py-2 tabular-nums">₹{(r.amount_paise / 100).toFixed(0)}</td>
                <td className="px-3 py-2">{r.coupon ?? "—"}</td>
                <td className="px-3 py-2"><Badge variant={r.status === "paid" ? "success" : r.status === "failed" ? "warning" : "neutral"}>{r.status}</Badge></td>
                <td className="px-3 py-2">{r.razorpay_order_id ?? ""}<div className="text-muted-foreground">{r.razorpay_payment_id ?? ""}</div></td>
              </tr>
            ))}
            {rows && !shown.length && <tr><td colSpan={7} className="px-3 py-6 text-center text-muted-foreground">No orders.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
