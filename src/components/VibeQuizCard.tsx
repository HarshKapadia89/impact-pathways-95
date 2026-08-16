import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Sparkles,
  ArrowRight,
  Zap,
  Rocket,
  Palette,
  Microscope,
  RotateCcw,
} from "lucide-react";

type Vibe = "investigator" | "creator" | "builder" | "leader";

const VIBE_META: Record<
  Vibe,
  {
    icon: typeof Microscope;
    emoji: string;
    en: { name: string; tagline: string; match: string };
    gu: { name: string; tagline: string; match: string };
    gradient: string;
  }
> = {
  investigator: {
    icon: Microscope,
    emoji: "🔬",
    gradient: "from-blue-500/25 to-cyan-500/25",
    en: {
      name: "Investigator",
      tagline: "You ask 'why' until it makes sense.",
      match: "Science · Research · Medicine · Data",
    },
    gu: {
      name: "ઇન્વેસ્ટિગેટર",
      tagline: "તમે 'કેમ' પૂછતા રહો છો જ્યાં સુધી જવાબ ન મળે.",
      match: "વિજ્ઞાન · સંશોધન · મેડિકલ · ડેટા",
    },
  },
  creator: {
    icon: Palette,
    emoji: "🎨",
    gradient: "from-pink-500/25 to-orange-500/25",
    en: {
      name: "Creator",
      tagline: "You see things that don't exist yet — and make them.",
      match: "Design · Media · Arts · Architecture",
    },
    gu: {
      name: "ક્રિએટર",
      tagline: "તમે એ વસ્તુઓ જુઓ છો જે હજુ અસ્તિત્વમાં નથી — અને બનાવો છો.",
      match: "ડિઝાઇન · મીડિયા · કળા · આર્કિટેક્ચર",
    },
  },
  builder: {
    icon: Rocket,
    emoji: "🚀",
    gradient: "from-emerald-500/25 to-teal-500/25",
    en: {
      name: "Builder",
      tagline: "You'd rather ship it than talk about it.",
      match: "Engineering · CS · Trades · Entrepreneurship",
    },
    gu: {
      name: "બિલ્ડર",
      tagline: "વાત કરવા કરતા તમે બનાવી નાખવાનું પસંદ કરો છો.",
      match: "એન્જિનિયરિંગ · CS · સ્કિલ્સ · સ્ટાર્ટઅપ",
    },
  },
  leader: {
    icon: Zap,
    emoji: "⚡",
    gradient: "from-amber-500/25 to-red-500/25",
    en: {
      name: "Leader",
      tagline: "You energise rooms and move people forward.",
      match: "Business · Law · Civil Services · Defence",
    },
    gu: {
      name: "લીડર",
      tagline: "તમે રૂમમાં ઊર્જા લાવો છો અને લોકોને આગળ વધારો છો.",
      match: "બિઝનેસ · લો · સિવિલ સર્વિસ · સંરક્ષણ",
    },
  },
};

type QOption = { en: string; gu: string; vibe: Vibe };
type Question = { en: string; gu: string; options: QOption[] };

