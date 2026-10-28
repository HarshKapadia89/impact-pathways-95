import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Alert, Button, Card, Field, Input } from "@/design-system/hbk-career-brand-guidelines-4f1c39";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Set a new password — HBK Careers" },
      { name: "description", content: "Choose a new password for your HBK Careers account." },
      { property: "og:title", content: "Set a new password — HBK Careers" },
      { property: "og:description", content: "Choose a new password for your HBK Careers account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPage,
});

function ResetPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) return setErr(error.message);
    navigate({ to: "/admin" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card variant="surface">
        <form onSubmit={submit} className="space-y-4">
          <h1 className="font-display text-heading">Set a new password</h1>
          {err && <Alert variant="danger">{err}</Alert>}
          <Field htmlFor="pw" label="New password" required>
            <Input id="pw" type="password" minLength={6} required value={password} onChange={(e) => setPassword(e.target.value)} />
          </Field>
          <Button type="submit" loading={busy} fullWidth>Save password</Button>
        </form>
      </Card>
    </div>
  );
}
