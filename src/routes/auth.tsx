import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Alert, Button, Card, Field, Input, Logotype } from "@/design-system/hbk-career-brand-guidelines-4f1c39";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>) => ({
    redirect: typeof s.redirect === "string" && s.redirect.startsWith("/") && !s.redirect.startsWith("//") ? s.redirect : "/admin",
  }),
  head: () => ({
    meta: [
      { title: "Admin sign in — SRMD Disha" },
      { name: "description", content: "Sign in to the SRMD Disha admin dashboard." },
      { property: "og:title", content: "Admin sign in — SRMD Disha" },
      { property: "og:description", content: "Sign in to the SRMD Disha admin dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"in" | "up" | "reset">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    if (!loading && user) navigate({ to: redirect, replace: true });
  }, [loading, user, redirect, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setErr("");
    setInfo("");
    setBusy(true);
    try {
      if (mode === "in") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else if (mode === "up") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/auth" },
        });
        if (error) throw error;
        setInfo("Check your email to confirm your account, then sign in. An admin must then give you access.");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + "/reset-password",
        });
        if (error) throw error;
        setInfo("If that email has an account, a reset link is on its way.");
      }
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <Logotype />
        </div>
        <Card variant="surface">
          <form onSubmit={submit} className="space-y-4">
            <h1 className="font-display text-heading">
              {mode === "in" ? "Admin sign in" : mode === "up" ? "Create account" : "Reset password"}
            </h1>
            {err && <Alert variant="danger">{err}</Alert>}
            {info && <Alert variant="success">{info}</Alert>}
            <Field htmlFor="email" label="Email" required>
              <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </Field>
            {mode !== "reset" && (
              <Field htmlFor="password" label="Password" required>
                <Input
                  id="password"
                  type="password"
                  minLength={6}
                  autoComplete={mode === "in" ? "current-password" : "new-password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
            )}
            <Button type="submit" fullWidth loading={busy}>
              {mode === "in" ? "Sign in" : mode === "up" ? "Create account" : "Send reset link"}
            </Button>
            <div className="flex flex-wrap justify-between gap-2">
              {mode !== "in" && <Button type="button" variant="link" onClick={() => setMode("in")}>Back to sign in</Button>}
              {mode === "in" && <Button type="button" variant="link" onClick={() => setMode("up")}>Create account</Button>}
              {mode === "in" && <Button type="button" variant="link" onClick={() => setMode("reset")}>Forgot password?</Button>}
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
