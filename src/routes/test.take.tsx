import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import {
  RIASEC_ITEMS,
  MI_ITEMS,
  APTITUDE_ITEMS,
  LIKERT_OPTIONS,
  buildReport,
  type Lang,
} from "@/lib/psychometricData";
import { generatePsychometricPDF } from "@/lib/psychometricReport";
import { recommendStreams, STREAM_BY_ID } from "@/lib/careerData";
import { supabase } from "@/integrations/supabase/client";
import { saveReport } from "@/lib/chatbotContext";
import { ChevronLeft, ChevronRight, Download, RefreshCcw } from "lucide-react";

export const Route = createFileRoute("/test/take")({
  head: () => ({
    meta: [
      { title: "Take the Psychometric Test — HBK Careers" },
      { name: "description", content: "Answer the bilingual RIASEC + MI + Aptitude test." },
    ],
  }),
  component: TakeTest,
});

interface Meta {
  name: string;
  grade: string;
  age: string;
  language: Lang;
}

const PAGE_SIZE = 6;

function TakeTest() {
  const navigate = useNavigate();
  const [meta, setMeta] = useState<Meta | null>(null);
  const [section, setSection] = useState<0 | 1 | 2>(0); // 0=RIASEC, 1=MI, 2=Aptitude
  const [page, setPage] = useState(0);
  const [riasec, setRiasec] = useState<Record<string, number>>({});
  const [mi, setMi] = useState<Record<string, number>>({});
  const [apt, setApt] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("disha-test-meta");
    if (!raw) {
      navigate({ to: "/test" });
      return;
    }
    setMeta(JSON.parse(raw));
  }, [navigate]);

  const lang: Lang = meta?.language ?? "en";

  const sections = useMemo(
    () => [
      { id: 0, title: lang === "gu" ? "ભાગ 1: રુચિઓ (RIASEC)" : "Part 1: Interests (RIASEC)", items: RIASEC_ITEMS, type: "likert" as const, answers: riasec, set: setRiasec },
      { id: 1, title: lang === "gu" ? "ભાગ 2: બહુવિધ બુદ્ધિ" : "Part 2: Multiple Intelligences", items: MI_ITEMS, type: "likert" as const, answers: mi, set: setMi },
      { id: 2, title: lang === "gu" ? "ભાગ 3: યોગ્યતા" : "Part 3: Aptitude", items: APTITUDE_ITEMS, type: "mcq" as const, answers: apt, set: setApt },
    ],
    [lang, riasec, mi, apt]
  );

  const current = sections[section];
  const totalItems = current.items.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  const pageItems = current.items.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const overallProgress = useMemo(() => {
    const totals = [RIASEC_ITEMS.length, MI_ITEMS.length, APTITUDE_ITEMS.length];
    const answered = [Object.keys(riasec).length, Object.keys(mi).length, Object.keys(apt).length];
    const total = totals.reduce((a, b) => a + b, 0);
    const sum = answered.reduce((a, b) => a + b, 0);
    return Math.round((sum / total) * 100);
  }, [riasec, mi, apt]);

  const allAnswered = pageItems.every((it) => current.answers[it.id] !== undefined);
  const next = () => {
    if (page + 1 < totalPages) setPage(page + 1);
    else if (section < 2) {
      setSection((section + 1) as 0 | 1 | 2);
      setPage(0);
    } else {
      setDone(true);
    }
  };
  const prev = () => {
    if (page > 0) setPage(page - 1);
    else if (section > 0) {
      const prevS = (section - 1) as 0 | 1 | 2;
      const prevTotal = Math.ceil(sections[prevS].items.length / PAGE_SIZE);
      setSection(prevS);
      setPage(prevTotal - 1);
    }
  };

  if (!meta) return null;

  if (done) {
    return <Result meta={meta} riasec={riasec} mi={mi} apt={apt} />;
  }

  return (
    <PublicLayout>
      <section className="max-w-3xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{current.title}</span>
          <span>
            {lang === "gu" ? "પ્રગતિ" : "Progress"}: {overallProgress}%
          </span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${overallProgress}%` }}
          />
        </div>

        <h1 className="mt-6 font-serif text-2xl md:text-3xl">{current.title}</h1>
        <p className="text-xs text-muted-foreground mt-1">
          {lang === "gu" ? "પૃષ્ઠ" : "Page"} {page + 1} / {totalPages}
        </p>

        <div className="mt-6 space-y-6">
          {pageItems.map((item, idx) => (
            <div key={item.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start gap-3">
                <span className="text-xs text-muted-foreground mt-0.5 shrink-0">
                  {page * PAGE_SIZE + idx + 1}.
                </span>
                <div className="flex-1">
                  <p className="text-sm md:text-base text-foreground">{item.text[lang]}</p>

                  {current.type === "likert" ? (
                    <div className="mt-4 grid grid-cols-5 gap-1.5">
                      {LIKERT_OPTIONS.map((o) => {
                        const active = current.answers[item.id] === o.value;
                        return (
                          <button
                            key={o.value}
                            onClick={() =>
                              current.set({ ...current.answers, [item.id]: o.value })
                            }
                            className={`text-[10px] md:text-xs px-2 py-2 rounded-md border transition-colors ${
                              active
                                ? "bg-primary text-primary-foreground border-primary"
                                : "border-border bg-background hover:bg-muted"
                            }`}
                          >
                            {o.label[lang]}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="mt-4 grid gap-2">
                      {(item as (typeof APTITUDE_ITEMS)[number]).options.map((o, i) => {
                        const active = current.answers[item.id] === i;
                        return (
                          <button
                            key={i}
                            onClick={() =>
                              current.set({ ...current.answers, [item.id]: i })
                            }
                            className={`text-left text-sm px-3 py-2 rounded-md border transition-colors ${
                              active
                                ? "bg-primary text-primary-foreground border-primary"
                                : "border-border bg-background hover:bg-muted"
                            }`}
                          >
                            {String.fromCharCode(65 + i)}. {o[lang]}
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
            <ChevronLeft className="h-4 w-4" />
            {lang === "gu" ? "પાછળ" : "Back"}
          </button>
          <button
            onClick={next}
            disabled={!allAnswered}
            className="inline-flex items-center gap-1 text-sm px-5 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40"
          >
            {section === 2 && page + 1 === totalPages
              ? lang === "gu"
                ? "પૂર્ણ કરો"
                : "Finish"
              : lang === "gu"
                ? "આગળ"
                : "Next"}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </PublicLayout>
  );
}

function Result({
  meta,
  riasec,
  mi,
  apt,
}: {
  meta: Meta;
  riasec: Record<string, number>;
  mi: Record<string, number>;
  apt: Record<string, number>;
}) {
  const [downloading, setDownloading] = useState(false);
  const report = useMemo(() => buildReport(riasec, mi, apt), [riasec, mi, apt]);
  const recs = useMemo(() => recommendStreams(report.riasecTop, report.aptitudeTop), [report]);
  const lang = meta.language;

  // Save anonymously (best effort) + persist locally for the chatbot
  useEffect(() => {
    supabase.from("psychometric_results").insert({
      student_name: meta.name,
      grade: meta.grade,
      age: meta.age ? Number(meta.age) : null,
      language: meta.language,
      riasec: report.riasec,
      multiple_intelligences: report.mi,
      aptitude: report.aptitude,
      recommended_streams: recs,
    });
    saveReport({
      name: meta.name,
      grade: meta.grade,
      age: meta.age,
      language: meta.language,
      riasecTop: report.riasecTop,
      riasec: report.riasec,
      miTop: report.miTop,
      mi: report.mi,
      aptitudeTop: report.aptitudeTop,
      aptitude: report.aptitude,
      recommendedStreams: recs.map((r: { id?: string; name?: string } | string) =>
        typeof r === "string" ? r : (r.name ?? r.id ?? ""),
      ),
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
      language: meta.language,
      report,
      riasecAnswers: riasec,
      miAnswers: mi,
      aptAnswers: apt,
    });
    doc.save(`HBK Careers-Report-${meta.name.replace(/\s+/g, "-")}.pdf`);
    setDownloading(false);
  };

  return (
    <PublicLayout>
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-10">
        <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-accent/10 p-6 md:p-8">
          <div className="text-xs text-muted-foreground">
            {lang === "gu" ? "પૂર્ણ" : "Complete"} ✓
          </div>
          <h1 className="font-serif text-3xl md:text-4xl mt-1">
            {lang === "gu" ? "તમારી દિશા તૈયાર છે" : "Your direction is ready"}
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            {meta.name} · Grade {meta.grade || "—"}
          </p>
          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            <Stat label={lang === "gu" ? "RIASEC કોડ" : "RIASEC code"} value={report.riasecTop.join("-")} />
            <Stat
              label={lang === "gu" ? "મુખ્ય બુદ્ધિ" : "Top intelligence"}
              value={report.miTop[0] ?? "—"}
            />
            <Stat
              label={lang === "gu" ? "યોગ્યતા" : "Aptitude"}
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
              {downloading
                ? lang === "gu"
                  ? "બની રહ્યો છે…"
                  : "Generating…"
                : lang === "gu"
                  ? "20-પાનાનો PDF રિપોર્ટ ડાઉનલોડ કરો"
                  : "Download 20-page PDF report"}
            </button>
            <Link
              to="/test"
              className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2.5 rounded-md text-sm hover:bg-muted"
            >
              <RefreshCcw className="h-4 w-4" />
              {lang === "gu" ? "ફરી લો" : "Retake"}
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-serif text-xl">
            {lang === "gu" ? "તમારા માટે ભલામણ કરેલ પ્રવાહો" : "Recommended streams for you"}
          </h2>
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
                  <div className="text-xs text-muted-foreground">
                    {i === 0 ? (lang === "gu" ? "પ્રાથમિક" : "Primary") : lang === "gu" ? "ગૌણ" : "Secondary"}
                  </div>
                  <div className="text-3xl mt-2">{s.emoji}</div>
                  <div className="font-serif text-lg mt-2">{lang === "gu" ? s.nameGu : s.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {lang === "gu" ? s.taglineGu : s.tagline}
                  </div>
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
