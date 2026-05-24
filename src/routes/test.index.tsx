import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { OfflineStatus } from "@/components/OfflineStatus";
import {
  Brain,
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
  IndianRupee,
} from "lucide-react";
import sampleCover from "@/assets/sample-report-cover.jpg";
import sampleRiasec from "@/assets/sample-report-riasec.jpg";
import sampleMI from "@/assets/sample-report-mi.jpg";
import sampleCareers from "@/assets/sample-report-careers.jpg";
import sampleActionPlan from "@/assets/sample-report-action-plan.jpg";

type VibeId = "investigator" | "creator" | "builder" | "leader";
const VIBE_IDS: VibeId[] = ["investigator", "creator", "builder", "leader"];

const VIBE_BANNER: Record<VibeId, { emoji: string; name: string; nudge: string }> = {
  investigator: { emoji: "🔬", name: "Investigator", nudge: "Your full report will dig deep into Investigative (RIASEC) and logical-mathematical intelligence — pay attention to the science & research streams." },
  creator: { emoji: "🎨", name: "Creator", nudge: "Your full report will surface Artistic (RIASEC) and spatial intelligence strengths — watch for design, media and architecture matches." },
  builder: { emoji: "🚀", name: "Builder", nudge: "Your full report will highlight Realistic (RIASEC) and bodily-kinesthetic intelligence — engineering, CS and trades are likely strong matches." },
  leader: { emoji: "⚡", name: "Leader", nudge: "Your full report will spotlight Enterprising (RIASEC) and interpersonal intelligence — keep an eye on business, law and civil services." },
};

export const Route = createFileRoute("/test/")({
  validateSearch: (search: Record<string, unknown>): { vibe?: VibeId } => {
    const v = search.vibe;
    if (typeof v === "string" && (VIBE_IDS as string[]).includes(v)) {
      return { vibe: v as VibeId };
    }
    return {};
  },
  head: () => ({
    meta: [
      { title: "Psychometric Aptitude Test (Grades 6–12) — 20-page Report | HBK Careers" },
      {
        name: "description",
        content:
          "Research-grade RIASEC + Multiple Intelligences + Aptitude assessment for grades 6–12. Get a 20-page personalised PDF career report. Introductory price ₹1,500.",
      },
      { property: "og:title", content: "HBK Careers Psychometric Test — 20-page Report" },
      {
        property: "og:description",
        content:
          "RIASEC + MI + Aptitude assessment with a 20-page personalised PDF report. Introductory price ₹1,500.",
      },
      { property: "og:image", content: sampleCover },
      { name: "twitter:image", content: sampleCover },
    ],
  }),
  component: TestIntro,
});