const QUESTIONS: Question[] = [
  {
    en: "An open Saturday afternoon. What sounds best?",
    gu: "ફ્રી શનિવારની બપોર. શું ગમશે?",
    options: [
      { en: "Disassembling something to see how it works", gu: "કોઈ વસ્તુ ખોલીને જોવી કેવી રીતે કામ કરે", vibe: "investigator" },
      { en: "Sketching, editing, or making a reel", gu: "સ્કેચ, એડિટ, અથવા રીલ બનાવવી", vibe: "creator" },
      { en: "Coding a side project or fixing something", gu: "કોડિંગ અથવા કંઈક ઠીક કરવું", vibe: "builder" },
      { en: "Organising plans with friends", gu: "મિત્રો સાથે પ્લાન બનાવવો", vibe: "leader" },
    ],
  },
  {
    en: "Group project — what role do you grab?",
    gu: "ગ્રુપ પ્રોજેક્ટ — તમે કયો રોલ લો છો?",
    options: [
      { en: "The researcher digging into facts", gu: "જે ડેટા અને હકીકત શોધે", vibe: "investigator" },
      { en: "The one designing the slides & visuals", gu: "જે સ્લાઇડ અને વિઝ્યુઅલ બનાવે", vibe: "creator" },
      { en: "The one actually building the prototype", gu: "જે ખરેખર પ્રોટોટાઇપ બનાવે", vibe: "builder" },
      { en: "The one leading and presenting", gu: "જે લીડ કરે અને પ્રેઝન્ટ કરે", vibe: "leader" },
    ],
  },
  {
    en: "Pick the compliment that hits hardest:",
    gu: "આમાંથી કયો કોમ્પ્લિમેન્ટ સૌથી વધુ ગમે?",
    options: [
      { en: "\"You really think deeply.\"", gu: "\"તું ખરેખર ઊંડાણથી વિચારે છે.\"", vibe: "investigator" },
      { en: "\"That's so original.\"", gu: "\"એ ખરેખર ઓરિજિનલ છે.\"", vibe: "creator" },
      { en: "\"You actually got it done.\"", gu: "\"તે ખરેખર પૂરું કર્યું.\"", vibe: "builder" },
      { en: "\"People listen to you.\"", gu: "\"લોકો તારી વાત સાંભળે છે.\"", vibe: "leader" },
    ],
  },
  {
    en: "An app crashes mid-use. First instinct?",
    gu: "એપ વચ્ચે crash થઈ. પહેલી પ્રતિક્રિયા?",
    options: [
      { en: "Investigate the error message", gu: "એરર મેસેજ તપાસું", vibe: "investigator" },
      { en: "Imagine how the UI should've worked", gu: "વિચારું કે UI કેવી હોવી જોઈતી હતી", vibe: "creator" },
      { en: "Try a workaround, retry, or restart", gu: "કંઈક અલગ રીત અજમાવું", vibe: "builder" },
      { en: "Report it loudly so it gets fixed", gu: "જોરથી ફરિયાદ કરું જેથી ઠીક થાય", vibe: "leader" },
    ],
  },
  {
    en: "Dream first job description?",
    gu: "સપનાની પહેલી જોબ?",
    options: [
      { en: "Solving puzzles nobody else has cracked", gu: "એવા કોયડા ઉકેલવા જે કોઈએ ન ઉકેલ્યા", vibe: "investigator" },
      { en: "Making things people fall in love with", gu: "એવી વસ્તુઓ બનાવવી જે લોકોને ગમે", vibe: "creator" },
      { en: "Shipping products that actually work", gu: "પ્રોડક્ટ બનાવવા જે ખરેખર કામ કરે", vibe: "builder" },
      { en: "Running a team and calling shots", gu: "ટીમ ચલાવવી અને નિર્ણય લેવા", vibe: "leader" },
    ],
  },
];

