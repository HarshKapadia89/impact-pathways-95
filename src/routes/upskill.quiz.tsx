import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { UpskillQuiz } from "@/components/UpskillQuiz";
import { useLang } from "@/lib/lang";
import { us } from "@/lib/upskillStrings";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/upskill/quiz")({
  head: () => ({
    meta: [
      { title: "LevelUp Lab Quiz — 10 to 50 Questions, Your Marks | HBK Careers" },
      {
        name: "description",
        content:
          "Take a mixed skills quiz across time management, communication, money skills, AI and more. Choose 10 to 50 questions, set marks per question and get an instant score.",
      },
      { property: "og:title", content: "LevelUp Lab Quiz | HBK Careers" },
      {
        property: "og:description",
        content: "Choose 10 to 50 questions, set marks per question, and score yourself on life and career skills.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MixedQuizPage,
});

function MixedQuizPage() {
  const lang = useLang();
  return (
    <PublicLayout>
      <section className="max-w-3xl mx-auto px-4 md:px-8 pt-10 pb-20">
        <Link to="/upskill" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" />
          {us("backHub", lang)}
        </Link>
        <h1 className="font-serif text-3xl md:text-4xl mt-4">{us("quizMixed", lang)}</h1>
        <div className="mt-6">
          <UpskillQuiz />
        </div>
      </section>
    </PublicLayout>
  );
}
