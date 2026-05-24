import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

type QA = { q: string; a: string };

export function FAQAccordion({
  lang,
  items,
  showHeader = true,
}: {
  lang: "en" | "gu";
  items?: QA[];
  showHeader?: boolean;
}) {
  const defaultItems: QA[] =
    lang === "gu"
      ? [
          { q: "શું આ ખરેખર મફત છે?", a: "હા. કોઈ લૉગિન, કોઈ ક્રેડિટ કાર્ડ, કોઈ છુપાયેલા ચાર્જ નથી. H B કાપડિયા ન્યૂ હાઈ સ્કૂલ દ્વારા સંપૂર્ણ મફત." },
          { q: "ટેસ્ટમાં કેટલો સમય લાગે છે?", a: "લગભગ 25 મિનિટ. તમે ગમે ત્યારે રોકાઈ શકો છો અને ફરી શરૂ કરી શકો છો." },
          { q: "રિપોર્ટ કેવી રીતે મળે?", a: "ટેસ્ટ પૂરો થતા જ સ્ક્રીન પર. તમે PDF ડાઉનલોડ કરી શકો છો અથવા ઈમેલ કરી શકો છો." },
          { q: "કયા ધોરણ માટે છે?", a: "ધોરણ 6 થી 12. પ્રશ્નો અને રિપોર્ટ ગ્રેડ પ્રમાણે અલગ-અલગ હોય છે." },
          { q: "શું ગુજરાતીમાં ઉપલબ્ધ છે?", a: "હા — પ્રશ્નો, રિપોર્ટ અને AI સારાંશ બધું ગુજરાતી અને અંગ્રેજી બંનેમાં." },
          { q: "શું મારી માહિતી સુરક્ષિત છે?", a: "હા. અમે કોઈ ડેટા વેચતા નથી. તમારી માહિતી ફક્ત તમારો રિપોર્ટ બનાવવા માટે વપરાય છે." },
          { q: "શું શાળાઓ માટે ગ્રુપ વર્ઝન છે?", a: "હા — 'For Schools' પેજ પરથી કોન્ટેક્ટ કરો. અમે મફત ઓનબોર્ડિંગ આપીએ છીએ." },
        ]
      : [
          { q: "Is this actually free?", a: "Yes. No login, no credit card, no hidden charges. Completely free, funded by The H B Kapadia New High School, Ahmedabad." },
          { q: "How long does the test take?", a: "About 25 minutes. You can pause anytime and resume from where you left off." },
          { q: "How do I get the report?", a: "It appears on screen the moment you finish. You can download the PDF or email it to yourself and your parents." },
          { q: "Which grades is it for?", a: "Grades 6 to 12. The questions and the report adapt to the grade band you select." },
          { q: "Is it available in Gujarati?", a: "Yes — questions, the 20-page report and the AI summary are all available in both Gujarati and English." },
          { q: "Is my data safe?", a: "Yes. We never sell or share data. Your responses are used only to generate your report." },
          { q: "Is there a version for schools?", a: "Yes — visit the 'For Schools' page. We offer free onboarding, bulk reports and counsellor dashboards." },
          { q: "What's the science behind it?", a: "We combine three validated frameworks: Holland's RIASEC interest model, Gardner's Multiple Intelligences and a 5-domain aptitude battery aligned with NCERT." },
        ];

  const list = items ?? defaultItems;
  const [open, setOpen] = useState<number | null>(0);
  const T = {
    eyebrow: lang === "gu" ? "સામાન્ય પ્રશ્નો" : "FAQ",
    title: lang === "gu" ? "વારંવાર પૂછાતા પ્રશ્નો" : "Questions students & parents ask",
  };

  return (
    <section className="max-w-3xl mx-auto px-4 md:px-8 py-14">
      {showHeader && (
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs text-accent font-semibold uppercase tracking-widest">
            <HelpCircle className="h-3.5 w-3.5" />
            {T.eyebrow}
          </div>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl">{T.title}</h2>
        </div>
      )}

      <div className="space-y-2">
        {list.map((it, i) => (
          <div
            key={i}
            className={`rounded-2xl border bg-card transition-all ${
              open === i ? "border-accent/50 shadow-[var(--shadow-card)]" : "border-border"
            }`}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
            >
              <span className="font-medium text-sm md:text-base">{it.q}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-accent transition-transform ${open === i ? "rotate-180" : ""}`}
              />
            </button>
            {open === i && (
              <div className="px-5 pb-5 -mt-1 text-sm text-muted-foreground leading-relaxed">
                {it.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
