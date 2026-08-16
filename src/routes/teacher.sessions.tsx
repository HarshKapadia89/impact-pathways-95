import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { format, parseISO } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { RequireTeacher } from "@/components/RequireTeacher";
import { TeacherLayout } from "@/components/TeacherLayout";
import { useTeacherRecord } from "@/hooks/useTeacherRecord";
import { CalendarCheck, ChevronRight, Sparkles } from "lucide-react";
import { isPreviewMode, previewSessions } from "@/lib/teacherPreview";

export const Route = createFileRoute("/teacher/sessions")({
  head: () => ({ meta: [{ title: "Sessions — Teacher" }] }),
  component: () => (
    <RequireTeacher>
      <TeacherLayout>
        <SessionsList />
      </TeacherLayout>
    </RequireTeacher>
  ),
});

interface Row {
  id: string;
  scheduled_date: string;
  status: "scheduled" | "completed" | "missed" | "cancelled";
  students_present: number | null;
  schools: { name: string; village: string | null } | null;
  programs: { name: string; color: string | null } | null;
}

function SessionsList() {
  const { t } = useTranslation();
  const { teacher, loading } = useTeacherRecord();
  const [rows, setRows] = useState<Row[]>([]);
  const [filter, setFilter] = useState<"all" | "scheduled" | "completed">("all");

  useEffect(() => {
    if (isPreviewMode()) {
      setRows(previewSessions as unknown as Row[]);
      return;
    }
    if (!teacher) return;
    (async () => {
      const { data } = await supabase
        .from("sessions")
        .select(
          "id, scheduled_date, status, students_present, schools(name, village), programs(name, color)"
        )
        .eq("teacher_id", teacher.id)
        .order("scheduled_date", { ascending: false })
        .limit(100);
      setRows((data ?? []) as unknown as Row[]);
    })();
  }, [teacher]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Sparkles className="h-5 w-5 animate-pulse text-primary" />
      </div>
    );
  }

  if (!teacher) {
    return <div className="p-6 text-center text-sm text-muted-foreground">{t("teacher.notLinked")}</div>;
  }

  const filtered = rows.filter((r) => filter === "all" || r.status === filter);
  const filters: { v: typeof filter; l: string }[] = [
    { v: "all", l: t("common.all") },
    { v: "scheduled", l: t("teacher.scheduled") },
    { v: "completed", l: t("teacher.completed") },
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <header>
        <h1 className="font-serif text-2xl">{t("teacher.nav.sessions")}</h1>
      </header>

      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f.v}
            onClick={() => setFilter(f.v)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
              filter === f.v
                ? "bg-primary text-primary-foreground"
                : "bg-card border-2 border-border text-muted-foreground"
            }`}
          >
            {f.l}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl bg-card border-2 border-border p-6 text-center text-sm text-muted-foreground">
          {t("teacher.noSessions")}
        </div>
      ) : (
        <ul className="space-y-2">
          {filtered.map((s) => (
            <li key={s.id}>
              <Link
                to="/teacher/session/$sessionId"
                params={{ sessionId: s.id }}
                className="flex items-center gap-3 rounded-xl bg-card border-2 border-border p-3 active:scale-[0.99] transition"
              >
                <div
                  className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: (s.programs?.color || "var(--primary)") + "20" }}
                >
                  <CalendarCheck
                    className="h-4 w-4"
                    style={{ color: s.programs?.color || "var(--primary)" }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground text-sm truncate">{s.schools?.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {format(parseISO(s.scheduled_date), "d MMM")} · {s.programs?.name}
                  </div>
                </div>
                <span
                  className={`text-[10px] font-medium px-2 py-1 rounded-full ${
                    s.status === "completed"
                      ? "bg-chart-3/15 text-chart-3"
                      : s.status === "missed"
                        ? "bg-destructive/15 text-destructive"
                        : "bg-accent/30 text-foreground"
                  }`}
                >
                  {t(`teacher.${s.status}` as any)}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
