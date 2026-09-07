import { Lang, translator } from "@/lib/lang";
import { HANDBOOK_SUMMARIES } from "@/lib/handbookData";
import { ENTRANCE_EXAMS } from "@/lib/entranceExamsData";
import { SCHOLARSHIPS } from "@/lib/scholarshipsData";
import { TOTAL_LESSONS } from "@/lib/upskilling";
import professionIndex from "@/lib/professionIndex.json";

export function StatsBand({ lang }: { lang: Lang }) {
  const t = translator(lang);
  const stats = [
    { n: HANDBOOK_SUMMARIES.length, suffix: "", label: t({ en: "career streams", gu: "કારકિર્દી પ્રવાહો", hi: "करियर स्ट्रीम", mr: "करिअर प्रवाह" }) },
    { n: professionIndex.length, suffix: "+", label: t({ en: "professions", gu: "વ્યવસાયો", hi: "पेशे", mr: "व्यवसाय" }) },
    { n: ENTRANCE_EXAMS.length, suffix: "", label: t({ en: "entrance exams", gu: "પ્રવેશ પરીક્ષાઓ", hi: "प्रवेश परीक्षाएँ", mr: "प्रवेश परीक्षा" }) },
    { n: SCHOLARSHIPS.length, suffix: "", label: t({ en: "scholarships", gu: "શિષ્યવૃત્તિઓ", hi: "छात्रवृत्तियाँ", mr: "शिष्यवृत्त्या" }) },
    { n: TOTAL_LESSONS, suffix: "", label: t({ en: "free lessons", gu: "મફત પાઠ", hi: "मुफ़्त पाठ", mr: "मोफत धडे" }) },
    { n: 4, suffix: "", label: t({ en: "languages", gu: "ભાષાઓ", hi: "भाषाएँ", mr: "भाषा" }) },
  ];
  return (
    <section className="border-y border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-serif text-3xl md:text-4xl" style={{ color: "var(--accent)" }}>
              {s.n.toLocaleString("en-IN")}
              {s.suffix}
            </div>
            <div className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
