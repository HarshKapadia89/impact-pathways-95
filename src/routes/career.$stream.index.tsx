import { createFileRoute, getRouteApi, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/PublicLayout";
import { pathSlug, type Stream } from "@/lib/careerData";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Award,
  Building2,
  IndianRupee,
  GraduationCap,
  MapPin,
  Sparkles,
  BookOpen,
} from "lucide-react";

export const Route = createFileRoute("/career/$stream/")({
  component: StreamDetail,
});

const streamRoute = getRouteApi("/career/$stream");

function StreamDetail() {
  const { stream } = streamRoute.useLoaderData() as { stream: Stream };
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith("gu") ? "gu" : "en") as "en" | "gu";
  const highlights = lang === "gu" ? stream.gujaratHighlightsGu : stream.gujaratHighlights;

  return (
    <PublicLayout>
      <section className="poster-hero border-b-4 border-ink">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <Link
              to="/career"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> {lang === "gu" ? "બધા પ્રવાહો" : "All streams"}
            </Link>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary px-2.5 py-0.5 text-xs font-medium">
              <MapPin className="h-3 w-3" />
              {lang === "gu" ? "ગુજરાત-કેન્દ્રિત" : "Gujarat-focused"}
            </span>
          </div>
          <div className="mt-4 flex items-start gap-4">
            <div className="text-5xl">{stream.emoji}</div>
            <div>
              <h1 className="font-serif text-3xl md:text-5xl">
                {lang === "gu" ? stream.nameGu : stream.name}
              </h1>
              <p className="text-muted-foreground mt-1">
                {lang === "gu" ? stream.taglineGu : stream.tagline}
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-foreground/90">
            {lang === "gu" ? stream.overviewGu : stream.overview}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {stream.coreSubjects.map((c) => (
              <span
                key={c}
                className="rounded-full bg-card border border-border px-3 py-1 text-xs"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            {lang === "gu" ? "ગુજરાતની ખાસિયતો" : "Gujarat highlights"}
          </div>
          <ul className="mt-3 grid md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-foreground/90">
            {highlights.map((h, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-10">
        <h2 className="font-serif text-2xl md:text-3xl mb-6">
          {lang === "gu" ? "કારકિર્દી માર્ગો" : "Career Paths"}
        </h2>
        <div className="space-y-5">
          {stream.paths.map((p) => (
            <article key={p.title} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-serif text-xl text-foreground">{p.title}</h3>
                <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {p.duration}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{p.description}</p>

              <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground inline-flex items-center gap-1">
                    <Award className="h-3 w-3" /> {lang === "gu" ? "પાત્રતા" : "Eligibility"}
                  </div>
                  <div className="mt-1">{p.eligibility}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground inline-flex items-center gap-1">
                    <IndianRupee className="h-3 w-3" /> {lang === "gu" ? "પગાર શ્રેણી" : "Salary range"}
                  </div>
                  <div className="mt-1">{p.avgSalary}</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                  {lang === "gu" ? "પ્રવેશ પરીક્ષાઓ" : "Entrance exams"}
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {p.entranceExams.map((e) => (
                    <span key={e} className="text-xs rounded-md bg-secondary px-2 py-0.5">
                      {e}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs uppercase tracking-wide text-muted-foreground inline-flex items-center gap-1">
                  <Building2 className="h-3 w-3" /> {lang === "gu" ? "ગુજરાતની ટોચની કોલેજો" : "Top colleges (Gujarat)"}
                </div>
                <ul className="mt-1.5 grid md:grid-cols-2 gap-x-4 text-sm">
                  {p.topColleges.map((c) => (
                    <li key={c} className="text-foreground/85">
                      • {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <div className="text-xs uppercase tracking-wide text-muted-foreground inline-flex items-center gap-1">
                  <GraduationCap className="h-3 w-3" /> {lang === "gu" ? "કારકિર્દી ભૂમિકાઓ" : "Career roles"}
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {p.careers.map((c) => (
                    <span
                      key={c}
                      className="text-xs rounded-md bg-accent/20 text-accent-foreground px-2 py-0.5"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-border">
                <Link
                  to="/career/$stream/$path"
                  params={{ stream: stream.id, path: pathSlug(p.title) }}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  {lang === "gu" ? "વધુ વાંચો" : "Read more"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-serif text-lg flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              {lang === "gu" ? "ભારત-વ્યાપી સંદર્ભ જોઈએ છે?" : "Want India-wide reference?"}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {lang === "gu"
                ? "20 પ્રવાહોમાં 935+ વ્યવસાયો અને 1,400+ ટોચની ભારતીય સંસ્થાઓ માટે કારકિર્દી હેન્ડબુક જુઓ."
                : "Browse the Career Handbook for 935+ professions and 1,400+ top Indian institutes across 20 streams."}
            </div>
          </div>
          <Link
            to="/handbook"
            className="bg-card border border-border px-4 py-2 rounded-md text-sm font-medium hover:bg-muted"
          >
            {lang === "gu" ? "હેન્ડબુક ખોલો" : "Open Handbook"} →
          </Link>
        </div>

        <div className="mt-5 rounded-2xl border border-border bg-primary/5 p-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-serif text-xl">
              {lang === "gu" ? "હજી અનિશ્ચિત છો?" : "Still unsure?"}
            </div>
            <div className="text-sm text-muted-foreground">
              {lang === "gu"
                ? "મફત મનો-યોગ્યતા ટેસ્ટ આપો અને 20-પાનાનો વ્યક્તિગત રિપોર્ટ મેળવો."
                : "Take the free psychometric test and get a 20-page personalised report."}
            </div>
          </div>
          <Link
            to="/test"
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-medium hover:opacity-90"
          >
            {lang === "gu" ? "ટેસ્ટ આપો" : "Take the test"}
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
