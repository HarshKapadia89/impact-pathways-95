import { Link } from "@tanstack/react-router";
import { Brain, FileText, Compass, ArrowRight } from "lucide-react";

export function HowItWorks({ lang }: { lang: "en" | "gu" }) {
  const T = {
    eyebrow: lang === "gu" ? "કેવી રીતે કામ કરે છે" : "How it works",
    title: lang === "gu" ? "ત્રણ સ્ટેપમાં તમારી દિશા" : "Your direction in 3 steps",
    sub:
      lang === "gu"
        ? "મિનિટોમાં શરૂ થાય છે. જીવનભર ઉપયોગી રહે છે."
        : "Starts in minutes. Stays useful for years.",
    cta: lang === "gu" ? "હમણાં શરૂ કરો" : "Start now",
  };
  const steps = [
    {
      icon: Brain,
      n: "01",
      title: lang === "gu" ? "ટેસ્ટ આપો" : "Take the test",
      desc:
        lang === "gu"
          ? "60 દ્વિભાષી પ્રશ્નો. RIASEC + Multiple Intelligences + યોગ્યતા. 25 મિનિટ."
          : "60 bilingual questions. RIASEC + Multiple Intelligences + Aptitude. ~25 minutes.",
    },
    {
      icon: FileText,
      n: "02",
      title: lang === "gu" ? "રિપોર્ટ મેળવો" : "Get your report",
      desc:
        lang === "gu"
          ? "વ્યક્તિગત 20-પાનાનો PDF — ગ્રાફ, વ્યવસાય મેચ, અને 90-દિવસનો એક્શન પ્લાન."
          : "Personalised 20-page PDF — graphs, career matches and a 90-day action plan.",
    },
    {
      icon: Compass,
      n: "03",
      title: lang === "gu" ? "પાથ શોધો" : "Explore paths",
      desc:
        lang === "gu"
          ? "મેચ થયેલા પ્રવાહો, કોલેજો, પ્રવેશ પરીક્ષાઓ અને શિષ્યવૃત્તિ સુધી ઊંડાણથી જાઓ."
          : "Dive into matched streams, colleges, entrance exams and scholarships.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-14">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs text-accent font-semibold uppercase tracking-widest">
          {T.eyebrow}
        </div>
        <h2 className="mt-3 font-serif text-3xl md:text-4xl">{T.title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{T.sub}</p>
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-4 relative">
        {steps.map((s, i) => (
          <div
            key={s.n}
            className="relative rounded-2xl border border-border bg-card p-6 hover:-translate-y-1 hover:shadow-[var(--shadow-card)] transition"
          >
            <div
              className="absolute -top-3 -left-3 h-10 w-10 rounded-xl flex items-center justify-center font-serif text-sm font-bold text-white shadow-md"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--accent) 60%, var(--primary)))",
              }}
            >
              {s.n}
            </div>
            <s.icon className="h-6 w-6 text-accent mt-2" />
            <div className="mt-3 font-serif text-lg">{s.title}</div>
            <div className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{s.desc}</div>
            {i < steps.length - 1 && (
              <ArrowRight className="hidden md:block absolute top-1/2 -right-3 h-5 w-5 text-accent/40" />
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/test"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-6 py-3 text-sm font-semibold shadow-[var(--shadow-glow-primary)] hover:-translate-y-0.5 transition"
        >
          {T.cta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
