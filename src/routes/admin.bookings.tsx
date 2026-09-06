import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { RequireAdmin } from "@/components/RequireAdmin";
import { supabase } from "@/integrations/supabase/client";
import { CalendarCheck, Phone, Video, MapPin, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/admin/bookings")({
  component: () => (
    <RequireAdmin>
      <AdminLayout>
        <BookingsAdmin />
      </AdminLayout>
    </RequireAdmin>
  ),
});

type Booking = {
  id: string;
  student_name: string;
  grade: string | null;
  school_name: string | null;
  mobile: string;
  email: string | null;
  preferred_date: string;
  preferred_slot: string;
  mode: string;
  holland_code: string | null;
  top_stream: string | null;
  chosen_profession: string | null;
  message: string | null;
  status: string;
  admin_note: string | null;
  created_at: string;
};

const STATUSES = ["new", "confirmed", "completed", "cancelled"] as const;

const statusStyle: Record<string, string> = {
  new: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
  completed: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
};

const modeIcon: Record<string, typeof Video> = { video: Video, phone: Phone, "in-person": MapPin };

function BookingsAdmin() {
  const [rows, setRows] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("counsellor_bookings")
      .select("*")
      .order("created_at", { ascending: false });
    setRows((data as Booking[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function setStatus(id: string, status: string) {
    await supabase.from("counsellor_bookings").update({ status } as never).eq("id", id);
    setRows((r) => r.map((b) => (b.id === id ? { ...b, status } : b)));
  }

  async function setNote(id: string, admin_note: string) {
    await supabase.from("counsellor_bookings").update({ admin_note } as never).eq("id", id);
  }

  const filtered = filter === "all" ? rows : rows.filter((r) => r.status === filter);
  const counts = rows.reduce<Record<string, number>>((acc, r) => {
    acc[r.status] = (acc[r.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <header className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-serif text-3xl">Counsellor Bookings</h1>
          <p className="text-muted-foreground mt-1">{rows.length} total requests</p>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted"
        >
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </header>

      <div className="flex flex-wrap gap-2">
        {["all", ...STATUSES].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full border px-4 py-1.5 text-sm capitalize ${
              filter === s ? "border-primary bg-primary/10 text-primary font-medium" : "border-border"
            }`}
          >
            {s} {s === "all" ? `(${rows.length})` : counts[s] ? `(${counts[s]})` : ""}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
          <CalendarCheck className="h-10 w-10 mx-auto mb-3 opacity-40" />
          No bookings yet.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((b) => {
            const ModeIcon = modeIcon[b.mode] ?? Video;
            return (
              <div key={b.id} className="rounded-xl border border-border bg-card p-5 space-y-3">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="font-semibold text-lg">{b.student_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {[b.grade && `Grade ${b.grade}`, b.school_name].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyle[b.status] ?? ""}`}>
                    {b.status}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Session</p>
                    <p className="font-medium flex items-center gap-1.5">
                      <ModeIcon className="h-4 w-4 text-primary" />
                      {b.preferred_date} · {b.preferred_slot}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Contact</p>
                    <p className="font-medium">
                      <a href={`tel:${b.mobile}`} className="text-primary hover:underline">{b.mobile}</a>
                    </p>
                    {b.email && <p className="text-xs text-muted-foreground">{b.email}</p>}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Test results</p>
                    <p className="font-medium">
                      {b.holland_code ? `Holland: ${b.holland_code}` : "No test attached"}
                    </p>
                    {b.top_stream && <p className="text-xs text-muted-foreground">{b.top_stream}</p>}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Chosen profession</p>
                    <p className="font-medium">{b.chosen_profession ?? "—"}</p>
                  </div>
                </div>

                {b.message && (
                  <p className="text-sm rounded-lg bg-muted p-3">“{b.message}”</p>
                )}

                <div className="flex items-center gap-2 flex-wrap pt-1">
                  <span className="text-xs text-muted-foreground">Set status:</span>
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatus(b.id, s)}
                      disabled={b.status === s}
                      className={`rounded-lg border px-3 py-1 text-xs capitalize ${
                        b.status === s ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                  <input
                    className="ml-auto rounded-lg border border-border bg-background px-3 py-1.5 text-xs min-w-52"
                    placeholder="Admin note…"
                    defaultValue={b.admin_note ?? ""}
                    onBlur={(e) => setNote(b.id, e.target.value)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
