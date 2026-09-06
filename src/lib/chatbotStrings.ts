import type { Lang } from "@/lib/lang";

type Q = Record<Lang, string>;

const S: Record<string, Q> = {
  fabTip: {
    en: "Career counsellor",
    gu: "કારકિર્દી સહાયક",
    hi: "करियर काउंसलर",
    mr: "करिअर समुपदेशक",
  },
  title: {
    en: "HBK Career Counsellor",
    gu: "HBK કારકિર્દી સહાયક",
    hi: "HBK करियर काउंसलर",
    mr: "HBK करिअर समुपदेशक",
  },
  subAsk: {
    en: "Ask anything about careers",
    gu: "કારકિર્દી વિશે કંઈપણ પૂછો",
    hi: "करियर के बारे में कुछ भी पूछें",
    mr: "करिअरबद्दल काहीही विचारा",
  },
  subReport: {
    en: "Personalised for",
    gu: "તમારા રિપોર્ટ સાથે ·",
    hi: "आपकी रिपोर्ट के अनुसार ·",
    mr: "तुमच्या अहवालानुसार ·",
  },
  takeTest: {
    en: "Take the free aptitude test for personalised answers →",
    gu: "વ્યક્તિગત જવાબો માટે મફત એપ્ટિટ્યુડ ટેસ્ટ આપો →",
    hi: "व्यक्तिगत उत्तरों के लिए मुफ़्त एप्टीट्यूड टेस्ट दें →",
    mr: "वैयक्तिक उत्तरांसाठी मोफत अ‍ॅप्टिट्यूड चाचणी द्या →",
  },
  greeting: {
    en: "Hi! 👋 I'm your HBK career counsellor. Ask me about streams, colleges, exams, scholarships, study plans — or just say what's on your mind.",
    gu: "નમસ્તે! 👋 હું HBK કારકિર્દી સહાયક છું. પ્રવાહ, કોલેજ, પરીક્ષા, શિષ્યવૃત્તિ, અભ્યાસ યોજના — કંઈપણ પૂછો.",
    hi: "नमस्ते! 👋 मैं आपका HBK करियर काउंसलर हूँ। स्ट्रीम, कॉलेज, परीक्षा, छात्रवृत्ति, पढ़ाई की योजना — कुछ भी पूछें।",
    mr: "नमस्कार! 👋 मी तुमचा HBK करिअर समुपदेशक आहे. शाखा, महाविद्यालये, परीक्षा, शिष्यवृत्ती, अभ्यास योजना — काहीही विचारा.",
  },
  tryAsking: {
    en: "Try asking",
    gu: "આનાથી શરૂ કરો",
    hi: "इससे शुरू करें",
    mr: "याने सुरुवात करा",
  },
  placeholder: {
    en: "Ask about streams, exams, colleges…",
    gu: "પ્રવાહ, પરીક્ષા, કોલેજ વિશે પૂછો…",
    hi: "स्ट्रीम, परीक्षा, कॉलेज के बारे में पूछें…",
    mr: "शाखा, परीक्षा, महाविद्यालयांबद्दल विचारा…",
  },
  thinking: {
    en: "thinking…",
    gu: "વિચારી રહ્યું છે…",
    hi: "सोच रहा हूँ…",
    mr: "विचार करत आहे…",
  },
  disclaimer: {
    en: "Career Counsellor guidance is for orientation — verify big decisions with a teacher/parent.",
    gu: "સહાયકની સલાહ માર્ગદર્શન માટે છે — મોટા નિર્ણય શિક્ષક/વાલી સાથે ચકાસો.",
    hi: "काउंसलर की सलाह मार्गदर्शन के लिए है — बड़े फैसले शिक्षक/अभिभावक से जाँचें।",
    mr: "समुपदेशकाचा सल्ला मार्गदर्शनासाठी आहे — मोठे निर्णय शिक्षक/पालकांसोबत तपासा.",
  },
  errGeneric: {
    en: "Something went wrong. Please try again.",
    gu: "કંઈક ખોટું થયું. ફરી પ્રયાસ કરો.",
    hi: "कुछ गड़बड़ हुई। कृपया फिर कोशिश करें।",
    mr: "काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.",
  },
  errRate: {
    en: "Too many messages — please wait a moment.",
    gu: "ઘણા સંદેશા — થોડી વાર રાહ જુઓ.",
    hi: "बहुत सारे संदेश — कृपया थोड़ा रुकें।",
    mr: "खूप संदेश — कृपया थोडा वेळ थांबा.",
  },
  errCredits: {
    en: "AI credits are exhausted on this workspace.",
    gu: "AI ક્રેડિટ પૂરી થઈ ગઈ છે.",
    hi: "AI क्रेडिट समाप्त हो गए हैं।",
    mr: "AI क्रेडिट संपले आहेत.",
  },
  errNetwork: {
    en: "Network error. Please check your connection and retry.",
    gu: "નેટવર્ક ભૂલ. કનેક્શન તપાસી ફરી પ્રયાસ કરો.",
    hi: "नेटवर्क त्रुटि। कनेक्शन जाँचकर फिर कोशिश करें।",
    mr: "नेटवर्क त्रुटी. कनेक्शन तपासून पुन्हा प्रयत्न करा.",
  },
};

