import { Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight, Zap, Rocket, Palette, Microscope } from "lucide-react";

export function VibeQuizCard({ lang }: { lang: "en" | "gu" }) {
  const T = {
    eyebrow: lang === "gu" ? "60 સેકન્ડમાં મજાનો ટેસ્ટ" : "60-second vibe check",
    title: lang === "gu" ? "તમારી vibe શું છે?" : "What's your vibe?",
    sub:
      lang === "gu"
        ? "ઝડપી પ્રશ્નો. તરત રિઝલ્ટ. પછી 25-મિનિટનો ઊંડો ટેસ્ટ આપો."
        : "Quick questions. Instant vibe. Then dive into the deep 25-min test.",
    cta: lang === "gu" ? "વાઇબ ચેક કરો" : "Check my vibe",
    full: lang === "gu" ? "પૂરો ટેસ્ટ આપો" : "Take full test",
  };
  const vibes = [
    { icon: Microscope, label: lang === "gu" ? "ઇન્વેસ્ટિગેટર 🔬" : "Investigator 🔬", color: "from-blue-500/20 to-cyan-500/20" },
    { icon: Palette, label: lang === "gu" ? "ક્રિએટર 🎨" : "Creator 🎨", color: "from-pink-500/20 to-orange-500/20" },
    { icon: Rocket, label: lang === "gu" ? "બિલ્ડર 🚀" : "Builder 🚀", color: "from-emerald-500/20 to-teal-500/20" },
    { icon: Zap, label: lang === "gu" ? "લીડર ⚡" : "Leader ⚡", color: "from-amber-500/20 to-red-500/20" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-14">
      <div
        className="relative rounded-3xl overflow-hidden border border-accent/30 p-8 md:p-12"
        style={{
          background:
            "radial-gradient(800px 400px at 100% 0%, color-mix(in oklab, var(--accent) 18%, transparent), transparent 60%), radial-gradient(600px 400px at 0% 100%, color-mix(in oklab, var(--brand-2) 22%, transparent), transparent 60%), var(--card)",
        }}
      >
        <div className="grid md:grid-cols-2 gap-8 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5" />
              {T.eyebrow}
            </div>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl leading-tight">
              {T.title}
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-md">{T.sub}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/test"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-5 py-3 text-sm font-semibold shadow-[var(--shadow-glow-primary)] hover:-translate-y-0.5 transition"
              >
                {T.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/test"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold border-2 border-accent/40 text-foreground hover:bg-accent/10 transition"
              >
                {T.full}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {vibes.map((v) => (
              <div
                key={v.label}
                className={`rounded-2xl bg-gradient-to-br ${v.color} border border-white/40 backdrop-blur-sm p-5 hover:-translate-y-1 hover:rotate-1 transition cursor-default`}
              >
                <v.icon className="h-6 w-6 text-foreground" />
                <div className="mt-3 font-serif text-base">{v.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
