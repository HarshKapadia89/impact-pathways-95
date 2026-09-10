import { t4 } from "@/lib/t4";
import { useLang } from "@/lib/lang";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { StudentPhotoHero } from "@/components/StudentPhotoHero";
import { ArrowIcon, Card } from "@/design-system/hbk-career-brand-guidelines-4f1c39";
import { GraduationCap, Heart, Globe, Shield } from "lucide-react";
import communityImage from "@/assets/hbk-guidance-community.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About HBK Careers — Free Career Guidance from H B Kapadia New High School, Ahmedabad" },
      {
        name: "description",
        content:
          "HBK Careers is a free career-discovery platform built by The H B Kapadia New High School, Ahmedabad — four-language assessments, 1,651 professions and a personalised report.",
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
      <StudentPhotoHero image={communityImage} imageAlt="Indian students, a parent and an educator discussing a career plan" eyebrow={t4(lang, "Our story", "અમારી વાર્તા")} title={t4(lang, "Every student deserves to choose with clarity.", "દરેક વિદ્યાર્થી દિશા જાણીને નિર્ણય લે.")} subtitle={t4(lang, "Built by educators at The H B Kapadia New High School, Ahmedabad—free, student-first guidance grounded in real psychometric science.", "The H B Kapadia New High School, અમદાવાદના શિક્ષકો દ્વારા બનાવાયેલ—મફત, વિદ્યાર્થી-કેન્દ્રિત અને વૈજ્ઞાનિક માર્ગદર્શન.")} />

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
          <Link to="/test" className="brand-link hbk-focus inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-subheading font-semibold text-primary-foreground">
            {t4(lang, "Take the test", "ટેસ્ટ આપો")} <ArrowIcon size={16} />
          </Link>
          <Link to="/for-schools" className="brand-link hbk-focus inline-flex h-12 items-center gap-2 rounded-md border border-border px-6 text-subheading font-semibold">
            {t4(lang, "For schools", "શાળાઓ માટે")}
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
