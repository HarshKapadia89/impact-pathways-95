import { createFileRoute, Link } from "@tanstack/react-router";
import { useUiLangEnGu } from "@/hooks/useUiLang";
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
  const lang = useUiLangEnGu();
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

  const TILE_TONE: Record<"indigo" | "teal" | "saffron", string> = {
    indigo: "var(--brand-1)",
    teal: "var(--brand-3)",
    saffron: "var(--brand-5)",
  };

  // Poster word-stack: each verb gets its own flat colour
  const STACK =
    lang === "gu"
      ? ["શોધો", "સમજો", "પસંદ કરો", "બનો"]
      : ["DISCOVER", "DECIDE", "DESIGN", "BECOME"];
  const STACK_TONE = ["var(--brand-4)", "var(--brand-1)", "var(--brand-3)", "var(--brand-2)"];

  return (
    <PublicLayout>
      {/* Hero — black poster with word stack */}
      <section className="bg-ink text-paper">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-ink"
              style={{ background: "var(--brand-5)" }}
            >
              <GraduationCap className="h-3.5 w-3.5" />
              {lang === "gu" ? "મફત • લૉગિન નહીં" : "Free • No login required"}
            </div>

            <div className="mt-6">
              {STACK.map((w, i) => (
                <div
                  key={w}
                  className="poster-title text-[13vw] sm:text-6xl lg:text-7xl"
                  style={{ color: STACK_TONE[i % STACK_TONE.length] }}
                >
                  {w}
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm md:text-base text-paper/75 max-w-lg leading-relaxed">
              {T.hero2}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/test"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-black uppercase tracking-widest text-ink border-2 border-ink block-shadow-hover"
                style={{ background: "var(--brand-5)", boxShadow: "5px 5px 0 0 var(--paper)" }}
              >
                <Brain className="h-4 w-4" />
                {T.cta1}
              </Link>
              <Link
                to="/career"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-black uppercase tracking-widest border-2 border-paper text-paper hover:bg-paper hover:text-ink transition-colors"
              >
                <Compass className="h-4 w-4" />
                {T.cta2}
              </Link>
            </div>
          </div>

          {/* Colour block tiles */}
          <div className="grid grid-cols-2 gap-0 border-4 border-paper">
            {tiles.map((tile, i) => (
              <Link
                key={tile.to}
                to={tile.to}
                className={`group p-6 border-paper text-ink transition-transform hover:-translate-y-1 ${i % 2 === 0 ? "border-r-4" : ""} ${i < 2 ? "border-b-4" : ""}`}
                style={{ background: TILE_TONE[tile.tone] }}
              >
                <tile.icon className="h-7 w-7" />
                <div className="mt-4 poster-title text-lg leading-none">{tile.title}</div>
                <div className="text-xs mt-2 font-medium text-ink/80">{tile.desc}</div>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest">
                  {lang === "gu" ? "ખોલો" : "Open"} <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
            {/* Filler block keeps the 2x2 grid solid */}
            <div className="p-6 flex items-end" style={{ background: "var(--brand-6)" }}>
              <div className="poster-title text-2xl text-paper leading-none">
                {lang === "gu" ? "20 પાનાનો રિપોર્ટ" : "20-PAGE REPORT"}
              </div>
            </div>
          </div>
        </div>
        <div className="h-3 stripe-band" aria-hidden />
      </section>


      <TrustLayer lang={lang} />

      <HowItWorks lang={lang} />

      <ReportPreview lang={lang} />

      <VibeQuizCard lang={lang} />


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
          {STREAMS.map((s, i) => {
            const palette = ["--brand-1", "--brand-2", "--brand-3", "--brand-4", "--brand-5", "--brand-6"];
            const tone = `var(${palette[i % palette.length]})`;
            return (
              <Link
                key={s.id}
                to="/career/$stream"
                params={{ stream: s.id }}
                className="group relative rounded-2xl border-2 border-border bg-card p-5 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
                style={{ borderLeftWidth: 4, borderLeftColor: tone }}
              >
                <div
                  className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{ background: tone }}
                  aria-hidden
                />
                <div className="text-3xl">{s.emoji}</div>
                <div className="mt-3 font-serif text-lg">{lang === "gu" ? s.nameGu : s.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {lang === "gu" ? s.taglineGu : s.tagline}
                </div>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium" style={{ color: tone }}>
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
