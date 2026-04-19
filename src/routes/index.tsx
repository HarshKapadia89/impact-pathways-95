import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { RequireAdmin } from "@/components/RequireAdmin";
import { AdminLayout } from "@/components/AdminLayout";
import { School, Users, CalendarCheck, GraduationCap } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { format } from "date-fns";

export const Route = createFileRoute("/")({
  component: () => (
    <RequireAdmin>
      <AdminLayout>
        <Overview />
      </AdminLayout>
    </RequireAdmin>
  ),
});

interface Stats {
  schools: number;
  students: number;
  sessions: number;
  teachers: number;
}

interface ProgramReach {
  name: string;
  sessions: number;
  color: string;
}

interface RecentSession {
  id: string;
  scheduled_date: string;
  students_present: number | null;
  schools: { name: string } | null;
  programs: { name: string; color: string | null } | null;
  teachers: { full_name: string } | null;
}

function Overview() {
  const { t } = useTranslation();
  const [stats, setStats] = useState<Stats>({ schools: 0, students: 0, sessions: 0, teachers: 0 });
  const [reach, setReach] = useState<ProgramReach[]>([]);
  const [recent, setRecent] = useState<RecentSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [schoolsRes, sessionsRes, teachersRes, reachRes, recentRes] = await Promise.all([
        supabase.from("schools").select("num_students", { count: "exact" }),
        supabase.from("sessions").select("id", { count: "exact", head: true }),
        supabase.from("teachers").select("id", { count: "exact", head: true }).eq("active", true),
        supabase.from("programs").select("name, color, sessions(count)"),
        supabase
          .from("sessions")
          .select(
            "id, scheduled_date, students_present, schools(name), programs(name, color), teachers(full_name)"
          )
          .order("scheduled_date", { ascending: false })
          .limit(8),
      ]);

      const studentsTotal =
        schoolsRes.data?.reduce((sum, s) => sum + (s.num_students || 0), 0) ?? 0;

      setStats({
        schools: schoolsRes.count ?? 0,
        students: studentsTotal,
        sessions: sessionsRes.count ?? 0,
        teachers: teachersRes.count ?? 0,
      });

      setReach(
        (reachRes.data ?? []).map((p: any) => ({
          name: p.name,
          sessions: p.sessions?.[0]?.count ?? 0,
          color: p.color || "var(--primary)",
        }))
      );

      setRecent((recentRes.data ?? []) as unknown as RecentSession[]);
      setLoading(false);
    })();
  }, []);

  const cards = [
    { label: t("overview.schools"), value: stats.schools, Icon: School, accent: "bg-chart-1/10 text-chart-1" },
    {
      label: t("overview.students"),
      value: stats.students.toLocaleString(),
      Icon: GraduationCap,
      accent: "bg-chart-2/15 text-chart-2",
    },
    { label: t("overview.sessions"), value: stats.sessions, Icon: CalendarCheck, accent: "bg-chart-3/15 text-chart-3" },
    { label: t("overview.teachers"), value: stats.teachers, Icon: Users, accent: "bg-chart-4/15 text-chart-4" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <header>
        <h1 className="font-serif text-3xl md:text-4xl text-foreground">{t("overview.title")}</h1>
        <p className="mt-1 text-muted-foreground text-sm">{t("overview.subtitle")}</p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]"
          >
            <div className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${c.accent}`}>
              <c.Icon className="h-4 w-4" />
            </div>
            <div className="mt-3 font-serif text-3xl text-foreground">{loading ? "—" : c.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
          <h2 className="font-serif text-lg mb-4">{t("overview.programReach")}</h2>
          {reach.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("overview.none")}</p>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reach}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="sessions" radius={[6, 6, 0, 0]}>
                    {reach.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-serif text-lg mb-4">{t("overview.recent")}</h2>
          {recent.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("overview.none")}</p>
          ) : (
            <ul className="space-y-3">
              {recent.map((s) => (
                <li key={s.id} className="text-sm border-b border-border pb-2 last:border-0">
                  <div className="font-medium text-foreground truncate">{s.schools?.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ backgroundColor: s.programs?.color || "var(--primary)" }}
                    />
                    {s.programs?.name} · {format(new Date(s.scheduled_date), "d MMM")} ·{" "}
                    {s.students_present ?? 0} {t("sessions.present").toLowerCase()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
