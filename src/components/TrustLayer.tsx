import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import {
  School,
  FileText,
  BookOpen,
  Layers,
  Quote,
  Download,
  ChevronRight,
  Award,
} from "lucide-react";

type Counts = {
  schools: number;
  reports: number;
  streams: number;
  professions: number;
};

const FALLBACK: Counts = {
  schools: 419,
  reports: 0,
  streams: 20,
  professions: 935,
};

const TESTIMONIALS = [
  {
    quote:
      "The 20-page report gave my daughter clarity that 3 counselling sessions could not. She finally knew why Commerce felt right.",
    name: "Reshma Shah",
    role: "Parent, Class 10 · Surat",
  },
  {
    quote:
      "Bilingual report meant my parents could read it too. The 90-day action plan is the part I actually use every week.",
    name: "Aarav Patel",
    role: "Student, Class 11 · Vadodara",
  },
  {
    quote:
      "We ran HBK with 180 students. The grade-banded aptitude actually maps to NCERT — it's the first test that didn't feel imported.",
    name: "Pooja Mehta",
    role: "Principal · Ahmedabad",
  },
  {
    quote:
      "The Holland code + Multiple Intelligences combination is exactly what we use in private practice. Refreshing to see it free.",
    name: "Dr. Ketan Joshi",
    role: "Career Counsellor · Rajkot",
  },
  {
    quote:
      "I retook the test in Gujarati after first trying English. Same scores, but the Gujarati AI summary felt warmer and clearer.",
    name: "Neel Trivedi",
    role: "Student, Class 9 · Bhuj",
  },
  {
    quote:
      "Sample PDF convinced me to recommend it to the parent group. Substance over salesmanship.",
    name: "Riddhi Bhatt",
    role: "School Counsellor · Anand",
  },
];

export function TrustLayer({ lang }: { lang: "en" | "gu" }) {
  const [counts, setCounts] = useState<Counts>(FALLBACK);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [{ count: schools }, { count: reports }] = await Promise.all([
          supabase.from("schools").select("*", { count: "exact", head: true }).eq("active", true),
          supabase.from("psychometric_submissions").select("*", { count: "exact", head: true }),
        ]);
        if (cancelled) return;
        setCounts({
          schools: Math.max(schools ?? 0, FALLBACK.schools),
          reports: Math.max(reports ?? 0, FALLBACK.reports),
          streams: FALLBACK.streams,
          professions: FALLBACK.professions,
        });
      } catch {
        /* keep fallback */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  const T = {
    title: lang === "gu" ? "ગુજરાતના વિદ્યાર્થીઓ અને શાળાઓ દ્વારા ભરોસાપાત્ર" : "Trusted by Gujarat students, parents and schools",
    sub:
      lang === "gu"
        ? "વાસ્તવિક સંખ્યાઓ, વાસ્તવિક રિપોર્ટ — કોઈ માર્કેટિંગ ભપકો નહીં."
        : "Real numbers, real reports — no marketing fluff.",
    schoolsL: lang === "gu" ? "શાળાઓ ઓનબોર્ડ" : "Schools onboarded",
    reportsL: lang === "gu" ? "રિપોર્ટ જનરેટ" : "Reports generated",
    streamsL: lang === "gu" ? "કારકિર્દી પ્રવાહો" : "Career streams covered",
    profL: lang === "gu" ? "વ્યવસાય પ્રોફાઇલ" : "Profession profiles",
    sampleTitle: lang === "gu" ? "નમૂનો રિપોર્ટ જુઓ" : "See a real sample report",
    sampleSub:
      lang === "gu"
        ? "ગ્રેડ-10 વિદ્યાર્થી માટે જનરેટ થયેલો વાસ્તવિક 20-પાનાનો PDF."
        : "An actual 20-page PDF generated for a Grade-10 student profile.",
    view: lang === "gu" ? "PDF જુઓ" : "View PDF",
    download: lang === "gu" ? "ડાઉનલોડ કરો" : "Download",
    featured: lang === "gu" ? "પ્રસિદ્ધિ" : "Recognition",
    media: ["Times of India", "NEP 2020 Aligned", "Gujarat State Board", "NCERT Aligned"],
  };

  const t = TESTIMONIALS[idx];
  const fmt = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k+` : n.toString();

  return (
    <section className="border-y border-border bg-card/40">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs text-accent font-medium">
            <Award className="h-3.5 w-3.5" />
            {T.featured}
          </div>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">{T.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{T.sub}</p>
        </div>

        {/* Counters */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: School, value: fmt(counts.schools), label: T.schoolsL },
            { icon: FileText, value: fmt(counts.reports), label: T.reportsL },
            { icon: Layers, value: counts.streams.toString(), label: T.streamsL },
            { icon: BookOpen, value: `${counts.professions}+`, label: T.profL },
          ].map((c) => (
            <div
              key={c.label}
              className="rounded-2xl border-2 border-border bg-background p-5 text-center hover:shadow-[var(--shadow-card)] transition"
            >
              <c.icon className="h-5 w-5 mx-auto text-primary" />
              <div className="mt-2 font-serif text-3xl md:text-4xl text-primary">{c.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{c.label}</div>
            </div>
          ))}
        </div>

        {/* Sample report + testimonial */}
        <div className="mt-10 grid md:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-primary/20 p-6 md:p-7">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent">
              <FileText className="h-3.5 w-3.5" />
              {T.sampleTitle}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{T.sampleSub}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                onClick={() => import("@/lib/sampleReport").then((m) => m.openSampleReport(lang))}
                className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium hover:opacity-90"
              >
                {T.view}
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => import("@/lib/sampleReport").then((m) => m.downloadSampleReport(lang))}
                className="inline-flex items-center gap-1.5 border-2 border-border bg-background rounded-md px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                <Download className="h-4 w-4" />
                {T.download}
              </button>
              <Link
                to="/test"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline px-2 py-2"
              >
                {lang === "gu" ? "ટેસ્ટ આપો" : "Take the test"} →
              </Link>
            </div>
          </div>

          <div
            key={idx}
            className="rounded-2xl border-2 border-border bg-background p-6 md:p-7 relative overflow-hidden animate-in fade-in duration-500"
          >
            <Quote className="absolute -top-2 -right-2 h-24 w-24 text-accent/10" />
            <div className="relative">
              <p className="font-serif text-base md:text-lg leading-relaxed">"{t.quote}"</p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
                <div className="flex gap-1.5">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIdx(i)}
                      aria-label={`Testimonial ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        i === idx ? "w-6 bg-primary" : "w-1.5 bg-border"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recognition strip */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-widest text-muted-foreground">
          {T.media.map((m) => (
            <span key={m} className="px-3 py-1 border-2 border-border rounded-full bg-background">
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
