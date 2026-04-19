import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useTeacherRecord } from "@/hooks/useTeacherRecord";
import { RequireTeacher } from "@/components/RequireTeacher";
import { TeacherLayout } from "@/components/TeacherLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Phone, School as SchoolIcon, Plus, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { isPreviewMode, findPreviewSchool, previewSessions } from "@/lib/teacherPreview";

export const Route = createFileRoute("/teacher/school/$schoolId")({
  head: () => ({ meta: [{ title: "School — Teacher" }] }),
  component: () => (
    <RequireTeacher>
      <TeacherLayout>
        <SchoolDetail />
      </TeacherLayout>
    </RequireTeacher>
  ),
});

interface SchoolData {
  id: string;
  name: string;
  village: string | null;
  cluster: string | null;
  num_students: number;
  contact_person: string | null;
  contact_phone: string | null;
}

interface ProgramOption {
  id: string;
  name: string;
}

function SchoolDetail() {
  const { t } = useTranslation();
  const { schoolId } = Route.useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { teacher } = useTeacherRecord();
  const [school, setSchool] = useState<SchoolData | null>(null);
  const [studentCount, setStudentCount] = useState(0);
  const [programs, setPrograms] = useState<ProgramOption[]>([]);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (isPreviewMode()) {
      const ps = findPreviewSchool(schoolId);
      setSchool({
        id: ps.id,
        name: ps.name,
        village: ps.village,
        cluster: ps.cluster,
        num_students: ps.num_students,
        contact_person: ps.contact_person,
        contact_phone: ps.contact_phone,
      });
      setStudentCount(ps.num_students);
      setPrograms(ps.programs.map((name, i) => ({ id: `p-prog-${i}-${ps.id}`, name })));
      return;
    }
    (async () => {
      const [schoolRes, studentsRes, assignmentsRes] = await Promise.all([
        supabase
          .from("schools")
          .select("id, name, village, cluster, num_students, contact_person, contact_phone")
          .eq("id", schoolId)
          .maybeSingle(),
        supabase.from("students").select("id", { count: "exact", head: true }).eq("school_id", schoolId).eq("active", true),
        teacher
          ? supabase
              .from("teacher_assignments")
              .select("programs(id, name)")
              .eq("teacher_id", teacher.id)
              .eq("school_id", schoolId)
              .eq("active", true)
          : Promise.resolve({ data: [] as any[] }),
      ]);
      setSchool((schoolRes.data ?? null) as SchoolData | null);
      setStudentCount(studentsRes.count ?? 0);
      const progs: ProgramOption[] = [];
      (assignmentsRes.data ?? []).forEach((a: any) => {
        if (a.programs && !progs.find((p) => p.id === a.programs.id)) progs.push(a.programs);
      });
      setPrograms(progs);
    })();
  }, [schoolId, teacher]);

  const startNewSession = async (programId: string) => {
    if (isPreviewMode()) {
      const sample = previewSessions.find((s) => s.schools?.id === schoolId) ?? previewSessions[0];
      navigate({ to: "/teacher/session/$sessionId", params: { sessionId: sample.id } });
      return;
    }
    if (!teacher || !user) return;
    setCreating(true);
    const today = new Date().toISOString().slice(0, 10);
    const { data, error } = await supabase
      .from("sessions")
      .insert({
        school_id: schoolId,
        teacher_id: teacher.id,
        program_id: programId,
        scheduled_date: today,
        status: "scheduled",
        created_by: user.id,
      })
      .select("id")
      .maybeSingle();
    setCreating(false);
    if (error || !data) {
      toast.error(error?.message || "Could not start session");
      return;
    }
    navigate({ to: "/teacher/session/$sessionId", params: { sessionId: data.id } });
  };

  if (!school) {
    return (
      <div className="flex items-center justify-center py-20">
        <Sparkles className="h-5 w-5 animate-pulse text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-5">
      <Link to="/teacher/schools" className="inline-flex items-center gap-1 text-sm text-muted-foreground">
        <ArrowLeft className="h-4 w-4" /> {t("common.back")}
      </Link>

      <header className="rounded-xl bg-card border border-border p-5 shadow-[var(--shadow-soft)]">
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <SchoolIcon className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-serif text-xl">{school.name}</h1>
            {school.village && (
              <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="h-3.5 w-3.5" />
                {school.village}
                {school.cluster && ` · ${school.cluster}`}
              </div>
            )}
            <div className="text-xs text-muted-foreground mt-1">
              {studentCount} {t("teacher.students")}
            </div>
            {school.contact_phone && (
              <a
                href={`tel:${school.contact_phone}`}
                className="inline-flex items-center gap-1 text-sm text-primary mt-2"
              >
                <Phone className="h-3.5 w-3.5" />
                {school.contact_person || school.contact_phone}
              </a>
            )}
          </div>
        </div>
      </header>

      <section>
        <h2 className="font-serif text-lg mb-3">{t("teacher.startSession")}</h2>
        {programs.length === 0 ? (
          <div className="rounded-xl bg-card border border-border p-4 text-sm text-muted-foreground text-center">
            No programs assigned for this school.
          </div>
        ) : (
          <div className="grid gap-2">
            {programs.map((p) => (
              <Button
                key={p.id}
                disabled={creating}
                onClick={() => startNewSession(p.id)}
                className="justify-start h-auto py-3"
              >
                <Plus className="h-4 w-4 mr-2" />
                {p.name}
              </Button>
            ))}
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-2">
          Today: {format(new Date(), "EEEE, d MMMM yyyy")}
        </p>
      </section>
    </div>
  );
}
