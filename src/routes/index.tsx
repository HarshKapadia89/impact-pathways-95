import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/PublicLayout";
import { STREAMS } from "@/lib/careerData";
import { Compass, Brain, ArrowRight, GraduationCap, BookOpen } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Disha — Free Career Guidance & College Directory for Gujarat Students" },
      {
        name: "description",
        content:
          "Free career guidance, Gujarat college directory, and a bilingual psychometric test for grades 6–12 with a detailed 20-page PDF report.",
      },
      { property: "og:title", content: "Disha — Career Discovery for Gujarat Students" },
      { property: "og:description", content: "Free guidance, colleges, and a 20-page psychometric report." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith("gu") ? "gu" : "en") as "en" | "gu";
  const T = {
    hero1: lang === "gu" ? "તમારી દિશા શોધો." : "Find your direction.",
    hero2:
      lang === "gu"
        ? "ગ્રેડ 6–12 માટે મફત કારકિર્દી માર્ગદર્શન અને 20-પાનાનો વ્યક્તિગત રિપોર્ટ સાથેનો સાયકોમેટ્રિક ટેસ્ટ."
        : "Free career guidance and a psychometric test with a 20-page personalised report — for grades 6 through 12.",
    cta1: lang === "gu" ? "ટેસ્ટ આપો" : "Take the test",
    cta2: lang === "gu" ? "કારકિર્દી માર્ગદર્શન" : "Career guidance",
    sectionsTitle: lang === "gu" ? "શું અન્વેષણ કરશો?" : "What to explore",
    streamsTitle: lang === "gu" ? "12 પછીના માર્ગો" : "Your paths after Class 12",
    streamsSub:
      lang === "gu"
        ? "દરેક પ્રવાહ માટે વિગતવાર કારકિર્દી, પ્રવેશ પરીક્ષાઓ અને પગાર."
        : "Deep guides on careers, entrance exams and salaries — per stream.",
  };

  const tiles = [
    {
      to: "/career" as const,
      icon: Compass,
      title: lang === "gu" ? "કારકિર્દી માર્ગદર્શન" : "Career Guidance",
      desc:
        lang === "gu"
          ? "વિજ્ઞાન, વાણિજ્ય, માનવવિદ્યા, વ્યાવસાયિક — દરેક માટે વિગતવાર ગાઇડ."
          : "Detailed guides for Science, Commerce, Humanities and Vocational paths.",
    },
    {
      to: "/handbook" as const,
      icon: BookOpen,
      title: lang === "gu" ? "કારકિર્દી હેન્ડબુક" : "Career Handbook",
      desc:
        lang === "gu"
          ? "20 પ્રવાહોમાં 935+ વ્યવસાયો અને 1,400+ ટોચની સંસ્થાઓ."
          : "935+ professions and 1,400+ top institutes across 20 streams.",
    },
    {
      to: "/test" as const,
      icon: Brain,
      title: lang === "gu" ? "મનો-યોગ્યતા ટેસ્ટ" : "Psychometric Test",
      desc:
        lang === "gu"
          ? "RIASEC + MI + યોગ્યતા. દ્વિભાષી. 20-પાનાનો PDF રિપોર્ટ."
          : "RIASEC + MI + Aptitude. Bilingual. Instant 20-page PDF report.",
    },
  ];

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10 -z-10" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground mb-5">
              <GraduationCap className="h-3.5 w-3.5" />
              {lang === "gu" ? "મફત • કોઈ લૉગિન જરૂરી નથી" : "Free • No login required"}
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground leading-tight">
              {T.hero1}
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl">
              {T.hero2}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/test"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-md px-5 py-3 text-sm font-medium hover:opacity-90"
              >
                <Brain className="h-4 w-4" />
                {T.cta1}
              </Link>
              <Link
                to="/career"
                className="inline-flex items-center gap-2 bg-card border border-border rounded-md px-5 py-3 text-sm font-medium hover:bg-muted"
              >
                <Compass className="h-4 w-4" />
                {T.cta2}
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {tiles.map((t) => (
              <Link
                key={t.to}
                to={t.to}
                className="rounded-2xl border border-border bg-card p-5 hover:shadow-[var(--shadow-card)] transition-shadow"
              >
                <t.icon className="h-6 w-6 text-primary" />
                <div className="mt-3 font-serif text-base">{t.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{t.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Streams strip */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl">{T.streamsTitle}</h2>
            <p className="text-sm text-muted-foreground mt-1">{T.streamsSub}</p>
          </div>
          <Link to="/career" className="text-sm text-primary hover:underline shrink-0">
            {lang === "gu" ? "બધા જુઓ" : "View all"} →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STREAMS.map((s) => (
            <Link
              key={s.id}
              to="/career/$stream"
              params={{ stream: s.id }}
              className="group rounded-2xl border border-border bg-card p-5 hover:shadow-[var(--shadow-card)] transition-shadow"
            >
              <div className="text-3xl">{s.emoji}</div>
              <div className="mt-3 font-serif text-lg">{lang === "gu" ? s.nameGu : s.name}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {lang === "gu" ? s.taglineGu : s.tagline}
              </div>
              <div className="mt-4 inline-flex items-center gap-1 text-sm text-primary opacity-80 group-hover:opacity-100">
                {lang === "gu" ? "ખોલો" : "Explore"}
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
