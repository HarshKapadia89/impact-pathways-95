import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/PublicLayout";
import {
  Brain,
  Globe2,
  FileText,
  Sparkles,
  ChevronRight,
  Compass,
  Layers,
  Target,
  CheckCircle2,
  GraduationCap,
  Map,
  ShieldCheck,
  Clock,
  Award,
  BookOpen,
  Lightbulb,
  Star,
  TrendingUp,
  CalendarCheck,
  ListChecks,
  Rocket,
} from "lucide-react";
import sampleCover from "@/assets/sample-report-cover.jpg";
import sampleRiasec from "@/assets/sample-report-riasec.jpg";
import sampleMI from "@/assets/sample-report-mi.jpg";
import sampleCareers from "@/assets/sample-report-careers.jpg";
import sampleActionPlan from "@/assets/sample-report-action-plan.jpg";

export const Route = createFileRoute("/test/")({
  head: () => ({
    meta: [
      { title: "Free Bilingual Psychometric Test (Grades 6–12) — 20-page PDF | HBK Careers" },
      {
        name: "description",
        content:
          "Free RIASEC + Multiple Intelligences + Aptitude test in English & Gujarati for grades 6–12. Get a detailed 20-page PDF report with stream, college and career recommendations.",
      },
      { property: "og:title", content: "Free Psychometric Test — HBK Careers" },
      {
        property: "og:description",
        content:
          "Bilingual RIASEC + MI + Aptitude assessment with a 20-page personalised PDF report.",
      },
      { property: "og:image", content: sampleCover },
      { name: "twitter:image", content: sampleCover },
    ],
  }),
  component: TestIntro,
});

