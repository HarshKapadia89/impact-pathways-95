import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/PublicLayout";
import { HANDBOOK_STREAMS, slugify, streamEmoji } from "@/lib/handbookData";
import { BookOpen, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/handbook")({
  head: () => ({
    meta: [
      { title: "Career Handbook — Professions, Exams & Top Institutes | Disha" },
      {
        name: "description",
        content:
          "Comprehensive career handbook covering 20 streams: professions, entrance exams and top institutes across India. Sourced from the Parents' Career Handbook.",
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
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith("gu") ? "gu" : "en") as "en" | "gu";
  const location = useLocation();

  // If on a child route, just render Outlet
  if (location.pathname !== "/handbook") {
    return (
      <PublicLayout>
        <Outlet />
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
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
          <p className="mt-2 text-xs text-muted-foreground">
            {lang === "gu"
              ? "સ્રોત: પેરેન્ટ્સ કારકિર્દી હેન્ડબુક (mohitmangal.com)"
              : "Source: Parents' Career Handbook (mohitmangal.com)"}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {HANDBOOK_STREAMS.map((s) => (
            <Link
              key={s.stream}
              to="/handbook/$slug"
              params={{ slug: slugify(s.stream) }}
              className="group rounded-2xl border border-border bg-card p-5 hover:shadow-[var(--shadow-card)] hover:border-primary/40 transition-all"
            >
              <div className="text-3xl">{streamEmoji(s.stream)}</div>
              <div className="mt-3 font-serif text-lg leading-snug">{s.stream}</div>
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span>
                  <strong className="text-foreground">{s.professions.length}</strong>{" "}
                  {lang === "gu" ? "વ્યવસાયો" : "professions"}
                </span>
                <span>
                  <strong className="text-foreground">{s.exams.length}</strong>{" "}
                  {lang === "gu" ? "પરીક્ષાઓ" : "exams"}
                </span>
                <span>
                  <strong className="text-foreground">{s.institutes.length}</strong>{" "}
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
      </section>
    </PublicLayout>
  );
}
