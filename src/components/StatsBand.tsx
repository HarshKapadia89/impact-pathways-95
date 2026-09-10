import { Lang, translator } from "@/lib/lang";
import { PLATFORM_STATS } from "@/lib/platformStats";
import { Stat } from "@/design-system/hbk-career-brand-guidelines-4f1c39";

export function StatsBand({ lang }: { lang: Lang }) {
  const t = translator(lang);
  const stats = [
    { value: PLATFORM_STATS.careerStreams.toLocaleString("en-IN"), label: t({ en: "career streams", gu: "કારકિર્દી પ્રવાહો", hi: "करियर स्ट्रीम", mr: "करिअर प्रवाह" }) },
    { value: PLATFORM_STATS.professions.toLocaleString("en-IN"), label: t({ en: "professions", gu: "વ્યવસાયો", hi: "पेशे", mr: "व्यवसाय" }) },
    { value: PLATFORM_STATS.careerEntranceExams.toLocaleString("en-IN"), label: t({ en: "career entrance exams", gu: "કારકિર્દી પ્રવેશ પરીક્ષાઓ", hi: "करियर प्रवेश परीक्षाएँ", mr: "करिअर प्रवेश परीक्षा" }) },
    { value: PLATFORM_STATS.topInstitutes.toLocaleString("en-IN"), label: t({ en: "top institutes", gu: "ટોચની સંસ્થાઓ", hi: "शीर्ष संस्थान", mr: "अव्वल संस्था" }) },
    { value: PLATFORM_STATS.skillLessons.toLocaleString("en-IN"), label: t({ en: "skill lessons", gu: "કુશળતા પાઠ", hi: "कौशल पाठ", mr: "कौशल्य धडे" }) },
    { value: PLATFORM_STATS.entranceExamListings.toLocaleString("en-IN"), label: t({ en: "detailed exam listings", gu: "વિગતવાર પરીક્ષા સૂચિઓ", hi: "विस्तृत परीक्षा सूची", mr: "सविस्तर परीक्षा सूची" }) },
    { value: PLATFORM_STATS.scholarships.toLocaleString("en-IN"), label: t({ en: "scholarships", gu: "શિષ્યવૃત્તિઓ", hi: "छात्रवृत्तियाँ", mr: "शिष्यवृत्ती" }) },
    { value: PLATFORM_STATS.languages.toLocaleString("en-IN"), label: t({ en: "languages", gu: "ભાષાઓ", hi: "भाषाएँ", mr: "भाषा" }) },
  ];
  return (
    <section className="bg-accent text-accent-foreground" aria-label={t({ en: "Platform statistics", gu: "પ્લેટફોર્મ આંકડા", hi: "प्लेटफ़ॉर्म आँकड़े", mr: "प्लॅटफॉर्म आकडेवारी" })}>
      <div className="mx-auto grid max-w-7xl grid-cols-2 items-stretch gap-8 px-4 py-12 sm:grid-cols-4 md:px-8 lg:grid-cols-8">
        {stats.map((item) => (
          <Stat key={item.label} label={item.label} value={item.value} className="h-full min-w-0 justify-between" />
        ))}
      </div>
    </section>
  );
}