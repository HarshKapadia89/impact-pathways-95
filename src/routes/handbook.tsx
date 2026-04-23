import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/PublicLayout";
import { HANDBOOK_SUMMARIES, streamEmoji } from "@/lib/handbookData";
import { BookOpen, ArrowRight, Search } from "lucide-react";

export const Route = createFileRoute("/handbook")({
  head: () => ({
    meta: [
      { title: "Career Handbook — Professions, Exams & Top Institutes | Disha" },
      {
        name: "description",
        content:
          "Comprehensive career handbook covering 20 streams: 935+ professions, 269+ entrance exams and 1,400+ top institutes across India.",
      },
      { property: "og:title", content: "Career Handbook — Disha" },
      {
        property: "og:description",
        content: "Professions, entrance exams and ranked top institutes for 20 career streams.",
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
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith("gu") ? "gu" : "en") as "en" | "gu";
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
            {lang === "gu" ? "કારકિર્દી હેન્ડબુક" : "Career Handbook"}
          </div>
          <h1 className="font-serif text-3xl md:text-5xl mt-2">
            {lang === "gu"
              ? "20 પ્રવાહોમાં વ્યવસાયો, પ્રવેશ પરીક્ષાઓ અને ટોચની સંસ્થાઓ"
              : "Professions, Entrance Exams & Top Institutes across 20 Streams"}
          </h1>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            {lang === "gu"
              ? "દરેક પ્રવાહ માટે વ્યાવસાયિક માર્ગો, મુખ્ય પ્રવેશ પરીક્ષાઓ અને ભારતની ટોચની સંસ્થાઓની વિગતવાર સૂચિ."
              : "Detailed reference list of career paths, major entrance exams and India's top-ranked institutes for every stream."}
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Stat n={totals.professions} label={lang === "gu" ? "વ્યવસાયો" : "professions"} />
            <Stat n={totals.exams} label={lang === "gu" ? "પ્રવેશ પરીક્ષાઓ" : "entrance exams"} />
            <Stat n={totals.institutes} label={lang === "gu" ? "સંસ્થાઓ" : "top institutes"} />
            <Stat n={20} label={lang === "gu" ? "પ્રવાહો" : "streams"} />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {lang === "gu"
              ? "સ્રોત: પેરેન્ટ્સ કારકિર્દી હેન્ડબુક (mohitmangal.com)"
              : "Source: Parents' Career Handbook (mohitmangal.com)"}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder={lang === "gu" ? "પ્રવાહ શોધો…" : "Search streams…"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 text-sm rounded-md border border-border bg-card focus:outline-none focus:border-primary"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground py-12 text-center">
            {lang === "gu" ? "કોઈ પ્રવાહ મળ્યો નથી." : "No streams matched your search."}
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
                  {lang === "gu" ? "વિગતો જુઓ" : "View details"}
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