function TestIntro() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith("gu") ? "gu" : "en") as "en" | "gu";
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [age, setAge] = useState("");
  const [language, setLanguage] = useState<"en" | "gu">(lang);

  const start = () => {
    sessionStorage.setItem(
      "disha-test-meta",
      JSON.stringify({ name: name || "Student", grade, age, language })
    );
    navigate({ to: "/test/take" });
  };

  const t = (en: string, gu: string) => (lang === "gu" ? gu : en);

  const frameworks = [
    {
      icon: Compass,
      tag: t("Part 1 · 30 questions", "ભાગ 1 · 30 પ્રશ્નો"),
      title: t("RIASEC Interest Inventory", "RIASEC રુચિ વિશ્લેષણ"),
      desc: t(
        "Based on Dr. John Holland's vocational theory used by counsellors worldwide. Maps you across six interest types — Realistic, Investigative, Artistic, Social, Enterprising and Conventional — to reveal the work environments where you naturally thrive.",
        "ડૉ. જોન હોલેન્ડના વોકેશનલ થિયરી પર આધારિત — જે વિશ્વભરના કાઉન્સેલર્સ દ્વારા ઉપયોગમાં લેવાય છે. છ રુચિ પ્રકારો — રિયલિસ્ટિક, ઇન્વેસ્ટિગેટિવ, આર્ટિસ્ટિક, સોશિયલ, એન્ટરપ્રાઇઝિંગ અને કન્વેન્શનલ — પર તમારું મેપિંગ કરે છે."
      ),
      points: [
        t("6-letter interest profile", "6-અક્ષરી રુચિ પ્રોફાઇલ"),
        t("Top 3 Holland code", "ટોપ 3 હોલેન્ડ કોડ"),
        t("Matching career clusters", "મેળ ખાતા કારકિર્દી ક્લસ્ટરો"),
      ],
    },
    {
      icon: Layers,
      tag: t("Part 2 · 32 questions", "ભાગ 2 · 32 પ્રશ્નો"),
      title: t("Multiple Intelligences (Gardner)", "મલ્ટિપલ ઇન્ટેલિજન્સ (ગાર્ડનર)"),
      desc: t(
        "Howard Gardner's framework recognises that intelligence is not a single number. We measure all 8 intelligences — Linguistic, Logical-Mathematical, Spatial, Musical, Bodily-Kinesthetic, Interpersonal, Intrapersonal and Naturalistic — to show how your mind is wired.",
        "હોવર્ડ ગાર્ડનરનું માળખું દર્શાવે છે કે બુદ્ધિ માત્ર એક નંબર નથી. અમે તમામ 8 ઇન્ટેલિજન્સ માપીએ છીએ — ભાષાકીય, તાર્કિક-ગાણિતિક, અવકાશીય, સંગીત, શારીરિક, આંતર-વ્યક્તિગત, સ્વ-વ્યક્તિગત અને કુદરતી."
      ),
      points: [
        t("8-axis intelligence map", "8-અક્ષ ઇન્ટેલિજન્સ મેપ"),
        t("Strengths vs growth areas", "શક્તિ vs વિકાસ ક્ષેત્રો"),
        t("Subject-wise study tips", "વિષય-વાર અભ્યાસ ટિપ્સ"),
      ],
    },
    {
      icon: Target,
      tag: t("Part 3 · 25 questions", "ભાગ 3 · 25 પ્રશ્નો"),
      title: t("Aptitude Snapshot", "યોગ્યતા સ્નેપશોટ"),
      desc: t(
        "A balanced look at five core aptitudes — Numerical, Verbal, Spatial-Logical, Mechanical and Creative reasoning — to indicate where your raw cognitive strengths lie and which entrance exams will play to them.",
        "પાંચ મુખ્ય યોગ્યતાઓ — સંખ્યાત્મક, મૌખિક, અવકાશીય-તાર્કિક, યાંત્રિક અને સર્જનાત્મક — નું સંતુલિત મૂલ્યાંકન જે દર્શાવે છે કે તમારી મૂળ ક્ષમતાઓ ક્યાં છે અને કયા પ્રવેશ પરીક્ષા તમને અનુકૂળ આવશે."
      ),
      points: [
        t("5 aptitude sub-scores", "5 યોગ્યતા સબ-સ્કોર"),
        t("Entrance exam fit", "પ્રવેશ પરીક્ષા ફિટ"),
        t("Skill-building roadmap", "કૌશલ્ય-નિર્માણ રોડમેપ"),
      ],
    },
  ];

  const reportSections = [
    {
      img: sampleCover,
      title: t("Personalised Cover", "વ્યક્તિગત કવર"),
      desc: t(
        "Your name, grade, school and assessment date — printed like a professional counsellor's report.",
        "તમારું નામ, ધોરણ, શાળા અને મૂલ્યાંકન તારીખ — પ્રોફેશનલ કાઉન્સેલરના રિપોર્ટની જેમ."
      ),
    },
    {
      img: sampleRiasec,
      title: t("RIASEC Hexagon", "RIASEC ષટ્કોણ"),
      desc: t(
        "A clear hexagon visual + bar chart of all six interest types with your dominant Holland code highlighted.",
        "છ રુચિ પ્રકારોનું સ્પષ્ટ ષટ્કોણ + બાર ચાર્ટ, જેમાં તમારો મુખ્ય હોલેન્ડ કોડ હાઇલાઇટ થયેલો છે."
      ),
    },
    {
      img: sampleMI,
      title: t("Intelligence Profile", "ઇન્ટેલિજન્સ પ્રોફાઇલ"),
      desc: t(
        "All 8 Gardner intelligences scored, ranked and explained with what each means for studying and careers.",
        "તમામ 8 ગાર્ડનર ઇન્ટેલિજન્સ સ્કોર, ક્રમાંકિત અને સમજાવાયેલા."
      ),
    },
    {
      img: sampleCareers,
      title: t("Career Recommendations", "કારકિર્દી ભલામણો"),
      desc: t(
        "Top streams, 12–15 specific career roles, and suggested colleges in Gujarat & India.",
        "ટોચના પ્રવાહો, 12–15 ચોક્કસ કારકિર્દી ભૂમિકાઓ અને ગુજરાત તથા ભારતની ભલામણ કોલેજો."
      ),
    },
    {
      img: sampleActionPlan,
      title: t("Personalised Action Plan", "વ્યક્તિગત એક્શન પ્લાન"),
      desc: t(
        "A month-by-month 90-day playbook of habits, courses, books, clubs and exams tailored to your profile.",
        "તમારી પ્રોફાઇલ માટે અનુકૂળ આદતો, કોર્સ, પુસ્તકો, ક્લબ અને પરીક્ષાઓનો માસિક 90-દિવસનો પ્લેબુક."
      ),
    },
  ];

  const reportContents = [
    { icon: Star, label: t("Executive summary", "કાર્યકારી સારાંશ") },
    { icon: Compass, label: t("RIASEC interest profile", "RIASEC રુચિ પ્રોફાઇલ") },
    { icon: Layers, label: t("8 Multiple Intelligences", "8 મલ્ટિપલ ઇન્ટેલિજન્સ") },
    { icon: Target, label: t("5 aptitude scores", "5 યોગ્યતા સ્કોર") },
    { icon: GraduationCap, label: t("Recommended streams (11th/12th)", "ભલામણ પ્રવાહો (11/12)") },
    { icon: BookOpen, label: t("12+ matching career roles", "12+ મેળ ખાતી કારકિર્દી ભૂમિકાઓ") },
    { icon: Map, label: t("Suggested colleges in Gujarat & India", "ગુજરાત અને ભારતમાં ભલામણ કોલેજો") },
    { icon: Lightbulb, label: t("Entrance exams to target", "લક્ષ્ય રાખવા જેવી પ્રવેશ પરીક્ષાઓ") },
    { icon: TrendingUp, label: t("Skill-building roadmap", "કૌશલ્ય-નિર્માણ રોડમેપ") },
    { icon: CheckCircle2, label: t("90-day action plan", "90-દિવસનો એક્શન પ્લાન") },
  ];

  const stats = [
    { num: "87", label: t("Questions across 3 parts", "3 ભાગોમાં પ્રશ્નો") },
    { num: "20", label: t("Pages of personalised PDF", "વ્યક્તિગત PDF ના પાનાઓ") },
    { num: "8+5+6", label: t("MI + Aptitude + RIASEC scales", "MI + યોગ્યતા + RIASEC સ્કેલ") },
    { num: "2", label: t("Languages — English & Gujarati", "ભાષાઓ — અંગ્રેજી અને ગુજરાતી") },
  ];

  const trustBadges = [
    { icon: ShieldCheck, label: t("No login required", "કોઈ લૉગિન જરૂરી નથી") },
    { icon: Clock, label: t("15–25 minutes", "15–25 મિનિટ") },
    { icon: Award, label: t("Free forever", "હંમેશા મફત") },
    { icon: Globe2, label: t("Bilingual", "દ્વિભાષી") },
  ];

  return (
    <PublicLayout>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 md:px-8 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              {t("100% Free · Instant 20-page PDF", "100% મફત · તરત 20-પાનાનો PDF")}
            </div>
            <h1 className="mt-4 font-serif text-4xl md:text-6xl leading-tight">
              {t(
                "Discover your career DNA in 20 minutes.",
                "20 મિનિટમાં તમારી કારકિર્દીનું DNA શોધો."
              )}
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl">
              {t(
                "A research-grade psychometric assessment combining RIASEC interests, Gardner's Multiple Intelligences and a 5-axis aptitude snapshot — designed for Indian students in grades 6–12. Get a personalised 20-page report mapped to streams, colleges and careers.",
                "RIASEC રુચિ, ગાર્ડનરની મલ્ટિપલ ઇન્ટેલિજન્સ અને 5-અક્ષ યોગ્યતા સ્નેપશોટને જોડતું સંશોધન-ગ્રેડ મનો-યોગ્યતા મૂલ્યાંકન — ભારતના ધોરણ 6–12 ના વિદ્યાર્થીઓ માટે. પ્રવાહો, કોલેજો અને કારકિર્દી સાથે મેપ થયેલો વ્યક્તિગત 20-પાનાનો રિપોર્ટ મેળવો."
              )}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#start"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-md px-5 py-3 text-sm font-medium hover:opacity-90"
              >
                {t("Take the free test", "મફત ટેસ્ટ આપો")}
                <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="#sample"
                className="inline-flex items-center gap-2 border border-border bg-card rounded-md px-5 py-3 text-sm font-medium hover:bg-muted"
              >
                {t("See sample report", "નમૂના રિપોર્ટ જુઓ")}
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {trustBadges.map((b) => (
                <div key={b.label} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <b.icon className="h-3.5 w-3.5 text-primary" />
                  {b.label}
                </div>
              ))}
            </div>
          </div>

          {/* hero report stack */}
          <div className="relative h-[420px] md:h-[520px]">
            <img
              src={sampleCover}
              alt={t("Sample career discovery report cover", "નમૂના કારકિર્દી રિપોર્ટ કવર")}
              width={1024}
              height={1280}
              className="absolute right-4 top-2 w-[68%] rounded-xl shadow-2xl border border-border rotate-[5deg] object-cover"
            />
            <img
              src={sampleRiasec}
              alt={t("Sample RIASEC chart page", "નમૂના RIASEC ચાર્ટ પાનું")}
              width={1024}
              height={1280}
              loading="lazy"
              className="absolute left-2 top-12 w-[58%] rounded-xl shadow-xl border border-border -rotate-[6deg] object-cover"
            />
            <img
              src={sampleCareers}
              alt={t("Sample recommended careers page", "નમૂના ભલામણ કારકિર્દી પાનું")}
              width={1024}
              height={1280}
              loading="lazy"
              className="absolute left-12 bottom-0 w-[55%] rounded-xl shadow-xl border border-border rotate-[2deg] object-cover"
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-border bg-card/40">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-serif text-3xl md:text-4xl text-primary">{s.num}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* THREE FRAMEWORKS */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-widest text-accent">
            {t("The Methodology", "પદ્ધતિ")}
          </div>
          <h2 className="font-serif text-3xl md:text-4xl mt-2">
            {t(
              "Three world-class frameworks. One unified picture.",
              "ત્રણ વિશ્વ-સ્તરીય માળખાં. એક સંયુક્ત ચિત્ર."
            )}
          </h2>
          <p className="text-muted-foreground mt-3">
            {t(
              "Most career tests rely on a single instrument. We combine three of the most respected psychometric tools so the recommendations you receive are triangulated across what you like, how you think and what you can do.",
              "મોટાભાગના કારકિર્દી ટેસ્ટ માત્ર એક ઉપકરણ પર આધાર રાખે છે. અમે સૌથી પ્રતિષ્ઠિત ત્રણ સાધનો જોડીએ છીએ — તમે શું પસંદ કરો છો, કેવી રીતે વિચારો છો અને શું કરી શકો છો — તેના આધારે ભલામણો ત્રિકોણીય બને છે."
            )}
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {frameworks.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border bg-card p-6 flex flex-col"
            >
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {f.tag}
                </span>
              </div>
              <h3 className="mt-4 font-serif text-xl">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              <ul className="mt-4 space-y-1.5 border-t border-border pt-4">
                {f.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-xs">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* SAMPLE REPORT */}
      <section id="sample" className="border-y border-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-widest text-accent">
              {t("Inside the report", "રિપોર્ટની અંદર")}
            </div>
            <h2 className="font-serif text-3xl md:text-4xl mt-2">
              {t(
                "A 20-page report built like a counsellor's playbook.",
                "કાઉન્સેલરની પ્લેબુક જેવો બનેલો 20-પાનાનો રિપોર્ટ."
              )}
            </h2>
            <p className="text-muted-foreground mt-3">
              {t(
                "Not a one-line label. The PDF reads like a real career counselling session — with charts, narrative explanations, and concrete next steps for grades 9–12.",
                "એક-લાઇન લેબલ નહીં. PDF એક વાસ્તવિક કારકિર્દી કાઉન્સેલિંગ સત્ર જેવો વાંચાય છે — ચાર્ટ, વર્ણનાત્મક સમજૂતી અને ધોરણ 9–12 માટે નક્કર આગળના પગલાં સાથે."
              )}
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reportSections.map((s) => (
              <div key={s.title} className="group">
                <div className="aspect-[4/5] rounded-xl overflow-hidden bg-card border border-border shadow-sm group-hover:shadow-lg transition-shadow">
                  <img
                    src={s.img}
                    alt={s.title}
                    width={1024}
                    height={1280}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3 font-serif text-base">{s.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.desc}</div>
              </div>
            ))}
          </div>

          {/* what's inside checklist */}
          <div className="mt-12 rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="flex items-center gap-2 font-serif text-xl">
              <FileText className="h-5 w-5 text-primary" />
              {t("Everything your report includes", "તમારા રિપોર્ટમાં શું શામેલ છે")}
            </div>
            <div className="mt-5 grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {reportContents.map((c) => (
                <div key={c.label} className="flex items-center gap-3 text-sm">
                  <c.icon className="h-4 w-4 text-accent shrink-0" />
                  <span>{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              g: t("Grades 6–8", "ધોરણ 6–8"),
              t: t("Discover early strengths", "પ્રારંભિક શક્તિઓ શોધો"),
              d: t(
                "Get an early read on natural interests so families can pick the right hobbies, activities and electives.",
                "કુદરતી રુચિઓની વહેલી સમજ મેળવો જેથી પરિવારો યોગ્ય શોખ અને પ્રવૃત્તિઓ પસંદ કરી શકે."
              ),
            },
            {
              g: t("Grades 9–10", "ધોરણ 9–10"),
              t: t("Pick the right stream", "યોગ્ય પ્રવાહ પસંદ કરો"),
              d: t(
                "Make the Science / Commerce / Arts decision with data, not pressure. Includes stream-fit scoring.",
                "Science / Commerce / Arts નો નિર્ણય દબાણથી નહીં, ડેટાથી લો. પ્રવાહ-ફિટ સ્કોરિંગ સહિત."
              ),
            },
            {
              g: t("Grades 11–12", "ધોરણ 11–12"),
              t: t("Lock in college & career", "કોલેજ અને કારકિર્દી નક્કી કરો"),
              d: t(
                "Specific career roles, entrance exams to target and curated colleges in Gujarat & across India.",
                "ચોક્કસ કારકિર્દી ભૂમિકાઓ, લક્ષ્ય રાખવા જેવી પ્રવેશ પરીક્ષાઓ અને ગુજરાત તથા સમગ્ર ભારતની કોલેજો."
              ),
            },
          ].map((x) => (
            <div key={x.g} className="rounded-2xl border border-border bg-card p-6">
              <div className="text-xs uppercase tracking-widest text-accent">{x.g}</div>
              <div className="mt-2 font-serif text-xl">{x.t}</div>
              <p className="text-sm text-muted-foreground mt-2">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-y border-border bg-card/40">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
          <h2 className="font-serif text-3xl md:text-4xl">
            {t("How it works", "તે કેવી રીતે કાર્ય કરે છે")}
          </h2>
          <div className="mt-8 grid md:grid-cols-4 gap-5">
            {[
              { n: "01", t: t("Tell us about you", "તમારા વિશે જણાવો"), d: t("Name, grade and language. No login.", "નામ, ધોરણ અને ભાષા. કોઈ લૉગિન નહીં.") },
              { n: "02", t: t("Answer 87 questions", "87 પ્રશ્નોના જવાબ આપો"), d: t("Honest, intuitive responses on a 5-point scale.", "5-પોઇન્ટ સ્કેલ પર પ્રામાણિક, સહજ જવાબો.") },
              { n: "03", t: t("Get your scores", "તમારા સ્કોર મેળવો"), d: t("RIASEC + 8 MI + 5 aptitudes calculated instantly.", "RIASEC + 8 MI + 5 યોગ્યતાઓ તરત ગણાય છે.") },
              { n: "04", t: t("Download 20-page PDF", "20-પાનાનો PDF ડાઉનલોડ કરો"), d: t("Personalised, shareable, printable.", "વ્યક્તિગત, શેર કરી શકાય તેવો, છાપી શકાય તેવો.") },
            ].map((p) => (
              <div key={p.n} className="rounded-xl border border-border bg-background p-5">
                <div className="font-serif text-2xl text-primary/40">{p.n}</div>
                <div className="mt-2 font-serif text-lg">{p.t}</div>
                <div className="text-xs text-muted-foreground mt-1">{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* START FORM */}
      <section id="start" className="max-w-6xl mx-auto px-4 md:px-8 py-16 grid md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
          <div className="text-xs uppercase tracking-widest text-accent">
            {t("Begin", "શરૂઆત")}
          </div>
          <h2 className="font-serif text-3xl md:text-4xl mt-2">
            {t("Ready when you are.", "જ્યારે તમે તૈયાર હો.")}
          </h2>
          <p className="text-muted-foreground mt-3 text-sm">
            {t(
              "It takes 15–25 minutes. Find a quiet spot, answer honestly, and you'll have your full PDF report the moment you finish.",
              "15–25 મિનિટ લાગે છે. શાંત જગ્યા શોધો, પ્રામાણિકતાથી જવાબ આપો, અને જેવા તમે પૂર્ણ કરો, તરત જ સંપૂર્ણ PDF રિપોર્ટ મળી જશે."
            )}
          </p>
          <ul className="mt-5 space-y-2 text-sm">
            {[
              t("Answers stay private — used only to generate your report.", "જવાબો ખાનગી રહે છે — માત્ર તમારો રિપોર્ટ બનાવવા માટે વપરાય છે."),
              t("Switch language any time during the test.", "ટેસ્ટ દરમિયાન કોઈપણ સમયે ભાષા બદલો."),
              t("Resume from where you left off if you refresh.", "જો રિફ્રેશ કરો તો જ્યાંથી છોડ્યું ત્યાંથી ચાલુ રાખો."),
            ].map((x) => (
              <li key={x} className="flex items-start gap-2 text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                {x}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3 rounded-2xl border border-border bg-card p-6 md:p-8">
          <div className="font-serif text-xl flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            {t("Before you start", "શરૂ કરતા પહેલાં")}
          </div>
          <div className="mt-5 grid gap-3">
            <label className="block">
              <span className="text-xs text-muted-foreground">
                {t("Your name", "તમારું નામ")}
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder={t("Full name", "નામ")}
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs text-muted-foreground">
                  {t("Grade", "ધોરણ")}
                </span>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">--</option>
                  {[6, 7, 8, 9, 10, 11, 12].map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-xs text-muted-foreground">
                  {t("Age", "ઉંમર")}
                </span>
                <input
                  type="number"
                  min={9}
                  max={20}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-xs text-muted-foreground">
                {t("Language", "ભાષા")}
              </span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as "en" | "gu")}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="en">English</option>
                <option value="gu">ગુજરાતી</option>
              </select>
            </label>
          </div>
          <button
            onClick={start}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-md py-3 text-sm font-medium hover:opacity-90"
          >
            {t("Start the test", "ટેસ્ટ શરૂ કરો")}
            <ChevronRight className="h-4 w-4" />
          </button>
          <p className="mt-3 text-[11px] text-muted-foreground">
            {t(
              "No login needed. Your answers are used only to generate your report.",
              "કોઈ લૉગિન જરૂરી નથી. તમારા જવાબો ફક્ત રિપોર્ટ જનરેટ કરવા માટે વપરાય છે."
            )}
          </p>
          <Link to="/career" className="mt-3 block text-xs text-primary hover:underline">
            {t("Browse career paths first", "પ્રથમ કારકિર્દી માર્ગો જુઓ")} →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
          <h2 className="font-serif text-3xl md:text-4xl text-center">
            {t("Common questions", "સામાન્ય પ્રશ્નો")}
          </h2>
          <div className="mt-10 space-y-4">
            {[
              {
                q: t("Is the test really free?", "શું ટેસ્ટ ખરેખર મફત છે?"),
                a: t(
                  "Yes — completely free, no credit card, no hidden fees. The H B Kapadia New High School makes this available to every Indian student.",
                  "હા — સંપૂર્ણપણે મફત, કોઈ ક્રેડિટ કાર્ડ નહીં, કોઈ છુપાયેલી ફી નહીં. ધ એચ બી કાપડિયા ન્યૂ હાઈ સ્કૂલ આ દરેક ભારતીય વિદ્યાર્થી માટે ઉપલબ્ધ કરાવે છે."
                ),
              },
              {
                q: t("How accurate is a 20-minute test?", "20 મિનિટનો ટેસ્ટ કેટલો સચોટ છે?"),
                a: t(
                  "It's designed as a starting compass — not a final verdict. Combining three frameworks (RIASEC, MI, Aptitude) gives a much fuller picture than any single test, and the report is meant to spark informed conversations with parents and counsellors.",
                  "આ એક પ્રારંભિક હોકાયંત્ર તરીકે રચાયેલ છે — અંતિમ ચુકાદો નહીં. ત્રણ માળખાં (RIASEC, MI, યોગ્યતા) ને જોડવાથી કોઈપણ એક ટેસ્ટ કરતાં વધુ સંપૂર્ણ ચિત્ર મળે છે."
                ),
              },
              {
                q: t("Can I retake it?", "શું હું ફરીથી લઈ શકું?"),
                a: t(
                  "Absolutely. We recommend re-taking once a year, especially around grade transitions (8→9, 10→11), since interests evolve.",
                  "બિલકુલ. અમે વર્ષમાં એકવાર ફરીથી લેવાની ભલામણ કરીએ છીએ, ખાસ કરીને ધોરણ સંક્રમણ વખતે, કારણ કે રુચિઓ બદલાય છે."
                ),
              },
              {
                q: t("Do you store my answers?", "શું તમે મારા જવાબો સંગ્રહિત કરો છો?"),
                a: t(
                  "Anonymous score summaries help us improve recommendations, but no personal identifiers are shared with third parties.",
                  "અનામી સ્કોર સારાંશ અમને ભલામણો સુધારવામાં મદદ કરે છે, પરંતુ કોઈ વ્યક્તિગત ઓળખકર્તા તૃતીય પક્ષ સાથે વહેંચવામાં આવતા નથી."
                ),
              },
            ].map((f) => (
              <details
                key={f.q}
                className="rounded-xl border border-border bg-card p-5 group"
              >
                <summary className="cursor-pointer font-serif text-base flex items-center justify-between">
                  {f.q}
                  <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-16 text-center">
        <Brain className="h-10 w-10 text-primary mx-auto" />
        <h2 className="mt-4 font-serif text-3xl md:text-4xl">
          {t("Your career story starts with knowing yourself.", "તમારી કારકિર્દીની વાર્તા તમારી જાતને જાણવાથી શરૂ થાય છે.")}
        </h2>
        <p className="mt-3 text-muted-foreground">
          {t(
            "Take the test now and walk away with a 20-page roadmap built around the way you think, learn and dream.",
            "હમણાં ટેસ્ટ આપો અને તમારી વિચારસરણી, શીખવાની રીત અને સ્વપ્નોની આસપાસ બનેલો 20-પાનાનો રોડમેપ મેળવો."
          )}
        </p>
        <a
          href="#start"
          className="mt-6 inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-md px-6 py-3 text-sm font-medium hover:opacity-90"
        >
          {t("Start my free test", "મારો મફત ટેસ્ટ શરૂ કરો")}
          <ChevronRight className="h-4 w-4" />
        </a>
      </section>
    </PublicLayout>
  );
}
