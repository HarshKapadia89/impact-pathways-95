import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/PublicLayout";
import { TrustLayer } from "@/components/TrustLayer";
import { HowItWorks } from "@/components/HowItWorks";
import { ReportPreview } from "@/components/ReportPreview";
import { VibeQuizCard } from "@/components/VibeQuizCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { STREAMS } from "@/lib/careerData";
import { Compass, Brain, ArrowRight, GraduationCap, BookOpen } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HBK Careers — Free Career Guidance & College Directory for Gujarat Students" },
      {
        name: "description",
        content:
          "Free career guidance, Gujarat college directory, and a bilingual psychometric test for grades 6–12 with a detailed 20-page PDF report.",
      },
      { property: "og:title", content: "HBK Careers — Career Discovery for Gujarat Students" },
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
      tone: "indigo" as const,
    },
    {
      to: "/handbook" as const,
      icon: BookOpen,
      title: lang === "gu" ? "કારકિર્દી હેન્ડબુક" : "Career Handbook",
      desc:
        lang === "gu"
          ? "20 પ્રવાહોમાં 935+ વ્યવસાયો અને 1,400+ ટોચની સંસ્થાઓ."
          : "935+ professions and 1,400+ top institutes across 20 streams.",
      tone: "teal" as const,
    },
    {
      to: "/test" as const,
      icon: Brain,
      title: lang === "gu" ? "મનો-યોગ્યતા ટેસ્ટ" : "Psychometric Test",
      desc:
        lang === "gu"
          ? "RIASEC + MI + યોગ્યતા. દ્વિભાષી. 20-પાનાનો PDF રિપોર્ટ."
          : "RIASEC + MI + Aptitude. Bilingual. Instant 20-page PDF report.",
      tone: "saffron" as const,
    },
  ];

  const TONE: Record<"indigo" | "teal" | "saffron", string> = {
    indigo: "var(--brand-2)",
    teal: "var(--brand-3)",
    saffron: "var(--brand-5)",
  };

  const heroParts = T.hero1.split(" ");
  const heroFirst = heroParts.shift() ?? "";
  const heroRest = heroParts.join(" ");

  return (
    <PublicLayout>
      {/* Hero — ink block with colour-block tiles */}
      <section className="bg-[var(--ink)] text-[var(--cream)] border-b-4 border-[var(--ink)]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 border-2 border-[var(--cream)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] mb-6"
              style={{ background: "var(--brand-3)", color: "oklch(0.16 0.01 270)" }}
            >
              <GraduationCap className="h-3.5 w-3.5" />
              {lang === "gu" ? "મફત • કોઈ લૉગિન જરૂરી નથી" : "Free • No login required"}
            </div>
            <h1 className="display-caps text-5xl md:text-7xl">
              <span style={{ color: "var(--brand-5)" }}>{heroFirst}</span>{" "}
              <span>{heroRest}</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-[oklch(0.96_0.022_95_/_75%)] max-w-xl">
              {T.hero2}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/test"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wide border-2 border-[var(--cream)] shadow-[5px_5px_0_var(--cream)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform"
                style={{ background: "var(--brand-1)", color: "oklch(1 0 0)" }}
              >
                <Brain className="h-4 w-4" />
                {T.cta1}
              </Link>
              <Link
                to="/career"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wide border-2 border-[var(--cream)] text-[var(--cream)] hover:bg-[oklch(0.96_0.022_95_/_12%)] transition-colors"
              >
                <Compass className="h-4 w-4" style={{ color: "var(--brand-5)" }} />
                {T.cta2}
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {tiles.map((tile, i) => {
              const tone = TONE[tile.tone];
              return (
                <Link
                  key={tile.to}
                  to={tile.to}
                  className={`group border-2 border-[var(--cream)] p-5 transition-transform hover:-translate-y-1 ${
                    i === 2 ? "col-span-2" : ""
                  }`}
                  style={{ background: tone, color: "oklch(0.16 0.01 270)" }}
                >
                  <tile.icon className="h-7 w-7" />
                  <div className="mt-3 font-display text-base leading-tight">{tile.title}</div>
                  <div className="text-xs mt-1.5 opacity-80">{tile.desc}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <TrustLayer lang={lang} />

      <HowItWorks lang={lang} />

      <ReportPreview lang={lang} />

      <VibeQuizCard lang={lang} />

      {/* Streams strip */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <div className="flex items-end justify-between gap-3 mb-7">
          <div>
            <h2 className="display-caps text-3xl md:text-4xl">{T.streamsTitle}</h2>
            <p className="text-sm text-muted-foreground mt-2">{T.streamsSub}</p>
          </div>
          <Link
            to="/career"
            className="text-xs font-bold uppercase tracking-wide border-2 border-[var(--ink)] px-3 py-2 shrink-0 hover:bg-secondary"
          >
            {lang === "gu" ? "બધા જુઓ" : "View all"} →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STREAMS.map((s, i) => {
            const palette = ["--brand-1", "--brand-2", "--brand-3", "--brand-4", "--brand-5", "--brand-6"];
            const tone = `var(${palette[i % palette.length]})`;
            return (
              <Link
                key={s.id}
                to="/career/$stream"
                params={{ stream: s.id }}
                className="group relative bg-card border-2 border-[var(--ink)] shadow-[5px_5px_0_var(--ink)] p-5 transition-transform hover:-translate-x-1 hover:-translate-y-1"
              >
                <div className="h-3 -mx-5 -mt-5 mb-4" style={{ background: tone }} aria-hidden />
                <div className="text-3xl">{s.emoji}</div>
                <div className="mt-3 font-display text-lg leading-tight">
                  {lang === "gu" ? s.nameGu : s.name}
                </div>
                <div className="text-xs text-muted-foreground mt-1.5">
                  {lang === "gu" ? s.taglineGu : s.tagline}
                </div>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide">
                  {lang === "gu" ? "ખોલો" : "Explore"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>


      <FAQAccordion lang={lang} />
    </PublicLayout>
  );
}
