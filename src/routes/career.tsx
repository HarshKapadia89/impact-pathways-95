import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/PublicLayout";
import { STREAMS, ENTRANCE_EXAMS } from "@/lib/careerData";
import { ArrowRight, MapPin, BookOpen, Sparkles } from "lucide-react";

export const Route = createFileRoute("/career")({
  head: () => ({
    meta: [
      { title: "What after Class 12? — Gujarat-Focused Career Guidance | Disha" },
      {
        name: "description",
        content:
          "Gujarat-specific careers, courses, top Gujarat colleges, entrance exams (GUJCET, ACPC, GNLU, NID), durations and average salaries — for every stream after Class 12.",
      },
      { property: "og:title", content: "Career Guidance after Class 12 — Disha" },
      {
        property: "og:description",
        content: "Gujarat-focused: top state colleges, GUJCET/NEET/CLAT calendar, MYSY scholarship guidance.",
      },
    ],
  }),
  component: CareerIndex,
});

function CareerIndex() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith("gu") ? "gu" : "en") as "en" | "gu";

  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary px-3 py-1 text-xs font-medium">
            <MapPin className="h-3.5 w-3.5" />
            {lang === "gu" ? "ગુજરાત-કેન્દ્રિત" : "Gujarat-focused"}
          </div>
          <h1 className="font-serif text-3xl md:text-5xl mt-3">
            {lang === "gu" ? "ધોરણ 12 પછી શું?" : "What after Class 12?"}
          </h1>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            {lang === "gu"
              ? "દરેક પ્રવાહ માટે વિગતવાર કારકિર્દી, અભ્યાસક્રમો, ગુજરાતની ટોચની કોલેજો, પ્રવેશ પરીક્ષાઓ (GUJCET, NEET, CLAT, NID), અવધિ અને સરેરાશ પગાર. MYSY શિષ્યવૃત્તિ અને રાજ્ય યોજનાઓની માહિતી."
              : "Detailed careers, courses, top Gujarat colleges, entrance exams (GUJCET, NEET, CLAT, NID), durations and average salaries — for every stream. Plus MYSY scholarship & Gujarat state schemes."}
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs">
            <span className="rounded-md bg-card border border-border px-2.5 py-1">
              {STREAMS.length} {lang === "gu" ? "પ્રવાહો" : "streams"}
            </span>
            <span className="rounded-md bg-card border border-border px-2.5 py-1">
              {STREAMS.reduce((n, s) => n + s.paths.length, 0)}+{" "}
              {lang === "gu" ? "કારકિર્દી માર્ગો" : "career paths"}
            </span>
            <span className="rounded-md bg-card border border-border px-2.5 py-1">
              {ENTRANCE_EXAMS.length} {lang === "gu" ? "પ્રવેશ પરીક્ષાઓ" : "entrance exams"}
            </span>
          </div>
          <div className="mt-5 inline-flex items-start gap-2 text-xs text-muted-foreground bg-card/60 border border-border rounded-md px-3 py-2 max-w-3xl">
            <Sparkles className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
            <span>
              {lang === "gu" ? (
                <>
                  ભારત-વ્યાપી 935+ વ્યવસાયો અને 1,400+ ટોચની સંસ્થાઓ માટે,{" "}
                  <Link to="/handbook" className="text-primary hover:underline inline-flex items-center gap-1">
                    કારકિર્દી હેન્ડબુક <BookOpen className="h-3 w-3" />
                  </Link>{" "}
                  જુઓ.
                </>
              ) : (
                <>
                  Looking for an India-wide reference of 935+ professions and 1,400+ top institutes? See the{" "}
                  <Link to="/handbook" className="text-primary hover:underline inline-flex items-center gap-1">
                    Career Handbook <BookOpen className="h-3 w-3" />
                  </Link>
                  .
                </>
              )}
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STREAMS.map((s) => (
            <Link
              key={s.id}
              to="/career/$stream"
              params={{ stream: s.id }}
              preload="intent"
              className="group rounded-2xl border border-border bg-card p-6 hover:shadow-[var(--shadow-card)] hover:border-primary/40 transition-all"
            >
              <div className="text-4xl">{s.emoji}</div>
              <div className="mt-3 font-serif text-xl">{lang === "gu" ? s.nameGu : s.name}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {lang === "gu" ? s.taglineGu : s.tagline}
              </div>
              <div className="mt-4 text-xs text-muted-foreground">
                {s.paths.length} {lang === "gu" ? "કારકિર્દી માર્ગો" : "career paths"}
              </div>
              <div className="mt-3 inline-flex items-center gap-1 text-sm text-primary opacity-80 group-hover:opacity-100">
                {lang === "gu" ? "વાંચો" : "Read more"}
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <h2 className="font-serif text-2xl md:text-3xl">
          {lang === "gu" ? "મુખ્ય પ્રવેશ પરીક્ષાઓ" : "Major Entrance Exams"}
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          {lang === "gu"
            ? "ગુજરાત અને રાષ્ટ્રીય સ્તરની પરીક્ષાઓ — તારીખો અને સત્તાવાર વેબસાઇટ સાથે."
            : "Gujarat and national-level exams — with dates and official websites."}
        </p>
        <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {ENTRANCE_EXAMS.map((e) => (
            <div key={e.code} className="rounded-xl border border-border bg-card p-4">
              <div className="font-medium text-foreground">{e.code}</div>
              <div className="text-xs text-muted-foreground mt-1">{e.for}</div>
              <div className="text-xs text-muted-foreground mt-2">
                {lang === "gu" ? "ક્યારે" : "When"}: {e.when}
              </div>
              <a
                href={`https://${e.website}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-primary mt-2 inline-block hover:underline break-all"
              >
                {e.website}
              </a>
            </div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
