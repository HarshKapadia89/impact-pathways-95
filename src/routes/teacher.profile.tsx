import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useTeacherRecord } from "@/hooks/useTeacherRecord";
import { RequireTeacher } from "@/components/RequireTeacher";
import { TeacherLayout } from "@/components/TeacherLayout";
import { User, Phone, Mail, MapPin, Briefcase } from "lucide-react";

export const Route = createFileRoute("/teacher/profile")({
  head: () => ({ meta: [{ title: "Profile — Teacher" }] }),
  component: () => (
    <RequireTeacher>
      <TeacherLayout>
        <ProfilePage />
      </TeacherLayout>
    </RequireTeacher>
  ),
});

function ProfilePage() {
  const { t } = useTranslation();
  const { teacher } = useTeacherRecord();

  const displayEmail = teacher?.email || "—";

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <header className="text-center pt-6">
        <div className="mx-auto h-20 w-20 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <User className="h-10 w-10" />
        </div>
        <h1 className="font-serif text-2xl mt-3">{teacher?.full_name || "Field Teacher"}</h1>
        <p className="text-sm text-muted-foreground">{displayEmail}</p>
      </header>

      <div className="rounded-xl bg-card border-2 border-border divide-y divide-border">
        {teacher?.phone && <Row icon={Phone} label="Phone" value={teacher.phone} />}
        {teacher?.email && <Row icon={Mail} label="Email" value={teacher.email} />}
        {teacher?.base_village && (
          <Row icon={MapPin} label="Base village" value={teacher.base_village} />
        )}
        {teacher?.employee_code && (
          <Row icon={Briefcase} label="Employee code" value={teacher.employee_code} />
        )}
        {!teacher?.phone && !teacher?.email && !teacher?.base_village && !teacher?.employee_code && (
          <div className="px-4 py-6 text-center text-sm text-muted-foreground">
            {t("teacher.notLinked")}
          </div>
        )}
      </div>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="text-[11px] text-muted-foreground">{label}</div>
        <div className="text-sm text-foreground truncate">{value}</div>
      </div>
    </div>
  );
}
