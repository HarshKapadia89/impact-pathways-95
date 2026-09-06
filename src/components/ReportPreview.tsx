import { t4 } from "@/lib/t4";
import { Lang } from "@/lib/lang";
import { Sparkles, BarChart3, Target, Map, BookOpen, GraduationCap, Brain, Heart } from "lucide-react";

export function ReportPreview({ lang }: { lang: Lang }) {
  const T = {
    eyebrow: t4(lang, "Inside the report", "રિપોર્ટની અંદર"),
    title: t4(lang, "What's inside your 20-page PDF", "20 પાનામાં શું છે?"),
    sub:
      t4(lang, "Every page is generated from your answers — no template reports.", "દરેક પાનું તમારા જવાબો પરથી જનરેટ થાય છે — કોઈ ટેમ્પ્લેટ ન રિપોર્ટ."),
  };
  const items = [
    { icon: Sparkles, t: t4(lang, "Personality summary", "વ્યક્તિત્વ સારાંશ"), d: t4(lang, "AI-written in your language", "AI દ્વારા ગુજરાતી/અંગ્રેજીમાં") },
    { icon: BarChart3, t: "RIASEC Hexagon", d: t4(lang, "Holland code chart", "Holland કોડ ગ્રાફ") },
    { icon: Brain, t: t4(lang, "8 intelligences", "8 બુદ્ધિમત્તાઓ"), d: "Gardner's MI scores" },
    { icon: Target, t: t4(lang, "Aptitude scores", "યોગ્યતા સ્કોર"), d: t4(lang, "5 domains", "5 ડોમેન") },
    { icon: GraduationCap, t: t4(lang, "Top 5 streams", "ટોચના 5 પ્રવાહ"), d: t4(lang, "with match %", "મેચ % સાથે") },
    { icon: BookOpen, t: t4(lang, "12+ careers", "12+ વ્યવસાય"), d: t4(lang, "with salary ranges", "પગાર શ્રેણી સાથે") },
    { icon: Map, t: t4(lang, "90-day action plan", "90-દિવસ પ્લાન"), d: t4(lang, "weekly steps", "અઠવાડિક પગલાં") },
    { icon: Heart, t: t4(lang, "Note for parents", "માતા-પિતા માટે નોટ"), d: t4(lang, "bilingual", "દ્વિભાષી") },
  ];

  return (
    <section className="border-y border-border bg-gradient-to-b from-accent/5 via-transparent to-primary/5">
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
