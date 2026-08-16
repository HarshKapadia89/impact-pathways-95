import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/PublicLayout";
import { Heart, ShieldCheck, IndianRupee, Calendar, MessageSquare, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/parents")({
  head: () => ({
    meta: [
      { title: "For Parents — HBK Careers | Help your child choose with confidence" },
      {
        name: "description",
        content:
          "A parent's guide to HBK Careers: what the 20-page report says, how to read it together, salary realities for Gujarat, and how to support without pressuring.",
      },
      { property: "og:title", content: "For Parents — HBK Careers" },
      { property: "og:description", content: "Read the report together. Make the decision together." },
      { property: "og:url", content: "https://hbkcareers.org/parents" },
    ],
    links: [{ rel: "canonical", href: "https://hbkcareers.org/parents" }],
  }),
  component: ParentsPage,
});

function ParentsPage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith("gu") ? "gu" : "en") as "en" | "gu";

  const cards = [
    {
      icon: ShieldCheck,
      title: lang === "gu" ? "વૈજ્ઞાનિક પાયો" : "Science-backed",
      desc:
        lang === "gu"
          ? "RIASEC (Holland), Multiple Intelligences (Gardner) અને 5-ડોમેન યોગ્યતા — એ જ ફ્રેમવર્ક જે પ્રાઇવેટ કાઉન્સેલિંગમાં ₹3,000-5,000માં વપરાય છે."
          : "Uses RIASEC (Holland), Multiple Intelligences (Gardner) and a 5-domain aptitude battery — the same frameworks private counsellors charge ₹3,000–5,000 for.",
    },
    {
      icon: IndianRupee,
      title: lang === "gu" ? "વાસ્તવિક પગાર ડેટા" : "Real salary data",
      desc:
        lang === "gu"
          ? "દરેક વ્યવસાય માટે entry, mid અને senior પગાર શ્રેણી — Gujarat અને India બંને માટે."
          : "Every career shows entry, mid and senior salary ranges — for Gujarat and India.",
    },
    {
      icon: Calendar,
      title: lang === "gu" ? "90-દિવસનો પ્લાન" : "90-day action plan",
      desc:
        lang === "gu"
          ? "ફક્ત રિપોર્ટ નહીં — એક અઠવાડિક પગલાં વાળો પ્લાન જે તમે બંને સાથે મળીને કરી શકો."
          : "Not just a report — a week-by-week plan you can work through with your child.",
    },
    {
      icon: MessageSquare,
      title: lang === "gu" ? "દ્વિભાષી રિપોર્ટ" : "Bilingual report",
      desc:
        lang === "gu"
          ? "ગુજરાતી અને અંગ્રેજી બંને. તમે જે ભાષામાં વાંચવા માગો તેમાં વાંચો."
          : "Full Gujarati and English versions. Read it in the language you're most comfortable with.",
    },
  ];

  return (
    <PublicLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} aria-hidden />
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-xs text-primary font-medium mb-5">
            <Heart className="h-3.5 w-3.5" />
            {lang === "gu" ? "માતા-પિતા માટે" : "For parents"}
          </div>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight">
            {lang === "gu"
              ? "નિર્ણય એકસાથે લો. દબાણ વગર."
              : "Decide together. Without pressure."}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            {lang === "gu"
              ? "તમારા બાળકને ટેસ્ટ આપવા દો. પછી 20-પાનાનો રિપોર્ટ સાથે વાંચો. ગુજરાતી અથવા અંગ્રેજીમાં."
              : "Let your child take the test. Then read the 20-page report together — in Gujarati or English. It's free, private, and built by a school you can trust."}
          </p>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <Link to="/test" className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-5 py-3 text-sm font-semibold hover:-translate-y-0.5 transition">
              {lang === "gu" ? "બાળકને ટેસ્ટ આપવા કહો" : "Ask your child to take the test"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <h2 className="font-serif text-2xl md:text-3xl text-center mb-8">
          {lang === "gu" ? "તમારે શા માટે ભરોસો કરવો?" : "Why parents trust HBK Careers"}
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {cards.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-6 hover:-translate-y-1 hover:shadow-[var(--shadow-card)] transition">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: "color-mix(in oklab, var(--accent) 15%, transparent)" }}>
                <c.icon className="h-5 w-5 text-accent" />
              </div>
              <div className="mt-3 font-serif text-lg">{c.title}</div>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 md:px-8 py-14">
        <div className="rounded-3xl border border-accent/30 p-8 md:p-10">
          <h2 className="font-serif text-2xl md:text-3xl">
            {lang === "gu" ? "રિપોર્ટ કેવી રીતે વાંચવો?" : "How to read the report together"}
          </h2>
          <ol className="mt-5 space-y-3 text-sm md:text-base text-muted-foreground">
            <li><span className="font-semibold text-foreground">1.</span> {lang === "gu" ? "પહેલા 'Personality Summary' એક સાથે વાંચો. તમારા બાળકને પૂછો કે શું તે સાચું લાગે છે?" : "Start with the Personality Summary. Ask your child if it feels accurate."}</li>
            <li><span className="font-semibold text-foreground">2.</span> {lang === "gu" ? "ટોચના 5 પ્રવાહો જુઓ. match % ઉપર ધ્યાન આપો." : "Look at the top 5 streams. Notice the match percentages."}</li>
            <li><span className="font-semibold text-foreground">3.</span> {lang === "gu" ? "પગાર શ્રેણી જુઓ — તે વાસ્તવિક Gujarat ડેટા છે." : "Review the salary ranges — these are real Gujarat figures."}</li>
            <li><span className="font-semibold text-foreground">4.</span> {lang === "gu" ? "90-દિવસનો પ્લાન સાથે ખોલો. અઠવાડિક એક પગલું ભરો." : "Open the 90-day plan together. Take one step per week."}</li>
          </ol>
        </div>
      </section>
    </PublicLayout>
  );
}
