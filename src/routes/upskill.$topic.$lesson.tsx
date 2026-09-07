import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { useLang } from "@/lib/lang";
import { us } from "@/lib/upskillStrings";
import { getLesson } from "@/lib/upskilling";
import { usePhraseTranslator } from "@/lib/usePhraseTranslator";
import { isDone, toggleLesson, getDays, toggleDay, dayKey } from "@/lib/upskillProgress";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
  ExternalLink,
  Globe2,
  Lightbulb,
  ListChecks,
  Printer,
  ChevronDown,
} from "lucide-react";

export const Route = createFileRoute("/upskill/$topic/$lesson")({
  loader: ({ params }) => {
    const found = getLesson(params.topic, params.lesson);
    if (!found) throw notFound();
    return found;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Lesson not found | HBK Careers" }, { name: "robots", content: "noindex" }] };
    }
    const { topic, lesson } = loaderData;
    const title = `${lesson.title} — ${topic.title} | HBK Careers`;
    const desc = lesson.why.slice(0, 155);
    return {
      meta: [
        { title: title.slice(0, 68) },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: LessonPage,
});

function LessonPage() {
  const { topic, lesson, index } = Route.useLoaderData();
  const lang = useLang();
  const t = (k: string) => us(k, lang);
  const phrase = usePhraseTranslator(lang);
  const [done, setDone] = useState(false);
  const [days, setDays] = useState<Record<string, number>>({});
  const [openDay, setOpenDay] = useState<number | null>(1);

  useEffect(() => {
    setDone(isDone(topic.slug, lesson.slug));
    setDays(getDays());
    setOpenDay(1);
  }, [topic.slug, lesson.slug]);

  const prev = index > 0 ? topic.lessons[index - 1] : undefined;
  const next = index < topic.lessons.length - 1 ? topic.lessons[index + 1] : undefined;

  return (
    <PublicLayout>
      <article className="max-w-3xl mx-auto px-4 md:px-8 pt-10 pb-20">
        <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
          <Link to="/upskill" className="hover:text-foreground">
            {t("backHub")}
          </Link>
          <span>/</span>
          <Link to="/upskill/$topic" params={{ topic: topic.slug }} className="hover:text-foreground">
            {topic.emoji} {phrase(topic.title)}
          </Link>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl mt-4 leading-tight">{phrase(lesson.title)}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
          <span className="rounded-full border border-border px-2.5 py-1">{phrase(lesson.level)}</span>
          <span>{lesson.minutes} {t("min")}</span>
          <button
            onClick={() => typeof window !== "undefined" && window.print()}
            className="inline-flex items-center gap-1 hover:text-foreground"
          >
            <Printer className="h-3.5 w-3.5" />
            {t("print")}
          </button>
        </div>
        {t("englishNote") && <p className="mt-3 text-xs text-muted-foreground/80">{t("englishNote")}</p>}

        <section className="mt-8 rounded-2xl border border-border bg-card p-5">
          <h2 className="font-serif text-lg flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-accent" />
            {t("why")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed">{phrase(lesson.why)}</p>
        </section>

        <section className="mt-8">
          <h2 className="font-serif text-2xl flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-primary" />
            {t("plan")}
          </h2>
          <ol className="mt-4 space-y-3">
            {lesson.studyPlan.map((d, di) => {
              const isOpen = openDay === d.day;
              const dayDone = !!days[dayKey(topic.slug, lesson.slug, d.day)];
              const readText =
                d.read ||
                [lesson.notes[di * 2 % lesson.notes.length], lesson.notes[(di * 2 + 1) % lesson.notes.length]]
                  .filter(Boolean)
                  .join(" ");
              const checks =
                d.checkpoints && d.checkpoints.length
                  ? d.checkpoints
                  : [lesson.quiz[di % lesson.quiz.length]?.q].filter(Boolean) as string[];
              return (
                <li key={d.day} className="rounded-xl border border-border bg-card overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenDay(isOpen ? null : d.day)}
                    className="w-full text-left p-4 flex items-start gap-3 hover:bg-muted/40 transition-colors"
                  >
                    <span className="shrink-0 mt-0.5">
                      {dayDone ? (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground/50" />
                      )}
                    </span>
                    <span className="flex-1">
                      <span className="block text-[11px] uppercase tracking-wide text-primary font-semibold">
                        {t("day")} {d.day}
                      </span>
                      <span className="block text-sm font-medium mt-0.5">{phrase(d.focus)}</span>
                    </span>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 mt-1 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 space-y-4 border-t border-border pt-4">
                      {readText && (
                        <div>
                          <div className="text-[11px] font-semibold uppercase tracking-widest text-accent">{t("read")}</div>
                          <p className="mt-1.5 text-sm leading-relaxed whitespace-pre-line">{phrase(readText)}</p>
                        </div>
                      )}
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-widest text-accent">{t("doTask")}</div>
                        <p className="mt-1.5 text-sm leading-relaxed">{phrase(d.task)}</p>
                      </div>
                      {checks.length > 0 && (
                        <div>
                          <div className="text-[11px] font-semibold uppercase tracking-widest text-accent">{t("check")}</div>
                          <ul className="mt-1.5 space-y-1.5">
                            {checks.map((cq, ci) => (
                              <li key={ci} className="flex gap-2 text-sm text-muted-foreground">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                                <span>{phrase(cq)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          toggleDay(topic.slug, lesson.slug, d.day);
                          setDays(getDays());
                        }}
                        className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-colors ${
                          dayDone ? "bg-primary/10 text-primary border border-primary/40" : "bg-primary text-primary-foreground"
                        }`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {t("dayDone")}
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="font-serif text-2xl flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            {t("notes")}
          </h2>
          <ul className="mt-4 space-y-2.5">
            {lesson.notes.map((n, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span>{phrase(n)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-serif text-2xl flex items-center gap-2">
            <Globe2 className="h-5 w-5 text-primary" />
            {t("cases")}
          </h2>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            {lesson.caseStudies.map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-card p-5">
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  {phrase(c.country)}
                  {c.who ? ` · ${phrase(c.who)}` : ""}
                </div>
                <h3 className="font-serif text-lg mt-1.5 leading-snug">{phrase(c.title)}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{phrase(c.story)}</p>
                <p className="text-sm mt-3">
                  <span className="font-medium">{t("takeaway")}: </span>
                  {phrase(c.takeaway)}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-accent/40 bg-accent/5 p-5">
          <h2 className="font-serif text-lg">{t("practice")}</h2>
          <p className="mt-2 text-sm leading-relaxed">{phrase(lesson.practice)}</p>
        </section>

        <section className="mt-10 rounded-2xl border border-primary/30 bg-primary/5 p-5">
          <h2 className="font-serif text-lg">{t("quizChapter")}</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t("quizChapterSub")}</p>
          <Link
            to="/upskill/$topic/quiz"
            params={{ topic: topic.slug }}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-3 text-sm font-medium hover:opacity-90"
          >
            {t("quizChapter")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        <section className="mt-10">
          <h2 className="font-serif text-2xl">{t("resources")}</h2>
          <ul className="mt-4 space-y-2">
            {lesson.resources.map((r) => (
              <li key={r.label}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  <span>
                    {phrase(r.label)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setDone(toggleLesson(topic.slug, lesson.slug))}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-colors ${
              done ? "bg-primary/10 text-primary border border-primary/40" : "bg-primary text-primary-foreground"
            }`}
          >
            {done ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
            {done ? t("markUndone") : t("markDone")}
          </button>
          <Link
            to="/upskill/$topic"
            params={{ topic: topic.slug }}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {t("backTopic")}
          </Link>
        </div>

        <nav className="mt-10 flex items-center justify-between gap-4 border-t border-border pt-6">
          {prev ? (
            <Link
              to="/upskill/$topic/$lesson"
              params={{ topic: topic.slug, lesson: prev.slug }}
              className="inline-flex items-center gap-2 text-sm hover:text-primary max-w-[45%]"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" />
              <span className="line-clamp-1">{phrase(prev.title)}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to="/upskill/$topic/$lesson"
              params={{ topic: topic.slug, lesson: next.slug }}
              className="inline-flex items-center gap-2 text-sm hover:text-primary max-w-[45%] text-right"
            >
              <span className="line-clamp-1">{phrase(next.title)}</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
    </PublicLayout>
  );
}
