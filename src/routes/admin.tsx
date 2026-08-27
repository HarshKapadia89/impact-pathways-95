import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { RequireAdmin } from "@/components/RequireAdmin";
import { supabase } from "@/integrations/supabase/client";
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

export const Route = createFileRoute("/admin")({
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
        supabase.from("psychometric_results").select("id", { count: "exact", head: true }),
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

      <section>
        <h2 className="font-serif text-xl mb-3">Operations</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {opsTiles.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.to}
                to={t.to}
                className="group rounded-2xl border border-border bg-card p-5 hover:shadow-[var(--shadow-card)] transition-shadow"
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
                className="group rounded-2xl border border-border bg-card p-5 hover:shadow-[var(--shadow-card)] transition-shadow"
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
