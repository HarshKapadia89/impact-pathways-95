import { t4 } from "@/lib/t4";
import { useLang } from "@/lib/lang";
import { createFileRoute, Link } from "@tanstack/react-router";
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
  const lang = useLang();

  const cards = [
    {
      icon: ShieldCheck,
      title: t4(lang, "Science-backed", "વૈજ્ઞાનિક પાયો"),
      desc:
        t4(lang, "Uses RIASEC (Holland), Multiple Intelligences (Gardner) and a 5-domain aptitude battery — the same frameworks private counsellors charge ₹3,000–5,000 for.", "RIASEC (Holland), Multiple Intelligences (Gardner) અને 5-ડોમેન યોગ્યતા — એ જ ફ્રેમવર્ક જે પ્રાઇવેટ કાઉન્સેલિંગમાં ₹3,000-5,000માં વપરાય છે."),
    },
    {
      icon: IndianRupee,
      title: t4(lang, "Real salary data", "વાસ્તવિક પગાર ડેટા"),
      desc:
        t4(lang, "Every career shows entry, mid and senior salary ranges — for Gujarat and India.", "દરેક વ્યવસાય માટે entry, mid અને senior પગાર શ્રેણી — Gujarat અને India બંને માટે."),
    },
    {
      icon: Calendar,
      title: t4(lang, "90-day action plan", "90-દિવસનો પ્લાન"),
      desc:
        t4(lang, "Not just a report — a week-by-week plan you can work through with your child.", "ફક્ત રિપોર્ટ નહીં — એક અઠવાડિક પગલાં વાળો પ્લાન જે તમે બંને સાથે મળીને કરી શકો."),
    },
    {
      icon: MessageSquare,
      title: t4(lang, "Bilingual report", "દ્વિભાષી રિપોર્ટ"),
      desc:
        t4(lang, "Full Gujarati and English versions. Read it in the language you're most comfortable with.", "ગુજરાતી અને અંગ્રેજી બંને. તમે જે ભાષામાં વાંચવા માગો તેમાં વાંચો."),
    },
  ];

  return (
    <PublicLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} aria-hidden />
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-xs text-primary font-medium mb-5">
            <Heart className="h-3.5 w-3.5" />
            {t4(lang, "For parents", "માતા-પિતા માટે")}
          </div>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight">
            {t4(lang, "Decide together. Without pressure.", "નિર્ણય એકસાથે લો. દબાણ વગર.")}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t4(lang, "Let your child take the test. Then read the 20-page report together — in Gujarati or English. It's free, private, and built by a school you can trust.", "તમારા બાળકને ટેસ્ટ આપવા દો. પછી 20-પાનાનો રિપોર્ટ સાથે વાંચો. ગુજરાતી અથવા અંગ્રેજીમાં.")}
          </p>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <Link to="/test" className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-5 py-3 text-sm font-semibold hover:-translate-y-0.5 transition">
              {t4(lang, "Ask your child to take the test", "બાળકને ટેસ્ટ આપવા કહો")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <h2 className="font-serif text-2xl md:text-3xl text-center mb-8">
          {t4(lang, "Why parents trust HBK Careers", "તમારે શા માટે ભરોસો કરવો?")}
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
        <div className="rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/10 to-primary/5 p-8 md:p-10">
          <h2 className="font-serif text-2xl md:text-3xl">
            {t4(lang, "How to read the report together", "રિપોર્ટ કેવી રીતે વાંચવો?")}
          </h2>
          <ol className="mt-5 space-y-3 text-sm md:text-base text-muted-foreground">
            <li><span className="font-semibold text-foreground">1.</span> {t4(lang, "Start with the Personality Summary. Ask your child if it feels accurate.", "પહેલા 'Personality Summary' એક સાથે વાંચો. તમારા બાળકને પૂછો કે શું તે સાચું લાગે છે?")}</li>
            <li><span className="font-semibold text-foreground">2.</span> {t4(lang, "Look at the top 5 streams. Notice the match percentages.", "ટોચના 5 પ્રવાહો જુઓ. match % ઉપર ધ્યાન આપો.")}</li>
            <li><span className="font-semibold text-foreground">3.</span> {t4(lang, "Review the salary ranges — these are real Gujarat figures.", "પગાર શ્રેણી જુઓ — તે વાસ્તવિક Gujarat ડેટા છે.")}</li>
            <li><span className="font-semibold text-foreground">4.</span> {t4(lang, "Open the 90-day plan together. Take one step per week.", "90-દિવસનો પ્લાન સાથે ખોલો. અઠવાડિક એક પગલું ભરો.")}</li>
          </ol>
        </div>
      </section>
    </PublicLayout>
  );
}
