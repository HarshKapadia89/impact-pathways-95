import { Sparkles, AlertTriangle, ShieldCheck, Loader2 } from "lucide-react";
import type { AIInterpretation } from "@/lib/aiInterpretation";
import { STREAM_BY_ID } from "@/lib/careerData";
import type { Lang } from "@/lib/lang";

const P: Record<string, Record<Lang, string>> = {
  reviewFailed: {
    en: "Career Counsellor review couldn't complete",
    gu: "કારકિર્દી સહાયકની સમીક્ષા પૂરી ન થઈ",
    hi: "करियर काउंसलर की समीक्षा पूरी नहीं हो सकी",
    mr: "करिअर समुपदेशकाचे विश्लेषण पूर्ण होऊ शकले नाही",
  },
  retryNote: {
    en: "Please try again. Your deterministic scores above are unaffected.",
    gu: "ફરી પ્રયાસ કરો. ઉપરના સ્કોર પર કોઈ અસર નથી.",
    hi: "फिर कोशिश करें। ऊपर दिए स्कोर पर कोई असर नहीं है।",
    mr: "पुन्हा प्रयत्न करा. वरील गुणांवर परिणाम होत नाही.",
  },
  meaning: {
    en: "What your scores actually mean",
    gu: "તમારા સ્કોરનો ખરો અર્થ શું છે",
    hi: "आपके स्कोर का असल मतलब",
    mr: "तुमच्या गुणांचा खरा अर्थ",
  },
  aware: {
    en: "Things to be aware of",
    gu: "ધ્યાનમાં રાખવા જેવી બાબતો",
    hi: "ध्यान रखने योग्य बातें",
    mr: "लक्षात ठेवण्यासारख्या गोष्टी",
  },
  riasec: {
    en: "Your interest profile (RIASEC)",
    gu: "તમારી રુચિ પ્રોફાઇલ (RIASEC)",
    hi: "आपकी रुचि प्रोफ़ाइल (RIASEC)",
    mr: "तुमची आवड प्रोफाइल (RIASEC)",
  },
  mi: {
    en: "How you learn best (Multiple Intelligences)",
    gu: "તમે કેવી રીતે શ્રેષ્ઠ શીખો છો (બહુવિધ બુદ્ધિમત્તા)",
    hi: "आप सबसे अच्छा कैसे सीखते हैं (बहु-बुद्धि)",
    mr: "तुम्ही उत्तम कसे शिकता (बहुविध बुद्धिमत्ता)",
  },
  apt: {
    en: "Your aptitude strengths",
    gu: "તમારી એપ્ટિટ્યુડ તાકાત",
    hi: "आपकी एप्टीट्यूड क्षमताएँ",
    mr: "तुमची अ‍ॅप्टिट्यूड बलस्थाने",
  },
  streams: {
    en: "Streams that fit you — and why",
    gu: "તમને અનુકૂળ પ્રવાહ — અને શા માટે",
    hi: "आपके लिए उपयुक्त स्ट्रीम — और क्यों",
    mr: "तुमच्यासाठी योग्य शाखा — आणि का",
  },
  careers: {
    en: "Careers worth exploring",
    gu: "શોધવા જેવી કારકિર્દીઓ",
    hi: "जाँचने लायक करियर",
    mr: "पाहण्यासारखी करिअर",
  },
  next90: {
    en: "Next 90 days — what to work on",
    gu: "આગામી 90 દિવસ — શું કરવું",
    hi: "अगले 90 दिन — किस पर काम करें",
    mr: "पुढील ९० दिवस — कशावर काम करावे",
  },
  parents: {
    en: "For your parent / counsellor",
    gu: "તમારા વાલી / સહાયક માટે",
    hi: "आपके अभिभावक / काउंसलर के लिए",
    mr: "तुमच्या पालक / समुपदेशकासाठी",
  },
  watchOuts: {
    en: "Watch-outs:",
    gu: "ધ્યાન રાખો:",
    hi: "ध्यान दें:",
    mr: "लक्ष द्या:",
  },
};
const p = (k: string, lang: Lang) => P[k]?.[lang] ?? P[k]?.en ?? k;

