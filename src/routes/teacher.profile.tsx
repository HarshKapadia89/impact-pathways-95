import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { useTeacherRecord } from "@/hooks/useTeacherRecord";
import { RequireTeacher } from "@/components/RequireTeacher";
import { TeacherLayout } from "@/components/TeacherLayout";
import { Button } from "@/components/ui/button";
import { LogOut, User, Phone, Mail, MapPin, Briefcase } from "lucide-react";

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
  const { user, signOut, isAdmin } = useAuth();
  const { teacher } = useTeacherRecord();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/auth" });
  };

  const displayEmail = teacher?.email || user?.email || "preview@example.org";

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <header className="text-center pt-6">
        <div className="mx-auto h-20 w-20 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <User className="h-10 w-10" />
        </div>
        <h1 className="font-serif text-2xl mt-3">{teacher?.full_name || user?.email || "Preview Teacher"}</h1>
        <p className="text-sm text-muted-foreground">{displayEmail}</p>
      </header>

      <div className="rounded-xl bg-card border border-border divide-y divide-border">
        {teacher?.phone && (
          <Row icon={Phone} label="Phone" value={teacher.phone} />
        )}
        {teacher?.email && <Row icon={Mail} label="Email" value={teacher.email} />}
        {teacher?.base_village && (
          <Row icon={MapPin} label="Base village" value={teacher.base_village} />
        )}
        {teacher?.employee_code && (
          <Row icon={Briefcase} label="Employee code" value={teacher.employee_code} />
        )}
      </div>

      {isAdmin && (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate({ to: "/" })}
        >
          Switch to Admin Dashboard
        </Button>
      )}

      <Button variant="destructive" className="w-full" onClick={handleSignOut}>
        <LogOut className="h-4 w-4 mr-2" />
        {t("nav.signOut")}
      </Button>
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
