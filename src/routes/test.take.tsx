import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { OfflineStatus } from "@/components/OfflineStatus";
import {
  RIASEC_ITEMS,
  MI_ITEMS,
  LIKERT_OPTIONS,
  buildReport,
  aptitudeItemsForBand,
  gradeToBand,
  type AptitudeItem,
} from "@/lib/psychometricData";
import { generatePsychometricPDF } from "@/lib/psychometricReport";
import { STREAM_BY_ID } from "@/lib/careerData";
import { recommendStreamsAccurate, rankCareerPaths } from "@/lib/careerMatch";
import { enqueueSubmission } from "@/lib/offlineQueue";
import { flushQueue } from "@/lib/offlineSync";
import { saveReport } from "@/lib/chatbotContext";
import { ChevronLeft, ChevronRight, Download, RefreshCcw } from "lucide-react";

export const Route = createFileRoute("/test/take")({
  head: () => ({
    meta: [
      { title: "Take the Psychometric Test — HBK Careers" },
      { name: "description", content: "Answer the RIASEC + MI + grade-banded aptitude assessment." },
    ],
  }),
  component: TakeTest,
});

interface Meta {
  name: string;
  grade: string;
  age: string;
  language: "en";
  school?: string;
  mobile?: string;
  email?: string;
  parent_email?: string | null;
}

interface PaymentMeta {
  amount: number;
  coupon: string | null;
  utr: string;
  paid_at: string;
}

const PAGE_SIZE = 6;
const DRAFT_KEY = "hbk-test-draft-v1";

interface Draft {
  mobile: string;
  section: 0 | 1 | 2;
  page: number;
  riasec: Record<string, number>;
  mi: Record<string, number>;
  apt: Record<string, number>;
  savedAt: number;
}

