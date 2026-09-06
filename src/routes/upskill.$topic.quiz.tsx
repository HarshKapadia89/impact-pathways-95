import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { UpskillQuiz } from "@/components/UpskillQuiz";
import { getTopic } from "@/lib/upskilling";
import { useLang } from "@/lib/lang";
import { us } from "@/lib/upskillStrings";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/upskill/$topic/quiz")({
  loader: ({ params }) => {
    const topic = getTopic(params.topic);
    if (!topic) throw notFound();
    return { topic };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Quiz not found | HBK Careers" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.topic.title} Chapter Test — MCQ | HBK Careers`;
    const desc = `End-of-chapter MCQ test on ${loaderData.topic.title}. Choose 10 to 50 questions, 1 mark each, and get an instant score.`;
    return {
      meta: [
        { title: title.slice(0, 68) },
        { name: "description", content: desc.slice(0, 158) },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: TopicQuizPage,
});

function TopicQuizPage() {
  const { topic } = Route.useLoaderData();
  const lang = useLang();

  return (
    <PublicLayout>
      <section className="max-w-3xl mx-auto px-4 md:px-8 pt-10 pb-20">
        <Link
          to="/upskill/$topic"
          params={{ topic: topic.slug }}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {topic.emoji} {topic.title}
        </Link>
        <h1 className="font-serif text-3xl md:text-4xl mt-4">
          {topic.title} — {us("quizChapter", lang)}
        </h1>
        <div className="mt-6">
          <UpskillQuiz topic={topic} />
        </div>
      </section>
    </PublicLayout>
  );
}
