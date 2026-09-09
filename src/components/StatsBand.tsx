import { Lang, translator } from "@/lib/lang";
import { HANDBOOK_SUMMARIES } from "@/lib/handbookData";
import { ENTRANCE_EXAMS } from "@/lib/entranceExamsData";
import { SCHOLARSHIPS } from "@/lib/scholarshipsData";
import { TOTAL_LESSONS } from "@/lib/upskilling";
import { INDIA_COLLEGES } from "@/lib/indiaColleges";
import { GUJ_COLLEGE_STATS } from "@/lib/gujaratColleges";
import professionIndex from "@/lib/professionIndex.json";
import { Stat } from "@/design-system/hbk-career-brand-guidelines-4f1c39";

export function StatsBand({ lang }: { lang: Lang }) {
  const t = translator(lang);
  const stats = [
    { value: HANDBOOK_SUMMARIES.length.toString(), label: t({ en: "career streams", gu: "કારકિર્દી પ્રવાહો", hi: "करियर स्ट्रीम", mr: "करिअर प्रवाह" }) },
    { value: `${professionIndex.length.toLocaleString("en-IN")}+`, label: t({ en: "professions", gu: "વ્યવસાયો", hi: "पेशे", mr: "व्यवसाय" }) },
    { value: ENTRANCE_EXAMS.length.toString(), label: t({ en: "entrance exams", gu: "પ્રવેશ પરીક્ષાઓ", hi: "प्रवेश परीक्षाएँ", mr: "प्रवेश परीक्षा" }) },
    { value: SCHOLARSHIPS.length.toString(), label: t({ en: "scholarships", gu: "શિષ્યવૃત્તિઓ", hi: "छात्रवृत्तियाँ", mr: "शिष्यवृत्त्या" }) },
    { value: TOTAL_LESSONS.toString(), label: t({ en: "skill lessons", gu: "કુશળતા પાઠ", hi: "कौशल पाठ", mr: "कौशल्य धडे" }) },
    { value: `${(INDIA_COLLEGES.length + GUJ_COLLEGE_STATS.totalListed).toLocaleString("en-IN")}+`, label: t({ en: "colleges", gu: "કોલેજો", hi: "कॉलेज", mr: "महाविद्यालये" }) },
    { value: "4", label: t({ en: "languages", gu: "ભાષાઓ", hi: "भाषाएँ", mr: "भाषा" }) },
  ];
  return (
    <section className="bg-accent text-accent-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:grid-cols-4 md:px-8 lg:grid-cols-7">
        {stats.map((item) => <Stat key={item.label} label={item.label} value={item.value} />)}
      </div>
    </section>
  );
}