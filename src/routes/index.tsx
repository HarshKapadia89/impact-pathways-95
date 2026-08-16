import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useUiLangEnGu } from "@/hooks/useUiLang";
import { PublicLayout } from "@/components/PublicLayout";
import { TrustLayer } from "@/components/TrustLayer";
import { HowItWorks } from "@/components/HowItWorks";
import { ReportPreview } from "@/components/ReportPreview";
import { VibeQuizCard } from "@/components/VibeQuizCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { STREAMS } from "@/lib/careerData";
import { Compass, Brain, ArrowRight, GraduationCap, BookOpen, Search, Award, FileCheck, FileText, LayoutDashboard, MessageCircle, Building2, Languages, Target } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HBK Careers — Career Discovery, Aptitude Test & College Guide for Gujarat" },
      {
        name: "description",
        content:
          "Career guidance, a Gujarat college directory, scholarships, entrance exams and a trilingual psychometric test for grades 6–12 with a 20-page PDF report.",
      },
      { property: "og:title", content: "HBK Careers — Career Discovery for Gujarat Students" },
      { property: "og:description", content: "Guidance, colleges, scholarships and a 20-page psychometric report." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const lang = useUiLangEnGu();
  const [activeWord, setActiveWord] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setActiveWord((v) => (v + 1) % 4), 1600);
    return () => window.clearInterval(id);
  }, []);
  const T = {
    hero1: lang === "gu" ? "તમારી દિશા શોધો." : "Find your direction.",
    hero2:
      lang === "gu"
        ? "ધોરણ 6–12 માટે કારકિર્દી શોધ, ત્રિભાષી સાયકોમેટ્રિક ટેસ્ટ અને 20-પાનાનો વ્યક્તિગત રિપોર્ટ."
        : "Career discovery, a trilingual psychometric test and a 20-page personalised report — everything a student in grades 6 to 12 needs to choose well.",
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

  const FEATURES_LIST = [
    {
      to: "/test" as const,
      icon: Brain,
      tone: "var(--brand-5)",
      title: lang === "gu" ? "એપ્ટિટ્યુડ + સાયકોમેટ્રિક ટેસ્ટ" : "Aptitude + psychometric test",
      desc:
        lang === "gu"
          ? "RIASEC, બહુવિધ બુદ્ધિ અને અભિરુચિ — ધોરણ પ્રમાણે, ત્રણ ભાષામાં."
          : "RIASEC, multiple intelligences and aptitude — grade-banded, in English, Hindi and Gujarati.",
    },
    {
      to: "/test" as const,
      icon: FileCheck,
      tone: "var(--brand-1)",
      title: lang === "gu" ? "20-પાનાનો રિપોર્ટ" : "20-page personalised report",
      desc:
        lang === "gu"
          ? "ચાર્ટ, કારકિર્દી મેચ, માતા-પિતા માટે સરળ સારાંશ અને 90-દિવસનો પ્લાન."
          : "Charts, career matches, a plain-language parent summary and a 90-day action plan.",
    },
    {
      to: "/career" as const,
      icon: Compass,
      tone: "var(--brand-3)",
      title: lang === "gu" ? "ગુજરાત કારકિર્દી માર્ગદર્શન" : "Gujarat career guidance",
      desc:
        lang === "gu"
          ? "વિજ્ઞાન, વાણિજ્ય, માનવવિદ્યા અને વ્યાવસાયિક પ્રવાહની ઊંડી ગાઇડ."
          : "Deep guides for Science, Commerce, Humanities and Vocational paths, written for Gujarat.",
    },
    {
      to: "/handbook" as const,
      icon: BookOpen,
      tone: "var(--brand-4)",
      title: lang === "gu" ? "ભારત કારકિર્દી હેન્ડબુક" : "India career handbook",
      desc:
        lang === "gu"
          ? "20 પ્રવાહોમાં 935+ વ્યવસાયો, કારકિર્દી કાર્ડ અને સરખામણી."
          : "935+ professions across 20 streams, with trilingual career cards and comparison.",
    },
    {
      to: "/find-college" as const,
      icon: Search,
      tone: "var(--brand-2)",
      title: lang === "gu" ? "કોલેજ શોધો" : "College finder",
      desc:
        lang === "gu"
          ? "1,400+ સંસ્થાઓ — શહેર, પ્રવાહ અને ફી પ્રમાણે ફિલ્ટર કરો."
          : "1,400+ institutes, filterable by city, stream and fees — Gujarat first, India next.",
    },
    {
      to: "/scholarships" as const,
      icon: Award,
      tone: "var(--brand-6)",
      title: lang === "gu" ? "શિષ્યવૃત્તિ" : "Scholarships",
      desc:
        lang === "gu"
          ? "રાજ્ય અને કેન્દ્ર સરકારની યોજનાઓ, પાત્રતા અને છેલ્લી તારીખો."
          : "State and central government schemes with eligibility, amounts and deadlines.",
    },
    {
      to: "/exams" as const,
      icon: FileCheck,
      tone: "var(--brand-1)",
      title: lang === "gu" ? "પ્રવેશ પરીક્ષાઓ" : "Entrance exams",
      desc:
        lang === "gu"
          ? "JEE, NEET, CLAT, GUJCET અને વધુ — તારીખો, પેટર્ન અને તૈયારી."
          : "JEE, NEET, CLAT, GUJCET and more — dates, patterns and preparation notes.",
    },
    {
      to: "/profile-builder" as const,
      icon: FileText,
      tone: "var(--brand-3)",
      title: lang === "gu" ? "રિઝ્યુમ બિલ્ડર" : "Resume builder",
      desc:
        lang === "gu"
          ? "ફોર્મ ભરો અને એક ક્લિકમાં પ્રોફેશનલ PDF રિઝ્યુમ મેળવો."
          : "Fill a simple form and export a polished student resume as a PDF in one click.",
    },
    {
      to: "/dashboard" as const,
      icon: LayoutDashboard,
      tone: "var(--brand-4)",
      title: lang === "gu" ? "વિદ્યાર્થી ડેશબોર્ડ" : "Student dashboard",
      desc:
        lang === "gu"
          ? "તમારા રિપોર્ટ, બુકમાર્ક કરેલી કારકિર્દી અને આગળના પગલાં એક જગ્યાએ."
          : "Your reports, bookmarked careers and next steps tracked in one place.",
    },
    {
      to: "/test" as const,
      icon: MessageCircle,
      tone: "var(--brand-5)",
      title: lang === "gu" ? "HBK કારકિર્દી સલાહકાર" : "HBK Career Counsellor",
      desc:
        lang === "gu"
          ? "AI સલાહકાર સાથે ચેટ કરો — તમારા પ્રશ્નોના જવાબ, તમારી ભાષામાં."
          : "Chat with the AI counsellor for answers about streams, colleges and careers.",
    },
    {
      to: "/for-schools" as const,
      icon: Building2,
      tone: "var(--brand-2)",
      title: lang === "gu" ? "શાળા કાર્યક્રમો" : "School programmes",
      desc:
        lang === "gu"
          ? "વર્ગ-સ્તરના રિપોર્ટ, સલાહકાર ડેશબોર્ડ અને ઓનબોર્ડિંગ સપોર્ટ."
          : "Cohort reports, counsellor dashboards and onboarding support for schools.",
    },
    {
      to: "/parents" as const,
      icon: Languages,
      tone: "var(--brand-6)",
      title: lang === "gu" ? "માતા-પિતા માટે" : "For parents",
      desc:
        lang === "gu"
          ? "સરળ ભાષામાં સમજૂતી — ગુજરાતી, હિન્દી અને અંગ્રેજીમાં."
          : "Plain-language explanations of every result, in Gujarati, Hindi or English.",
    },
  ];

  return (
    <PublicLayout>
      {/* Hero — cream poster with an animated word stack */}
      <section className="bg-background text-foreground relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 halftone opacity-[0.18]"
          aria-hidden
        />
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 grid lg:grid-cols-2 gap-10 items-center relative">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-ink border-2 border-ink"
              style={{ background: "var(--brand-5)" }}
            >
              <GraduationCap className="h-3.5 w-3.5" />
              {lang === "gu" ? "ધોરણ 6–12 • ગુજરાત માટે" : "Grades 6–12 • Built for Gujarat"}
            </div>


            <div className="mt-6">
              {STACK.map((w, i) => (
                <button
                  key={w}
                  type="button"
                  onMouseEnter={() => setActiveWord(i)}
                  onFocus={() => setActiveWord(i)}
                  className="block text-left poster-title text-[13vw] sm:text-6xl lg:text-7xl transition-transform duration-200 hover:translate-x-2 focus:outline-none"
                  style={{
                    color: activeWord === i ? STACK_TONE[i % STACK_TONE.length] : "var(--ink)",
                  }}
                >
                  {w}
                </button>
              ))}
            </div>

            <p className="mt-6 text-base md:text-lg text-foreground/80 max-w-lg leading-relaxed">
              {T.hero2}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/test"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-black uppercase tracking-widest text-ink border-2 border-ink tile-lift"
                style={{ background: "var(--brand-5)", boxShadow: "5px 5px 0 0 var(--ink)" }}
              >
                <Brain className="h-4 w-4" />
                {T.cta1}
              </Link>
              <Link
                to="/career"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-black uppercase tracking-widest border-2 border-ink text-ink hover:bg-ink hover:text-paper transition-colors"
              >
                <Compass className="h-4 w-4" />
                {T.cta2}
              </Link>
            </div>

            {/* Quick facts chips */}
            <div className="mt-8 flex flex-wrap gap-2">
              {(lang === "gu"
                ? ["20 મિનિટ", "20-પાનાનો રિપોર્ટ", "3 ભાષાઓ", "ધોરણ 6–12"]
                : ["20 minutes", "20-page report", "3 languages", "Grades 6–12"]
              ).map((chip, i) => (
                <span
                  key={chip}
                  className="px-3 py-1.5 text-[11px] font-black uppercase tracking-widest border-2 border-ink"
                  style={{
                    background: i % 2 === 0 ? "var(--paper)" : "var(--brand-5)",
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Colour block tiles */}
          <div className="grid grid-cols-2 gap-0 border-4 border-ink block-shadow">
            {tiles.map((tile, i) => (
              <Link
                key={tile.to}
                to={tile.to}
                className={`group p-6 border-ink text-ink transition-all hover:brightness-105 ${i % 2 === 0 ? "border-r-4" : ""} ${i < 2 ? "border-b-4" : ""}`}
                style={{ background: TILE_TONE[tile.tone] }}
              >
                <tile.icon className="h-7 w-7 transition-transform group-hover:scale-125 group-hover:-rotate-6" />
                <div className="mt-4 poster-title text-lg leading-none">{tile.title}</div>
                <div className="text-xs mt-2 font-medium text-ink/80">{tile.desc}</div>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest">
                  {lang === "gu" ? "ખોલો" : "Open"}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
            {/* Filler block keeps the 2x2 grid solid */}
            <Link
              to="/test"
              className="group p-6 flex flex-col justify-end"
              style={{ background: "var(--brand-6)" }}
            >
              <div className="poster-title text-2xl text-paper leading-none">
                {lang === "gu" ? "20 પાનાનો રિપોર્ટ" : "20-PAGE REPORT"}
              </div>
              <div className="mt-3 inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-paper">
                {lang === "gu" ? "ખોલો" : "Open"}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
        <div className="h-3 stripe-band" aria-hidden />
      </section>

      {/* Scrolling marquee ticker */}
      <div className="overflow-hidden border-b-4 border-ink bg-ink/[0.03] py-2.5">
        <div className="poster-marquee whitespace-nowrap flex w-max">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center">
              {(lang === "gu"
                ? ["એપ્ટિટ્યુડ ટેસ્ટ", "935+ વ્યવસાયો", "1,400+ સંસ્થાઓ", "20 પ્રવાહો", "ગુજરાતની કોલેજો", "શિષ્યવૃત્તિ"]
                : ["APTITUDE TEST", "935+ PROFESSIONS", "1,400+ INSTITUTES", "20 STREAMS", "GUJARAT COLLEGES", "SCHOLARSHIPS"]
              ).map((word, i) => (
                <span key={`${dup}-${word}`} className="flex items-center">
                  <span className="px-5 text-sm font-black uppercase tracking-[0.18em]">{word}</span>
                  <span
                    className="h-3 w-3 shrink-0"
                    style={{ background: STACK_TONE[i % STACK_TONE.length] }}
                    aria-hidden
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>




      {/* Everything inside the platform */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <div className="max-w-2xl">
          <h2 className="poster-title text-3xl md:text-5xl leading-[0.95]">
            {lang === "gu" ? "એક જ જગ્યાએ બધું" : "EVERYTHING IN ONE PLACE"}
          </h2>
          <p className="mt-3 text-sm md:text-base text-foreground/75">
            {lang === "gu"
              ? "ટેસ્ટથી લઈને કોલેજ, શિષ્યવૃત્તિ, પરીક્ષા અને રિઝ્યુમ સુધી — કારકિર્દીના દરેક પગલા માટે એક પ્લેટફોર્મ."
              : "From the aptitude test to colleges, scholarships, exams and your first resume — one platform for every step of the decision."}
          </p>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-0 border-4 border-ink block-shadow">
          {FEATURES_LIST.map((f, i) => (
            <Link
              key={f.to + f.title}
              to={f.to}
              className="group p-6 border-ink border-b-4 sm:border-r-4 last:border-b-0 transition-colors hover:bg-ink/[0.04]"
            >
              <div
                className="inline-flex items-center justify-center w-11 h-11 border-2 border-ink transition-transform group-hover:-rotate-6"
                style={{ background: f.tone }}
              >
                <f.icon className="h-5 w-5 text-ink" />
              </div>
              <div className="mt-4 poster-title text-lg leading-tight">{f.title}</div>
              <p className="mt-2 text-xs text-foreground/75 leading-relaxed">{f.desc}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-widest">
                {lang === "gu" ? "ખોલો" : "Open"}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Vision teaser */}
      <section className="border-y-4 border-ink" style={{ background: "var(--brand-6)" }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-14 grid md:grid-cols-[1.4fr_1fr] gap-8 items-center">
          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.25em] text-paper/60">
              {lang === "gu" ? "અમારું વિઝન" : "Our vision"}
            </div>
            <h2 className="mt-3 poster-title text-3xl md:text-5xl text-paper leading-[0.95]">
              {lang === "gu" ? "દરેક વિદ્યાર્થી પોતાની દિશા જાતે પસંદ કરે." : "EVERY STUDENT CHOOSES THEIR OWN PATH."}
            </h2>
            <p className="mt-4 text-sm md:text-base text-paper/80 max-w-xl leading-relaxed">
              {lang === "gu"
                ? "પુરાવા, સ્વ-સમજ અને પરિવારના સાથથી લેવાયેલા નિર્ણય — ડર કે દબાણથી નહીં."
                : "Decisions made from evidence, self-knowledge and an informed family — not from fear or pressure."}
            </p>
          </div>
          <Link
            to="/vision"
            className="justify-self-start md:justify-self-end inline-flex items-center gap-2 px-6 py-3.5 text-sm font-black uppercase tracking-widest bg-paper text-ink border-2 border-ink tile-lift"
            style={{ boxShadow: "5px 5px 0 0 var(--brand-5)" }}
          >
            <Target className="h-4 w-4" />
            {lang === "gu" ? "વિઝન વાંચો" : "Read the vision"}
          </Link>
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

      {/* Closing CTA band */}
      <section className="border-t-4 border-ink" style={{ background: "var(--brand-5)" }}>
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-14 text-center">
          <h2 className="poster-title text-3xl md:text-5xl text-ink leading-[0.95]">
            {lang === "gu" ? "આજે જ શરૂ કરો" : "START TODAY"}
          </h2>
          <p className="mt-3 text-sm md:text-base text-ink/80">
            {lang === "gu"
              ? "20 મિનિટનો ટેસ્ટ, 20-પાનાનો રિપોર્ટ, અને આગળનાં 90 દિવસનો સ્પષ્ટ પ્લાન."
              : "A 20-minute test, a 20-page report, and a clear plan for the next 90 days."}
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              to="/test"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-black uppercase tracking-widest bg-paper text-ink border-2 border-ink tile-lift"
              style={{ boxShadow: "5px 5px 0 0 var(--ink)" }}
            >
              <Brain className="h-4 w-4" />
              {lang === "gu" ? "ટેસ્ટ આપો" : "Take the test"}
            </Link>
            <Link
              to="/for-schools"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-black uppercase tracking-widest border-2 border-ink text-ink hover:bg-ink hover:text-paper transition-colors"
            >
              <Building2 className="h-4 w-4" />
              {lang === "gu" ? "શાળાઓ માટે" : "For schools"}
            </Link>
          </div>
        </div>
      </section>

    </PublicLayout>
  );
}
