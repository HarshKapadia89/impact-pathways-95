import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { useUiLangEnGu } from "@/hooks/useUiLang";
import { Target, Compass, Languages, School, Brain, Users, ArrowRight, MapPin } from "lucide-react";

export const Route = createFileRoute("/vision")({
  head: () => ({
    meta: [
      { title: "Our Vision — HBK Careers | Career Clarity for Every Gujarat Student" },
      {
        name: "description",
        content:
          "The HBK Careers vision: every student in Gujarat should choose a career from evidence and self-knowledge, in their own language, with their family beside them.",
      },
      { property: "og:title", content: "Our Vision — HBK Careers" },
      {
        property: "og:description",
        content: "Career clarity for every student in Gujarat — evidence-based, trilingual, school-backed.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://hbkcareers.org/vision" },
    ],
    links: [{ rel: "canonical", href: "https://hbkcareers.org/vision" }],
  }),
  component: VisionPage,
});

function VisionPage() {
  const lang = useUiLangEnGu();

  const pillars = [
    {
      icon: Compass,
      tone: "var(--brand-1)",
      title: lang === "gu" ? "દરેક વિદ્યાર્થી માટે માર્ગદર્શન" : "Guidance for every student",
      desc:
        lang === "gu"
          ? "કારકિર્દી સલાહ ફક્ત મોટા શહેરોના થોડા વિદ્યાર્થીઓ સુધી સીમિત ન રહે — ગુજરાતના દરેક ખૂણે પહોંચે."
          : "Career guidance should not stop at a handful of metro schools. It should reach every taluka in Gujarat.",
    },
    {
      icon: Brain,
      tone: "var(--brand-3)",
      title: lang === "gu" ? "પુરાવા આધારિત મૂલ્યાંકન" : "Evidence-based assessment",
      desc:
        lang === "gu"
          ? "RIASEC, બહુવિધ બુદ્ધિ અને અભિરુચિ — સાબિત માળખાં પર આધારિત, ધોરણ પ્રમાણે અલગ પ્રશ્નબેંક."
          : "RIASEC, multiple intelligences and aptitude — established frameworks, with grade-banded item pools and quality checks on every response set.",
    },
    {
      icon: Languages,
      tone: "var(--brand-4)",
      title: lang === "gu" ? "પોતાની ભાષામાં" : "In the student's own language",
      desc:
        lang === "gu"
          ? "ટેસ્ટ, રિપોર્ટ અને સલાહ — ગુજરાતી, હિન્દી અને અંગ્રેજી ત્રણેમાં સમાન ગુણવત્તા સાથે."
          : "The test, the 20-page report and the counsellor summary exist in Gujarati, Hindi and English at equal quality — not as afterthought translations.",
    },
    {
      icon: School,
      tone: "var(--brand-5)",
      title: lang === "gu" ? "શાળા સાથે ભાગીદારી" : "Built with schools, not around them",
      desc:
        lang === "gu"
          ? "શિક્ષક અને સલાહકાર ડેશબોર્ડ, વર્ગ-સ્તરના રિપોર્ટ અને માતા-પિતા માટે સરળ ભાષામાં સારાંશ."
          : "Teacher and counsellor dashboards, cohort reports and a jargon-free parent summary — so the school stays part of the decision.",
    },
  ];

  const building = [
    {
      n: "01",
      t: lang === "gu" ? "શોધ" : "Discover",
      d:
        lang === "gu"
          ? "935+ વ્યવસાયો, 20 પ્રવાહો, કારકિર્દી કાર્ડ અને સરખામણી."
          : "935+ professions across 20 streams, trilingual career cards and side-by-side comparison.",
    },
    {
      n: "02",
      t: lang === "gu" ? "મૂલ્યાંકન" : "Assess",
      d:
        lang === "gu"
          ? "ધોરણ 6–12 માટે સાયકોમેટ્રિક + અભિરુચિ ટેસ્ટ અને 20-પાનાનો રિપોર્ટ."
          : "A psychometric and aptitude test for grades 6–12, ending in a 20-page personalised report.",
    },
    {
      n: "03",
      t: lang === "gu" ? "યોજના" : "Plan",
      d:
        lang === "gu"
          ? "કોલેજ ડિરેક્ટરી, પ્રવેશ પરીક્ષાઓ, શિષ્યવૃત્તિ અને 90-દિવસનો એક્શન પ્લાન."
          : "College directory, entrance exam calendar, scholarships and a 90-day action plan.",
    },
    {
      n: "04",
      t: lang === "gu" ? "સાથ" : "Support",
      d:
        lang === "gu"
          ? "HBK કારકિર્દી સલાહકાર ચેટ, રિઝ્યુમ બિલ્ડર અને શાળા કાર્યક્રમો."
          : "The HBK Career Counsellor chat, resume builder and structured school programmes.",
    },
  ];

  const goals = [
    { n: "1,00,000", l: lang === "gu" ? "વિદ્યાર્થીઓ સુધી પહોંચ" : "students reached" },
    { n: "500+", l: lang === "gu" ? "ભાગીદાર શાળાઓ" : "partner schools" },
    { n: "3", l: lang === "gu" ? "ભાષાઓ" : "languages, end to end" },
    { n: "33", l: lang === "gu" ? "ગુજરાતના જિલ્લા" : "districts of Gujarat" },
  ];

  return (
    <PublicLayout>
      <section className="border-b-4 border-ink">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-14 md:py-20">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-ink border-2 border-ink"
            style={{ background: "var(--brand-5)" }}
          >
            <Target className="h-3.5 w-3.5" />
            {lang === "gu" ? "અમારું વિઝન" : "Our vision"}
          </div>
          <h1 className="mt-6 poster-title text-[11vw] sm:text-6xl lg:text-7xl leading-[0.92]">
            {lang === "gu" ? (
              <>
                દરેક વિદ્યાર્થી
                <br />
                <span style={{ color: "var(--brand-1)" }}>પોતાની દિશા</span>
                <br />
                જાતે પસંદ કરે.
              </>
            ) : (
              <>
                EVERY STUDENT
                <br />
                <span style={{ color: "var(--brand-1)" }}>CHOOSES</span>
                <br />
                THEIR OWN PATH.
              </>
            )}
          </h1>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-foreground/80 leading-relaxed">
            {lang === "gu"
              ? "ધોરણ 10 અને 12 પછીના નિર્ણયો ડર, દબાણ કે અધૂરી માહિતીથી નહીં — પુરાવા, સ્વ-સમજ અને પરિવારના સાથથી લેવાય. HBK Careers આ જ માટે બન્યું છે."
              : "Decisions after Class 10 and 12 should come from evidence, self-knowledge and an informed family — not from fear, pressure or a neighbour's opinion. That single belief is why HBK Careers exists."}
          </p>
        </div>
        <div className="h-3 stripe-band" aria-hidden />
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-14">
        <h2 className="poster-title text-3xl md:text-4xl">
          {lang === "gu" ? "અમારા સ્તંભો" : "What we stand on"}
        </h2>
        <div className="mt-8 grid md:grid-cols-2 gap-0 border-4 border-ink block-shadow">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className={`p-6 md:p-8 border-ink ${i % 2 === 0 ? "md:border-r-4" : ""} ${i < 2 ? "border-b-4" : ""}`}
            >
              <div
                className="inline-flex items-center justify-center w-11 h-11 border-2 border-ink"
                style={{ background: p.tone }}
              >
                <p.icon className="h-5 w-5 text-ink" />
              </div>
              <div className="mt-4 poster-title text-xl leading-tight">{p.title}</div>
              <p className="mt-2 text-sm text-foreground/75 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y-4 border-ink" style={{ background: "var(--brand-6)" }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-14">
          <h2 className="poster-title text-3xl md:text-4xl text-paper">
            {lang === "gu" ? "અમે શું બનાવી રહ્યા છીએ" : "What we are building"}
          </h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {building.map((b) => (
              <div key={b.n} className="bg-paper border-2 border-ink p-5">
                <div className="poster-title text-3xl" style={{ color: "var(--brand-1)" }}>
                  {b.n}
                </div>
                <div className="mt-2 poster-title text-lg leading-tight">{b.t}</div>
                <p className="mt-2 text-xs text-ink/75 leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-14">
        <h2 className="poster-title text-3xl md:text-4xl">
          {lang === "gu" ? "અમારા લક્ષ્યાંક" : "The goals we hold ourselves to"}
        </h2>
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-0 border-4 border-ink">
          {goals.map((g, i) => (
            <div
              key={g.l}
              className={`p-6 text-center border-ink ${i < 3 ? "lg:border-r-4" : ""} ${i % 2 === 0 ? "border-r-4 lg:border-r-4" : ""} ${i < 2 ? "border-b-4 lg:border-b-0" : ""}`}
            >
              <div className="poster-title text-3xl md:text-4xl" style={{ color: "var(--brand-1)" }}>
                {g.n}
              </div>
              <div className="mt-2 text-[11px] font-black uppercase tracking-widest text-foreground/70">
                {g.l}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
          <span>
            {lang === "gu"
              ? "ધ એચ બી કાપડિયા ન્યૂ હાઈ સ્કૂલ, અમદાવાદ — 1925 થી ગુજરાતના વિદ્યાર્થીઓ સાથે."
              : "The H B Kapadia New High School, Ahmedabad — teaching Gujarat's students since 1925."}
          </span>
        </div>
      </section>

      <section className="border-t-4 border-ink" style={{ background: "var(--brand-5)" }}>
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-14 text-center">
          <h2 className="poster-title text-3xl md:text-5xl text-ink">
            {lang === "gu" ? "તમારી દિશા શોધો" : "FIND YOUR DIRECTION"}
          </h2>
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
              <Users className="h-4 w-4" />
              {lang === "gu" ? "શાળાઓ માટે" : "For schools"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
