import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { Sparkles } from "lucide-react";

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { user, loading, isAdmin, roles } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/auth" });
    } else if (!loading && user && !isAdmin && roles.includes("teacher")) {
      navigate({ to: "/teacher" });
    }
  }, [loading, user, isAdmin, roles, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Sparkles className="h-6 w-6 animate-pulse text-primary" />
      </div>
    );
  }

  if (!user) return null;

  if (!isAdmin && roles.length > 0 && !roles.includes("teacher")) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center space-y-3">
          <h1 className="font-serif text-3xl">Access restricted</h1>
          <p className="text-muted-foreground text-sm">
            Your account does not have administrator access.
          </p>
        </div>
      </div>
    );
  }

  // Roles still loading or empty (first signup; will be admin once trigger runs)
  return <>{children}</>;
}
