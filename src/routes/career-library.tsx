import { t4 } from "@/lib/t4";
import { useLang } from "@/lib/lang";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { HANDBOOK_SUMMARIES, streamEmoji } from "@/lib/handbookData";
import professionIndex from "@/lib/professionIndex.json";
import { Library, ArrowRight, Search, GraduationCap } from "lucide-react";
import { ArrowIcon, Badge, Card, Input, Stat as BrandStat } from "@/design-system/hbk-career-brand-guidelines-4f1c39";
import { PLATFORM_STATS } from "@/lib/platformStats";

type IndexRow = { n: string; s: string; p: string };
const PROFESSIONS = professionIndex as IndexRow[];

export const Route = createFileRoute("/career-library")({
  head: () => ({
    meta: [
      { title: "Career Library — A to Z Careers, Exams & Top Institutes in India | HBK Careers" },
      {
        name: "description",
        content:
          "India-wide career library: browse 48 streams and 1,651 professions from A to Z, with 499 entrance exams and 1,943 top institutes.",
      },
      { property: "og:title", content: "Career Library — A to Z Careers across India | HBK Careers" },
      {
        property: "og:description",
        content: "48 streams, 1,651 professions, 499 entrance exams and 1,943 top institutes across India — searchable in one place.",
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
  const lang = useLang();
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
      <section className="bg-highlight text-highlight-foreground">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <Badge variant="accent" withArrow>{t4(lang, "Career Library", "કારકિર્દી લાઇબ્રેરી")}</Badge>
          <h1 className="font-display text-title md:text-display mt-6">
            {t4(lang, "Every career, A to Z — in one place", "A થી Z — દરેક કારકિર્દી, એક જગ્યાએ")}
          </h1>
          <p className="mt-4 text-subheading text-highlight-foreground/80 max-w-3xl">
            {t4(lang, "Search 48 streams and 1,651 professions — with 499 entrance exams, 1,943 top institutes, study paths, salaries and growth ladders.", "48 પ્રવાહો અને 1,651 વ્યવસાયો શોધો — 499 પ્રવેશ પરીક્ષાઓ, 1,943 ટોચની સંસ્થાઓ, અભ્યાસ માર્ગો, પગાર અને વિકાસની સીડી સાથે.")}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            <BrandStat value={PLATFORM_STATS.careerStreams.toLocaleString("en-IN")} label={t4(lang, "streams", "પ્રવાહો")} className="[&_p]:text-highlight-foreground" />
            <BrandStat value={PLATFORM_STATS.professions.toLocaleString("en-IN")} label={t4(lang, "professions", "વ્યવસાયો")} className="[&_p]:text-highlight-foreground" />
            <BrandStat value={PLATFORM_STATS.careerEntranceExams.toLocaleString("en-IN")} label={t4(lang, "entrance exams", "પરીક્ષાઓ")} className="[&_p]:text-highlight-foreground" />
            <BrandStat value={PLATFORM_STATS.topInstitutes.toLocaleString("en-IN")} label={t4(lang, "top institutes", "સંસ્થાઓ")} className="[&_p]:text-highlight-foreground" />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              t4(lang, "Search any career — e.g. pilot, data science, chef, ethical hacking…", "કારકિર્દી શોધો — દા.ત. પાયલોટ, ડેટા સાયન્સ, શેફ…")
            }
            size="lg"
            className="pl-9"
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
            {t4(lang, "All", "બધા")}
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
              {t4(lang, "Matching professions", "મળતા વ્યવસાયો")}
              <span className="text-xs text-muted-foreground font-sans">({professionHits.length})</span>
            </h2>
            <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {professionHits.map((r) => (
                <Link
                  key={`${r.s}/${r.p}`}
                  to="/handbook/$slug/$profession"
                  params={{ slug: r.s, profession: r.p }}
                  preload="intent"
                  className="brand-link rounded-lg"
                >
                  <Card variant="arrow" padding="sm" className="h-full"><div className="text-body font-semibold leading-snug">{r.n}</div><div className="text-caption text-muted-foreground mt-1">{streamEmoji(STREAM_NAME_BY_SLUG[r.s] ?? "")} {STREAM_NAME_BY_SLUG[r.s] ?? r.s}</div></Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10">
          <h2 className="font-serif text-xl">
            {t4(lang, "Career streams", "કારકિર્દી પ્રવાહો")}
            <span className="ml-2 text-xs text-muted-foreground font-sans">({streams.length})</span>
          </h2>
          {streams.length === 0 ? (
            <p className="text-sm text-muted-foreground py-12 text-center">
              {t4(lang, "No streams matched your search.", "કોઈ પ્રવાહ મળ્યો નથી.")}
            </p>
          ) : (
            <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {streams.map((s) => (
                <Link
                  key={s.slug}
                  to="/handbook/$slug"
                  params={{ slug: s.slug }}
                  preload="intent"
                  className="group brand-link rounded-lg"
                >
                  <Card variant="arrow" padding="md" className="h-full">
                  <div className="text-3xl">{streamEmoji(s.stream)}</div>
                  <div className="mt-3 font-serif text-lg leading-snug">{s.stream}</div>
                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span>
                      <strong className="text-foreground">{s.professionsCount}</strong>{" "}
                      {t4(lang, "professions", "વ્યવસાયો")}
                    </span>
                    <span>
                      <strong className="text-foreground">{s.examsCount}</strong>{" "}
                      {t4(lang, "exams", "પરીક્ષાઓ")}
                    </span>
                    <span>
                      <strong className="text-foreground">{s.institutesCount}</strong>{" "}
                      {t4(lang, "institutes", "સંસ્થાઓ")}
                    </span>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-1 text-sm text-primary opacity-80 group-hover:opacity-100">
                    {t4(lang, "Open professions", "વ્યવસાયો ખોલો")}
                    <ArrowIcon size={16} />
                  </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        <p className="mt-12 text-xs text-muted-foreground max-w-3xl leading-relaxed border-t border-border pt-5">
          {t4(
            lang,
            "© HBK Careers. Compiled in-house from public sources — official regulators and exam bodies including AICTE, NMC, BCI, ICAI, COA, NID, NIFT, NCHMCT, NTA, ACPC Gujarat and the relevant ministries. Detailed sources are listed at the bottom of every stream page.",
            "© HBK Careers. અધિકૃત નિયમનકારી અને પરીક્ષા સંસ્થાઓના જાહેર સ્ત્રોતોમાંથી HBK દ્વારા સંકલિત — AICTE, NMC, BCI, ICAI, COA, NID, NIFT, NCHMCT, NTA, ACPC ગુજરાત અને સંબંધિત મંત્રાલયો. દરેક પ્રવાહ પૃષ્ઠના તળિયે વિગતવાર સ્ત્રોતો સૂચિબદ્ધ છે.",
          )}
        </p>
      </section>
    </PublicLayout>
  );
}