export function VibeQuizCard({ lang }: { lang: "en" | "gu" }) {
  const [step, setStep] = useState(0); // -1 idle, 0..n questions, n result
  const [started, setStarted] = useState(false);
  const [scores, setScores] = useState<Record<Vibe, number>>({
    investigator: 0,
    creator: 0,
    builder: 0,
    leader: 0,
  });

  const total = QUESTIONS.length;
  const isResult = started && step >= total;

  const topVibe: Vibe = (Object.entries(scores) as [Vibe, number][])
    .sort((a, b) => b[1] - a[1])[0][0];
  const meta = VIBE_META[topVibe];
  const txt = meta[lang];

  const T = {
    eyebrow: lang === "gu" ? "60 સેકન્ડમાં મજાનો ટેસ્ટ" : "60-second vibe check",
    title: lang === "gu" ? "તમારી vibe શું છે?" : "What's your vibe?",
    sub:
      lang === "gu"
        ? "5 ઝડપી પ્રશ્નો. તરત રિઝલ્ટ. પછી 25-મિનિટનો ઊંડો ટેસ્ટ આપો."
        : "5 quick questions. Instant vibe. Then dive into the deep 25-min test.",
    start: lang === "gu" ? "વાઇબ ચેક શરૂ કરો" : "Start vibe check",
    skip: lang === "gu" ? "પૂરો ટેસ્ટ આપો" : "Skip to full test",
    question: lang === "gu" ? "પ્રશ્ન" : "Question",
    of: lang === "gu" ? "માંથી" : "of",
    yourVibe: lang === "gu" ? "તમારી vibe છે" : "Your vibe is",
    matchPrefix: lang === "gu" ? "મેચ થાય છે:" : "Matches:",
    takeFull:
      lang === "gu"
        ? "પૂરો 25-મિનિટનો ટેસ્ટ આપો — 20-પાનાનો રિપોર્ટ"
        : "Take the full 25-min test → 20-page report",
    retake: lang === "gu" ? "ફરી ચેક કરો" : "Retake",
  };

  function answer(vibe: Vibe) {
    setScores((s) => ({ ...s, [vibe]: s[vibe] + 1 }));
    setStep((s) => s + 1);
  }

  function reset() {
    setStarted(false);
    setStep(0);
    setScores({ investigator: 0, creator: 0, builder: 0, leader: 0 });
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-14">
      <div
        className="relative rounded-3xl overflow-hidden border border-accent/30 p-8 md:p-12"
        style={{
          background:
            "radial-gradient(800px 400px at 100% 0%, color-mix(in oklab, var(--accent) 18%, transparent), transparent 60%), radial-gradient(600px 400px at 0% 100%, color-mix(in oklab, var(--brand-2) 22%, transparent), transparent 60%), var(--card)",
        }}
      >
        {/* IDLE */}
        {!started && (
          <div className="grid md:grid-cols-2 gap-8 items-center relative">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent uppercase tracking-widest">
                <Sparkles className="h-3.5 w-3.5" />
                {T.eyebrow}
              </div>
              <h2 className="mt-4 font-serif text-3xl md:text-5xl leading-tight">{T.title}</h2>
              <p className="mt-3 text-base text-muted-foreground max-w-md">{T.sub}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => setStarted(true)}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-5 py-3 text-sm font-semibold shadow-[var(--shadow-glow-primary)] hover:-translate-y-0.5 transition"
                >
                  {T.start}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <Link
                  to="/test"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold border-2 border-accent/40 text-foreground hover:bg-accent/10 transition"
                >
                  {T.skip}
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(Object.keys(VIBE_META) as Vibe[]).map((v) => {
                const m = VIBE_META[v];
                return (
                  <div
                    key={v}
                    className={`rounded-2xl ${m.gradient} border border-white/40 p-5 hover:-translate-y-1 hover:rotate-1 transition cursor-default`}
                  >
                    <m.icon className="h-6 w-6 text-foreground" />
                    <div className="mt-3 font-serif text-base">
                      {m[lang].name} {m.emoji}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* QUESTIONS */}
        {started && !isResult && (
          <div className="relative max-w-2xl mx-auto">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
              <span className="font-semibold uppercase tracking-widest text-accent">
                {T.question} {step + 1} {T.of} {total}
              </span>
              <button onClick={reset} className="inline-flex items-center gap-1 hover:text-foreground">
                <RotateCcw className="h-3 w-3" /> {T.retake}
              </button>
            </div>
            <div className="h-1.5 rounded-full bg-border overflow-hidden mb-6">
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${((step) / total) * 100}%`,
                  background:
                    "linear-gradient(90deg, var(--accent), color-mix(in oklab, var(--accent) 60%, var(--primary)))",
                }}
              />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl leading-tight">
              {QUESTIONS[step][lang]}
            </h3>
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {QUESTIONS[step].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => answer(opt.vibe)}
                  className="text-left rounded-2xl border-2 border-border bg-card hover:border-accent/60 hover:bg-accent/5 hover:-translate-y-0.5 transition p-4 group"
                >
                  <span className="text-sm md:text-base font-medium group-hover:text-foreground">
                    {opt[lang]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RESULT */}
        {isResult && (
          <div className="relative max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5" />
              {T.yourVibe}
            </div>
            <div className="mt-5 text-7xl md:text-8xl">{meta.emoji}</div>
            <h3 className="mt-3 font-serif text-4xl md:text-5xl">
              {txt.name}
            </h3>
            <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-md mx-auto">
              {txt.tagline}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-card px-4 py-2 text-xs md:text-sm font-medium">
              <span className="text-muted-foreground">{T.matchPrefix}</span>
              <span className="text-foreground">{txt.match}</span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3 justify-center">
              <Link
                to="/test"
                search={{ vibe: topVibe }}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-5 py-3 text-sm font-semibold shadow-[var(--shadow-glow-primary)] hover:-translate-y-0.5 transition"
              >
                {T.takeFull}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold border-2 border-accent/40 hover:bg-accent/10 transition"
              >
                <RotateCcw className="h-4 w-4" /> {T.retake}
              </button>
            </div>

            {/* Mini score breakdown */}
            <div className="mt-8 grid grid-cols-4 gap-2 max-w-md mx-auto">
              {(Object.keys(VIBE_META) as Vibe[]).map((v) => {
                const m = VIBE_META[v];
                const pct = Math.round((scores[v] / total) * 100);
                const isTop = v === topVibe;
                return (
                  <div key={v} className="text-center">
                    <div className="text-lg">{m.emoji}</div>
                    <div className="mt-1 h-1.5 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full transition-all"
                        style={{
                          width: `${pct}%`,
                          background: isTop ? "var(--accent)" : "color-mix(in oklab, var(--accent) 40%, transparent)",
                        }}
                      />
                    </div>
                    <div className={`mt-1 text-[10px] ${isTop ? "text-accent font-semibold" : "text-muted-foreground"}`}>
                      {pct}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