function TestIntro() {
  const navigate = useNavigate();
  const { vibe } = Route.useSearch() as { vibe?: VibeId };
  const vibeMeta = vibe ? VIBE_BANNER[vibe] : null;
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [age, setAge] = useState("");
  const [school, setSchool] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [parentEmail, setParentEmail] = useState("");

  const mobileDigits = mobile.replace(/\D/g, "");
  const mobileValid = /^[6-9]\d{9}$/.test(mobileDigits);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const parentEmailValid =
    parentEmail.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parentEmail.trim());
  const schoolValid = school.trim().length >= 2;
  const canContinue = !!grade && schoolValid && mobileValid && emailValid && parentEmailValid;

  const start = () => {
    if (!canContinue) return;
    sessionStorage.setItem(
      "disha-test-meta",
      JSON.stringify({
        name: name || "Student",
        grade,
        age,
        language: "en",
        school: school.trim(),
        mobile: mobileDigits,
        email: email.trim(),
        parent_email: parentEmail.trim() || null,
        vibe: vibe ?? null,
      }),
    );
    navigate({ to: "/test/pay" });
  };


  const frameworks = [
    {
      icon: Compass,
      tag: "Part 1 · 30 questions",
      title: "RIASEC Interest Inventory",
      desc: "Based on Dr. John Holland's vocational theory used by counsellors worldwide. Maps you across six interest types — Realistic, Investigative, Artistic, Social, Enterprising and Conventional — to reveal the work environments where you naturally thrive.",
      points: ["6-letter interest profile", "Top 3 Holland code", "Matching career clusters"],
    },
    {
      icon: Layers,
      tag: "Part 2 · 24 questions",
      title: "Multiple Intelligences (Gardner)",
      desc: "Howard Gardner's framework recognises that intelligence is not a single number. We measure all 8 intelligences — Linguistic, Logical-Mathematical, Spatial, Musical, Bodily-Kinesthetic, Interpersonal, Intrapersonal and Naturalistic — to show how your mind is wired.",
      points: ["8-axis intelligence map", "Strengths vs growth areas", "Subject-wise study tips"],
    },
    {
      icon: Target,
      tag: "Part 3 · ~24 questions",
      title: "Grade-Banded Aptitude",
      desc: "Aptitude questions are tailored to your grade band (6–8, 9–10, or 11–12) and aligned with NCERT difficulty across Numerical, Verbal, Logical, Spatial, Mechanical and Data Interpretation reasoning.",
      points: ["6 aptitude sub-scores", "Grade-appropriate difficulty", "Skill-building roadmap"],
    },
  ];

  const reportSections = [
    { img: sampleCover, title: "Personalised Cover", desc: "Your name, grade, school and assessment date — printed like a professional counsellor's report." },
    { img: sampleRiasec, title: "RIASEC Hexagon", desc: "A clear hexagon visual + bar chart of all six interest types with your dominant Holland code highlighted." },
    { img: sampleMI, title: "Intelligence Profile", desc: "All 8 Gardner intelligences scored, ranked and explained with what each means for studying and careers." },
    { img: sampleCareers, title: "Career Recommendations", desc: "Top streams, 12–15 specific career roles, and suggested colleges in Gujarat & India." },
    { img: sampleActionPlan, title: "Personalised Action Plan", desc: "A month-by-month 90-day playbook of habits, courses, books, clubs and exams tailored to your profile." },
  ];

  const reportContents = [
    { icon: Star, label: "Executive summary" },
    { icon: Compass, label: "RIASEC interest profile" },
    { icon: Layers, label: "8 Multiple Intelligences" },
    { icon: Target, label: "6 aptitude scores" },
    { icon: GraduationCap, label: "Recommended streams (11th/12th)" },
    { icon: BookOpen, label: "12+ matching career roles" },
    { icon: Map, label: "Suggested colleges in Gujarat & India" },
    { icon: Lightbulb, label: "Entrance exams to target" },
    { icon: TrendingUp, label: "Skill-building roadmap" },
    { icon: CheckCircle2, label: "90-day action plan" },
  ];

  const stats = [
    { num: "78+", label: "Questions across 3 parts" },
    { num: "20", label: "Pages of personalised PDF" },
    { num: "8+6+6", label: "MI + Aptitude + RIASEC scales" },
    { num: "3", label: "Grade bands (6–8, 9–10, 11–12)" },
  ];

  const trustBadges = [
    { icon: ShieldCheck, label: "No login required" },
    { icon: Clock, label: "15–25 minutes" },
    { icon: Award, label: "Trusted by schools" },
    { icon: Brain, label: "NCERT-aligned" },
  ];

  return (
    <PublicLayout>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 md:px-8 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs text-accent font-medium">
                <Sparkles className="h-3.5 w-3.5" />
                Introductory offer · ₹2,500 <span className="line-through opacity-60">₹2,500</span> →{" "}
                <span className="font-semibold">₹1,500</span> with code <span className="font-mono">HBK1000</span>
              </div>
              <OfflineStatus lang="en" />
            </div>
            <h1 className="mt-4 font-serif text-4xl md:text-6xl leading-tight">
              Discover your career DNA in 20 minutes.
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl">
              A research-grade psychometric assessment combining RIASEC interests, Gardner's Multiple Intelligences, and a grade-banded aptitude battery — designed for Indian students in grades 6–12. Get a personalised 20-page report mapped to streams, colleges and careers.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#start"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-md px-5 py-3 text-sm font-medium hover:opacity-90"
              >
                Take the test — ₹1,500
                <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="#sample"
                className="inline-flex items-center gap-2 border border-border bg-card rounded-md px-5 py-3 text-sm font-medium hover:bg-muted"
              >
                See sample report
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
              alt="Sample career discovery report cover"
              width={1024}
              height={1280}
              className="absolute right-4 top-2 w-[68%] rounded-xl shadow-2xl border border-border rotate-[5deg] object-cover"
            />
            <img
              src={sampleRiasec}
              alt="Sample RIASEC chart page"
              width={1024}
              height={1280}
              loading="lazy"
              className="absolute left-2 top-12 w-[58%] rounded-xl shadow-xl border border-border -rotate-[6deg] object-cover"
            />
            <img
              src={sampleCareers}
              alt="Sample recommended careers page"
              width={1024}
              height={1280}
              loading="lazy"
              className="absolute left-12 bottom-0 w-[55%] rounded-xl shadow-xl border border-border rotate-[2deg] object-cover"
            />
          </div>
        </div>
      </section>

      {/* PRICING BANNER */}
      <section className="border-b border-border bg-gradient-to-r from-accent/15 via-accent/5 to-primary/10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
              <IndianRupee className="h-6 w-6 text-accent" />
            </div>
            <div>
              <div className="font-serif text-xl">
                <span className="line-through text-muted-foreground">₹2,500</span>{" "}
                <span className="text-2xl font-semibold text-primary">₹1,500</span>{" "}
                <span className="text-sm text-muted-foreground">per student</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Apply coupon <span className="font-mono font-semibold text-accent">HBK1000</span> at checkout. Limited introductory offer.
              </div>
            </div>
          </div>
          <a
            href="#start"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-md px-5 py-2.5 text-sm font-medium hover:opacity-90"
          >
            Begin assessment <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* GRADE BAND PICKER */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs uppercase tracking-widest text-accent">Pick your grade band</div>
            <h2 className="font-serif text-3xl md:text-4xl mt-2">Three tailored test tracks</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Same RIASEC + Multiple Intelligences engine; aptitude questions adjust to your grade band so the difficulty stays NCERT-appropriate.
            </p>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              {
                band: "6–8",
                defaultGrade: "7",
                title: "Class 6, 7, 8",
                tagline: "Discover early strengths",
                points: [
                  "Foundational RIASEC interests",
                  "8 Multiple Intelligences map",
                  "Easier numerical & verbal items",
                ],
                tone: "from-emerald-500/10 to-transparent",
                ring: "hover:ring-emerald-500/40",
              },
              {
                band: "9–10",
                defaultGrade: "10",
                title: "Class 9, 10",
                tagline: "Pick the right stream",
                points: [
                  "Stream-fit scoring (Sci / Com / Hum)",
                  "Aptitude tuned to board difficulty",
                  "Entrance-exam early signals",
                ],
                tone: "from-primary/10 to-transparent",
                ring: "hover:ring-primary/40",
                highlight: true,
              },
              {
                band: "11–12",
                defaultGrade: "11",
                title: "Class 11, 12",
                tagline: "Lock in college & career",
                points: [
                  "Specific career roles & salaries",
                  "Colleges in Gujarat & India",
                  "Entrance exam roadmap",
                ],
                tone: "from-accent/15 to-transparent",
                ring: "hover:ring-accent/50",
              },
            ].map((b) => (
              <button
                key={b.band}
                type="button"
                onClick={() => {
                  setGrade(b.defaultGrade);
                  setTimeout(() => {
                    document.getElementById("start")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }, 80);
                }}
                className={`text-left rounded-2xl border bg-card p-6 ring-1 ring-transparent transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card)] hover:ring-2 ${b.ring} bg-gradient-to-br ${b.tone} ${
                  b.highlight ? "border-primary/40" : "border-border"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="text-3xl font-serif font-semibold text-primary">{b.band}</div>
                  {b.highlight && (
                    <span className="text-[10px] uppercase tracking-widest bg-primary/10 text-primary rounded-full px-2 py-0.5">
                      Most popular
                    </span>
                  )}
                </div>
                <div className="mt-3 font-serif text-lg">{b.title}</div>
                <div className="text-xs text-accent mt-0.5 uppercase tracking-wider">{b.tagline}</div>
                <ul className="mt-4 space-y-1.5 border-t border-border pt-4">
                  {b.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Start this track <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </button>
            ))}
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
          <div className="text-xs uppercase tracking-widest text-accent">The Methodology</div>
          <h2 className="font-serif text-3xl md:text-4xl mt-2">
            Three world-class frameworks. One unified picture.
          </h2>
          <p className="text-muted-foreground mt-3">
            Most career tests rely on a single instrument. We combine three of the most respected psychometric tools so the recommendations you receive are triangulated across what you like, how you think and what you can do.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {frameworks.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6 flex flex-col">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{f.tag}</span>
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
          <div className="grid md:grid-cols-3 gap-8 items-end">
            <div className="md:col-span-2">
              <div className="text-xs uppercase tracking-widest text-accent">Inside the report</div>
              <h2 className="font-serif text-3xl md:text-4xl mt-2">
                A 20-page report built like a counsellor's playbook.
              </h2>
              <p className="text-muted-foreground mt-3">
                Not a one-line label. The PDF reads like a real career counselling session — with charts, narrative explanations, and concrete next steps for grades 9–12.
              </p>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-card p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent">
                <FileText className="h-3.5 w-3.5" />
                Real student sample
              </div>
              <div className="mt-2 font-serif text-lg leading-snug">Aarav Patel · Grade 10 — full PDF</div>
              <p className="text-xs text-muted-foreground mt-2">
                Open the actual 20-page PDF generated by our system for a real Grade-10 sample profile.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  onClick={() => import("@/lib/sampleReport").then((m) => m.openSampleReport("en"))}
                  className="inline-flex items-center justify-center gap-1.5 bg-primary text-primary-foreground rounded-md px-3 py-2 text-xs font-medium hover:opacity-90"
                >
                  View sample PDF <ChevronRight className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => import("@/lib/sampleReport").then((m) => m.downloadSampleReport("en"))}
                  className="inline-flex items-center justify-center gap-1.5 border border-border bg-background rounded-md px-3 py-2 text-xs font-medium hover:bg-muted"
                >
                  Download sample
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {reportSections.map((s) => (
              <div key={s.title} className="group">
                <div className="aspect-[4/5] rounded-xl overflow-hidden bg-card border border-border shadow-sm group-hover:shadow-lg transition-shadow">
                  <img src={s.img} alt={s.title} width={1024} height={1280} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="mt-3 font-serif text-base">{s.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="flex items-center gap-2 font-serif text-xl">
              <FileText className="h-5 w-5 text-primary" />
              Everything your report includes
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

      {/* PERSONALISED ACTION PLAN — featured */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs text-accent">
              <Rocket className="h-3.5 w-3.5" />
              The most important page
            </div>
            <h2 className="font-serif text-3xl md:text-4xl mt-3">
              A personalised 90-day action plan — not just scores.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Knowing your profile is only half the journey. Every report ends with a month-by-month action plan tailored to your top stream and career matches — so you walk away with concrete things to do this week, this month and this term.
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                { icon: CalendarCheck, title: "Month-by-month milestones", desc: "Three months of clear goals — from skill-building to club memberships and exam prep." },
                { icon: BookOpen, title: "Curated learning resources", desc: "Courses, books, YouTube channels and podcasts hand-picked for your top career matches." },
                { icon: ListChecks, title: "Habits to build", desc: "Daily and weekly habits that compound — reading, journaling, project work, mock tests." },
                { icon: Target, title: "Exams & deadlines", desc: "Entrance exams to register for, dates to remember, and Olympiads worth attempting." },
              ].map((x) => (
                <div key={x.title} className="rounded-xl border border-border bg-card p-4">
                  <x.icon className="h-5 w-5 text-primary" />
                  <div className="mt-2 font-serif text-sm">{x.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{x.desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border-l-4 border-accent bg-accent/5 px-4 py-3 text-sm">
              <span className="font-medium">Built for parents too:</span>{" "}
              <span className="text-muted-foreground">
                Print the action plan and stick it on your study-room wall — it doubles as a weekly check-in tool for families.
              </span>
            </div>
          </div>

          <div className="order-1 md:order-2 relative">
            <div className="absolute -inset-6 bg-gradient-to-tr from-accent/20 via-primary/10 to-transparent rounded-3xl blur-2xl" />
            <img src={sampleActionPlan} alt="Sample 90-day personalised action plan page" width={1024} height={1280} loading="lazy" className="relative w-full rounded-2xl border border-border shadow-2xl object-cover" />
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { g: "Grades 6–8", t: "Discover early strengths", d: "Get an early read on natural interests so families can pick the right hobbies, activities and electives." },
            { g: "Grades 9–10", t: "Pick the right stream", d: "Make the Science / Commerce / Arts decision with data, not pressure. Includes stream-fit scoring." },
            { g: "Grades 11–12", t: "Lock in college & career", d: "Specific career roles, entrance exams to target and curated colleges in Gujarat & across India." },
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
          <h2 className="font-serif text-3xl md:text-4xl">How it works</h2>
          <div className="mt-8 grid md:grid-cols-4 gap-5">
            {[
              { n: "01", t: "Tell us about you", d: "Name, grade, age. No login." },
              { n: "02", t: "Pay & enter coupon", d: "₹1,500 with HBK1000. Scan the QR, share your UTR." },
              { n: "03", t: "Answer the questions", d: "RIASEC + 8 MI + grade-banded aptitude (~78 questions)." },
              { n: "04", t: "Download 20-page PDF", d: "Personalised, shareable, printable." },
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
          <div className="text-xs uppercase tracking-widest text-accent">Begin</div>
          <h2 className="font-serif text-3xl md:text-4xl mt-2">Ready when you are.</h2>
          <p className="text-muted-foreground mt-3 text-sm">
            It takes 15–25 minutes. Find a quiet spot, answer honestly, and you'll have your full PDF report the moment you finish.
          </p>
          <div className="mt-5 rounded-xl border border-accent/30 bg-accent/5 p-4 text-sm">
            <div className="font-medium text-foreground">₹1,500 per student (intro)</div>
            <div className="text-xs text-muted-foreground mt-1">
              Use coupon <span className="font-mono font-semibold">HBK1000</span> at checkout to unlock the introductory price.
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name" value={name} onChange={setName} placeholder="e.g. Aarav Patel" />
              <Field label="School name *" value={school} onChange={setSchool} placeholder="e.g. Delhi Public School" />
              <Field label="Grade *" value={grade} onChange={setGrade} placeholder="6 to 12" />
              <Field label="Age" value={age} onChange={setAge} placeholder="11 to 18" type="number" />
              <Field
                label="Mobile number *"
                value={mobile}
                onChange={setMobile}
                placeholder="10-digit Indian mobile"
                type="tel"
                inputMode="numeric"
                maxLength={10}
              />
              <Field
                label="Email ID *"
                value={email}
                onChange={setEmail}
                placeholder="you@example.com"
                type="email"
              />
              <Field
                label="Parent's email (optional)"
                value={parentEmail}
                onChange={setParentEmail}
                placeholder="parent@example.com — for sharing the report"
                type="email"
              />
            </div>
            {(school.length > 0 && !schoolValid) && (
              <p className="mt-3 text-xs text-destructive">Please enter your school name.</p>
            )}
            {(mobile.length > 0 && !mobileValid) && (
              <p className="mt-1 text-xs text-destructive">Enter a valid 10-digit Indian mobile number.</p>
            )}
            {(email.length > 0 && !emailValid) && (
              <p className="mt-1 text-xs text-destructive">Enter a valid email address.</p>
            )}
            {(parentEmail.length > 0 && !parentEmailValid) && (
              <p className="mt-1 text-xs text-destructive">Enter a valid parent email address (or leave blank).</p>
            )}
            <button
              onClick={start}
              disabled={!canContinue}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-md px-5 py-3 text-sm font-medium hover:opacity-90 disabled:opacity-40"
            >
              Continue to payment <ChevronRight className="h-4 w-4" />
            </button>
            <p className="text-[11px] text-muted-foreground mt-3">
              By continuing, you agree to our terms. Your responses stay private and your report will be sent to your email and mobile.
            </p>
            <div className="mt-4 text-xs text-muted-foreground">
              Have questions?{" "}
              <Link to="/" className="underline">
                Read more about HBK Careers
              </Link>
              .
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  inputMode,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  inputMode?: "text" | "numeric" | "tel" | "email" | "search" | "url" | "decimal" | "none";
  maxLength?: number;
}) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        inputMode={inputMode}
        maxLength={maxLength}
        className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
    </label>
  );
}
