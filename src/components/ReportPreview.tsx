import { Sparkles, BarChart3, Target, Map, BookOpen, GraduationCap, Brain, Heart } from "lucide-react";

export function ReportPreview({ lang }: { lang: "en" | "gu" }) {
  const T = {
    eyebrow: lang === "gu" ? "રિપોર્ટની અંદર" : "Inside the report",
    title: lang === "gu" ? "20 પાનામાં શું છે?" : "What's inside your 20-page PDF",
    sub:
      lang === "gu"
        ? "દરેક પાનું તમારા જવાબો પરથી જનરેટ થાય છે — કોઈ ટેમ્પ્લેટ ન રિપોર્ટ."
        : "Every page is generated from your answers — no template reports.",
  };
  const items = [
    { icon: Sparkles, t: lang === "gu" ? "વ્યક્તિત્વ સારાંશ" : "Personality summary", d: lang === "gu" ? "AI દ્વારા ગુજરાતી/અંગ્રેજીમાં" : "AI-written in your language" },
    { icon: BarChart3, t: "RIASEC Hexagon", d: lang === "gu" ? "Holland કોડ ગ્રાફ" : "Holland code chart" },
    { icon: Brain, t: lang === "gu" ? "8 બુદ્ધિમત્તાઓ" : "8 intelligences", d: "Gardner's MI scores" },
    { icon: Target, t: lang === "gu" ? "યોગ્યતા સ્કોર" : "Aptitude scores", d: lang === "gu" ? "5 ડોમેન" : "5 domains" },
    { icon: GraduationCap, t: lang === "gu" ? "ટોચના 5 પ્રવાહ" : "Top 5 streams", d: lang === "gu" ? "મેચ % સાથે" : "with match %" },
    { icon: BookOpen, t: lang === "gu" ? "12+ વ્યવસાય" : "12+ careers", d: lang === "gu" ? "પગાર શ્રેણી સાથે" : "with salary ranges" },
    { icon: Map, t: lang === "gu" ? "90-દિવસ પ્લાન" : "90-day action plan", d: lang === "gu" ? "અઠવાડિક પગલાં" : "weekly steps" },
    { icon: Heart, t: lang === "gu" ? "માતા-પિતા માટે નોટ" : "Note for parents", d: lang === "gu" ? "દ્વિભાષી" : "bilingual" },
  ];

  return (
    <section className="border-y border-border to-primary/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs text-accent font-semibold uppercase tracking-widest">
            {T.eyebrow}
          </div>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">{T.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{T.sub}</p>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
          {items.map((it) => (
            <div
              key={it.t}
              className="rounded-2xl border border-border bg-card p-4 hover:border-accent/40 hover:-translate-y-0.5 transition"
            >
              <div
                className="h-9 w-9 rounded-lg flex items-center justify-center"
                style={{ background: "color-mix(in oklab, var(--accent) 15%, transparent)" }}
              >
                <it.icon className="h-4.5 w-4.5 text-accent" />
              </div>
              <div className="mt-3 font-medium text-sm">{it.t}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{it.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
