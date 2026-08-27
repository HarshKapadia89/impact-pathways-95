import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/PublicLayout";
import { FAQAccordion } from "@/components/FAQAccordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — HBK Careers | Free Psychometric Test & Career Guidance for Gujarat" },
      {
        name: "description",
        content:
          "Common questions about HBK Careers' free 20-page psychometric report, bilingual test, grade coverage, data safety and school onboarding.",
      },
      { property: "og:title", content: "FAQ — HBK Careers" },
      { property: "og:description", content: "Answers to the questions students and parents ask most." },
      { property: "og:url", content: "https://hbkcareers.org/faq" },
    ],
    links: [{ rel: "canonical", href: "https://hbkcareers.org/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "Is this actually free?", acceptedAnswer: { "@type": "Answer", text: "Yes. No login, no credit card. Funded by H B Kapadia New High School, Ahmedabad." } },
            { "@type": "Question", name: "How long does the test take?", acceptedAnswer: { "@type": "Answer", text: "About 25 minutes. You can pause and resume." } },
            { "@type": "Question", name: "Is it available in Gujarati?", acceptedAnswer: { "@type": "Answer", text: "Yes — questions, report and AI summary in both Gujarati and English." } },
          ],
        }),
      },
    ],
  }),
  component: FAQPage,
});

function FAQPage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith("gu") ? "gu" : "en") as "en" | "gu";
  return (
    <PublicLayout>
      <div className="max-w-3xl mx-auto px-4 md:px-8 pt-14 text-center">
        <h1 className="font-serif text-4xl md:text-5xl">
          {lang === "gu" ? "વારંવાર પૂછાતા પ્રશ્નો" : "Frequently asked questions"}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {lang === "gu"
            ? "વિદ્યાર્થીઓ, માતા-પિતા અને શાળાઓ તરફથી"
            : "From students, parents and schools across Gujarat."}
        </p>
      </div>
      <FAQAccordion lang={lang} showHeader={false} />
    </PublicLayout>
  );
}
