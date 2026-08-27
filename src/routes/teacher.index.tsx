import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { format, isToday, isFuture, parseISO } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { RequireTeacher } from "@/components/RequireTeacher";
import { TeacherLayout } from "@/components/TeacherLayout";
import { useTeacherRecord } from "@/hooks/useTeacherRecord";
import { CalendarCheck, MapPin, ChevronRight, Sparkles } from "lucide-react";
import { isPreviewMode, previewSessions } from "@/lib/teacherPreview";

export const Route = createFileRoute("/teacher/")({
  head: () => ({
    meta: [{ title: "Today — Teacher Field App" }],
  }),
  component: () => (
    <RequireTeacher>
      <TeacherLayout>
        <TeacherToday />
      </TeacherLayout>
    </RequireTeacher>
  ),
});

interface SessionRow {
  id: string;
  scheduled_date: string;
  scheduled_time: string | null;
  status: "scheduled" | "completed" | "missed" | "cancelled";
  schools: { id: string; name: string; village: string | null } | null;
  programs: { name: string; color: string | null } | null;
}

function TeacherToday() {
  const { t } = useTranslation();
  const { teacher, loading } = useTeacherRecord();
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);

  useEffect(() => {
    if (isPreviewMode()) {
      setSessions(previewSessions as unknown as SessionRow[]);
      setLoadingSessions(false);
      return;
    }
    if (!teacher) return;
    (async () => {
      const today = new Date().toISOString().slice(0, 10);
      const { data } = await supabase
        .from("sessions")
        .select(
          "id, scheduled_date, scheduled_time, status, schools(id, name, village), programs(name, color)"
        )
        .eq("teacher_id", teacher.id)
        .gte("scheduled_date", today)
        .order("scheduled_date", { ascending: true })
        .order("scheduled_time", { ascending: true })
        .limit(20);
      setSessions((data ?? []) as unknown as SessionRow[]);
      setLoadingSessions(false);
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
    return (
      <div className="p-6 text-center max-w-md mx-auto">
        <p className="text-sm text-muted-foreground">{t("teacher.notLinked")}</p>
      </div>
    );
  }

  const todays = sessions.filter((s) => isToday(parseISO(s.scheduled_date)));
  const upcoming = sessions.filter((s) => isFuture(parseISO(s.scheduled_date)) && !isToday(parseISO(s.scheduled_date)));

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <header>
        <p className="text-sm text-muted-foreground">{t("teacher.greeting")},</p>
        <h1 className="font-serif text-2xl text-foreground">{teacher.full_name}</h1>
      </header>

      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="font-serif text-lg">{t("teacher.todayTitle")}</h2>
          <span className="text-xs text-muted-foreground">{format(new Date(), "EEE, d MMM")}</span>
        </div>
        {loadingSessions ? (
          <div className="rounded-xl bg-card border border-border p-6 text-center text-sm text-muted-foreground">
            {t("common.loading")}
          </div>
        ) : todays.length === 0 ? (
          <div className="rounded-xl bg-card border border-border p-6 text-center text-sm text-muted-foreground">
            {t("teacher.noSessions")}
          </div>
        ) : (
          <ul className="space-y-3">
            {todays.map((s) => (
              <SessionCard key={s.id} s={s} />
            ))}
          </ul>
        )}
      </section>

      {upcoming.length > 0 && (
        <section>
          <h2 className="font-serif text-lg mb-3">{t("teacher.upcoming")}</h2>
          <ul className="space-y-2">
            {upcoming.slice(0, 5).map((s) => (
              <SessionCard key={s.id} s={s} compact />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function SessionCard({ s, compact }: { s: SessionRow; compact?: boolean }) {
  const { t } = useTranslation();
  return (
    <li>
      <Link
        to="/teacher/session/$sessionId"
        params={{ sessionId: s.id }}
        className="flex items-center gap-3 rounded-xl bg-card border border-border p-4 hover:bg-accent/30 active:scale-[0.99] transition shadow-[var(--shadow-soft)]"
      >
        <div
          className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: (s.programs?.color || "var(--primary)") + "20" }}
        >
          <CalendarCheck
            className="h-5 w-5"
            style={{ color: s.programs?.color || "var(--primary)" }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-foreground truncate">{s.schools?.name}</div>
          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
            {s.schools?.village && (
              <>
                <MapPin className="h-3 w-3" />
                <span className="truncate">{s.schools.village}</span>
                <span>·</span>
              </>
            )}
            <span>{s.programs?.name}</span>
            {!compact && s.scheduled_time && (
              <>
                <span>·</span>
                <span>{s.scheduled_time.slice(0, 5)}</span>
              </>
            )}
          </div>
        </div>
        {s.status === "completed" ? (
          <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-chart-3/15 text-chart-3">
            {t("teacher.completed")}
          </span>
        ) : (
          <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
        )}
      </Link>
    </li>
  );
}
