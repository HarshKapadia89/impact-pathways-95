import { useLang, translator } from "@/lib/lang";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { TrustLayer } from "@/components/TrustLayer";
import { HowItWorks } from "@/components/HowItWorks";
import { ReportPreview } from "@/components/ReportPreview";
import { VibeQuizCard } from "@/components/VibeQuizCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { StatsBand } from "@/components/StatsBand";
import { FeatureShowcase } from "@/components/FeatureShowcase";
import { STREAMS } from "@/lib/careerData";
import { Compass, Brain, ArrowRight, GraduationCap, BookOpen } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HBK Careers — Free Career Test, 1,600+ Professions, Exams & Scholarships" },
      {
        name: "description",
        content:
          "One free platform for grades 6–12: psychometric test with a 20-page report, 1,600+ professions, 100 entrance exams, 100 scholarships, 150 free skill lessons, resume builder and an AI counsellor — in English, Gujarati, Hindi and Marathi.",
      },
      { property: "og:title", content: "HBK Careers — Find Your Direction, Free" },
      {
        property: "og:description",
        content: "Free career test, 1,600+ professions, exams, scholarships and skill lessons — in 4 languages.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const lang = useLang();
  const t = translator(lang);
  const T = {
    hero1: t({ en: "Find your direction.", gu: "તમારી દિશા શોધો.", hi: "अपनी दिशा खोजें.", mr: "तुमची दिशा शोधा." }),
    hero2: t({
      en: "Free career guidance and a psychometric test with a 20-page personalised report — for grades 6 through 12.",
      gu: "ધોરણ 6–12 માટે મફત કારકિર્દી માર્ગદર્શન અને 20-પાનાના વ્યક્તિગત રિપોર્ટ સાથેનો સાયકોમેટ્રિક ટેસ્ટ.",
      hi: "कक्षा 6–12 के लिए मुफ़्त करियर मार्गदर्शन और 20-पृष्ठ की व्यक्तिगत रिपोर्ट वाला साइकोमेट्रिक टेस्ट।",
      mr: "इयत्ता 6–12 साठी मोफत करिअर मार्गदर्शन आणि 20-पानी वैयक्तिक अहवालासह सायकोमेट्रिक चाचणी.",
    }),
    cta1: t({ en: "Take the test", gu: "ટેસ્ટ આપો", hi: "टेस्ट दें", mr: "चाचणी द्या" }),
    cta2: t({ en: "Career guidance", gu: "કારકિર્દી માર્ગદર્શન", hi: "करियर मार्गदर्शन", mr: "करिअर मार्गदर्शन" }),
    sectionsTitle: t({ en: "What to explore", gu: "શું અન્વેષણ કરશો?", hi: "क्या देखें", mr: "काय पाहावे" }),
    streamsTitle: t({
      en: "Your paths after Class 12",
      gu: "ધોરણ 12 પછીના તમારા માર્ગો",
      hi: "कक्षा 12 के बाद आपके रास्ते",
      mr: "इयत्ता 12 नंतरचे तुमचे मार्ग",
    }),
    streamsSub: t({
      en: "Deep guides on careers, entrance exams and salaries — per stream.",
      gu: "દરેક પ્રવાહ માટે કારકિર્દી, પ્રવેશ પરીક્ષાઓ અને પગારની વિગતવાર માર્ગદર્શિકા.",
      hi: "हर स्ट्रीम के लिए करियर, प्रवेश परीक्षाओं और वेतन की विस्तृत गाइड।",
      mr: "प्रत्येक प्रवाहासाठी करिअर, प्रवेश परीक्षा आणि वेतनाची सविस्तर माहिती.",
    }),
  };

  const tiles = [
    {
      to: "/career" as const,
      icon: Compass,
      title: t({ en: "Career Guidance", gu: "કારકિર્દી માર્ગદર્શન", hi: "करियर मार्गदर्शन", mr: "करिअर मार्गदर्शन" }),
      desc: t({
        en: "Detailed guides for Science, Commerce, Humanities and Vocational paths.",
        gu: "વિજ્ઞાન, વાણિજ્ય, માનવવિદ્યા અને વ્યાવસાયિક માર્ગો માટે વિગતવાર માર્ગદર્શિકા.",
        hi: "विज्ञान, वाणिज्य, मानविकी और व्यावसायिक रास्तों के लिए विस्तृत गाइड।",
        mr: "विज्ञान, वाणिज्य, मानव्यविद्या आणि व्यावसायिक मार्गांसाठी सविस्तर मार्गदर्शक.",
      }),
      tone: "indigo" as const,
    },
    {
      to: "/career-library" as const,
      icon: BookOpen,
      title: t({ en: "Career Library", gu: "કારકિર્દી લાઇબ્રેરી", hi: "करियर लाइब्रेरी", mr: "करिअर लायब्ररी" }),
      desc: t({
        en: "1,600+ professions and 1,900+ top institutes across 48 streams.",
        gu: "48 પ્રવાહોમાં 1,600+ વ્યવસાયો અને 1,900+ ટોચની સંસ્થાઓ.",
        hi: "48 स्ट्रीम में 1,600+ पेशे और 1,900+ शीर्ष संस्थान।",
        mr: "48 प्रवाहांमध्ये 1,600+ व्यवसाय आणि 1,900+ आघाडीच्या संस्था.",
      }),
      tone: "teal" as const,
    },
    {
      to: "/test" as const,
      icon: Brain,
      title: t({ en: "Psychometric Test", gu: "મનો-યોગ્યતા ટેસ્ટ", hi: "साइकोमेट्रिक टेस्ट", mr: "सायकोमेट्रिक चाचणी" }),
      desc: t({
        en: "RIASEC + MI + Aptitude. Four languages. Instant 20-page PDF report.",
        gu: "RIASEC + MI + યોગ્યતા. ચાર ભાષાઓ. તરત જ 20-પાનાનો PDF રિપોર્ટ.",
        hi: "RIASEC + MI + योग्यता। चार भाषाएँ। तुरंत 20-पृष्ठ PDF रिपोर्ट।",
        mr: "RIASEC + MI + अभिक्षमता. चार भाषा. लगेच 20-पानी PDF अहवाल.",
      }),
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
      {/* Hero — soft cream field with tinted feature cards */}
      <section style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold text-foreground mb-6">
              <GraduationCap className="h-3.5 w-3.5" style={{ color: "var(--accent)" }} />
              {t({
                en: "Free • No login • 4 languages • Grades 6–12",
                gu: "મફત • લૉગિન વગર • 4 ભાષાઓ • ધોરણ 6–12",
                hi: "मुफ़्त • बिना लॉगिन • 4 भाषाएँ • कक्षा 6–12",
                mr: "मोफत • लॉगिन नाही • 4 भाषा • इयत्ता 6–12",
              })}
            </div>
            <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight">
              <span style={{ color: "var(--accent)" }}>{heroFirst}</span> <span>{heroRest}</span>
            </h1>
            <p className="mt-4 font-serif italic text-lg md:text-xl" style={{ color: "var(--accent)" }}>
              {t({
                en: "Building futures, one student at a time.",
                gu: "ભવિષ્ય ઘડીએ, એક-એક વિદ્યાર્થી સાથે.",
                hi: "भविष्य बनाते हैं, एक-एक विद्यार्थी के साथ।",
                mr: "भविष्य घडवूया, एकेका विद्यार्थ्यासोबत.",
              })}
            </p>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
              {T.hero2}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/test"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow-primary)] transition-transform hover:-translate-y-0.5"
              >
                <Brain className="h-4 w-4" />
                {T.cta1}
              </Link>
              <Link
                to="/career"
                className="inline-flex items-center gap-2 rounded-xl border border-accent/50 bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-[var(--shadow-soft)] transition-colors hover:bg-accent/10"
              >
                <Compass className="h-4 w-4" style={{ color: "var(--accent)" }} />
                {T.cta2}
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tiles.map((tile, i) => {
              const tone = TONE[tile.tone];
              return (
                <Link
                  key={tile.to}
                  to={tile.to}
                  className={`group rounded-2xl border border-border bg-card/80 backdrop-blur p-5 shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1 ${
                    i === 2 ? "sm:col-span-2" : ""
                  }`}
                >
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ background: `color-mix(in oklab, ${tone} 16%, transparent)`, color: tone }}
                  >
                    <tile.icon className="h-6 w-6" />
                  </span>
                  <div className="mt-4 font-serif text-lg leading-tight">{tile.title}</div>
                  <div className="text-sm mt-1.5 text-muted-foreground leading-relaxed">{tile.desc}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <StatsBand lang={lang} />

      <FeatureShowcase lang={lang} />

      <TrustLayer lang={lang} />

      <HowItWorks lang={lang} />

      <ReportPreview lang={lang} />

      <VibeQuizCard lang={lang} />

      {/* Streams strip */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <div className="flex items-end justify-between gap-3 mb-7">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight">{T.streamsTitle}</h2>
            <p className="text-sm text-muted-foreground mt-2">{T.streamsSub}</p>
          </div>
          <Link
            to="/career"
            className="text-xs font-semibold rounded-full border border-border px-3.5 py-2 shrink-0 hover:bg-accent/10"
          >
            {t({ en: "View all", gu: "બધા જુઓ", hi: "सभी देखें", mr: "सर्व पाहा" })} →
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
                className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-[var(--shadow-soft)] p-5 transition-transform hover:-translate-y-1"
              >
                <div className="h-1.5 -mx-5 -mt-5 mb-4" style={{ background: tone }} aria-hidden />
                <div className="text-3xl">{s.emoji}</div>
                <div className="mt-3 font-serif text-lg leading-tight">
                  {lang === "gu" ? s.nameGu : s.name}
                </div>
                <div className="text-sm text-muted-foreground mt-1.5">
                  {lang === "gu" ? s.taglineGu : s.tagline}
                </div>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: "var(--accent)" }}>
                  {t({ en: "Explore", gu: "ખોલો", hi: "देखें", mr: "पाहा" })}
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>



      {/* Final CTA band */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <div
          className="rounded-3xl px-6 md:px-12 py-12 md:py-16 text-center text-primary-foreground shadow-[var(--shadow-glow-primary)]"
          style={{
            background:
              "linear-gradient(135deg, var(--primary), color-mix(in oklab, var(--primary) 65%, var(--accent)))",
          }}
        >
          <h2 className="font-serif text-3xl md:text-4xl leading-tight">
            {t({
              en: "Ready to find your direction?",
              gu: "તમારી દિશા શોધવા તૈયાર છો?",
              hi: "अपनी दिशा खोजने के लिए तैयार हैं?",
              mr: "तुमची दिशा शोधायला तयार आहात?",
            })}
          </h2>
          <p className="mt-3 text-sm md:text-base opacity-90 max-w-xl mx-auto">
            {t({
              en: "25 minutes. Your language. A 20-page report that shows the way.",
              gu: "25 મિનિટ. તમારી ભાષા. 20-પાનાનો રિપોર્ટ જે માર્ગ બતાવે.",
              hi: "25 मिनट। आपकी भाषा। 20-पृष्ठ की रिपोर्ट जो रास्ता दिखाए।",
              mr: "25 मिनिटे. तुमची भाषा. मार्ग दाखवणारा 20-पानी अहवाल.",
            })}
          </p>
          <Link
            to="/test"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-card px-7 py-3.5 text-sm font-bold text-foreground shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <Brain className="h-4 w-4" style={{ color: "var(--accent)" }} />
            {T.cta1}
            <ArrowRight className="h-4 w-4" style={{ color: "var(--accent)" }} />
          </Link>
        </div>
      </section>

      <FAQAccordion lang={lang} />
    </PublicLayout>
  );
}