export function cb(key: string, lang: Lang): string {
  return S[key]?.[lang] ?? S[key]?.en ?? key;
}

export const CHAT_SUGGESTIONS_PRE: Record<Lang, string[]> = {
  en: [
    "I just finished Class 10 — Science, Commerce or Arts?",
    "What's the difference between JEE, GUJCET and CUET?",
    "I love drawing — are there real careers in design?",
    "How does this aptitude test actually work?",
  ],
  gu: [
    "ધોરણ 10 પૂરું થયું — સાયન્સ, કોમર્સ કે આર્ટ્સ?",
    "JEE, GUJCET અને CUET વચ્ચે શું ફરક છે?",
    "મને ચિત્રકામ ગમે છે — ડિઝાઇનમાં કારકિર્દી છે?",
    "આ એપ્ટિટ્યુડ ટેસ્ટ કેવી રીતે કામ કરે છે?",
  ],
  hi: [
    "10वीं पूरी हुई — साइंस, कॉमर्स या आर्ट्स?",
    "JEE, GUJCET और CUET में क्या अंतर है?",
    "मुझे ड्रॉइंग पसंद है — डिज़ाइन में करियर है क्या?",
    "यह एप्टीट्यूड टेस्ट कैसे काम करता है?",
  ],
  mr: [
    "१०वी पूर्ण झाली — सायन्स, कॉमर्स की आर्ट्स?",
    "JEE, GUJCET आणि CUET मध्ये काय फरक आहे?",
    "मला चित्रकला आवडते — डिझाइनमध्ये करिअर आहे का?",
    "ही अ‍ॅप्टिट्यूड चाचणी कशी चालते?",
  ],
};

export const CHAT_SUGGESTIONS_POST: Record<Lang, string[]> = {
  en: [
    "Explain my RIASEC code in simple words",
    "Best colleges in Gujarat for my profile",
    "Make a 90-day study plan based on my report",
    "Which entrance exams should I target?",
  ],
  gu: [
    "મારો RIASEC કોડ સરળ ભાષામાં સમજાવો",
    "મારા પ્રોફાઇલ માટે ગુજરાતની શ્રેષ્ઠ કોલેજો",
    "મારા રિપોર્ટ પ્રમાણે 90 દિવસની અભ્યાસ યોજના બનાવો",
    "મારે કઈ પ્રવેશ પરીક્ષાઓ આપવી જોઈએ?",
  ],
  hi: [
    "मेरा RIASEC कोड आसान शब्दों में समझाएँ",
    "मेरी प्रोफ़ाइल के लिए गुजरात के बेहतरीन कॉलेज",
    "मेरी रिपोर्ट के आधार पर 90 दिन की पढ़ाई योजना बनाएँ",
    "मुझे कौन-सी प्रवेश परीक्षाएँ देनी चाहिए?",
  ],
  mr: [
    "माझा RIASEC कोड सोप्या शब्दांत समजावा",
    "माझ्या प्रोफाइलसाठी गुजरातमधील सर्वोत्तम महाविद्यालये",
    "माझ्या अहवालानुसार ९० दिवसांची अभ्यास योजना बनवा",
    "मी कोणत्या प्रवेश परीक्षा द्याव्यात?",
  ],
};
