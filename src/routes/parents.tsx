import { t4 } from "@/lib/t4";
import { useLang } from "@/lib/lang";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { StudentPhotoHero } from "@/components/StudentPhotoHero";
import { ArrowIcon, Card } from "@/design-system/hbk-career-brand-guidelines-4f1c39";
import { ShieldCheck, IndianRupee, Calendar, MessageSquare } from "lucide-react";
import communityImage from "@/assets/hbk-guidance-community.jpg";

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
      <StudentPhotoHero image={communityImage} imageAlt="An Indian family and educator reviewing a student's career plan" eyebrow={t4(lang, "For parents", "માતા-પિતા માટે")} title={t4(lang, "Decide together. Without pressure.", "નિર્ણય એકસાથે લો. દબાણ વગર.")} subtitle={t4(lang, "Understand your child's strengths, read the personalised report together and turn uncertainty into a practical next step.", "તમારા બાળકની શક્તિઓ સમજો, વ્યક્તિગત રિપોર્ટ સાથે વાંચો અને અનિશ્ચિતતાને વ્યવહારુ આગલા પગલામાં ફેરવો.")} actions={<Link to="/test" className="brand-link hbk-focus inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-subheading font-semibold text-primary-foreground">{t4(lang, "Ask your child to take the test", "બાળકને ટેસ્ટ આપવા કહો")}<ArrowIcon size={16} /></Link>} />

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <h2 className="font-serif text-2xl md:text-3xl text-center mb-8">
          {t4(lang, "Why parents trust HBK Careers", "તમારે શા માટે ભરોસો કરવો?")}
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {cards.map((c) => (
            <Card key={c.title} variant="arrow" padding="md">
              <c.icon className="h-6 w-6 text-primary" />
              <div className="mt-3 font-serif text-lg">{c.title}</div>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{c.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 md:px-8 py-14">
        <Card variant="highlight" padding="lg">
          <h2 className="font-serif text-2xl md:text-3xl">
            {t4(lang, "How to read the report together", "રિપોર્ટ કેવી રીતે વાંચવો?")}
          </h2>
          <ol className="mt-5 space-y-3 text-sm md:text-base text-muted-foreground">
            <li><span className="font-semibold text-foreground">1.</span> {t4(lang, "Start with the Personality Summary. Ask your child if it feels accurate.", "પહેલા 'Personality Summary' એક સાથે વાંચો. તમારા બાળકને પૂછો કે શું તે સાચું લાગે છે?")}</li>
            <li><span className="font-semibold text-foreground">2.</span> {t4(lang, "Look at the top 5 streams. Notice the match percentages.", "ટોચના 5 પ્રવાહો જુઓ. match % ઉપર ધ્યાન આપો.")}</li>
            <li><span className="font-semibold text-foreground">3.</span> {t4(lang, "Review the salary ranges — these are real Gujarat figures.", "પગાર શ્રેણી જુઓ — તે વાસ્તવિક Gujarat ડેટા છે.")}</li>
            <li><span className="font-semibold text-foreground">4.</span> {t4(lang, "Open the 90-day plan together. Take one step per week.", "90-દિવસનો પ્લાન સાથે ખોલો. અઠવાડિક એક પગલું ભરો.")}</li>
          </ol>
        </Card>
      </section>
    </PublicLayout>
  );
}
