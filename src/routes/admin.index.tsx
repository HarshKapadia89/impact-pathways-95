import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { RequireAdmin } from "@/components/RequireAdmin";
import { supabase } from "@/integrations/supabase/client";
import { useServerFn } from "@tanstack/react-start";
import { adminOverview } from "@/lib/admin.functions";
import { Stat as DsStat } from "@/design-system/hbk-career-brand-guidelines-4f1c39";
import {
  School,
  Users,
  BookOpen,
  CalendarCheck,
  FileText,
  Library,
  Compass,
  Brain,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: () => (
    <RequireAdmin>
      <AdminLayout>
        <AdminOverview />
      </AdminLayout>
    </RequireAdmin>
  ),
});

type Stat = { schools: number; teachers: number; programs: number; sessions: number; colleges: number; testsTaken: number };

function AdminOverview() {
  const [stats, setStats] = useState<Stat>({
    schools: 0,
    teachers: 0,
    programs: 0,
    sessions: 0,
    colleges: 0,
    testsTaken: 0,
  });

  useEffect(() => {
    (async () => {
      const [s, t, p, se, c, r] = await Promise.all([
        supabase.from("schools").select("id", { count: "exact", head: true }),
        supabase.from("teachers").select("id", { count: "exact", head: true }),
        supabase.from("programs").select("id", { count: "exact", head: true }),
        supabase.from("sessions").select("id", { count: "exact", head: true }),
        supabase.from("colleges").select("id", { count: "exact", head: true }),
        supabase.from("psychometric_submissions").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        schools: s.count ?? 0,
        teachers: t.count ?? 0,
        programs: p.count ?? 0,
        sessions: se.count ?? 0,
        colleges: c.count ?? 0,
        testsTaken: r.count ?? 0,
      });
    })();
  }, []);

  const opsTiles = [
    { to: "/schools", label: "Schools", icon: School, count: stats.schools, desc: "Manage partner schools and student counts." },
    { to: "/teachers", label: "Teachers", icon: Users, count: stats.teachers, desc: "Field teacher records and assignments." },
    { to: "/programs", label: "Programs", icon: BookOpen, count: stats.programs, desc: "Curriculum, modules, learning outcomes." },
    { to: "/sessions", label: "Sessions", icon: CalendarCheck, count: stats.sessions, desc: "Scheduled & completed classroom sessions." },
    { to: "/reports", label: "Reports", icon: FileText, count: null, desc: "Analytics and exports for funders." },
  ] as const;

  const publicTiles = [
    { to: "/admin/colleges", label: "Colleges Directory", icon: Library, count: stats.colleges, desc: "Manage Gujarat college directory; bulk import via Excel." },
    { to: "/career", label: "Career Guidance", icon: Compass, count: null, desc: "Public-facing stream guides (Science, Commerce, Humanities, Vocational)." },
    { to: "/test", label: "Psychometric Test", icon: Brain, count: stats.testsTaken, desc: "Free RIASEC + MI + Aptitude assessment with 20-page PDF report." },
  ] as const;

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <header>
        <h1 className="font-serif text-3xl md:text-4xl">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          All operations and public modules in one place.
        </p>
      </header>

      <ActivityStats />

      <section>
        <h2 className="font-serif text-xl mb-3">Operations</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {opsTiles.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.to}
                to={t.to}
                className="group rounded-2xl border border-border bg-card p-5 hover:shadow-lift transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <Icon className="h-6 w-6 text-primary" />
                  {t.count !== null && (
                    <div className="text-2xl font-serif">{t.count}</div>
                  )}
                </div>
                <div className="mt-3 font-medium text-foreground">{t.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{t.desc}</div>
                <div className="mt-3 inline-flex items-center gap-1 text-xs text-primary opacity-80 group-hover:opacity-100">
                  Open <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">Public Modules</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {publicTiles.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.to}
                to={t.to}
                className="group rounded-2xl border border-border bg-card p-5 hover:shadow-lift transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <Icon className="h-6 w-6 text-primary" />
                  {t.count !== null && (
                    <div className="text-2xl font-serif">{t.count}</div>
                  )}
                </div>
                <div className="mt-3 font-medium text-foreground">{t.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{t.desc}</div>
                <div className="mt-3 inline-flex items-center gap-1 text-xs text-primary opacity-80 group-hover:opacity-100">
                  Open <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

type Overview = {
  submissions: { taken_at: string; paid_at: string | null; payment_amount: number | null }[];
  orders: { status: string; amount_paise: number; paid_at: string | null; created_at: string }[];
  bookings: { created_at: string }[];
  leads: { created_at: string }[];
};

function ActivityStats() {
  const fetchOverview = useServerFn(adminOverview);
  const [o, setO] = useState<Overview | null>(null);
  const [period, setPeriod] = useState<"today" | "week" | "month" | "all">("all");
  useEffect(() => {
    fetchOverview().then((r) => setO(r as Overview)).catch(() => null);
  }, [fetchOverview]);
  const now = new Date();
  const start =
    period === "today" ? new Date(now.getFullYear(), now.getMonth(), now.getDate())
    : period === "week" ? new Date(now.getTime() - 7 * 864e5)
    : period === "month" ? new Date(now.getTime() - 30 * 864e5)
    : new Date(0);
  const inP = (d: string | null) => !!d && new Date(d) >= start;
  const subs = (o?.submissions ?? []).filter((s) => inP(s.taken_at));
  const paidOrders = (o?.orders ?? []).filter((x) => x.status === "paid" && inP(x.paid_at ?? x.created_at));
  const revenue = paidOrders.reduce((s, x) => s + x.amount_paise / 100, 0);
  const tabs = [["today", "Today"], ["week", "7 days"], ["month", "30 days"], ["all", "All time"]] as const;
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-serif text-xl">Student activity</h2>
        <div className="flex gap-2" role="group" aria-label="Period">
          {tabs.map(([k, l]) => (
            <button
              key={k}
              type="button"
              aria-pressed={period === k}
              onClick={() => setPeriod(k)}
              className={`hbk-focus rounded-md px-3 py-1 text-caption ${period === k ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <DsStat label="Tests taken" value={o ? String(subs.length) : "…"} />
        <DsStat label="Paid tests" value={o ? String(paidOrders.length) : "…"} />
        <DsStat label="Revenue" value={o ? `₹${revenue.toLocaleString()}` : "…"} />
        <DsStat label="Reports generated" value={o ? String(subs.length) : "…"} />
        <DsStat label="Counsellor bookings" value={o ? String((o.bookings ?? []).filter((b) => inP(b.created_at)).length) : "…"} />
        <DsStat label="School enquiries" value={o ? String((o.leads ?? []).filter((b) => inP(b.created_at)).length) : "…"} />
      </div>
      <div className="flex flex-wrap gap-3 text-caption">
        <Link to="/admin/students" className="hbk-focus text-primary underline">All test takers →</Link>
        <Link to="/admin/payments" className="hbk-focus text-primary underline">Payments →</Link>
        <Link to="/admin/team" className="hbk-focus text-primary underline">Admin team →</Link>
      </div>
    </section>
  );
}
