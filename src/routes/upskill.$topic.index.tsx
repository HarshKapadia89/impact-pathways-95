import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { useLang } from "@/lib/lang";
import { us } from "@/lib/upskillStrings";
import { getTopic, topicMinutes } from "@/lib/upskilling";
import { getProgress, lessonKey, getQuizResults, PASS_PCT, type QuizResult } from "@/lib/upskillProgress";
import { UpskillCertificateCard } from "@/components/UpskillCertificateCard";
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, Clock } from "lucide-react";

export const Route = createFileRoute("/upskill/$topic/")({
  loader: ({ params }) => {
    const topic = getTopic(params.topic);
    if (!topic) throw notFound();
    return { topic };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Topic not found | HBK Careers" }, { name: "robots", content: "noindex" }] };
    }
    const { topic } = loaderData;
    const title = `${topic.title} — 10 Free Lessons for Students | HBK Careers`;
    const desc = `${topic.tagline} ${topic.lessons.length} lessons with a 7-day study plan, revision notes and real case studies.`.slice(0, 158);
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: TopicPage,
});

function TopicPage() {
  const { topic } = Route.useLoaderData();
  const lang = useLang();
  const t = (k: string) => us(k, lang);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [quiz, setQuiz] = useState<QuizResult | undefined>(undefined);

  useEffect(() => {
    const sync = () => {
      setProgress(getProgress());
      setQuiz(getQuizResults()[topic.slug]);
    };
    sync();
    window.addEventListener("hbk-upskill-change", sync);
    return () => window.removeEventListener("hbk-upskill-change", sync);
  }, [topic.slug]);

  const done = topic.lessons.filter((l) => progress[lessonKey(topic.slug, l.slug)]).length;

  return (
    <PublicLayout>
      <section className="max-w-4xl mx-auto px-4 md:px-8 pt-10 pb-16">
        <Link to="/upskill" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" />
          {t("backHub")}
        </Link>

        <div className="mt-5 text-4xl">{topic.emoji}</div>
        <h1 className="font-serif text-3xl md:text-4xl mt-3 leading-tight">{topic.title}</h1>
        <p className="text-muted-foreground mt-2">{topic.tagline}</p>
        <p className="mt-4 text-sm leading-relaxed">{topic.intro}</p>
        {t("englishNote") && <p className="mt-2 text-xs text-muted-foreground/80">{t("englishNote")}</p>}

        <div className="mt-6 flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span>{topic.lessons.length} {t("lessons").toLowerCase()}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {Math.round(topicMinutes(topic) / 60)}h
          </span>
          <span className="text-primary">{done}/{topic.lessons.length} {t("done").toLowerCase()}</span>
        </div>
        <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden max-w-md">
          <div className="h-full bg-primary" style={{ width: `${(done / topic.lessons.length) * 100}%` }} />
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card p-5">
          <h2 className="font-serif text-lg">{t("outcomes")}</h2>
          <ul className="mt-3 space-y-2">
            {topic.outcomes.map((o) => (
              <li key={o} className="flex gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-5">
          <h2 className="font-serif text-lg">{t("quizChapter")}</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t("quizChapterSub")}</p>
          {quiz && (
            <p className={`mt-3 text-sm font-medium ${quiz.pct >= PASS_PCT ? "text-primary" : "text-destructive"}`}>
              {t("quizBest")}: {quiz.correct}/{quiz.total} ({quiz.pct}%) ·{" "}
              {quiz.pct >= PASS_PCT ? t("quizPassed") : t("quizFailed")}
            </p>
          )}
          <Link
            to="/upskill/$topic/quiz"
            params={{ topic: topic.slug }}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-3 text-sm font-medium hover:opacity-90"
          >
            {t("quizChapter")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <UpskillCertificateCard
          unlocked={done === topic.lessons.length && !!quiz && quiz.pct >= PASS_PCT}
          title={topic.title}
          lessons={topic.lessons.length}
          hours={Math.max(1, Math.round(topicMinutes(topic) / 60))}
          scoreText={quiz ? `${quiz.pct}%` : undefined}
        />

        <h2 className="font-serif text-2xl mt-10">{t("lessons")}</h2>
        <ol className="mt-4 space-y-3">
          {topic.lessons.map((lesson, i) => {
            const isDone = !!progress[lessonKey(topic.slug, lesson.slug)];
            return (
              <li key={lesson.slug}>
                <Link
                  to="/upskill/$topic/$lesson"
                  params={{ topic: topic.slug, lesson: lesson.slug }}
                  className="group flex items-start gap-4 rounded-xl border border-border bg-card p-4 hover:border-primary/40 transition-colors"
                >
                  <span className="shrink-0 mt-0.5">
                    {isDone ? (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground/50" />
                    )}
                  </span>
                  <span className="flex-1">
                    <span className="text-sm font-medium">
                      {i + 1}. {lesson.title}
                    </span>
                    <span className="block text-xs text-muted-foreground mt-1 line-clamp-2">{lesson.why}</span>
                    <span className="mt-2 inline-flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span>{lesson.level}</span>
                      <span>{lesson.minutes} {t("min")}</span>
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
    </PublicLayout>
  );
}
