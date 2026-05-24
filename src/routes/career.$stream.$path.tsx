import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/PublicLayout";
import { CareerRoadmap } from "@/components/CareerRoadmap";
import { BookmarkButton } from "@/components/BookmarkButton";
import {
  findPath,
  pathSlug,
  ENTRANCE_EXAMS,
  type Stream,
  type CareerPath,
} from "@/lib/careerData";
import {
  ArrowLeft,
  Clock,
  Award,
  Building2,
  IndianRupee,
  GraduationCap,
  MapPin,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Briefcase,
  TrendingUp,
  ExternalLink,
  HelpCircle,
} from "lucide-react";

export const Route = createFileRoute("/career/$stream/$path")({
  loader: ({ params }): { stream: Stream; path: CareerPath } => {
    const found = findPath(params.stream, params.path);
    if (!found) throw notFound();
    return found;
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            {
              title: `${loaderData.path.title} — ${loaderData.stream.name} Career Guide (Gujarat) | HBK Careers`,
            },
            {
              name: "description",
              content: `${loaderData.path.title}: eligibility, entrance exams, top Gujarat colleges, average salary (${loaderData.path.avgSalary}), curriculum and career roles. ${loaderData.path.description.slice(0, 110)}`,
            },
            {
              property: "og:title",
              content: `${loaderData.path.title} — HBK Careers Career Guide`,
            },
            {
              property: "og:description",
              content: loaderData.path.description.slice(0, 180),
            },
          ],
        }
      : {},
  component: PathDetail,
  notFoundComponent: () => (
    <PublicLayout>
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-3xl">Career path not found</h1>
        <Link to="/career" className="text-primary mt-4 inline-block">
          ← Back to all streams
        </Link>
      </div>
    </PublicLayout>
  ),
  errorComponent: ({ error }) => (
    <PublicLayout>
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p>Something went wrong: {error.message}</p>
        <Link to="/career" className="text-primary mt-4 inline-block">
          ← Back
        </Link>
      </div>
    </PublicLayout>
  ),
});

/* -------------------- Auto-generated supplemental content -------------------- */

interface ExtraContent {
  whatYoullStudy: string[];
  dayInLife: string[];
  whyGujarat: string[];
  growthPath: string[];
  scholarships: string[];
  faqs: { q: string; a: string }[];
}

