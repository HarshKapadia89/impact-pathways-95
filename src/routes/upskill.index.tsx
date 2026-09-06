import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { useLang } from "@/lib/lang";
import { us } from "@/lib/upskillStrings";
import {
  UPSKILL_TOPICS,
  TOTAL_LESSONS,
  TOTAL_TOPICS,
  TOTAL_MINUTES,
  searchLessons,
  topicMinutes,
  getLesson,
} from "@/lib/upskilling";
import { getProgress, lastLesson, badges as computeBadges, lessonKey } from "@/lib/upskillProgress";
import { Search, ArrowRight, Clock, Sparkles, CheckCircle2, Trophy } from "lucide-react";

export const Route = createFileRoute("/upskill/")({
  head: () => ({
    meta: [
      { title: "LevelUp Lab — Time Management, Communication & Life Skills | HBK Careers" },
      {
        name: "description",
        content:
          "15 skill tracks and 150 free lessons for Indian students: time management, personality development, communication, money skills, AI literacy and more — each with a 7-day plan, notes and real case studies.",
      },
      { property: "og:title", content: "LevelUp Lab for Students | HBK Careers" },
      {
        property: "og:description",
        content: "150 free lessons on life and career skills, each with a 7-day study plan, notes and global case studies.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: UpskillHub,
});

function UpskillHub() {
  const lang = useLang();
  const t = (k: string) => us(k, lang);
  const [query, setQuery] = useState("");
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [resume, setResume] = useState<{ topic: string; lesson: string } | null>(null);

  useEffect(() => {
    const sync = () => {
      setProgress(getProgress());
      const l = lastLesson();
      setResume(l ? { topic: l.topic, lesson: l.lesson } : null);
    };
    sync();
    window.addEventListener("hbk-upskill-change", sync);
    return () => window.removeEventListener("hbk-upskill-change", sync);
  }, []);

  const hits = useMemo(() => searchLessons(query), [query]);
  const doneCount = Object.keys(progress).length;
  const badges = computeBadges(doneCount, TOTAL_LESSONS);
  const resumeMeta = resume ? getLesson(resume.topic, resume.lesson) : undefined;

  return (
    <PublicLayout>
      <section className="max-w-6xl mx-auto px-4 md:px-8 pt-12 pb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs text-accent font-medium">
          <Sparkles className="h-3.5 w-3.5" />
          {t("hubKicker")}
        </div>
        <h1 className="font-serif text-4xl md:text-5xl mt-4 leading-tight">{t("hubTitle")}</h1>
        <p className="mt-4 text-muted-foreground max-w-3xl">{t("hubSub")}</p>
        {t("englishNote") && (
          <p className="mt-2 text-xs text-muted-foreground/80">{t("englishNote")}</p>
        )}

        <div className="mt-7 grid grid-cols-3 gap-3 max-w-lg">
          {[
            { n: TOTAL_TOPICS, l: t("topics") },
            { n: TOTAL_LESSONS, l: t("lessons") },
            { n: Math.round(TOTAL_MINUTES / 60), l: t("hours") },
          ].map((s) => (
            <div key={s.l} className="rounded-xl border border-border bg-card p-4">
              <div className="font-serif text-2xl">{s.n}</div>
              <div className="text-[11px] text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>

        {doneCount > 0 && (
          <div className="mt-6 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="text-sm font-medium">
                {t("yourProgress")} — {doneCount}/{TOTAL_LESSONS} {t("lessons").toLowerCase()}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {badges.map((b) => (
                  <span
                    key={b.id}
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] ${
                      b.earned ? "border-accent/50 bg-accent/10 text-accent" : "border-border text-muted-foreground opacity-60"
                    }`}
                  >
                    <Trophy className="h-3 w-3" />
                    {b.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${(doneCount / TOTAL_LESSONS) * 100}%` }} />
            </div>
            {resumeMeta && (
              <Link
                to="/upskill/$topic/$lesson"
                params={{ topic: resumeMeta.topic.slug, lesson: resumeMeta.lesson.slug }}
                className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                {t("continue")}: {resumeMeta.lesson.title}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        )}

        <div className="mt-8">
          <Link
            to="/upskill/quiz"
            className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-3 text-sm font-medium hover:opacity-90"
          >
            {t("quizCta")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPh")}
            className="w-full rounded-xl border border-border bg-background pl-10 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {query.trim().length >= 2 && (
          <div className="mt-4 rounded-2xl border border-border bg-card p-3">
            {hits.length === 0 ? (
              <p className="text-sm text-muted-foreground p-3">{t("noResults")}</p>
            ) : (
              <ul className="divide-y divide-border">
                {hits.map((h) => (
                  <li key={`${h.topicSlug}/${h.lessonSlug}`}>
                    <Link
                      to="/upskill/$topic/$lesson"
                      params={{ topic: h.topicSlug, lesson: h.lessonSlug }}
                      className="flex items-center justify-between gap-3 px-3 py-2.5 hover:bg-muted rounded-lg"
                    >
                      <span className="text-sm">
                        <span className="mr-2">{h.emoji}</span>
                        {h.lessonTitle}
                        <span className="text-muted-foreground"> · {h.topicTitle}</span>
                      </span>
                      <span className="text-[11px] text-muted-foreground shrink-0">
                        {h.minutes} {t("min")}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {UPSKILL_TOPICS.map((topic) => {
            const done = topic.lessons.filter((l) => progress[lessonKey(topic.slug, l.slug)]).length;
            return (
              <Link
                key={topic.slug}
                to="/upskill/$topic"
                params={{ topic: topic.slug }}
                className="group rounded-2xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-sm transition-all"
              >
                <div className="text-3xl">{topic.emoji}</div>
                <h2 className="font-serif text-xl mt-3 leading-snug">{topic.title}</h2>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{topic.tagline}</p>
                <div className="mt-4 flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span>{topic.lessons.length} {t("lessons").toLowerCase()}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {Math.round(topicMinutes(topic) / 60)}h
                  </span>
                  {done > 0 && (
                    <span className="inline-flex items-center gap-1 text-primary">
                      <CheckCircle2 className="h-3 w-3" />
                      {done}/{topic.lessons.length}
                    </span>
                  )}
                </div>
                <div className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
                  {t("start")}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </PublicLayout>
  );
}
