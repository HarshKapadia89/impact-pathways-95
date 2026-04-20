import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/PublicLayout";
import { STREAMS, ENTRANCE_EXAMS } from "@/lib/careerData";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/career")({
  head: () => ({
    meta: [
      { title: "Career Guidance after Class 12 — Science, Commerce, Humanities | Disha" },
      {
        name: "description",
        content:
          "Detailed career paths after class 12 across Science (PCM/PCB), Commerce, Humanities and Vocational streams — with Gujarat college recommendations and entrance exams.",
      },
      { property: "og:title", content: "Career Guidance after Class 12 — Disha" },
      {
        property: "og:description",
        content: "All streams, careers, top colleges, and entrance exams.",
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
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <h1 className="font-serif text-3xl md:text-5xl">
          {lang === "gu" ? "ધોરણ 12 પછી શું?" : "What after Class 12?"}
        </h1>
        <p className="mt-3 text-muted-foreground max-w-3xl">
          {lang === "gu"
            ? "દરેક પ્રવાહ માટે વિગતવાર કારકિર્દી, અભ્યાસક્રમો, ગુજરાતની ટોચની કોલેજો, પ્રવેશ પરીક્ષાઓ, અવધિ અને સરેરાશ પગાર."
            : "Detailed careers, courses, top Gujarat colleges, entrance exams, durations and average salaries — for every stream."}
        </p>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STREAMS.map((s) => (
            <Link
              key={s.id}
              to="/career/$stream"
              params={{ stream: s.id }}
              className="group rounded-2xl border border-border bg-card p-6 hover:shadow-[var(--shadow-card)] transition-shadow"
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
                className="text-xs text-primary mt-2 inline-block hover:underline"
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
