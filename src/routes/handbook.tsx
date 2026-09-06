import { t4 } from "@/lib/t4";
import { useLang } from "@/lib/lang";
import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { HANDBOOK_SUMMARIES, streamEmoji } from "@/lib/handbookData";
import { BookOpen, ArrowRight, Search } from "lucide-react";

export const Route = createFileRoute("/handbook")({
  head: () => ({
    meta: [
      { title: "Career Guidance — India | Professions, Exams & Top Institutes | HBK Careers" },
      {
        name: "description",
        content:
          "India-wide career guidance covering 48 streams: 1,600+ professions, 490+ entrance exams and 1,900+ top institutes across India.",
      },
      { property: "og:title", content: "Career Guidance — India | HBK Careers" },
      {
        property: "og:description",
        content: "Professions, entrance exams and ranked top institutes for 48 career streams.",
      },
    ],
  }),
  component: HandbookLayout,
});

function HandbookLayout() {
  const location = useLocation();

  // Child route renders just the Outlet
  if (location.pathname !== "/handbook") {
    return (
      <PublicLayout>
        <Outlet />
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <HandbookIndex />
    </PublicLayout>
  );
}

function HandbookIndex() {
  const lang = useLang();
  const [query, setQuery] = useState("");

  const totals = useMemo(() => {
    return HANDBOOK_SUMMARIES.reduce(
      (acc, s) => ({
        professions: acc.professions + s.professionsCount,
        exams: acc.exams + s.examsCount,
        institutes: acc.institutes + s.institutesCount,
      }),
      { professions: 0, exams: 0, institutes: 0 },
    );
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return HANDBOOK_SUMMARIES;
    return HANDBOOK_SUMMARIES.filter((s) => s.stream.toLowerCase().includes(q));
  }, [query]);

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5" />
            {t4(lang, "Career Guidance — India", "કારકિર્દી માર્ગદર્શન — ભારત")}
          </div>
          <h1 className="font-serif text-3xl md:text-5xl mt-2">
            {t4(lang, "Professions, Entrance Exams & Top Institutes across 48 Streams", "48 પ્રવાહોમાં વ્યવસાયો, પ્રવેશ પરીક્ષાઓ અને ટોચની સંસ્થાઓ")}
          </h1>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            {t4(lang, "Detailed reference list of career paths, major entrance exams and India's top-ranked institutes for every stream.", "દરેક પ્રવાહ માટે વ્યાવસાયિક માર્ગો, મુખ્ય પ્રવેશ પરીક્ષાઓ અને ભારતની ટોચની સંસ્થાઓની વિગતવાર સૂચિ.")}
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Stat n={totals.professions} label={t4(lang, "professions", "વ્યવસાયો")} />
            <Stat n={totals.exams} label={t4(lang, "entrance exams", "પ્રવેશ પરીક્ષાઓ")} />
            <Stat n={totals.institutes} label={t4(lang, "top institutes", "સંસ્થાઓ")} />
            <Stat n={HANDBOOK_SUMMARIES.length} label={t4(lang, "streams", "પ્રવાહો")} />
          </div>
          <p className="mt-3 text-xs text-muted-foreground max-w-3xl leading-relaxed">
            {t4(lang, "© HBK Careers. Compiled in-house from public sources — official regulators and exam bodies including AICTE, NMC, BCI, ICAI, COA, NID, NIFT, NCHMCT, NTA, ACPC Gujarat and the relevant ministries. Detailed sources are listed at the bottom of every stream page.", "© HBK Careers. અધિકૃત નિયમનકારી અને પરીક્ષા સંસ્થાઓના જાહેર સ્ત્રોતોમાંથી HBK દ્વારા સંકલિત — AICTE, NMC, BCI, ICAI, COA, NID, NIFT, NCHMCT, NTA, ACPC ગુજરાત અને સંબંધિત મંત્રાલયો. દરેક પ્રવાહ પૃષ્ઠના તળિયે વિગતવાર સ્ત્રોતો સૂચિબદ્ધ છે.")}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder={t4(lang, "Search streams…", "પ્રવાહ શોધો…")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 text-sm rounded-md border border-border bg-card focus:outline-none focus:border-primary"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground py-12 text-center">
            {t4(lang, "No streams matched your search.", "કોઈ પ્રવાહ મળ્યો નથી.")}
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((s) => (
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
                  {t4(lang, "View details", "વિગતો જુઓ")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <span className="text-muted-foreground">
      <strong className="text-foreground tabular-nums">{n.toLocaleString()}</strong> {label}
    </span>
  );
}