function pickExtras(stream: Stream, path: CareerPath): ExtraContent {
  const t = path.title.toLowerCase();

  // Defaults — safe generic fallback
  let whatYoullStudy: string[] = [
    "Foundation theory of the field in years 1–2.",
    "Specialised electives, projects and case studies in years 3–4.",
    "Internship/practicum and a final-year capstone or dissertation.",
    "Soft skills: communication, ethics, teamwork and leadership.",
  ];
  let dayInLife: string[] = [
    "Mix of lectures, lab/practical sessions and self-study.",
    "Group assignments and live industry projects.",
    "Regular assessments, internships and certification prep.",
  ];
  const whyGujarat: string[] = stream.gujaratHighlights.slice(0, 4);
  let growthPath: string[] = [
    "Entry role / trainee (0–2 yrs).",
    "Specialist or junior manager (2–5 yrs).",
    "Senior / lead role (5–10 yrs).",
    "Director, partner, founder or senior consultant (10+ yrs).",
  ];
  let scholarships: string[] = [
    "MYSY (Mukhyamantri Yuva Swavalamban Yojana) — up to ₹2 L/year for top scorers.",
    "Digital Gujarat scholarships for SC/ST/OBC/minority students.",
    "AICTE Pragati / Saksham scholarship for girls and PwD students.",
    "Institute-level merit and need-based aid; check each college's website.",
  ];
  const faqs: { q: string; a: string }[] = [];

  // Engineering / B.Tech / B.E.
  if (/b\.?tech|b\.?e\.|engineer/.test(t)) {
    whatYoullStudy = [
      "Year 1: Maths, Physics, Chemistry, Programming, Engineering Drawing.",
      "Year 2: Branch foundations — circuits, mechanics, data structures, signals.",
      "Year 3: Electives, labs, mini-projects (AI/ML, IoT, embedded, robotics, etc.).",
      "Year 4: 6-month internship + capstone project + placement preparation.",
    ];
    dayInLife = [
      "Morning lectures + 2–3 hour lab sessions on alternate days.",
      "Coding contests, hackathons and tech-fest projects.",
      "Internship hunt from Sem 5 onwards; placements from Sem 7.",
    ];
    growthPath = [
      "Software/Design Engineer trainee (0–2 yrs) — ₹4–10 LPA.",
      "Senior Engineer / Tech Lead (3–6 yrs) — ₹10–25 LPA.",
      "Engineering Manager / Architect (6–12 yrs) — ₹25–60 LPA.",
      "Director / VP Engineering / Founder (12+ yrs) — ₹60 LPA – 2 Cr+.",
    ];
    faqs.push(
      {
        q: "GUJCET vs JEE Main — which should I prepare for?",
        a: "Prepare for both. GUJCET unlocks Gujarat state colleges (via ACPC); JEE Main unlocks NITs, IIITs and CFTIs. Strong PCM students should also attempt JEE Advanced for IITs.",
      },
      {
        q: "Which branch has best placements in Gujarat?",
        a: "CSE / IT / AI-ML lead in package and offers, followed by Electronics (riding the semiconductor wave at Sanand & Dholera), Mechanical (Maruti Suzuki Sanand, Tata, L&T) and Chemical (Reliance, ONGC, IOCL).",
      },
    );
  }

  // Medicine / MBBS
  if (/mbbs|medicine|surgeon/.test(t)) {
    whatYoullStudy = [
      "Phase 1 (1.5 yrs): Anatomy, Physiology, Biochemistry.",
      "Phase 2 (1 yr): Pathology, Microbiology, Pharmacology, Forensic Medicine.",
      "Phase 3 (2 yrs): Medicine, Surgery, OBG, Paediatrics + clinical postings.",
      "1-year compulsory rotating internship (CRRI) in a teaching hospital.",
    ];
    dayInLife = [
      "Early-morning ward rounds + bedside teaching.",
      "Theory classes, dissection / clinical labs in afternoon.",
      "Night-duty rotations during clinical years; case presentations weekly.",
    ];
    growthPath = [
      "MBBS intern → Junior Resident (₹60k–1L/month).",
      "PG (MD/MS) via NEET-PG → Senior Resident / DM/MCh fellowship.",
      "Consultant / Specialist (₹15–60 LPA in private hospitals).",
      "Senior Consultant / HOD / own clinic / hospital chain (₹60 LPA – 2 Cr+).",
    ];
    faqs.push(
      {
        q: "Government vs private medical college in Gujarat?",
        a: "Government colleges (B.J. Medical, NHL, GMC Surat/Vadodara, AIIMS Rajkot) charge ₹6k–25k/year — extremely affordable but cut-offs are very high. Private/SFI colleges charge ₹6–25 L/year. Always exhaust the ACPC government counselling first.",
      },
      {
        q: "Is MBBS the only path with NEET?",
        a: "No. The same NEET-UG score also unlocks BDS (dental), BAMS (Ayurveda), BHMS (Homoeopathy), BUMS (Unani), BNYS (Naturopathy) and Veterinary (B.V.Sc). All are 5–5.5 year courses.",
      },
    );
  }

  // CA
  if (/chartered accountant|ca \(/.test(t) || /^ca\b/.test(t)) {
    whatYoullStudy = [
      "Foundation: Accounting, Business Laws, Maths/Stats, Economics.",
      "Intermediate: Advanced Accounting, Corporate Laws, Costing, Taxation, Auditing.",
      "Final: Financial Reporting, Strategic Financial Management, Direct & Indirect Taxes, Audit.",
      "3-year articleship at a CA firm — real audits, tax filings, ROC compliance.",
    ];
    dayInLife = [
      "Articleship: 9–6 at the firm doing audits, GST returns, ROC filings.",
      "Self-study 3–4 hours daily for ICAI exams (held twice a year).",
      "Travel to client sites for statutory audits during peak season.",
    ];
    growthPath = [
      "Article assistant (3 yrs, ~₹5–15k/month stipend).",
      "Newly qualified CA: ₹7–12 LPA in Big-4 / industry.",
      "Manager / Senior Manager (5–10 yrs): ₹15–40 LPA.",
      "Partner / CFO / Practice owner (10+ yrs): ₹40 LPA – several crore.",
    ];
    scholarships = [
      "ICAI merit scholarships and Articleship stipends.",
      "Bank study loans up to ₹10 L (no collateral) for ICAI students.",
      "MYSY for parallel B.Com from a Gujarat college.",
    ];
    faqs.push({
      q: "Should I do B.Com along with CA?",
      a: "Strongly recommended. Most Gujarat students enrol in a B.Com (regular or distance — IGNOU/SOL/Gujarat Univ.) so that even if CA takes longer, you have a graduation degree in hand for jobs and PG.",
    });
  }

  // Law
  if (/llb|law|gnlu|clat/.test(t)) {
    whatYoullStudy = [
      "Year 1–2: Constitution, Contracts, Torts, Criminal Law, Legal Methods.",
      "Year 3–4: Corporate Law, IPR, Tax, Family Law, International Law, electives.",
      "Year 5: Moot courts, internships at firms/courts, dissertation.",
      "Mandatory internships every semester at firms, NGOs, courts and chambers.",
    ];
    dayInLife = [
      "Heavy reading load — judgments, statutes and journals daily.",
      "Moot court practice, debates and client-counselling competitions.",
      "Internships at chambers, law firms and litigation offices in vacation.",
    ];
    growthPath = [
      "Associate at law firm (0–3 yrs): ₹6–18 LPA.",
      "Senior Associate (3–7 yrs): ₹15–45 LPA.",
      "Principal Associate / Partner-track (7–12 yrs): ₹40 LPA – 1 Cr+.",
      "Partner / Designated Senior Counsel / Judge: ₹1 Cr+ or judicial pension.",
    ];
    faqs.push({
      q: "GNLU vs other Gujarat law colleges?",
      a: "GNLU Gandhinagar is consistently top-5 NLU in India and recruits with top-tier law firms (AZB, Trilegal, S&R, CAM). Outside GNLU, Nirma Law and MSU Baroda Law are the strongest, followed by GLS Ahmedabad and Auro University.",
    });
  }

  // Design / NID / NIFT / UCEED
  if (/design|nid|nift|architecture|b\.des|b\.arch/.test(t)) {
    whatYoullStudy = [
      "Foundation in design thinking, sketching, materials and form.",
      "Specialised studios — product, communication, UI/UX, fashion or interior.",
      "Hands-on workshops, prototyping, user research and field studies.",
      "Industry internship + diploma / graduation project with a real client.",
    ];
    dayInLife = [
      "Studio-based learning: 4–6 hours of project work daily.",
      "Critique sessions and peer reviews twice a week.",
      "Field visits, craft documentation trips and live client briefs.",
    ];
    growthPath = [
      "Junior Designer / Architect (0–3 yrs): ₹4–10 LPA.",
      "Senior Designer / Project Architect (3–7 yrs): ₹10–25 LPA.",
      "Design Lead / Principal Architect (7–12 yrs): ₹25–60 LPA.",
      "Design Director / Studio Founder (12+ yrs): ₹60 LPA – several crore.",
    ];
  }

  // Default Gujarat-specific FAQ (always relevant)
  faqs.push({
    q: "Am I eligible for MYSY scholarship?",
    a: "Yes, if your family income is under ₹6 LPA and you scored 80%+ in Class 12 (or have a strong rank in GUJCET / JEE / NEET). Apply at mysy.guj.nic.in within the first year of college.",
  });

  return { whatYoullStudy, dayInLife, whyGujarat, growthPath, scholarships, faqs };
}

function relatedExams(path: CareerPath) {
  const codes = new Set(path.entranceExams.map((e) => e.toLowerCase()));
  return ENTRANCE_EXAMS.filter((e) =>
    Array.from(codes).some((c) => e.code.toLowerCase().includes(c) || c.includes(e.code.toLowerCase())),
  );
}

/* ----------------------------- Component ----------------------------- */

function PathDetail() {
  const { stream, path } = Route.useLoaderData() as { stream: Stream; path: CareerPath };
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith("gu") ? "gu" : "en") as "en" | "gu";
  const extras = pickExtras(stream, path);
  const exams = relatedExams(path);

  const sectionClass = "max-w-5xl mx-auto px-4 md:px-8";

  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border">
        <div className={`${sectionClass} py-10`}>
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <Link
              to="/career/$stream"
              params={{ stream: stream.id }}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {lang === "gu" ? stream.nameGu : stream.name}
            </Link>
            <div className="flex items-center gap-2">
              <BookmarkButton
                kind="career"
                stream={stream.id}
                pathKey={pathSlug(path)}
                title={path.title}
                size="sm"
              />
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary px-2.5 py-0.5 text-xs font-medium">
                <MapPin className="h-3 w-3" />
                {lang === "gu" ? "ગુજરાત-કેન્દ્રિત" : "Gujarat-focused"}
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-4">
            <div className="text-5xl">{stream.emoji}</div>
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground">
                {lang === "gu" ? stream.nameGu : stream.name}
              </div>
              <h1 className="font-serif text-3xl md:text-4xl mt-1">{path.title}</h1>
              <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {path.duration}
                </span>
                <span className="inline-flex items-center gap-1">
                  <IndianRupee className="h-3 w-3" /> {path.avgSalary}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Award className="h-3 w-3" /> {path.eligibility}
                </span>
              </div>
            </div>
          </div>

          <p className="mt-6 max-w-3xl text-foreground/90">{path.description}</p>
        </div>
      </section>

      {/* Quick facts grid */}
      <section className={`${sectionClass} py-8`}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              {lang === "gu" ? "અવધિ" : "Duration"}
            </div>
            <div className="mt-1 font-medium">{path.duration}</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              {lang === "gu" ? "પાત્રતા" : "Eligibility"}
            </div>
            <div className="mt-1 font-medium text-sm">{path.eligibility}</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              {lang === "gu" ? "પ્રવેશ પરીક્ષાઓ" : "Entrance exams"}
            </div>
            <div className="mt-1 font-medium text-sm">{path.entranceExams.join(", ")}</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              {lang === "gu" ? "સરેરાશ પગાર" : "Avg salary"}
            </div>
            <div className="mt-1 font-medium">{path.avgSalary}</div>
          </div>
        </div>
      </section>

      {/* What you'll study */}
      <section className={`${sectionClass} pb-8`}>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            {lang === "gu" ? "તમે શું ભણશો" : "What you'll study"}
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {extras.whatYoullStudy.map((s, i) => (
              <li key={i} className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Day in the life */}
      <section className={`${sectionClass} pb-8`}>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-primary" />
            {lang === "gu" ? "દિવસ કેવો રહેશે" : "What a typical day looks like"}
          </h2>
          <ul className="mt-3 grid md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {extras.dayInLife.map((s, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Top colleges + Career roles */}
      <section className={`${sectionClass} pb-8 grid md:grid-cols-2 gap-5`}>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-serif text-lg flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" />
            {lang === "gu" ? "ગુજરાતની ટોચની કોલેજો" : "Top colleges in Gujarat"}
          </h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {path.topColleges.map((c) => (
              <li key={c} className="text-foreground/85">
                • {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-serif text-lg flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-primary" />
            {lang === "gu" ? "કારકિર્દી ભૂમિકાઓ" : "Career roles"}
          </h2>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {path.careers.map((c) => (
              <span
                key={c}
                className="text-xs rounded-md bg-accent/20 text-accent-foreground px-2 py-0.5"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Growth path */}
      <section className={`${sectionClass} pb-8`}>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            {lang === "gu" ? "કારકિર્દી પ્રગતિ" : "Career growth path"}
          </h2>
          <ol className="mt-3 space-y-2 text-sm">
            {extras.growthPath.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-primary font-medium shrink-0">{i + 1}.</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why Gujarat */}
      {extras.whyGujarat.length > 0 && (
        <section className={`${sectionClass} pb-8`}>
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
            <h2 className="font-serif text-xl flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              {lang === "gu" ? "ગુજરાતમાં કેમ?" : "Why study this in Gujarat?"}
            </h2>
            <ul className="mt-3 grid md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {extras.whyGujarat.map((s, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Scholarships */}
      <section className={`${sectionClass} pb-8`}>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl flex items-center gap-2">
            <IndianRupee className="h-4 w-4 text-primary" />
            {lang === "gu" ? "શિષ્યવૃત્તિ અને નાણાકીય સહાય" : "Scholarships & financial aid"}
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {extras.scholarships.map((s, i) => (
              <li key={i} className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Entrance exam links */}
      {exams.length > 0 && (
        <section className={`${sectionClass} pb-8`}>
          <h2 className="font-serif text-xl mb-3">
            {lang === "gu" ? "પ્રવેશ પરીક્ષાઓની માહિતી" : "Entrance exam quick links"}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {exams.map((e) => (
              <a
                key={e.code}
                href={`https://${e.website}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-border bg-card p-4 hover:border-primary/40 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium">{e.code}</div>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div className="text-xs text-muted-foreground mt-1">{e.for}</div>
                <div className="text-xs text-muted-foreground mt-2">
                  {lang === "gu" ? "ક્યારે" : "When"}: {e.when}
                </div>
                <div className="text-xs text-primary mt-2 break-all">{e.website}</div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* FAQs */}
      {extras.faqs.length > 0 && (
        <section className={`${sectionClass} pb-8`}>
          <h2 className="font-serif text-xl mb-3 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            {lang === "gu" ? "વારંવાર પૂછાતા પ્રશ્નો" : "Frequently asked questions"}
          </h2>
          <div className="space-y-3">
            {extras.faqs.map((f, i) => (
              <details
                key={i}
                className="rounded-xl border border-border bg-card p-4 group"
              >
                <summary className="cursor-pointer font-medium text-sm flex items-start gap-2 list-none">
                  <span className="text-primary">Q.</span>
                  <span>{f.q}</span>
                </summary>
                <p className="mt-2 text-sm text-muted-foreground pl-5">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Other paths in this stream */}
      <section className={`${sectionClass} pb-8`}>
        <h2 className="font-serif text-xl mb-3">
          {lang === "gu" ? "આ જ પ્રવાહના બીજા માર્ગો" : "Other paths in this stream"}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {stream.paths
            .filter((p) => p.title !== path.title)
            .map((p) => (
              <Link
                key={p.title}
                to="/career/$stream/$path"
                params={{ stream: stream.id, path: pathSlug(p.title) }}
                className="rounded-xl border border-border bg-card p-4 hover:border-primary/40 transition group"
              >
                <div className="font-medium text-sm group-hover:text-primary">{p.title}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {p.duration} • {p.avgSalary}
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* CTAs */}
      <section className={`${sectionClass} pb-12 space-y-4`}>
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-serif text-lg">
              {lang === "gu" ? "આ માર્ગ તમારા માટે છે?" : "Is this path right for you?"}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {lang === "gu"
                ? "મફત મનો-યોગ્યતા ટેસ્ટ આપો અને 20-પાનાનો વ્યક્તિગત રિપોર્ટ મેળવો."
                : "Take the free psychometric test and get a 20-page personalised report."}
            </div>
          </div>
          <Link
            to="/test"
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-medium hover:opacity-90"
          >
            {lang === "gu" ? "ટેસ્ટ આપો" : "Take the test"}
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
