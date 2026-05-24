import { Sparkles, AlertTriangle, ShieldCheck, Loader2 } from "lucide-react";
import type { AIInterpretation } from "@/lib/aiInterpretation";
import { STREAM_BY_ID } from "@/lib/careerData";

interface Props {
  state: "loading" | "ready" | "error";
  interpretation?: AIInterpretation;
  model?: string;
  error?: string;
  onRetry?: () => void;
}

export function AIInterpretationPanel({ state, interpretation, model, error, onRetry }: Props) {
  if (state === "loading") {
    return (
      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span>
            HBK AI counsellor is reviewing your answers with our most accurate reasoning model
            (this takes ~15–25 seconds)…
          </span>
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="mt-8 rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-medium text-foreground">AI review couldn't complete</div>
            <p className="text-sm text-muted-foreground mt-1">
              {error ?? "Please try again. Your deterministic scores above are unaffected."}
            </p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="mt-3 text-xs px-3 py-1.5 rounded-md border border-border bg-card hover:bg-muted"
              >
                Retry AI review
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!interpretation) return null;

  const verdict = interpretation.consistencyVerdict;
  const verdictColor =
    verdict === "high"
      ? "border-emerald-500/40 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400"
      : verdict === "medium"
        ? "border-amber-500/40 bg-amber-500/5 text-amber-700 dark:text-amber-400"
        : "border-destructive/40 bg-destructive/5 text-destructive";

  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>AI counsellor review</span>
          {model && <span className="ml-auto font-mono text-[10px] opacity-60">{model}</span>}
        </div>
        <h2 className="font-serif text-2xl mt-2">What your scores actually mean</h2>

        <div className={`mt-4 rounded-xl border p-4 text-sm ${verdictColor}`}>
          <div className="flex items-center gap-2 font-medium">
            <ShieldCheck className="h-4 w-4" />
            Consistency: {verdict.toUpperCase()}
          </div>
          <p className="mt-1 text-foreground/80">{interpretation.consistencyExplanation}</p>
        </div>

        {interpretation.redFlags.length > 0 && (
          <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
            <div className="text-xs font-medium text-amber-700 dark:text-amber-400 flex items-center gap-2">
              <AlertTriangle className="h-3.5 w-3.5" /> Things to be aware of
            </div>
            <ul className="mt-2 text-sm text-foreground/80 list-disc pl-5 space-y-1">
              {interpretation.redFlags.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>
        )}
      </div>

      <Section title="Your interest profile (RIASEC)">
        <Prose text={interpretation.riasecNarrative} />
      </Section>

      <Section title="How you learn best (Multiple Intelligences)">
        <Prose text={interpretation.miNarrative} />
      </Section>

      <Section title="Your aptitude strengths">
        <Prose text={interpretation.aptitudeNarrative} />
      </Section>

      {interpretation.recommendedStreams.length > 0 && (
        <Section title="Streams that fit you — and why">
          <div className="grid sm:grid-cols-2 gap-3">
            {interpretation.recommendedStreams.map((s) => {
              const stream = STREAM_BY_ID[s.slug];
              return (
                <div key={s.slug} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{stream?.emoji ?? "🎯"}</span>
                    <div className="font-serif text-base">{stream?.name ?? s.slug}</div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{s.fitRationale}</p>
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {interpretation.recommendedCareers.length > 0 && (
        <Section title="Careers worth exploring">
          <div className="space-y-3">
            {interpretation.recommendedCareers.map((c, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4">
                <div className="font-serif text-base">{c.name}</div>
                <p className="text-sm text-foreground/80 mt-1.5">{c.fitRationale}</p>
                {c.watchOuts && (
                  <p className="text-xs text-muted-foreground mt-2">
                    <span className="font-medium">Watch-outs:</span> {c.watchOuts}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <Section title="Next 90 days — what to work on">
          <ul className="text-sm text-foreground/80 list-disc pl-5 space-y-1.5">
            {interpretation.developmentSuggestions.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </Section>
        <Section title="For your parent / counsellor">
          <ul className="text-sm text-foreground/80 list-disc pl-5 space-y-1.5">
            {interpretation.parentTalkingPoints.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
      <h3 className="font-serif text-lg mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Prose({ text }: { text: string }) {
  return (
    <div className="text-sm text-foreground/80 space-y-2 leading-relaxed">
      {text.split(/\n\n+/).map((p, i) => <p key={i}>{p}</p>)}
    </div>
  );
}
