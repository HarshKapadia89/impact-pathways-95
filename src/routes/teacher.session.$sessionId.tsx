import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { format, parseISO } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useTeacherRecord } from "@/hooks/useTeacherRecord";
import { RequireTeacher } from "@/components/RequireTeacher";
import { TeacherLayout } from "@/components/TeacherLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  MapPin,
  Sparkles,
  Star,
  Loader2,
  ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { isPreviewMode, findPreviewSession, previewStudents } from "@/lib/teacherPreview";

export const Route = createFileRoute("/teacher/session/$sessionId")({
  head: () => ({ meta: [{ title: "Session — Teacher" }] }),
  component: () => (
    <RequireTeacher>
      <TeacherLayout>
        <SessionDetail />
      </TeacherLayout>
    </RequireTeacher>
  ),
});

interface SessionData {
  id: string;
  scheduled_date: string;
  scheduled_time: string | null;
  status: "scheduled" | "completed" | "missed" | "cancelled";
  summary: string | null;
  students_present: number | null;
  duration_minutes: number | null;
  check_in_at: string | null;
  check_in_lat: number | null;
  check_in_lng: number | null;
  photo_url: string | null;
  school_id: string;
  schools: { name: string; village: string | null } | null;
  programs: { name: string; color: string | null } | null;
}

interface Student {
  id: string;
  full_name: string;
  grade: string | null;
}

interface AttendanceState {
  present: boolean;
  skill_rating: number | null;
}

