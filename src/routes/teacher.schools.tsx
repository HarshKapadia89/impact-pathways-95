import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { RequireTeacher } from "@/components/RequireTeacher";
import { TeacherLayout } from "@/components/TeacherLayout";
import { useTeacherRecord } from "@/hooks/useTeacherRecord";
import { School as SchoolIcon, MapPin, ChevronRight, Sparkles, Phone } from "lucide-react";
import { isPreviewMode, previewSchools } from "@/lib/teacherPreview";

export const Route = createFileRoute("/teacher/schools")({
  head: () => ({ meta: [{ title: "My Schools — Teacher" }] }),
  component: () => (
    <RequireTeacher>
      <TeacherLayout>
        <MySchools />
      </TeacherLayout>
    </RequireTeacher>
  ),
});

interface AssignedSchool {
  school_id: string;
  schools: {
    id: string;
    name: string;
    village: string | null;
    cluster: string | null;
    num_students: number;
    contact_person: string | null;
    contact_phone: string | null;
  } | null;
  programs: { name: string; color: string | null } | null;
}

function MySchools() {
  const { t } = useTranslation();
  const { teacher, loading } = useTeacherRecord();
  const [rows, setRows] = useState<AssignedSchool[]>([]);
  const [loadingRows, setLoadingRows] = useState(true);

  useEffect(() => {
    if (isPreviewMode()) {
      const mock: AssignedSchool[] = previewSchools.flatMap((s) =>
        s.programs.map((p) => ({
          school_id: s.id,
          schools: {
            id: s.id,
            name: s.name,
            village: s.village,
            cluster: s.cluster,
            num_students: s.num_students,
            contact_person: s.contact_person,
            contact_phone: s.contact_phone,
          },
          programs: { name: p, color: null },
        }))
      );
      setRows(mock);
      setLoadingRows(false);
      return;
    }
    if (!teacher) return;
    (async () => {
      const { data } = await supabase
        .from("teacher_assignments")
        .select(
          "school_id, schools(id, name, village, cluster, num_students, contact_person, contact_phone), programs(name, color)"
        )
        .eq("teacher_id", teacher.id)
        .eq("active", true);
      setRows((data ?? []) as unknown as AssignedSchool[]);
      setLoadingRows(false);
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

  // Dedupe by school
  const bySchool = new Map<string, { school: AssignedSchool["schools"]; programs: string[] }>();
  rows.forEach((r) => {
    if (!r.schools) return;
    const cur = bySchool.get(r.schools.id) ?? { school: r.schools, programs: [] };
    if (r.programs?.name && !cur.programs.includes(r.programs.name)) cur.programs.push(r.programs.name);
    bySchool.set(r.schools.id, cur);
  });
  const schools = Array.from(bySchool.values());

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <header>
        <h1 className="font-serif text-2xl">{t("teacher.myAssignments")}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {schools.length} {t("teacher.nav.schools").toLowerCase()}
        </p>
      </header>

      {loadingRows ? (
        <div className="rounded-xl bg-card border border-border p-6 text-center text-sm text-muted-foreground">
          {t("common.loading")}
        </div>
      ) : schools.length === 0 ? (
        <div className="rounded-xl bg-card border border-border p-6 text-center text-sm text-muted-foreground">
          {t("teacher.noSessions")}
        </div>
      ) : (
        <ul className="space-y-3">
          {schools.map(({ school, programs }) =>
            school ? (
              <li key={school.id}>
                <Link
                  to="/teacher/school/$schoolId"
                  params={{ schoolId: school.id }}
                  className="block rounded-xl bg-card border border-border p-4 active:scale-[0.99] transition shadow-[var(--shadow-soft)]"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <SchoolIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground">{school.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        {school.village && (
                          <>
                            <MapPin className="h-3 w-3" />
                            <span>{school.village}</span>
                            <span>·</span>
                          </>
                        )}
                        <span>
                          {school.num_students} {t("teacher.students")}
                        </span>
                      </div>
                      {programs.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {programs.map((p) => (
                            <span
                              key={p}
                              className="text-[10px] px-2 py-0.5 rounded-full bg-accent/30 text-foreground"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      )}
                      {school.contact_phone && (
                        <a
                          href={`tel:${school.contact_phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-xs text-primary mt-2"
                        >
                          <Phone className="h-3 w-3" />
                          {school.contact_person || school.contact_phone}
                        </a>
                      )}
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                  </div>
                </Link>
              </li>
            ) : null
          )}
        </ul>
      )}
    </div>
  );
}
