// UI labels for the Upskilling Hub, in English, Gujarati, Hindi and Marathi.
import type { Lang } from "@/lib/lang";

type E = Record<Lang, string>;

export const US: Record<string, E> = {
  hub: { en: "LevelUp Lab", gu: "લેવલઅપ લેબ", hi: "लेवलअप लॅब", mr: "लेवलअप लॅब" },
  hubTitle: {
    en: "LevelUp Lab",
    gu: "લેવલઅપ લેબ",
    hi: "लेवलअप लॅब",
    mr: "लेवलअप लॅब",
  },
  hubKicker: {
    en: "Skills school never taught you",
    gu: "શાળાએ ક્યારેય ન શીખવેલી કુશળતા",
    hi: "जो स्कूल ने कभी नहीं सिखाया",
    mr: "शाळेने कधीच न शिकवलेली कौशल्ये",
  },
  hubSub: {
    en: "Life and career skills your syllabus never taught you — time management, personality, communication, money sense, AI and more. Short lessons with a 7-day plan, notes and real global stories.",
    gu: "તમારા અભ્યાસક્રમમાં ન શીખવાયેલી જીવન અને કારકિર્દી કુશળતા — સમય વ્યવસ્થાપન, વ્યક્તિત્વ, સંવાદ, નાણાં સમજ, AI અને વધુ. ટૂંકા પાઠ, ૭ દિવસની યોજના, નોંધ અને સાચી વૈશ્વિક વાર્તાઓ સાથે.",
    hi: "जो पाठ्यक्रम नहीं सिखाता — समय प्रबंधन, व्यक्तित्व, संवाद, पैसे की समझ, AI और बहुत कुछ। छोटे पाठ, 7 दिन की योजना, नोट्स और सच्ची वैश्विक कहानियाँ।",
    mr: "अभ्यासक्रमात न शिकवली जाणारी कौशल्ये — वेळेचे नियोजन, व्यक्तिमत्त्व, संवाद, पैशाची समज, AI आणि बरेच काही. छोटे धडे, ७ दिवसांची योजना, टिपा आणि खऱ्या जागतिक कथा.",
  },
  topics: { en: "Topics", gu: "વિષયો", hi: "विषय", mr: "विषय" },
  lessons: { en: "Lessons", gu: "પાઠ", hi: "पाठ", mr: "धडे" },
  hours: { en: "Hours of learning", gu: "શીખવાના કલાક", hi: "सीखने के घंटे", mr: "शिकण्याचे तास" },
  searchPh: {
    en: "Search a skill — e.g. procrastination, budgeting, interview",
    gu: "કૌશલ્ય શોધો — દા.ત. ટાળવાની આદત, બજેટ, ઇન્ટરવ્યુ",
    hi: "कौशल खोजें — जैसे टालमटोल, बजट, इंटरव्यू",
    mr: "कौशल्य शोधा — उदा. चालढकल, बजेट, मुलाखत",
  },
  continue: { en: "Continue where you left off", gu: "જ્યાંથી છોડ્યું ત્યાંથી ચાલુ રાખો", hi: "जहाँ छोड़ा था वहीं से जारी रखें", mr: "जिथे थांबलात तिथून सुरू ठेवा" },
  start: { en: "Start", gu: "શરૂ કરો", hi: "शुरू करें", mr: "सुरू करा" },
  yourProgress: { en: "Your progress", gu: "તમારી પ્રગતિ", hi: "आपकी प्रगति", mr: "तुमची प्रगती" },
  done: { en: "Completed", gu: "પૂર્ણ", hi: "पूर्ण", mr: "पूर्ण" },
  markDone: { en: "Mark as complete", gu: "પૂર્ણ તરીકે ચિહ્નિત કરો", hi: "पूर्ण के रूप में चिह्नित करें", mr: "पूर्ण म्हणून चिन्हांकित करा" },
  markUndone: { en: "Completed — undo", gu: "પૂર્ણ — રદ કરો", hi: "पूर्ण — पूर्ववत करें", mr: "पूर्ण — पूर्ववत करा" },
  outcomes: { en: "What you will be able to do", gu: "તમે શું કરી શકશો", hi: "आप क्या कर पाएँगे", mr: "तुम्ही काय करू शकाल" },
  why: { en: "Why this matters", gu: "આ કેમ મહત્વનું છે", hi: "यह क्यों ज़रूरी है", mr: "हे का महत्त्वाचे आहे" },
  plan: { en: "7-day study plan", gu: "૭ દિવસની અભ્યાસ યોજના", hi: "7-दिन की अध्ययन योजना", mr: "७ दिवसांची अभ्यास योजना" },
  day: { en: "Day", gu: "દિવસ", hi: "दिन", mr: "दिवस" },
  notes: { en: "Revision notes", gu: "પુનરાવર્તન નોંધ", hi: "रिवीज़न नोट्स", mr: "उजळणी टिपा" },
  cases: { en: "Global case studies", gu: "વૈશ્વિક કેસ સ્ટડી", hi: "वैश्विक केस स्टडी", mr: "जागतिक केस स्टडी" },
  takeaway: { en: "Takeaway", gu: "શીખ", hi: "सीख", mr: "धडा" },
  practice: { en: "Try this week", gu: "આ અઠવાડિયે અજમાવો", hi: "इस सप्ताह आज़माएँ", mr: "या आठवड्यात करून पाहा" },
  quiz: { en: "Self-check", gu: "સ્વ-તપાસ", hi: "स्व-जाँच", mr: "स्व-तपासणी" },
  showAnswer: { en: "Show answer", gu: "જવાબ બતાવો", hi: "उत्तर देखें", mr: "उत्तर पाहा" },
  resources: { en: "Go deeper", gu: "વધુ ઊંડાણ", hi: "और गहराई में", mr: "अधिक सखोल" },
  prev: { en: "Previous", gu: "પાછળ", hi: "पिछला", mr: "मागील" },
  next: { en: "Next", gu: "આગળ", hi: "अगला", mr: "पुढील" },
  backTopic: { en: "All lessons in this topic", gu: "આ વિષયના બધા પાઠ", hi: "इस विषय के सभी पाठ", mr: "या विषयातील सर्व धडे" },
  backHub: { en: "All topics", gu: "બધા વિષયો", hi: "सभी विषय", mr: "सर्व विषय" },
  min: { en: "min", gu: "મિનિટ", hi: "मिनट", mr: "मिनिटे" },
  print: { en: "Print / Save PDF", gu: "પ્રિન્ટ / PDF સાચવો", hi: "प्रिंट / PDF सेव करें", mr: "प्रिंट / PDF जतन करा" },
  badges: { en: "Badges", gu: "બેજ", hi: "बैज", mr: "बॅजेस" },
  quizTitle: { en: "Scored quiz", gu: "ગુણાંકિત ક્વિઝ", hi: "अंकों वाली क्विज़", mr: "गुणांकित क्विझ" },
  quizSub: {
    en: "Pick how many questions and how many marks each question carries, then test yourself.",
    gu: "કેટલા પ્રશ્નો અને દરેક પ્રશ્નના કેટલા ગુણ, તે પસંદ કરો અને તમારી જાતને ચકાસો.",
    hi: "कितने प्रश्न और हर प्रश्न के कितने अंक — चुनें और खुद को परखें।",
    mr: "किती प्रश्न आणि प्रत्येक प्रश्नाला किती गुण ते निवडा आणि स्वतःची चाचणी घ्या.",
  },
  quizLength: { en: "Quiz length", gu: "ક્વિઝની લંબાઈ", hi: "क्विज़ की लंबाई", mr: "क्विझची लांबी" },
  quizQuestions: { en: "questions", gu: "પ્રશ્નો", hi: "प्रश्न", mr: "प्रश्न" },
  quizMarks: { en: "Marks per question", gu: "પ્રતિ પ્રશ્ન ગુણ", hi: "प्रति प्रश्न अंक", mr: "प्रति प्रश्न गुण" },
  quizMarksShort: { en: "marks", gu: "ગુણ", hi: "अंक", mr: "गुण" },
  quizTotal: { en: "Total marks", gu: "કુલ ગુણ", hi: "कुल अंक", mr: "एकूण गुण" },
  quizStart: { en: "Start quiz", gu: "ક્વિઝ શરૂ કરો", hi: "क्विज़ शुरू करें", mr: "क्विझ सुरू करा" },
  quizSubmit: { en: "Submit and see marks", gu: "સબમિટ કરો અને ગુણ જુઓ", hi: "जमा करें और अंक देखें", mr: "सबमिट करा आणि गुण पाहा" },
  quizScore: { en: "Your marks", gu: "તમારા ગુણ", hi: "आपके अंक", mr: "तुमचे गुण" },
  quizCorrect: { en: "correct", gu: "સાચા", hi: "सही", mr: "बरोबर" },
  quizRetry: { en: "Try a new set", gu: "નવો સેટ અજમાવો", hi: "नया सेट आज़माएँ", mr: "नवीन संच वापरा" },
  quizCta: { en: "Take a scored quiz", gu: "ગુણાંકિત ક્વિઝ આપો", hi: "अंकों वाली क्विज़ दें", mr: "गुणांकित क्विझ द्या" },
  quizMixed: { en: "Mixed quiz — all topics", gu: "મિશ્ર ક્વિઝ — બધા વિષયો", hi: "मिश्रित क्विज़ — सभी विषय", mr: "मिश्र क्विझ — सर्व विषय" },
  noResults: { en: "No lessons matched. Try another word.", gu: "કોઈ પાઠ મળ્યો નથી. બીજો શબ્દ અજમાવો.", hi: "कोई पाठ नहीं मिला। दूसरा शब्द आज़माएँ।", mr: "कोणताही धडा सापडला नाही. दुसरा शब्द वापरा." },
  englishNote: {
    en: "",
    gu: "પાઠનું લખાણ હાલ અંગ્રેજીમાં છે; ગુજરાતી અનુવાદ ટૂંક સમયમાં આવશે.",
    hi: "पाठ की सामग्री फ़िलहाल अंग्रेज़ी में है; हिंदी अनुवाद जल्द आ रहा है।",
    mr: "धड्यांचा मजकूर सध्या इंग्रजीत आहे; मराठी भाषांतर लवकरच येत आहे.",
  },
};

export function us(key: string, lang: Lang): string {
  const e = US[key];
  if (!e) return key;
  return e[lang] || e.en;
}
