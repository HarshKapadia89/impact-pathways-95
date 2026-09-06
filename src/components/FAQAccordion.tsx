import { Lang, translator } from "@/lib/lang";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

type QA = { q: string; a: string };

export function FAQAccordion({
  lang,
  items,
  showHeader = true,
}: {
  lang: Lang;
  items?: QA[];
  showHeader?: boolean;
}) {
  const t = translator(lang);
  const defaultItems: QA[] = [
    {
      q: t({ en: "Is this actually free?", gu: "શું આ ખરેખર મફત છે?", hi: "क्या यह वाकई मुफ़्त है?", mr: "हे खरोखर मोफत आहे का?" }),
      a: t({
        en: "Yes. No login, no credit card, no hidden charges. Completely free, funded by The H B Kapadia New High School, Ahmedabad.",
        gu: "હા. કોઈ લૉગિન નહીં, કોઈ ક્રેડિટ કાર્ડ નહીં, કોઈ છુપા ચાર્જ નહીં. ધ એચ બી કાપડિયા ન્યૂ હાઈ સ્કૂલ, અમદાવાદ દ્વારા સંપૂર્ણ મફત.",
        hi: "हाँ। कोई लॉगिन नहीं, कोई क्रेडिट कार्ड नहीं, कोई छिपा शुल्क नहीं। द एच बी कापड़िया न्यू हाई स्कूल, अहमदाबाद द्वारा पूर्णतः निःशुल्क।",
        mr: "होय. लॉगिन नाही, क्रेडिट कार्ड नाही, छुपे शुल्क नाही. द एच बी कापडिया न्यू हायस्कूल, अहमदाबाद यांच्याकडून पूर्णपणे मोफत.",
      }),
    },
    {
      q: t({ en: "How long does the test take?", gu: "ટેસ્ટમાં કેટલો સમય લાગે છે?", hi: "टेस्ट में कितना समय लगता है?", mr: "चाचणीला किती वेळ लागतो?" }),
      a: t({
        en: "About 25 minutes. You can pause anytime and resume from where you left off.",
        gu: "આશરે 25 મિનિટ. તમે ગમે ત્યારે થોભી શકો છો અને જ્યાંથી છોડ્યું ત્યાંથી ફરી શરૂ કરી શકો છો.",
        hi: "लगभग 25 मिनट। आप कभी भी रोक सकते हैं और वहीं से जारी रख सकते हैं।",
        mr: "सुमारे 25 मिनिटे. तुम्ही कधीही थांबू शकता आणि तिथूनच पुढे सुरू करू शकता.",
      }),
    },
    {
      q: t({ en: "How do I get the report?", gu: "રિપોર્ટ કેવી રીતે મળે?", hi: "रिपोर्ट कैसे मिलेगी?", mr: "अहवाल कसा मिळेल?" }),
      a: t({
        en: "It appears on screen the moment you finish. You can download the PDF or email it to yourself and your parents.",
        gu: "ટેસ્ટ પૂરો થતાં જ સ્ક્રીન પર દેખાય છે. તમે PDF ડાઉનલોડ કરી શકો છો અથવા તમારા માતા-પિતાને ઈમેલ કરી શકો છો.",
        hi: "टेस्ट पूरा होते ही स्क्रीन पर आ जाती है। आप PDF डाउनलोड कर सकते हैं या माता-पिता को ईमेल कर सकते हैं।",
        mr: "चाचणी संपताच ती स्क्रीनवर दिसते. तुम्ही PDF डाउनलोड करू शकता किंवा पालकांना ईमेल करू शकता.",
      }),
    },
    {
      q: t({ en: "Which grades is it for?", gu: "કયા ધોરણ માટે છે?", hi: "यह किन कक्षाओं के लिए है?", mr: "हे कोणत्या इयत्तांसाठी आहे?" }),
      a: t({
        en: "Grades 6 to 12. The questions and the report adapt to the grade band you select.",
        gu: "ધોરણ 6 થી 12. તમે પસંદ કરેલા ધોરણ પ્રમાણે પ્રશ્નો અને રિપોર્ટ બદલાય છે.",
        hi: "कक्षा 6 से 12। आपके चुने गए कक्षा-समूह के अनुसार प्रश्न और रिपोर्ट बदलते हैं।",
        mr: "इयत्ता 6 ते 12. तुम्ही निवडलेल्या इयत्ता गटानुसार प्रश्न आणि अहवाल बदलतात.",
      }),
    },
    {
      q: t({ en: "Which languages are supported?", gu: "કઈ ભાષાઓમાં ઉપલબ્ધ છે?", hi: "कौन-कौन सी भाषाएँ उपलब्ध हैं?", mr: "कोणत्या भाषा उपलब्ध आहेत?" }),
      a: t({
        en: "English, Gujarati, Hindi and Marathi — the site, the questions and the 20-page report all follow the language you choose.",
        gu: "અંગ્રેજી, ગુજરાતી, હિન્દી અને મરાઠી — વેબસાઇટ, પ્રશ્નો અને 20-પાનાનો રિપોર્ટ તમે પસંદ કરેલી ભાષામાં મળે છે.",
        hi: "अंग्रेज़ी, गुजराती, हिंदी और मराठी — वेबसाइट, प्रश्न और 20-पृष्ठ रिपोर्ट आपकी चुनी भाषा में मिलते हैं।",
        mr: "इंग्रजी, गुजराती, हिंदी आणि मराठी — संकेतस्थळ, प्रश्न आणि 20-पानी अहवाल तुम्ही निवडलेल्या भाषेत मिळतात.",
      }),
    },
    {
      q: t({ en: "Is my data safe?", gu: "શું મારી માહિતી સુરક્ષિત છે?", hi: "क्या मेरा डेटा सुरक्षित है?", mr: "माझी माहिती सुरक्षित आहे का?" }),
      a: t({
        en: "Yes. We never sell or share data. Your responses are used only to generate your report.",
        gu: "હા. અમે ડેટા ક્યારેય વેચતા કે શેર કરતા નથી. તમારા જવાબો ફક્ત તમારો રિપોર્ટ બનાવવા વપરાય છે.",
        hi: "हाँ। हम डेटा कभी नहीं बेचते या साझा करते। आपके उत्तर केवल आपकी रिपोर्ट बनाने में उपयोग होते हैं।",
        mr: "होय. आम्ही माहिती कधीही विकत नाही किंवा सामायिक करत नाही. तुमची उत्तरे फक्त अहवालासाठी वापरली जातात.",
      }),
    },
    {
      q: t({ en: "Is there a version for schools?", gu: "શું શાળાઓ માટે વર્ઝન છે?", hi: "क्या स्कूलों के लिए संस्करण है?", mr: "शाळांसाठी आवृत्ती आहे का?" }),
      a: t({
        en: "Yes — visit the 'For Schools' page. We offer free onboarding, bulk reports and counsellor dashboards.",
        gu: "હા — 'શાળાઓ માટે' પેજ જુઓ. અમે મફત ઓનબોર્ડિંગ, બલ્ક રિપોર્ટ અને કાઉન્સેલર ડેશબોર્ડ આપીએ છીએ.",
        hi: "हाँ — 'स्कूलों के लिए' पेज देखें। हम निःशुल्क ऑनबोर्डिंग, बल्क रिपोर्ट और काउंसलर डैशबोर्ड देते हैं।",
        mr: "होय — 'शाळांसाठी' पान पाहा. आम्ही मोफत ऑनबोर्डिंग, एकत्रित अहवाल आणि समुपदेशक डॅशबोर्ड देतो.",
      }),
    },
    {
      q: t({ en: "What's the science behind it?", gu: "તેની પાછળનું વિજ્ઞાન શું છે?", hi: "इसके पीछे का विज्ञान क्या है?", mr: "यामागील शास्त्र काय आहे?" }),
      a: t({
        en: "We combine three validated frameworks: Holland's RIASEC interest model, Gardner's Multiple Intelligences and a 5-domain aptitude battery aligned with NCERT.",
        gu: "અમે ત્રણ માન્ય ફ્રેમવર્ક જોડીએ છીએ: હોલેન્ડનું RIASEC રુચિ મોડેલ, ગાર્ડનરની મલ્ટિપલ ઇન્ટેલિજન્સ અને NCERT સાથે સુસંગત 5-ડોમેન યોગ્યતા કસોટી.",
        hi: "हम तीन प्रमाणित ढाँचे जोड़ते हैं: हॉलैंड का RIASEC रुचि मॉडल, गार्डनर की मल्टीपल इंटेलिजेंस और NCERT के अनुरूप 5-डोमेन योग्यता परीक्षण।",
        mr: "आम्ही तीन प्रमाणित प्रणाली एकत्र करतो: हॉलंडचे RIASEC आवड मॉडेल, गार्डनरची बहुविध बुद्धिमत्ता आणि NCERT-सुसंगत 5-क्षेत्रीय अभिक्षमता चाचणी.",
      }),
    },
  ];

  const list = items ?? defaultItems;
  const [open, setOpen] = useState<number | null>(0);
  const T = {
    eyebrow: t({ en: "FAQ", gu: "સામાન્ય પ્રશ્નો", hi: "सामान्य प्रश्न", mr: "सामान्य प्रश्न" }),
    title: t({
      en: "Questions students & parents ask",
      gu: "વિદ્યાર્થીઓ અને વાલીઓ પૂછે છે તે પ્રશ્નો",
      hi: "छात्र और अभिभावक जो प्रश्न पूछते हैं",
      mr: "विद्यार्थी व पालक विचारतात ते प्रश्न",
    }),
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
