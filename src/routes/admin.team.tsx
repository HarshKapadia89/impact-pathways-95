import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AdminLayout } from "@/components/AdminLayout";
import { RequireAdmin } from "@/components/RequireAdmin";
import { adminGrant, adminListTeam, adminRevoke } from "@/lib/admin.functions";
import { Alert, Button, Card, Field, Input } from "@/design-system/hbk-career-brand-guidelines-4f1c39";

export const Route = createFileRoute("/admin/team")({
  head: () => ({ meta: [{ title: "Admin team — HBK Careers admin" }, { name: "robots", content: "noindex" }] }),
  component: () => (
    <RequireAdmin>
      <AdminLayout>
        <Team />
      </AdminLayout>
    </RequireAdmin>
  ),
});

function Team() {
  const list = useServerFn(adminListTeam);
  const grant = useServerFn(adminGrant);
  const revoke = useServerFn(adminRevoke);
  const [data, setData] = useState<{ me: string; admins: { user_id: string; email: string | null; since: string }[] } | null>(null);
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<{ v: "success" | "danger"; t: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => list().then(setData).catch((e) => setMsg({ v: "danger", t: String(e?.message ?? e) })), [list]);
  useEffect(() => {
    void load();
  }, [load]);

  const add = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const r = await grant({ data: { email } });
      setMsg({ v: r.ok ? "success" : "danger", t: r.message });
      if (r.ok) setEmail("");
      await load();
    } catch (e2: any) {
      setMsg({ v: "danger", t: e2?.message ?? "Failed" });
    }
    setBusy(false);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-display text-title">Admin team</h1>
      {msg && <Alert variant={msg.v}>{msg.t}</Alert>}
      <Card variant="surface">
        <form onSubmit={add} className="space-y-3">
          <Field htmlFor="email" label="Give admin access to" hint="They must first create an account at /auth.">
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          <Button type="submit" loading={busy}>Add admin</Button>
        </form>
      </Card>
      <div className="space-y-2">
        {(data?.admins ?? []).map((a) => (
          <Card key={a.user_id}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-subheading">{a.email ?? a.user_id}</div>
                <div className="text-caption text-muted-foreground">Admin since {new Date(a.since).toLocaleDateString()}</div>
              </div>
              {a.user_id !== data?.me && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    if (!confirm(`Remove admin access for ${a.email}?`)) return;
                    try {
                      await revoke({ data: { userId: a.user_id } });
                      await load();
                    } catch (e: any) {
                      setMsg({ v: "danger", t: e?.message ?? "Failed" });
                    }
                  }}
                >
                  Remove
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
