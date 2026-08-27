import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { RequireAdmin } from "@/components/RequireAdmin";
import { AdminLayout } from "@/components/AdminLayout";

export const Route = createFileRoute("/programs")({
  head: () => ({ meta: [{ title: "Programs — Outreach Mission Control" }] }),
  component: () => (
    <RequireAdmin>
      <AdminLayout>
        <Programs />
      </AdminLayout>
    </RequireAdmin>
  ),
});

interface Outcome {
  id: string;
  outcome: string;
}
interface Module {
  id: string;
  title: string;
  description: string | null;
  duration_minutes: number | null;
  learning_outcomes: Outcome[];
}
interface Program {
  id: string;
  code: string;
  name: string;
  description: string | null;
  color: string | null;
  program_modules: Module[];
}

function Programs() {
  const { t } = useTranslation();
  const [data, setData] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: rows, error } = await supabase
        .from("programs")
        .select(
          "id, code, name, description, color, program_modules(id, title, description, duration_minutes, sequence, learning_outcomes(id, outcome, sequence))"
        )
        .order("name");
      if (error) console.error(error);
      const sorted = (rows ?? []).map((p: any) => ({
        ...p,
        program_modules: (p.program_modules ?? [])
          .sort((a: any, b: any) => a.sequence - b.sequence)
          .map((m: any) => ({
            ...m,
            learning_outcomes: (m.learning_outcomes ?? []).sort(
              (a: any, b: any) => a.sequence - b.sequence
            ),
          })),
      })) as Program[];
      setData(sorted);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <header>
        <h1 className="font-serif text-3xl md:text-4xl">{t("programs.title")}</h1>
        <p className="mt-1 text-muted-foreground text-sm">{t("programs.subtitle")}</p>
      </header>

      {loading ? (
        <p className="text-muted-foreground text-sm">{t("common.loading")}</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {data.map((p) => (
            <article
              key={p.id}
              className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]"
            >
              <div className="flex items-start gap-3">
                <div
                  className="mt-1 h-10 w-10 rounded-lg shrink-0"
                  style={{ backgroundColor: p.color || "var(--primary)" }}
                />
                <div className="min-w-0">
                  <h2 className="font-serif text-2xl">{p.name}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{p.description}</p>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">
                  {t("programs.modules")} ({p.program_modules.length})
                </h3>
                <ul className="space-y-3">
                  {p.program_modules.map((m) => (
                    <li key={m.id} className="rounded-lg bg-muted/40 p-3">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="font-medium text-foreground">{m.title}</h4>
                        <span className="text-xs text-muted-foreground shrink-0">
                          {m.duration_minutes} min
                        </span>
                      </div>
                      {m.description && (
                        <p className="text-xs text-muted-foreground mt-1">{m.description}</p>
                      )}
                      {m.learning_outcomes.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {m.learning_outcomes.map((o) => (
                            <li key={o.id} className="text-xs text-foreground/80 flex gap-2">
                              <span className="text-accent">●</span>
                              {o.outcome}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
