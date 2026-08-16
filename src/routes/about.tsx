import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/PublicLayout";
import { GraduationCap, Heart, Globe, Shield, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About HBK Careers — Career Guidance from H B Kapadia New High School, Ahmedabad" },
      {
        name: "description",
        content:
          "HBK Careers is a career-discovery platform built by The H B Kapadia New High School, Ahmedabad — bilingual psychometric tests, 1,400+ colleges and a 20-page personalised report.",
      },
      { property: "og:title", content: "About — HBK Careers" },
      { property: "og:description", content: "Built by educators, not edtech. Career guidance for every Gujarat student." },
      { property: "og:url", content: "https://hbkcareers.org/about" },
    ],
    links: [{ rel: "canonical", href: "https://hbkcareers.org/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith("gu") ? "gu" : "en") as "en" | "gu";

  const values = [
    {
      icon: Heart,
      title: lang === "gu" ? "દરેક માટે ખુલ્લું" : "Open to every student",
      desc:
        lang === "gu"
          ? "ગુજરાતના દરેક વિદ્યાર્થી માટે સમાન access — શહેર હોય કે ગામ."
          : "Equal access for every student in Gujarat — city or village, board or medium.",
    },
    {
      icon: Globe,
      title: lang === "gu" ? "દ્વિભાષી પ્રથમ" : "Bilingual-first",
      desc:
        lang === "gu"
          ? "ગુજરાતી અને અંગ્રેજી બંને સમાન ગુણવત્તામાં — અનુવાદ નહીં, મૂળ સામગ્રી."
          : "Gujarati and English at equal quality — not translations, original content.",
    },
    {
      icon: Shield,
      title: lang === "gu" ? "ડેટા સુરક્ષા" : "Data dignity",
      desc:
        lang === "gu"
          ? "અમે કોઈનો ડેટા વેચતા નથી. ક્યારેય નહીં."
          : "We never sell student data. Ever. Your responses generate your report — nothing more.",
    },
    {
      icon: GraduationCap,
      title: lang === "gu" ? "શિક્ષકો દ્વારા બનાવાયેલ" : "Built by educators",
      desc:
        lang === "gu"
          ? "edtech નહીં — એક 100-વર્ષ જૂની શાળા જે વિદ્યાર્થીઓને ઓળખે છે."
          : "Not edtech — a 100-year-old school that actually knows students.",
    },
  ];

  return (
    <PublicLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} aria-hidden />
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-xs text-primary font-medium mb-5">
            <GraduationCap className="h-3.5 w-3.5" />
            {lang === "gu" ? "અમારી વાર્તા" : "Our story"}
          </div>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight">
            {lang === "gu"
              ? "દરેક વિદ્યાર્થી દિશા જાણીને નિર્ણય લે."
              : "Every student deserves to choose with clarity."}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            {lang === "gu"
              ? "HBK Careers The H B Kapadia New High School, અમદાવાદ દ્વારા બનાવાયેલ છે — 1925 થી ગુજરાતના વિદ્યાર્થીઓને ભણાવનાર શાળા. અમે જોયું કે ધોરણ 10 પછી મોટાભાગના નિર્ણયો ડર, દબાણ અથવા અધૂરી માહિતી પર લેવાય છે. તેથી અમે આ બનાવ્યું — દ્વિભાષી, વૈજ્ઞાનિક અને વિદ્યાર્થી-કેન્દ્રિત."
              : "HBK Careers is built by The H B Kapadia New High School, Ahmedabad — a school that has been teaching Gujarat's students since 1925. We noticed that most decisions after Class 10 are made out of fear, family pressure, or incomplete information. So we built this — bilingual, student-first, and grounded in real psychometric science."}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <h2 className="font-serif text-2xl md:text-3xl mb-8">{lang === "gu" ? "અમારા મૂલ્યો" : "What we stand for"}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border-2 border-border bg-card p-6 hover:-translate-y-1 hover:shadow-[var(--shadow-card)] transition">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: "color-mix(in oklab, var(--accent) 15%, transparent)" }}>
                <v.icon className="h-5 w-5 text-accent" />
              </div>
              <div className="mt-3 font-serif text-lg">{v.title}</div>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 md:px-8 py-14 text-center">
        <h2 className="font-serif text-2xl md:text-3xl">
          {lang === "gu" ? "તમારી દિશા શોધો" : "Find your direction"}
        </h2>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Link to="/test" className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-5 py-3 text-sm font-semibold hover:-translate-y-0.5 transition">
            {lang === "gu" ? "ટેસ્ટ આપો" : "Take the test"} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/for-schools" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold border-2 border-accent/40 hover:bg-accent/10 transition">
            {lang === "gu" ? "શાળાઓ માટે" : "For schools"}
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