interface Props {
  lang?: Lang;
  state: "loading" | "ready" | "error";
  interpretation?: AIInterpretation;
  model?: string;
  error?: string;
  onRetry?: () => void;
}

export function AIInterpretationPanel({ lang = "en", state, interpretation, model, error, onRetry }: Props) {
  if (state === "loading") {
    return (
      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span>
            HBK Career Counsellor is reviewing your answers with our most accurate reasoning model
            (this takes ~15–25 seconds)…
          </span>
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="mt-8 rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-medium text-foreground">{p("reviewFailed", lang)}</div>
            <p className="text-sm text-muted-foreground mt-1">
              {error ?? p("retryNote", lang)}
            </p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="mt-3 text-xs px-3 py-1.5 rounded-md border border-border bg-card hover:bg-muted"
              >
                Retry Career Counsellor review
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!interpretation) return null;

  const verdict = interpretation.consistencyVerdict;
  const verdictColor =
    verdict === "high"
      ? "border-emerald-500/40 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400"
      : verdict === "medium"
        ? "border-amber-500/40 bg-amber-500/5 text-amber-700 dark:text-amber-400"
        : "border-destructive/40 bg-destructive/5 text-destructive";

  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>Career Counsellor review</span>
          {model && <span className="ml-auto font-mono text-[10px] opacity-60">{model}</span>}
        </div>
        <h2 className="font-serif text-2xl mt-2">{p("meaning", lang)}</h2>

        <div className={`mt-4 rounded-xl border p-4 text-sm ${verdictColor}`}>
          <div className="flex items-center gap-2 font-medium">
            <ShieldCheck className="h-4 w-4" />
            Consistency: {verdict.toUpperCase()}
          </div>
          <p className="mt-1 text-foreground/80">{interpretation.consistencyExplanation}</p>
        </div>

        {interpretation.redFlags.length > 0 && (
          <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
            <div className="text-xs font-medium text-amber-700 dark:text-amber-400 flex items-center gap-2">
              <AlertTriangle className="h-3.5 w-3.5" /> {p("aware", lang)}
            </div>
            <ul className="mt-2 text-sm text-foreground/80 list-disc pl-5 space-y-1">
              {interpretation.redFlags.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>
        )}
      </div>

      <Section title={p("riasec", lang)}>
        <Prose text={interpretation.riasecNarrative} />
      </Section>

      <Section title={p("mi", lang)}>
        <Prose text={interpretation.miNarrative} />
      </Section>

      <Section title={p("apt", lang)}>
        <Prose text={interpretation.aptitudeNarrative} />
      </Section>

      {interpretation.recommendedStreams.length > 0 && (
        <Section title={p("streams", lang)}>
          <div className="grid sm:grid-cols-2 gap-3">
            {interpretation.recommendedStreams.map((s) => {
              const stream = (STREAM_BY_ID as Record<string, { name: string; emoji: string }>)[s.slug];
              return (
                <div key={s.slug} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{stream?.emoji ?? "🎯"}</span>
                    <div className="font-serif text-base">{stream?.name ?? s.slug}</div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{s.fitRationale}</p>
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {interpretation.recommendedCareers.length > 0 && (
        <Section title={p("careers", lang)}>
          <div className="space-y-3">
            {interpretation.recommendedCareers.map((c, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4">
                <div className="font-serif text-base">{c.name}</div>
                <p className="text-sm text-foreground/80 mt-1.5">{c.fitRationale}</p>
                {c.watchOuts && (
                  <p className="text-xs text-muted-foreground mt-2">
                    <span className="font-medium">{p("watchOuts", lang)}</span> {c.watchOuts}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <Section title={p("next90", lang)}>
          <ul className="text-sm text-foreground/80 list-disc pl-5 space-y-1.5">
            {interpretation.developmentSuggestions.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </Section>
        <Section title={p("parents", lang)}>
          <ul className="text-sm text-foreground/80 list-disc pl-5 space-y-1.5">
            {interpretation.parentTalkingPoints.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
      <h3 className="font-serif text-lg mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Prose({ text }: { text: string }) {
  return (
    <div className="text-sm text-foreground/80 space-y-2 leading-relaxed">
      {text.split(/\n\n+/).map((p, i) => <p key={i}>{p}</p>)}
    </div>
  );
}
