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

  const TONE: Record<"indigo" | "teal" | "saffron", { bg: string; ring: string; iconBg: string; iconColor: string }> = {
    indigo:  { bg: "from-[oklch(0.32_0.11_270/0.08)] to-transparent", ring: "hover:ring-[var(--brand-1)]/30", iconBg: "bg-[oklch(0.32_0.11_270/0.12)]", iconColor: "text-[var(--brand-1)]" },
    teal:    { bg: "from-[oklch(0.62_0.15_150/0.10)] to-transparent", ring: "hover:ring-[var(--brand-3)]/30", iconBg: "bg-[oklch(0.62_0.15_150/0.14)]", iconColor: "text-[var(--brand-3)]" },
    saffron: { bg: "from-[oklch(0.78_0.15_60/0.14)]  to-transparent", ring: "hover:ring-[var(--brand-2)]/40", iconBg: "bg-[oklch(0.78_0.15_60/0.18)]",  iconColor: "text-[var(--brand-2)]" },
  };

  // Highlight first word of headline in saffron for warmth
  const heroParts = T.hero1.split(" ");
  const heroFirst = heroParts.shift() ?? "";
  const heroRest = heroParts.join(" ");

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        {/* soft saffron blob */}
        <div
          className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full blur-3xl opacity-40 -z-10"
          style={{ background: "var(--brand-2)" }}
          aria-hidden
        />
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-xs text-primary font-medium mb-5 shadow-sm">
              <GraduationCap className="h-3.5 w-3.5" />
              {lang === "gu" ? "મફત • કોઈ લૉગિન જરૂરી નથી" : "Free • No login required"}
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground leading-tight">
              <span style={{ color: "var(--brand-2)" }}>{heroFirst}</span>{" "}
              <span>{heroRest}</span>
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl">
              {T.hero2}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/test"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-md px-5 py-3 text-sm font-medium shadow-[var(--shadow-glow-primary)] hover:opacity-95 hover:-translate-y-0.5 transition"
              >
                <Brain className="h-4 w-4" />
                {T.cta1}
              </Link>
              <Link
                to="/career"
                className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold border-2 border-accent text-primary bg-card hover:bg-accent/15 hover:-translate-y-0.5 transition"
              >
                <Compass className="h-4 w-4" style={{ color: "var(--brand-2)" }} />
                {T.cta2}
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {tiles.map((tile) => {
              const tone = TONE[tile.tone];
              return (
                <Link
                  key={tile.to}
                  to={tile.to}
                  className={`group rounded-2xl border border-border bg-card p-5 ring-1 ring-transparent transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card)] hover:ring-2 ${tone.ring} bg-gradient-to-br ${tone.bg}`}
                >
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${tone.iconBg}`}>
                    <tile.icon className={`h-5 w-5 ${tone.iconColor}`} />
                  </div>
                  <div className="mt-3 font-serif text-base">{tile.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{tile.desc}</div>
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
                className="group relative rounded-2xl border border-border bg-card p-5 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
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
