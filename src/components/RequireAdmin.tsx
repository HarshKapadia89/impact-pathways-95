import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { Button, Card } from "@/design-system/hbk-career-brand-guidelines-4f1c39";

/** Admin area gate: must be signed in AND hold the admin role. Data access is also enforced server-side. */
export function RequireAdmin({ children }: { children: ReactNode }) {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth", search: { redirect: window.location.pathname }, replace: true });
  }, [loading, user, navigate]);

  if (loading || !user) {
    return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Checking access…</div>;
  }
  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <Card variant="surface">
          <div className="space-y-4">
            <h1 className="font-display text-heading">Admin access needed</h1>
            <p className="text-body text-muted-foreground">
              {user.email} is signed in but is not an admin. Ask an existing admin to add you from the Team page.
            </p>
            <Button variant="outline" onClick={() => signOut()}>Sign out</Button>
          </div>
        </Card>
      </div>
    );
  }
  return <>{children}</>;
}
