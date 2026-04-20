import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/PublicLayout";
import { STREAM_BY_ID, type StreamId, type Stream, type CareerPath } from "@/lib/careerData";
import { ArrowLeft, Clock, Award, Building2, IndianRupee, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/career/$stream")({
  loader: ({ params }) => {
    const stream = STREAM_BY_ID[params.stream as StreamId];
    if (!stream) throw notFound();
    return { stream };
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.stream.name} — Careers, Colleges & Entrance Exams | Disha` },
            { name: "description", content: loaderData.stream.overview.slice(0, 155) },
            { property: "og:title", content: `${loaderData.stream.name} — Disha` },
            { property: "og:description", content: loaderData.stream.tagline },
          ],
        }
      : {},
  component: StreamDetail,
  notFoundComponent: () => (
    <PublicLayout>
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-3xl">Stream not found</h1>
        <Link to="/career" className="text-primary mt-4 inline-block">
          ← Back to all streams
        </Link>
      </div>
    </PublicLayout>
  ),
  errorComponent: ({ error }) => (
    <PublicLayout>
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p>Something went wrong: {error.message}</p>
        <Link to="/career" className="text-primary mt-4 inline-block">
          ← Back
        </Link>
      </div>
    </PublicLayout>
  ),
});

function StreamDetail() {
  const { stream } = Route.useLoaderData();
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith("gu") ? "gu" : "en") as "en" | "gu";

  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
          <Link to="/career" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> {lang === "gu" ? "બધા પ્રવાહો" : "All streams"}
          </Link>
          <div className="mt-4 flex items-start gap-4">
            <div className="text-5xl">{stream.emoji}</div>
            <div>
              <h1 className="font-serif text-3xl md:text-5xl">{lang === "gu" ? stream.nameGu : stream.name}</h1>
              <p className="text-muted-foreground mt-1">{lang === "gu" ? stream.taglineGu : stream.tagline}</p>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-foreground/90">
            {lang === "gu" ? stream.overviewGu : stream.overview}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {stream.coreSubjects.map((c) => (
              <span key={c} className="rounded-full bg-card border border-border px-3 py-1 text-xs">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
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
                    <Award className="h-3 w-3" /> Eligibility
                  </div>
                  <div className="mt-1">{p.eligibility}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground inline-flex items-center gap-1">
                    <IndianRupee className="h-3 w-3" /> Salary range
                  </div>
                  <div className="mt-1">{p.avgSalary}</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Entrance exams</div>
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
                  <Building2 className="h-3 w-3" /> Top colleges (Gujarat)
                </div>
                <ul className="mt-1.5 grid md:grid-cols-2 gap-x-4 text-sm">
                  {p.topColleges.map((c) => (
                    <li key={c} className="text-foreground/85">• {c}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <div className="text-xs uppercase tracking-wide text-muted-foreground inline-flex items-center gap-1">
                  <GraduationCap className="h-3 w-3" /> Career roles
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {p.careers.map((c) => (
                    <span key={c} className="text-xs rounded-md bg-accent/20 text-accent-foreground px-2 py-0.5">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-primary/5 p-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-serif text-xl">{lang === "gu" ? "હજી અનિશ્ચિત છો?" : "Still unsure?"}</div>
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
