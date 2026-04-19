import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { Sparkles } from "lucide-react";

export function RequireTeacher({ children }: { children: ReactNode }) {
  const { user, loading, roles, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/auth" });
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Sparkles className="h-6 w-6 animate-pulse text-primary" />
      </div>
    );
  }

  if (!user) return null;

  // Admins and managers can preview the teacher app too
  const allowed = isAdmin || roles.includes("teacher") || roles.includes("manager");
  if (!allowed && roles.length > 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center space-y-3">
          <h1 className="font-serif text-3xl">Access restricted</h1>
          <p className="text-muted-foreground text-sm">
            Your account is not linked to a teacher profile yet. Please contact your administrator.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
