import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { supabase } from "@/integrations/supabase/client";
import { STREAM_BY_ID, type StreamId } from "@/lib/careerData";
import { generatePsychometricPDF } from "@/lib/psychometricReport";
import { buildParentSummary } from "@/lib/parentSummary";
import { rankCareerPaths, recommendStreamsAccurate } from "@/lib/careerMatch";
import type { ScoreReport } from "@/lib/psychometricData";
import {
  Download,
  Share2,
  Sparkles,
  Brain,
  Target,
  Users,
  TrendingUp,
  CheckCircle2,
  Compass,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/r/$token")({
  head: ({ params }) => ({
    meta: [
      { title: `HBK Careers Report — ${params.token.slice(0, 6)}` },
      {
        name: "description",
        content:
          "A personalised RIASEC + Multiple Intelligences + Aptitude career report from HBK Careers.",
      },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: WebReportPage,
});

interface SubmissionRow {
  id: string;
  student_name: string | null;
  grade: string | null;
  age: number | null;
  grade_band: string | null;
  school_name: string | null;
  riasec: Record<string, number> | null;
  multiple_intelligences: Record<string, number> | null;
  aptitude: Record<string, number> | null;
  riasec_top: string[] | null;
  mi_top: string[] | null;
  aptitude_top: string[] | null;
  recommended_streams: string[] | null;
  recommended_careers: string[] | null;
  taken_at: string | null;
  report_token: string | null;
}

function WebReportPage() {
  const { token } = Route.useParams();
  const [row, setRow] = useState<SubmissionRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundFlag, setNotFoundFlag] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("psychometric_submissions")
        .select(
          "id,student_name,grade,age,grade_band,school_name,riasec,multiple_intelligences,aptitude,riasec_top,mi_top,aptitude_top,recommended_streams,recommended_careers,taken_at,report_token",
        )
        .eq("report_token", token)
        .maybeSingle();
      if (cancelled) return;
      if (error || !data) {
        setNotFoundFlag(true);
      } else {
        setRow(data as SubmissionRow);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const report: ScoreReport | null = useMemo(() => {
    if (!row) return null;
    const aptitudeRaw = (row.aptitude ?? {}) as Record<string, number>;
    const aptitude: Record<string, { correct: number; total: number; pct: number }> = {};
    let aptSum = 0;
    let aptCount = 0;
    Object.entries(aptitudeRaw).forEach(([k, v]) => {
      const pct = typeof v === "number" ? v : 0;
      aptitude[k] = { correct: 0, total: 0, pct };
      aptSum += pct;
      aptCount++;
    });
    return {
      riasec: (row.riasec ?? {}) as Record<string, number>,
      mi: (row.multiple_intelligences ?? {}) as Record<string, number>,
      aptitude,
      riasecTop: (row.riasec_top ?? []) as string[],
      miTop: (row.mi_top ?? []) as string[],
      aptitudeTop: (row.aptitude_top ?? []) as string[],
      aptitudeOverall: aptCount > 0 ? Math.round(aptSum / aptCount) : 0,
    } satisfies ScoreReport;
  }, [row]);

  const recs = useMemo<StreamId[]>(() => {
    if (!report) return [];
    return recommendStreamsAccurate(report, 2);
  }, [report]);

  const careers = useMemo(() => {
    if (!report || recs.length === 0) return [];
    return rankCareerPaths(report, recs, 6);
  }, [report, recs]);

  const parentSummary = useMemo(() => {
    if (!row || !report) return null;
    return buildParentSummary({
      studentName: row.student_name ?? "Your child",
      grade: row.grade ?? "",
      report,
      topStreamIds: recs,
      topCareers: careers,
    });
  }, [row, report, recs, careers]);

  if (loading) {
    return (
      <PublicLayout>
        <section className="max-w-3xl mx-auto px-4 py-20 text-center text-muted-foreground">
          Loading report…
        </section>
      </PublicLayout>
    );
  }

  if (notFoundFlag || !row || !report) {
    return (
      <PublicLayout>
        <section className="max-w-2xl mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-3xl">Report not found</h1>
          <p className="text-sm text-muted-foreground mt-3">
            This shareable link is invalid or has expired. If you took the test
            and lost your link, please contact your counsellor at HBK.
          </p>
          <Link
            to="/test"
            className="inline-flex mt-6 items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm"
          >
            Take the test
          </Link>
        </section>
      </PublicLayout>
    );
  }

  const studentName = row.student_name || "Student";
  const firstName = studentName.split(" ")[0];
  const topStream = recs[0] ? STREAM_BY_ID[recs[0]] : undefined;
  const altStream = recs[1] ? STREAM_BY_ID[recs[1]] : undefined;

  const download = async () => {
    setDownloading(true);
    try {
      const doc = generatePsychometricPDF({
        name: studentName,
        grade: row.grade ?? "",
        age: row.age ? String(row.age) : "",
        language: "en",
        report,
        // We don't have raw answers from the row; pass empty maps.
        riasecAnswers: {},
        miAnswers: {},
        aptAnswers: {},
      });
      doc.save(`HBK-Careers-Report-${studentName.replace(/\s+/g, "-")}.pdf`);
    } finally {
      setDownloading(false);
    }
  };

  const share = async () => {
    const url = window.location.href;
    const text = `${studentName}'s HBK Careers report — ${url}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "HBK Careers Report", text, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied");
      }
    } catch {
      /* cancelled */
    }
  };

  const whatsapp = () => {
    const url = window.location.href;
    const msg = `Sharing ${studentName}'s personalised HBK Careers report: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <PublicLayout>
      <article className="max-w-4xl mx-auto px-4 md:px-8 py-10">
        {/* Hero */}
        <header className="rounded-3xl bg-gradient-to-br from-primary/15 via-accent/10 to-primary/5 p-6 md:p-10 border border-border">
          <div className="inline-flex items-center gap-1.5 bg-card/70 backdrop-blur px-3 py-1 rounded-full text-[11px] uppercase tracking-widest text-primary border border-border">
            <Sparkles className="h-3 w-3" /> HBK Careers · Personalised Report
          </div>
          <h1 className="mt-4 font-serif text-3xl md:text-5xl text-foreground">
            {studentName}'s direction
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Grade {row.grade || "—"}
            {row.school_name ? ` · ${row.school_name}` : ""} · taken{" "}
            {row.taken_at ? new Date(row.taken_at).toLocaleDateString() : "—"}
          </p>

          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            <HeroStat
              icon={<Compass className="h-4 w-4" />}
              label="Holland code"
              value={report.riasecTop.join("-") || "—"}
            />
            <HeroStat
              icon={<Brain className="h-4 w-4" />}
              label="Top intelligence"
              value={report.miTop[0] ?? "—"}
            />
            <HeroStat
              icon={<TrendingUp className="h-4 w-4" />}
              label="Aptitude"
              value={`${report.aptitudeOverall}%`}
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={download}
              disabled={downloading}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-60"
            >
              <Download className="h-4 w-4" />
              {downloading ? "Generating…" : "Download PDF"}
            </button>
            <button
              onClick={whatsapp}
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-md text-sm font-medium hover:opacity-90"
            >
              <Share2 className="h-4 w-4" /> Share on WhatsApp
            </button>
            <button
              onClick={share}
              className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2.5 rounded-md text-sm hover:bg-muted"
            >
              Copy / Share link
            </button>
          </div>
        </header>

        {/* Parent Summary */}
        {parentSummary && (
          <section className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent">
              <Users className="h-3.5 w-3.5" /> For Parents — 2-minute summary
            </div>
            <h2 className="mt-2 font-serif text-2xl">
              What this means for {firstName}
            </h2>
            <p className="text-sm text-foreground/90 mt-4 leading-relaxed">
              {parentSummary.whoTheyAre}
            </p>
            <p className="text-sm text-foreground/90 mt-3 leading-relaxed">
              {parentSummary.direction.replace(/\*\*/g, "")}
            </p>
            <div className="mt-5 grid sm:grid-cols-3 gap-3">
              {parentSummary.nextSteps.map((step, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-background border border-border p-4 text-sm"
                >
                  <div className="flex items-center gap-2 text-primary text-xs font-semibold">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Step {i + 1}
                  </div>
                  <p className="mt-2 text-foreground/85 text-[13px] leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-5 italic">
              {parentSummary.closing}
            </p>
          </section>
        )}

        {/* Recommended streams */}
        {topStream && (
          <section className="mt-8">
            <h2 className="font-serif text-2xl">Recommended streams</h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              {[topStream, altStream].filter(Boolean).map((s, i) => (
                <Link
                  key={s!.id}
                  to="/career/$stream"
                  params={{ stream: s!.id }}
                  className="rounded-xl border border-border bg-card p-5 hover:shadow-[var(--shadow-card)] transition-shadow"
                >
                  <div className="text-xs text-muted-foreground">
                    {i === 0 ? "Primary fit" : "Secondary fit"}
                  </div>
                  <div className="text-3xl mt-2">{s!.emoji}</div>
                  <div className="font-serif text-lg mt-2">{s!.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s!.tagline}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Top career paths */}
        {careers.length > 0 && (
          <section className="mt-8">
            <h2 className="font-serif text-2xl flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" /> Top career matches
            </h2>
            <div className="mt-4 space-y-3">
              {careers.map((c, i) => (
                <div
                  key={`${c.path.title}-${i}`}
                  className="rounded-xl border border-border bg-card p-4 md:p-5 flex items-start gap-4"
                >
                  <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-serif text-lg">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2 flex-wrap">
                      <div className="font-serif text-base md:text-lg">
                        {c.path.title}
                      </div>
                      <div className="text-xs text-accent font-semibold">
                        {c.fit}% fit
                      </div>
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      {c.path.duration} · {c.path.eligibility}
                    </div>
                    <p className="text-xs text-foreground/80 mt-2 line-clamp-2">
                      {c.path.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Score breakdowns */}
        <section className="mt-8 grid md:grid-cols-2 gap-4">
          <ScoreCard title="Interests (RIASEC)" scores={report.riasec} />
          <ScoreCard title="Multiple Intelligences" scores={report.mi} />
        </section>

        <footer className="mt-10 pt-6 border-t border-border text-xs text-muted-foreground">
          This report is guidance — not a verdict. Re-take in 6 months as you
          grow. © The H B Kapadia New High School, Ahmedabad.
        </footer>
      </article>
    </PublicLayout>
  );
}

function HeroStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-card/70 backdrop-blur border border-border p-4">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
        {icon} {label}
      </div>
      <div className="mt-1.5 font-serif text-2xl text-foreground">{value}</div>
    </div>
  );
}

function ScoreCard({
  title,
  scores,
}: {
  title: string;
  scores: Record<string, number>;
}) {
  const entries = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const max = Math.max(1, ...entries.map(([, v]) => v));
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="font-serif text-base">{title}</div>
      <div className="mt-3 space-y-2">
        {entries.map(([k, v]) => {
          const pct = Math.max(4, Math.round((v / max) * 100));
          return (
            <div key={k}>
              <div className="flex justify-between text-xs">
                <span className="text-foreground/80">{k}</span>
                <span className="text-muted-foreground">{Math.round(v)}</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Silence unused import warnings (kept for potential future use).
void notFound;
