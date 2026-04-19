import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { LanguageToggle } from "@/components/LanguageToggle";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Outreach Mission Control" },
      { name: "description", content: "Admin and team sign-in for the outreach program." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { t } = useTranslation();
  const { signIn, signUp, user, roles, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);

  if (user) {
    const dest = isAdmin || roles.length === 0 ? "/" : roles.includes("teacher") ? "/teacher" : "/";
    navigate({ to: dest });
    return null;
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await signIn(email, password);
        if (error) throw error;
        toast.success("Signed in");
        // Redirect handled by the effect above on next render
      } else {
        if (password.length < 6) throw new Error("Password must be at least 6 characters.");
        const { error } = await signUp(email, password, fullName || email.split("@")[0]);
        if (error) throw error;
        toast.success("Account created. You can sign in now.");
        setMode("signin");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex justify-end p-4">
        <LanguageToggle />
      </div>
      <div className="flex-1 flex items-center justify-center px-4 pb-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-primary mb-4">
              <Sparkles className="h-3 w-3" />
              {t("app.tagline")}
            </div>
            <h1 className="font-serif text-4xl text-foreground">{t("app.name")}</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {mode === "signin" ? t("auth.welcome") : t("auth.getStarted")}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <form onSubmit={onSubmit} className="space-y-4">
              {mode === "signup" && (
                <div className="space-y-1.5">
                  <Label htmlFor="fullName">{t("auth.fullName")}</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="email">{t("auth.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">{t("auth.password")}</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              <Button type="submit" className="w-full" disabled={busy}>
                {busy
                  ? mode === "signin"
                    ? t("auth.signingIn")
                    : t("auth.creating")
                  : mode === "signin"
                    ? t("auth.signIn")
                    : t("auth.signUp")}
              </Button>

              {mode === "signup" && (
                <p className="text-xs text-muted-foreground text-center">
                  {t("auth.firstUserNote")}
                </p>
              )}
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {mode === "signin" ? t("auth.noAccount") : t("auth.haveAccount")}{" "}
              <button
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                className="text-primary font-medium hover:underline"
              >
                {mode === "signin" ? t("auth.signUp") : t("auth.signIn")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