function TakeTest() {
  const navigate = useNavigate();
  const [meta, setMeta] = useState<Meta | null>(null);
  const [payment, setPayment] = useState<PaymentMeta | null>(null);
  const [section, setSection] = useState<0 | 1 | 2>(0);
  const [page, setPage] = useState(0);
  const [riasec, setRiasec] = useState<Record<string, number>>({});
  const [mi, setMi] = useState<Record<string, number>>({});
  const [apt, setApt] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);
  const [resumeOffered, setResumeOffered] = useState(false);
  const [resumeDraft, setResumeDraft] = useState<Draft | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("disha-test-meta");
    if (!raw) {
      navigate({ to: "/test" });
      return;
    }
    const pay = sessionStorage.getItem("disha-test-payment");
    if (!pay) {
      navigate({ to: "/test/pay" });
      return;
    }
    const parsed = { ...(JSON.parse(raw) as Meta), language: "en" as const };
    setMeta(parsed);
    setPayment(JSON.parse(pay) as PaymentMeta);

    // Look for an existing draft for this mobile number
    try {
      const draftRaw = localStorage.getItem(DRAFT_KEY);
      if (draftRaw) {
        const d = JSON.parse(draftRaw) as Draft;
        if (d.mobile && parsed.mobile && d.mobile === parsed.mobile) {
          const answered =
            Object.keys(d.riasec || {}).length +
            Object.keys(d.mi || {}).length +
            Object.keys(d.apt || {}).length;
          if (answered > 0) {
            setResumeDraft(d);
            setResumeOffered(true);
          }
        }
      }
    } catch { /* ignore */ }
  }, [navigate]);

  // Autosave draft on every answer change (debounced via microtask)
  useEffect(() => {
    if (!meta?.mobile) return;
    if (resumeOffered) return; // don't overwrite while user is deciding
    const total = Object.keys(riasec).length + Object.keys(mi).length + Object.keys(apt).length;
    if (total === 0) return;
    try {
      const draft: Draft = {
        mobile: meta.mobile,
        section,
        page,
        riasec,
        mi,
        apt,
        savedAt: Date.now(),
      };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch { /* ignore quota */ }
  }, [meta?.mobile, section, page, riasec, mi, apt, resumeOffered]);


  const band = useMemo(() => gradeToBand(meta?.grade), [meta?.grade]);
  const aptItems = useMemo<AptitudeItem[]>(() => aptitudeItemsForBand(band), [band]);

  const sections = useMemo(
    () => [
      { id: 0, title: "Part 1: Interests (RIASEC)", items: RIASEC_ITEMS, type: "likert" as const, answers: riasec, set: setRiasec },
      { id: 1, title: "Part 2: Multiple Intelligences", items: MI_ITEMS, type: "likert" as const, answers: mi, set: setMi },
      { id: 2, title: `Part 3: Aptitude (Grade ${band})`, items: aptItems, type: "mcq" as const, answers: apt, set: setApt },
    ],
    [riasec, mi, apt, aptItems, band],
  );

  const current = sections[section];
  const totalItems = current.items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const pageItems = current.items.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const overallProgress = useMemo(() => {
    const totals = [RIASEC_ITEMS.length, MI_ITEMS.length, aptItems.length];
    const answered = [Object.keys(riasec).length, Object.keys(mi).length, Object.keys(apt).length];
    const total = totals.reduce((a, b) => a + b, 0);
    const sum = answered.reduce((a, b) => a + b, 0);
    return total ? Math.round((sum / total) * 100) : 0;
  }, [riasec, mi, apt, aptItems]);

  const allAnswered = pageItems.every((it) => current.answers[it.id] !== undefined);

  const next = () => {
    if (page + 1 < totalPages) setPage(page + 1);
    else if (section < 2) {
      setSection((section + 1) as 0 | 1 | 2);
      setPage(0);
    } else {
      try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
      setDone(true);
    }
  };

  const acceptResume = () => {
    if (!resumeDraft) return;
    setRiasec(resumeDraft.riasec || {});
    setMi(resumeDraft.mi || {});
    setApt(resumeDraft.apt || {});
    setSection(resumeDraft.section ?? 0);
    setPage(resumeDraft.page ?? 0);
    setResumeOffered(false);
    setResumeDraft(null);
  };

  const declineResume = () => {
    try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
    setResumeOffered(false);
    setResumeDraft(null);
  };

  const prev = () => {
    if (page > 0) setPage(page - 1);
    else if (section > 0) {
      const prevS = (section - 1) as 0 | 1 | 2;
      const prevTotal = Math.max(1, Math.ceil(sections[prevS].items.length / PAGE_SIZE));
      setSection(prevS);
      setPage(prevTotal - 1);
    }
  };

  if (!meta || !payment) return null;

  if (done) {
    return <Result meta={meta} payment={payment} aptItems={aptItems} riasec={riasec} mi={mi} apt={apt} />;
  }

  return (
    <PublicLayout>
      <section className="max-w-3xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{current.title}</span>
          <div className="flex items-center gap-3">
            <OfflineStatus lang="en" />
            <span>Progress: {overallProgress}%</span>
          </div>
        </div>
        <div className="mt-2 h-2 rounded-full bg-secondary overflow-hidden">
          <div className="h-full bg-primary transition-all" style={{ width: `${overallProgress}%` }} />
        </div>

        <h1 className="mt-6 font-serif text-2xl md:text-3xl">{current.title}</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Page {page + 1} / {totalPages}
        </p>


        {resumeOffered && resumeDraft && (
          <div className="mt-5 rounded-xl border border-accent/40 bg-accent/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-sm">
              <div className="font-medium text-foreground">Resume your earlier attempt?</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                We saved {Object.keys(resumeDraft.riasec).length + Object.keys(resumeDraft.mi).length + Object.keys(resumeDraft.apt).length} answers from {new Date(resumeDraft.savedAt).toLocaleString()}.
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={acceptResume} className="text-xs px-3 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90">Resume</button>
              <button onClick={declineResume} className="text-xs px-3 py-2 rounded-md border border-border bg-card hover:bg-muted">Start fresh</button>
            </div>
          </div>
        )}

        <div className="mt-6 space-y-6">
          {pageItems.map((item, idx) => (
            <div key={item.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start gap-3">
                <span className="text-xs text-muted-foreground mt-0.5 shrink-0">
                  {page * PAGE_SIZE + idx + 1}.
                </span>
                <div className="flex-1">
                  <p className="text-sm md:text-base text-foreground">{item.text.en}</p>

                  {current.type === "likert" ? (
                    <div className="mt-4 grid grid-cols-5 gap-1.5">
                      {LIKERT_OPTIONS.map((o) => {
                        const active = current.answers[item.id] === o.value;
                        return (
                          <button
                            key={o.value}
                            onClick={() => current.set({ ...current.answers, [item.id]: o.value })}
                            className={`text-[10px] md:text-xs px-2 py-2 rounded-md border transition-colors ${
                              active
                                ? "bg-primary text-primary-foreground border-primary"
                                : "border-border bg-background hover:bg-muted"
                            }`}
                          >
                            {o.label.en}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="mt-4 grid gap-2">
                      {(item as AptitudeItem).options.map((o, i) => {
                        const active = current.answers[item.id] === i;
                        return (
                          <button
                            key={i}
                            onClick={() => current.set({ ...current.answers, [item.id]: i })}
                            className={`text-left text-sm px-3 py-2 rounded-md border transition-colors ${
                              active
                                ? "bg-primary text-primary-foreground border-primary"
                                : "border-border bg-background hover:bg-muted"
                            }`}
                          >
                            {String.fromCharCode(65 + i)}. {o.en}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={prev}
            disabled={section === 0 && page === 0}
            className="inline-flex items-center gap-1 text-sm px-4 py-2 rounded-md border border-border bg-card hover:bg-muted disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
          <button
            onClick={next}
            disabled={!allAnswered}
            className="inline-flex items-center gap-1 text-sm px-5 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40"
          >
            {section === 2 && page + 1 === totalPages ? "Finish" : "Next"} <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </PublicLayout>
  );
}

function Result({
  meta,
  payment,
  aptItems,
  riasec,
  mi,
  apt,
}: {
  meta: Meta;
  payment: PaymentMeta;
  aptItems: AptitudeItem[];
  riasec: Record<string, number>;
  mi: Record<string, number>;
  apt: Record<string, number>;
}) {
  const [downloading, setDownloading] = useState(false);
  const band = useMemo(() => gradeToBand(meta.grade), [meta.grade]);
  const report = useMemo(() => buildReport(riasec, mi, apt, aptItems, band), [riasec, mi, apt, aptItems, band]);
  const recs = useMemo(() => recommendStreamsAccurate(report, 2), [report]);
  const careerRecs = useMemo(() => rankCareerPaths(report, recs, 8), [report, recs]);
  const [reportToken, setReportToken] = useState<string>("");

  useEffect(() => {
    const recStreamNames = recs.map((sid) => STREAM_BY_ID[sid]?.name ?? sid);
    const recCareerTitles = careerRecs.map((c) => `${c.path.title} (${c.fit}%)`);
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    // Short, URL-friendly share token. Independent from row id so a leaked id
    // doesn't expose the report — the token is what unlocks /r/$token.
    const token = `${id.replace(/-/g, "").slice(0, 10)}${Math.random()
      .toString(36)
      .slice(2, 6)}`;
    setReportToken(token);
    let deviceId = "";
    try {
      deviceId = localStorage.getItem("hbk-device-id") || "";
      if (!deviceId) {
        deviceId =
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : `dev-${Date.now()}`;
        localStorage.setItem("hbk-device-id", deviceId);
      }
    } catch {
      /* ignore */
    }
    enqueueSubmission({
      id,
      createdAt: Date.now(),
      attempts: 0,
      payload: {
        id,
        student_name: meta.name,
        grade: meta.grade,
        age: meta.age ? Number(meta.age) : null,
        language: "en",
        grade_band: band,
        school_name: meta.school ?? null,
        mobile: meta.mobile ?? null,
        email: meta.email ?? null,
        parent_email: meta.parent_email ?? null,
        report_token: token,
        riasec: report.riasec,
        riasec_top: report.riasecTop,
        multiple_intelligences: report.mi,
        mi_top: report.miTop,
        aptitude: report.aptitude,
        aptitude_top: report.aptitudeTop,
        recommended_streams: recStreamNames,
        recommended_careers: recCareerTitles,
        taken_at: new Date().toISOString(),
        device_id: deviceId,
        app_version: "1.2",
        payment_amount: payment.amount,
        payment_coupon: payment.coupon,
        payment_utr: payment.utr,
        paid_at: payment.paid_at,
      },
    })
      .then(() => flushQueue().catch(() => null))
      .catch(() => null);
    saveReport({
      name: meta.name,
      grade: meta.grade,
      age: meta.age,
      language: "en",
      riasecTop: report.riasecTop,
      riasec: report.riasec,
      miTop: report.miTop,
      mi: report.mi,
      aptitudeTop: report.aptitudeTop,
      aptitude: report.aptitude,
      recommendedStreams: recStreamNames,
      recommendedCareers: recCareerTitles,
      takenAt: new Date().toISOString(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const download = async () => {
    setDownloading(true);
    const doc = generatePsychometricPDF({
      name: meta.name,
      grade: meta.grade,
      age: meta.age,
      language: "en",
      report,
      riasecAnswers: riasec,
      miAnswers: mi,
      aptAnswers: apt,
    });
    doc.save(`HBK-Careers-Report-${meta.name.replace(/\s+/g, "-")}.pdf`);
    setDownloading(false);
  };

  return (
    <PublicLayout>
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-10">
        <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-accent/10 p-6 md:p-8">
          <div className="text-xs text-muted-foreground">Complete ✓</div>
          <h1 className="font-serif text-3xl md:text-4xl mt-1">Your direction is ready</h1>
          <p className="text-sm text-muted-foreground mt-2">
            {meta.name} · Grade {meta.grade || "—"} · Band {band}
          </p>
          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            <Stat label="RIASEC code" value={report.riasecTop.join("-")} />
            <Stat label="Top intelligence" value={report.miTop[0] ?? "—"} />
            <Stat label="Aptitude" value={`${report.aptitudeOverall}%`} />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={download}
              disabled={downloading}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-60"
            >
              <Download className="h-4 w-4" />
              {downloading ? "Generating…" : "Download 20-page PDF report"}
            </button>
            <Link
              to="/test"
              className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2.5 rounded-md text-sm hover:bg-muted"
            >
              <RefreshCcw className="h-4 w-4" /> Retake
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-serif text-xl">Recommended streams for you</h2>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            {recs.map((sid, i) => {
              const s = STREAM_BY_ID[sid];
              return (
                <Link
                  key={sid}
                  to="/career/$stream"
                  params={{ stream: sid }}
                  className="rounded-xl border border-border bg-card p-5 hover:shadow-[var(--shadow-card)]"
                >
                  <div className="text-xs text-muted-foreground">{i === 0 ? "Primary" : "Secondary"}</div>
                  <div className="text-3xl mt-2">{s.emoji}</div>
                  <div className="font-serif text-lg mt-2">{s.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.tagline}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-card border border-border p-4">
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 font-serif text-xl text-foreground">{value}</div>
    </div>
  );
}
