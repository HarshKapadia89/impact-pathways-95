import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/PublicLayout";
import { HANDBOOK_SUMMARIES, streamEmoji } from "@/lib/handbookData";
import professionIndex from "@/lib/professionIndex.json";
import { Library, ArrowRight, Search, GraduationCap } from "lucide-react";

type IndexRow = { n: string; s: string; p: string };
const PROFESSIONS = professionIndex as IndexRow[];

export const Route = createFileRoute("/career-library")({
  head: () => ({
    meta: [
      { title: "Career Library — A to Z Careers, Streams & Professions | HBK Careers" },
      {
        name: "description",
        content:
          "Browse 48 career streams and 1,600+ professions from A to Z. Search any career to see the study path, entrance exams, top institutes, salaries and growth ladder.",
      },
      { property: "og:title", content: "Career Library — A to Z Careers | HBK Careers" },
      {
        property: "og:description",
        content: "48 streams, 1,600+ professions, entrance exams and top institutes — searchable in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CareerLibraryPage,
});

const STREAM_NAME_BY_SLUG: Record<string, string> = Object.fromEntries(
  HANDBOOK_SUMMARIES.map((s) => [s.slug, s.stream]),
);

function CareerLibraryPage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith("gu") ? "gu" : "en") as "en" | "gu";
  const [query, setQuery] = useState("");
  const [letter, setLetter] = useState<string>("");

  const totals = useMemo(
    () =>
      HANDBOOK_SUMMARIES.reduce(
        (acc, s) => ({
          professions: acc.professions + s.professionsCount,
          exams: acc.exams + s.examsCount,
          institutes: acc.institutes + s.institutesCount,
        }),
        { professions: 0, exams: 0, institutes: 0 },
      ),
    [],
  );

  const q = query.trim().toLowerCase();

  const streams = useMemo(() => {
    const list = [...HANDBOOK_SUMMARIES].sort((a, b) => a.stream.localeCompare(b.stream));
    return list.filter((s) => {
      if (letter && s.stream[0]?.toUpperCase() !== letter) return false;
      if (q && !s.stream.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [q, letter]);

  const professionHits = useMemo(() => {
    if (q.length < 2) return [];
    return PROFESSIONS.filter((r) => r.n.toLowerCase().includes(q)).slice(0, 60);
  }, [q]);

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const availableLetters = useMemo(
    () => new Set(HANDBOOK_SUMMARIES.map((s) => s.stream[0]?.toUpperCase())),
    [],
  );

  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <Library className="h-3.5 w-3.5" />
            {lang === "gu" ? "કારકિર્દી લાઇબ્રેરી" : "Career Library"}
          </div>
          <h1 className="font-serif text-3xl md:text-5xl mt-2">
            {lang === "gu"
              ? "A થી Z — દરેક કારકિર્દી, એક જગ્યાએ"
              : "Every career, A to Z — in one place"}
          </h1>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            {lang === "gu"
              ? "48 પ્રવાહો અને 1,600+ વ્યવસાયો શોધો — અભ્યાસ માર્ગ, પ્રવેશ પરીક્ષાઓ, ટોચની સંસ્થાઓ, પગાર અને વૃદ્ધિની સીડી સાથે."
              : "Search 48 streams and 1,600+ professions — each with the study path, entrance exams, top institutes, salary bands and growth ladder."}
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Stat n={HANDBOOK_SUMMARIES.length} label={lang === "gu" ? "પ્રવાહો" : "streams"} />
            <Stat n={totals.professions} label={lang === "gu" ? "વ્યવસાયો" : "professions"} />
            <Stat n={totals.exams} label={lang === "gu" ? "પરીક્ષાઓ" : "entrance exams"} />
            <Stat n={totals.institutes} label={lang === "gu" ? "સંસ્થાઓ" : "top institutes"} />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === "gu"
                ? "કારકિર્દી શોધો — દા.ત. પાયલોટ, ડેટા સાયન્સ, શેફ…"
                : "Search any career — e.g. pilot, data science, chef, ethical hacking…"
            }
            className="w-full pl-9 pr-3 py-3 text-sm rounded-xl border border-border bg-card focus:outline-none focus:border-primary"
          />
        </div>

        {/* A-Z filter */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          <button
            onClick={() => setLetter("")}
            className={`h-8 px-3 rounded-md text-xs font-medium border transition ${
              letter === "" ? "bg-primary text-primary-foreground border-primary" : "border-border bg-card hover:bg-muted"
            }`}
          >
            {lang === "gu" ? "બધા" : "All"}
          </button>
          {letters.map((l) => {
            const has = availableLetters.has(l);
            return (
              <button
                key={l}
                disabled={!has}
                onClick={() => setLetter(letter === l ? "" : l)}
                className={`h-8 w-8 rounded-md text-xs font-medium border transition ${
                  letter === l
                    ? "bg-primary text-primary-foreground border-primary"
                    : has
                      ? "border-border bg-card hover:bg-muted"
                      : "border-transparent text-muted-foreground/40 cursor-not-allowed"
                }`}
              >
                {l}
              </button>
            );
          })}
        </div>

        {professionHits.length > 0 && (
          <div className="mt-8">
            <h2 className="font-serif text-xl flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-accent" />
              {lang === "gu" ? "મળતા વ્યવસાયો" : "Matching professions"}
              <span className="text-xs text-muted-foreground font-sans">({professionHits.length})</span>
            </h2>
            <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {professionHits.map((r) => (
                <Link
                  key={`${r.s}/${r.p}`}
                  to="/handbook/$slug/$profession"
                  params={{ slug: r.s, profession: r.p }}
                  preload="intent"
                  className="rounded-xl border border-border bg-card px-4 py-3 hover:border-primary/40 hover:shadow-[var(--shadow-card)] transition"
                >
                  <div className="text-sm font-medium leading-snug">{r.n}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    {streamEmoji(STREAM_NAME_BY_SLUG[r.s] ?? "")} {STREAM_NAME_BY_SLUG[r.s] ?? r.s}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10">
          <h2 className="font-serif text-xl">
            {lang === "gu" ? "કારકિર્દી પ્રવાહો" : "Career streams"}
            <span className="ml-2 text-xs text-muted-foreground font-sans">({streams.length})</span>
          </h2>
          {streams.length === 0 ? (
            <p className="text-sm text-muted-foreground py-12 text-center">
              {lang === "gu" ? "કોઈ પ્રવાહ મળ્યો નથી." : "No streams matched your search."}
            </p>
          ) : (
            <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {streams.map((s) => (
                <Link
                  key={s.slug}
                  to="/handbook/$slug"
                  params={{ slug: s.slug }}
                  preload="intent"
                  className="group rounded-2xl border border-border bg-card p-5 hover:shadow-[var(--shadow-card)] hover:border-primary/40 transition-all"
                >
                  <div className="text-3xl">{streamEmoji(s.stream)}</div>
                  <div className="mt-3 font-serif text-lg leading-snug">{s.stream}</div>
                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span>
                      <strong className="text-foreground">{s.professionsCount}</strong>{" "}
                      {lang === "gu" ? "વ્યવસાયો" : "professions"}
                    </span>
                    <span>
                      <strong className="text-foreground">{s.examsCount}</strong>{" "}
                      {lang === "gu" ? "પરીક્ષાઓ" : "exams"}
                    </span>
                    <span>
                      <strong className="text-foreground">{s.institutesCount}</strong>{" "}
                      {lang === "gu" ? "સંસ્થાઓ" : "institutes"}
                    </span>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-1 text-sm text-primary opacity-80 group-hover:opacity-100">
                    {lang === "gu" ? "વ્યવસાયો ખોલો" : "Open professions"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <span className="text-muted-foreground">
      <strong className="text-foreground tabular-nums">{n.toLocaleString()}</strong> {label}
    </span>
  );
}
