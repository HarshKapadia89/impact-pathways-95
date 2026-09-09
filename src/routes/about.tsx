import { t4 } from "@/lib/t4";
import { useLang } from "@/lib/lang";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { Card } from "@/design-system/hbk-career-brand-guidelines-4f1c39";
import { GraduationCap, Heart, Globe, Shield, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About HBK Careers — Free Career Guidance from H B Kapadia New High School, Ahmedabad" },
      {
        name: "description",
        content:
          "HBK Careers is a free career-discovery platform built by The H B Kapadia New High School, Ahmedabad — bilingual psychometric tests, 1,400+ colleges and a 20-page personalised report.",
      },
      { property: "og:title", content: "About — HBK Careers" },
      { property: "og:description", content: "Built by educators, not edtech. Free career guidance for every Gujarat student." },
      { property: "og:url", content: "https://hbkcareers.org/about" },
    ],
    links: [{ rel: "canonical", href: "https://hbkcareers.org/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const lang = useLang();

  const values = [
    {
      icon: Heart,
      title: t4(lang, "Free, always", "મફત હંમેશા"),
      desc:
        t4(lang, "No paywalls. No login walls. Equal access for every student in Gujarat.", "કોઈ paywall નહીં. કોઈ લૉગિન નહીં. દરેક વિદ્યાર્થી માટે સમાન access."),
    },
    {
      icon: Globe,
      title: t4(lang, "Bilingual-first", "દ્વિભાષી પ્રથમ"),
      desc:
        t4(lang, "Gujarati and English at equal quality — not translations, original content.", "ગુજરાતી અને અંગ્રેજી બંને સમાન ગુણવત્તામાં — અનુવાદ નહીં, મૂળ સામગ્રી."),
    },
    {
      icon: Shield,
      title: t4(lang, "Data dignity", "ડેટા સુરક્ષા"),
      desc:
        t4(lang, "We never sell student data. Ever. Your responses generate your report — nothing more.", "અમે કોઈનો ડેટા વેચતા નથી. ક્યારેય નહીં."),
    },
    {
      icon: GraduationCap,
      title: t4(lang, "Built by educators", "શિક્ષકો દ્વારા બનાવાયેલ"),
      desc:
        t4(lang, "Not edtech — a 100-year-old school that actually knows students.", "edtech નહીં — એક 100-વર્ષ જૂની શાળા જે વિદ્યાર્થીઓને ઓળખે છે."),
    },
  ];

  return (
    <PublicLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} aria-hidden />
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-xs text-primary font-medium mb-5">
            <GraduationCap className="h-3.5 w-3.5" />
            {t4(lang, "Our story", "અમારી વાર્તા")}
          </div>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight">
            {t4(lang, "Every student deserves to choose with clarity.", "દરેક વિદ્યાર્થી દિશા જાણીને નિર્ણય લે.")}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            {t4(lang, "HBK Careers is built by The H B Kapadia New High School, Ahmedabad — a school that has been teaching Gujarat's students since 1925. We noticed that most decisions after Class 10 are made out of fear, family pressure, or incomplete information. So we built this — free, bilingual, and grounded in real psychometric science.", "HBK Careers The H B Kapadia New High School, અમદાવાદ દ્વારા બનાવાયેલ છે — 1925 થી ગુજરાતના વિદ્યાર્થીઓને ભણાવનાર શાળા. અમે જોયું કે ધોરણ 10 પછી મોટાભાગના નિર્ણયો ડર, દબાણ અથવા અધૂરી માહિતી પર લેવાય છે. તેથી અમે આ બનાવ્યું — મફત, દ્વિભાષી, અને વૈજ્ઞાનિક.")}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <h2 className="font-serif text-2xl md:text-3xl mb-8">{t4(lang, "What we stand for", "અમારા મૂલ્યો")}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {values.map((v) => (
            <Card key={v.title} variant="lifted" padding="md">
              <v.icon className="h-5 w-5 text-accent" />
              <div className="mt-3 font-serif text-lg">{v.title}</div>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{v.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 md:px-8 py-14 text-center">
        <h2 className="font-serif text-2xl md:text-3xl">
          {t4(lang, "Find your direction — free", "તમારી દિશા શોધો — મફત")}
        </h2>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Link to="/test" className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-5 py-3 text-sm font-semibold hover:-translate-y-0.5 transition">
            {t4(lang, "Take the test", "ટેસ્ટ આપો")} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/for-schools" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold border-2 border-accent/40 hover:bg-accent/10 transition">
            {t4(lang, "For schools", "શાળાઓ માટે")}
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