function SessionDetail() {
  const { t } = useTranslation();
  const { sessionId } = Route.useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { teacher } = useTeacherRecord();
  const [session, setSession] = useState<SessionData | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Record<string, AttendanceState>>({});
  const [summary, setSummary] = useState("");
  const [duration, setDuration] = useState<number | "">("");
  const [busy, setBusy] = useState(false);
  const [checkingIn, setCheckingIn] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isPreviewMode()) {
      const ps = findPreviewSession(sessionId);
      setSession({
        id: ps.id,
        scheduled_date: ps.scheduled_date,
        scheduled_time: ps.scheduled_time,
        status: ps.status,
        summary: null,
        students_present: ps.students_present,
        duration_minutes: 60,
        check_in_at: null,
        check_in_lat: null,
        check_in_lng: null,
        photo_url: null,
        school_id: ps.schools?.id ?? "p-school-1",
        schools: ps.schools ? { name: ps.schools.name, village: ps.schools.village } : null,
        programs: ps.programs,
      });
      setSummary("");
      setDuration(60);
      setStudents(previewStudents);
      setAttendance({});
      return;
    }
    (async () => {
      const { data: s } = await supabase
        .from("sessions")
        .select(
          "id, scheduled_date, scheduled_time, status, summary, students_present, duration_minutes, check_in_at, check_in_lat, check_in_lng, photo_url, school_id, schools(name, village), programs(name, color)"
        )
        .eq("id", sessionId)
        .maybeSingle();
      if (!s) return;
      setSession(s as unknown as SessionData);
      setSummary(s.summary || "");
      setDuration(s.duration_minutes ?? "");

      const { data: studentRows } = await supabase
        .from("students")
        .select("id, full_name, grade")
        .eq("school_id", s.school_id)
        .eq("active", true)
        .order("full_name");
      setStudents((studentRows ?? []) as Student[]);

      const { data: attRows } = await supabase
        .from("attendance")
        .select("student_id, present, skill_rating")
        .eq("session_id", sessionId);
      const map: Record<string, AttendanceState> = {};
      (attRows ?? []).forEach((r) => {
        map[r.student_id] = { present: r.present, skill_rating: r.skill_rating };
      });
      setAttendance(map);
    })();
  }, [sessionId]);

  const handleCheckIn = () => {
    if (isPreviewMode()) {
      setSession((prev) =>
        prev
          ? {
              ...prev,
              check_in_at: new Date().toISOString(),
              check_in_lat: 22.5645,
              check_in_lng: 72.9289,
            }
          : prev
      );
      toast.success(t("teacher.checkedIn"));
      return;
    }
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }
    setCheckingIn(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { error } = await supabase
          .from("sessions")
          .update({
            check_in_at: new Date().toISOString(),
            check_in_lat: pos.coords.latitude,
            check_in_lng: pos.coords.longitude,
          })
          .eq("id", sessionId);
        setCheckingIn(false);
        if (error) {
          toast.error(error.message);
          return;
        }
        setSession((prev) =>
          prev
            ? {
                ...prev,
                check_in_at: new Date().toISOString(),
                check_in_lat: pos.coords.latitude,
                check_in_lng: pos.coords.longitude,
              }
            : prev
        );
        toast.success(t("teacher.checkedIn"));
      },
      () => {
        setCheckingIn(false);
        toast.error(t("teacher.locationDenied"));
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (isPreviewMode()) {
      const localUrl = URL.createObjectURL(file);
      setSession((prev) => (prev ? { ...prev, photo_url: localUrl } : prev));
      toast.success(t("teacher.photoSaved"));
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `sessions/${sessionId}-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("session-photos")
        .upload(path, file, { upsert: true, contentType: file.type });
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from("session-photos").getPublicUrl(path);
      const photoUrl = pub.publicUrl;
      const { error: updErr } = await supabase
        .from("sessions")
        .update({ photo_url: photoUrl })
        .eq("id", sessionId);
      if (updErr) throw updErr;
      setSession((prev) => (prev ? { ...prev, photo_url: photoUrl } : prev));
      toast.success(t("teacher.photoSaved"));
    } catch (err) {
      const m = err instanceof Error ? err.message : t("teacher.photoFailed");
      toast.error(m);
    } finally {
      setUploading(false);
    }
  };

  const togglePresent = (studentId: string) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: {
        present: !(prev[studentId]?.present ?? true),
        skill_rating: prev[studentId]?.skill_rating ?? null,
      },
    }));
  };

  const setSkill = (studentId: string, rating: number) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: {
        present: prev[studentId]?.present ?? true,
        skill_rating: prev[studentId]?.skill_rating === rating ? null : rating,
      },
    }));
  };

  const saveAll = async (markComplete: boolean) => {
    if (!session) return;
    if (isPreviewMode()) {
      const presentCount = students.filter((s) => attendance[s.id]?.present ?? true).length;
      toast.success(markComplete ? t("teacher.completed") : t("common.save"));
      if (markComplete) {
        navigate({ to: "/teacher/sessions" });
      } else {
        setSession((prev) => (prev ? { ...prev, summary, students_present: presentCount } : prev));
      }
      return;
    }
    setBusy(true);
    try {
      const upserts = students.map((s) => {
        const a = attendance[s.id];
        return {
          session_id: sessionId,
          student_id: s.id,
          present: a?.present ?? true,
          skill_rating: a?.skill_rating ?? null,
        };
      });

      if (upserts.length > 0) {
        await supabase.from("attendance").delete().eq("session_id", sessionId);
        const { error: attErr } = await supabase.from("attendance").insert(upserts);
        if (attErr) throw attErr;
      }

      const presentCount = upserts.filter((u) => u.present).length;
      const { error: sessErr } = await supabase
        .from("sessions")
        .update({
          summary: summary || null,
          students_present: presentCount,
          duration_minutes: duration === "" ? null : Number(duration),
          status: markComplete ? "completed" : session.status,
        })
        .eq("id", sessionId);
      if (sessErr) throw sessErr;

      toast.success(markComplete ? t("teacher.completed") : t("common.save"));
      if (markComplete) navigate({ to: "/teacher/sessions" });
      else
        setSession((prev) =>
          prev ? { ...prev, summary, students_present: presentCount } : prev
        );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center py-20">
        <Sparkles className="h-5 w-5 animate-pulse text-primary" />
      </div>
    );
  }

  const presentCount = students.filter((s) => attendance[s.id]?.present ?? true).length;
  const isComplete = session.status === "completed";

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-5">
      <Link to="/teacher/sessions" className="inline-flex items-center gap-1 text-sm text-muted-foreground">
        <ArrowLeft className="h-4 w-4" /> {t("teacher.backToSessions")}
      </Link>

      <header
        className="rounded-xl border border-border p-5 shadow-[var(--shadow-soft)]"
        style={{
          background: `linear-gradient(135deg, ${session.programs?.color || "var(--primary)"}15, var(--card))`,
        }}
      >
        <div className="text-xs uppercase tracking-wide text-muted-foreground">
          {format(parseISO(session.scheduled_date), "EEEE, d MMM yyyy")}
        </div>
        <h1 className="font-serif text-2xl mt-1">{session.schools?.name}</h1>
        <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
          {session.schools?.village && (
            <>
              <MapPin className="h-3.5 w-3.5" />
              <span>{session.schools.village}</span>
              <span>·</span>
            </>
          )}
          <span>{session.programs?.name}</span>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-3">
        <button
          onClick={handleCheckIn}
          disabled={checkingIn || !!session.check_in_at}
          className={`rounded-xl border p-4 text-left transition active:scale-[0.99] ${
            session.check_in_at
              ? "border-chart-3/40 bg-chart-3/10"
              : "border-border bg-card hover:bg-accent/30"
          }`}
        >
          <div className="flex items-center gap-2">
            {checkingIn ? (
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            ) : session.check_in_at ? (
              <CheckCircle2 className="h-4 w-4 text-chart-3" />
            ) : (
              <MapPin className="h-4 w-4 text-primary" />
            )}
            <span className="text-xs font-medium uppercase tracking-wide">
              {t("teacher.checkIn")}
            </span>
          </div>
          <div className="mt-2 text-sm font-medium">
            {checkingIn
              ? t("teacher.locating")
              : session.check_in_at
                ? format(parseISO(session.check_in_at), "p")
                : "Tap to check in"}
          </div>
          {session.check_in_lat != null && (
            <div className="text-[10px] text-muted-foreground mt-0.5">
              {session.check_in_lat.toFixed(4)}, {session.check_in_lng?.toFixed(4)}
            </div>
          )}
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className={`rounded-xl border p-4 text-left transition active:scale-[0.99] ${
            session.photo_url
              ? "border-chart-3/40 bg-chart-3/10"
              : "border-border bg-card hover:bg-accent/30"
          }`}
        >
          <div className="flex items-center gap-2">
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            ) : session.photo_url ? (
              <CheckCircle2 className="h-4 w-4 text-chart-3" />
            ) : (
              <Camera className="h-4 w-4 text-primary" />
            )}
            <span className="text-xs font-medium uppercase tracking-wide">
              {t("teacher.capturePhoto")}
            </span>
          </div>
          <div className="mt-2 text-sm font-medium">
            {uploading ? "Uploading…" : session.photo_url ? "Photo attached" : "Tap to capture"}
          </div>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handlePhotoChange}
        />
      </section>

      {session.photo_url && (
        <a
          href={session.photo_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-xl overflow-hidden border border-border bg-card"
        >
          <img
            src={session.photo_url}
            alt="Session photo"
            className="w-full h-48 object-cover"
            loading="lazy"
          />
        </a>
      )}

      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="font-serif text-lg">{t("teacher.attendance")}</h2>
          <span className="text-xs text-muted-foreground">
            {presentCount}/{students.length} {t("teacher.present").toLowerCase()}
          </span>
        </div>

        {students.length === 0 ? (
          <div className="rounded-xl bg-card border border-border p-5 text-center text-sm text-muted-foreground">
            <ImageIcon className="h-6 w-6 mx-auto mb-2 opacity-40" />
            {t("teacher.noStudents")}
            <div className="text-xs mt-1 opacity-70">{t("teacher.addStudents")}</div>
          </div>
        ) : (
          <ul className="space-y-2">
            {students.map((s) => {
              const a = attendance[s.id];
              const present = a?.present ?? true;
              return (
                <li
                  key={s.id}
                  className="rounded-xl bg-card border border-border p-3 flex items-center gap-3"
                >
                  <button
                    type="button"
                    onClick={() => togglePresent(s.id)}
                    className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition ${
                      present
                        ? "bg-chart-3 text-primary-foreground"
                        : "bg-destructive/15 text-destructive border border-destructive/30"
                    }`}
                    aria-label={present ? "Present" : "Absent"}
                  >
                    {present ? "P" : "A"}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-foreground truncate">{s.full_name}</div>
                    {s.grade && <div className="text-[11px] text-muted-foreground">Grade {s.grade}</div>}
                  </div>
                  {present && (
                    <div className="flex items-center gap-0.5 shrink-0">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setSkill(s.id, n)}
                          aria-label={`Skill ${n}`}
                          className="p-0.5"
                        >
                          <Star
                            className={`h-4 w-4 ${
                              (a?.skill_rating ?? 0) >= n
                                ? "fill-chart-2 text-chart-2"
                                : "text-muted-foreground/40"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="space-y-2">
        <h2 className="font-serif text-lg">{t("teacher.sessionSummary")}</h2>
        <Textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder={t("teacher.summaryPlaceholder")}
          rows={4}
          className="resize-none"
        />
        <div className="flex items-center gap-2">
          <label className="text-xs text-muted-foreground">Duration (min)</label>
          <input
            type="number"
            min={0}
            value={duration}
            onChange={(e) => setDuration(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-20 rounded-md border border-border bg-card px-2 py-1 text-sm"
          />
        </div>
      </section>

      <div className="flex gap-2 pt-2">
        <Button
          variant="outline"
          className="flex-1"
          disabled={busy}
          onClick={() => saveAll(false)}
        >
          {t("common.save")}
        </Button>
        <Button
          className="flex-1"
          disabled={busy || isComplete}
          onClick={() => saveAll(true)}
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : t("teacher.markComplete")}
        </Button>
      </div>

      {!teacher && (
        <p className="text-xs text-destructive text-center">{t("teacher.notLinked")}</p>
      )}
    </div>
  );
}
