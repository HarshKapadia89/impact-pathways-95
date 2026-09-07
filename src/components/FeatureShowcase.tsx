import { Lang, translator } from "@/lib/lang";
import { Link } from "@tanstack/react-router";
import {
  Brain,
  FileText,
  Library,
  ClipboardList,
  Award,
  Sparkles,
  FileUser,
  MessageCircle,
  CalendarCheck,
  School,
  ArrowRight,
  LayoutDashboard,
  Star,
  Users,
  Building2,
} from "lucide-react";

const TONES = ["--brand-1", "--brand-2", "--brand-3", "--brand-4", "--brand-5", "--brand-6"];

export function FeatureShowcase({ lang }: { lang: Lang }) {
  const t = translator(lang);

  const features: {
    icon: typeof Brain;
    title: string;
    desc: string;
    to?: string;
    hint?: string;
  }[] = [
    {
      icon: Brain,
      title: t({ en: "Know what fits you", gu: "શું યોગ્ય છે તે જાણો", hi: "जानें क्या सही है", mr: "काय योग्य आहे ते जाणा" }),
      desc: t({
        en: "Psychometric + aptitude test. 25 minutes, in your language.",
        gu: "સાયકોમેટ્રિક + યોગ્યતા ટેસ્ટ. 25 મિનિટ, તમારી ભાષામાં.",
        hi: "साइकोमेट्रिक + योग्यता टेस्ट। 25 मिनट, आपकी भाषा में।",
        mr: "सायकोमेट्रिक + अभिक्षमता चाचणी. 25 मिनिटे, तुमच्या भाषेत.",
      }),
      to: "/test",
    },
    {
      icon: FileText,
      title: t({ en: "Get a 20-page report", gu: "20-પાનાનો રિપોર્ટ મેળવો", hi: "20-पृष्ठ की रिपोर्ट पाएँ", mr: "20-पानी अहवाल मिळवा" }),
      desc: t({
        en: "Graphs, career matches and a 90-day plan — instantly, as a PDF.",
        gu: "ગ્રાફ, કારકિર્દી મેચ અને 90-દિવસનો પ્લાન — તરત જ, PDF તરીકે.",
        hi: "ग्राफ़, करियर मैच और 90-दिन की योजना — तुरंत, PDF में।",
        mr: "आलेख, करिअर जुळणी आणि 90-दिवसांची योजना — लगेच, PDF मध्ये.",
      }),
      to: "/test",
    },
    {
      icon: Library,
      title: t({ en: "Explore 1,600+ professions", gu: "1,600+ વ્યવસાયો શોધો", hi: "1,600+ पेशे देखें", mr: "1,600+ व्यवसाय पाहा" }),
      desc: t({
        en: "Deep guides per profession — and compare careers side by side.",
        gu: "દરેક વ્યવસાયની વિગતવાર માહિતી — અને કારકિર્દીની સરખામણી કરો.",
        hi: "हर पेशे की विस्तृत जानकारी — और करियर की तुलना करें।",
        mr: "प्रत्येक व्यवसायाची सविस्तर माहिती — आणि करिअरची तुलना करा.",
      }),
      to: "/career-library",
    },
    {
      icon: ClipboardList,
      title: t({ en: "Track 100 entrance exams", gu: "100 પ્રવેશ પરીક્ષાઓ જુઓ", hi: "100 प्रवेश परीक्षाएँ देखें", mr: "100 प्रवेश परीक्षा पाहा" }),
      desc: t({
        en: "Who conducts them, when, and which careers they open.",
        gu: "કોણ લે છે, ક્યારે, અને કઈ કારકિર્દી ખુલે છે.",
        hi: "कौन कराता है, कब, और कौन से करियर खुलते हैं।",
        mr: "कोण घेते, केव्हा आणि कोणते करिअर उघडतात.",
      }),
      to: "/exams",
    },
    {
      icon: Award,
      title: t({ en: "Find 100 scholarships", gu: "100 શિષ્યવૃત્તિઓ શોધો", hi: "100 छात्रवृत्तियाँ खोजें", mr: "100 शिष्यवृत्त्या शोधा" }),
      desc: t({
        en: "Eligibility, amounts and deadlines — filtered for you.",
        gu: "પાત્રતા, રકમ અને છેલ્લી તારીખ — તમારા માટે ફિલ્ટર કરેલી.",
        hi: "पात्रता, राशि और समय-सीमा — आपके लिए छांटी गई।",
        mr: "पात्रता, रक्कम आणि मुदत — तुमच्यासाठी निवडलेली.",
      }),
      to: "/scholarships",
    },
    {
      icon: Sparkles,
      title: t({ en: "Build life skills free", gu: "જીવન કુશળતા મફત શીખો", hi: "मुफ़्त में लाइफ स्किल सीखें", mr: "जीवन कौशल्ये मोफत शिका" }),
      desc: t({
        en: "LevelUp Lab: 150 lessons, quizzes and certificates.",
        gu: "LevelUp Lab: 150 પાઠ, ક્વિઝ અને પ્રમાણપત્રો.",
        hi: "LevelUp Lab: 150 पाठ, क्विज़ और प्रमाणपत्र।",
        mr: "LevelUp Lab: 150 धडे, क्विझ आणि प्रमाणपत्रे.",
      }),
      to: "/upskill",
    },
    {
      icon: FileUser,
      title: t({ en: "Make your resume", gu: "તમારું રેઝ્યુમે બનાવો", hi: "अपना रेज़्यूमे बनाएँ", mr: "तुमचे रेझ्युमे बनवा" }),
      desc: t({
        en: "A clean student profile PDF in minutes — ready to share.",
        gu: "થોડી મિનિટમાં સ્વચ્છ વિદ્યાર્થી પ્રોફાઇલ PDF — શેર કરવા તૈયાર.",
        hi: "कुछ मिनटों में साफ़ स्टूडेंट प्रोफ़ाइल PDF — साझा करने के लिए तैयार।",
        mr: "काही मिनिटांत स्वच्छ विद्यार्थी प्रोफाइल PDF — शेअर करण्यासाठी तयार.",
      }),
      to: "/profile-builder",
    },
    {
      icon: MessageCircle,
      title: t({ en: "Ask the AI counsellor", gu: "AI કાઉન્સેલરને પૂછો", hi: "AI काउंसलर से पूछें", mr: "AI काउन्सेलरला विचारा" }),
      desc: t({
        en: "HBK Career Counsellor answers in all 4 languages, 24×7.",
        gu: "HBK કારકિર્દી કાઉન્સેલર ચારેય ભાષામાં જવાબ આપે છે, 24×7.",
        hi: "HBK करियर काउंसलर चारों भाषाओं में जवाब देता है, 24×7।",
        mr: "HBK करिअर काउन्सेलर चारही भाषांत उत्तरे देते, 24×7.",
      }),
      hint: t({ en: "Bottom-right on every page", gu: "દરેક પાનાની જમણી બાજુ નીચે", hi: "हर पेज पर नीचे दाईं ओर", mr: "प्रत्येक पानाच्या उजव्या कोपऱ्यात खाली" }),
    },
    {
      icon: CalendarCheck,
      title: t({ en: "Book a counsellor", gu: "કાઉન્સેલર બુક કરો", hi: "काउंसलर बुक करें", mr: "काउन्सेलर बुक करा" }),
      desc: t({
        en: "A 1-on-1 session that uses your actual test results.",
        gu: "તમારા ખરા ટેસ્ટ પરિણામો સાથે 1-ઓન-1 સત્ર.",
        hi: "आपके असली टेस्ट नतीजों के साथ 1-ऑन-1 सेशन।",
        mr: "तुमच्या खऱ्या चाचणी निकालांसह 1-ऑन-1 सत्र.",
      }),
      to: "/counsellor",
    },
    {
      icon: School,
      title: t({ en: "Find your college", gu: "તમારી કોલેજ શોધો", hi: "अपना कॉलेज खोजें", mr: "तुमचे महाविद्यालय शोधा" }),
      desc: t({
        en: "Search 1,900+ colleges & universities by name, course, city, state, category and type.",
        gu: "1,900+ કોલેજો અને યુનિવર્સિટીઓ નામ, કોર્સ, શહેર, રાજ્ય, કેટેગરી અને પ્રકાર મુજબ શોધો.",
        hi: "1,900+ कॉलेज और विश्वविद्यालय नाम, कोर्स, शहर, राज्य, श्रेणी और प्रकार से खोजें।",
        mr: "1,900+ महाविद्यालये आणि विद्यापीठे नाव, अभ्यासक्रम, शहर, राज्य, प्रकारानुसार शोधा.",
      }),
      to: "/find-college",
    },
    {
      icon: LayoutDashboard,
      title: t({ en: "Your student dashboard", gu: "તમારું વિદ્યાર્થી ડેશબોર્ડ", hi: "आपका स्टूडेंट डैशबोर्ड", mr: "तुमचे विद्यार्थी डॅशबोर्ड" }),
      desc: t({
        en: "Saved careers, bookmarks, test results and progress — all in one place.",
        gu: "સાચવેલી કારકિર્દી, બુકમાર્ક્સ, ટેસ્ટ પરિણામો અને પ્રગતિ — બધું એક જગ્યાએ.",
        hi: "सहेजे करियर, बुकमार्क, टेस्ट नतीजे और प्रगति — सब एक जगह।",
        mr: "जतन केलेली करिअर्स, बुकमार्क, चाचणी निकाल आणि प्रगती — सर्व एकाच ठिकाणी.",
      }),
      to: "/dashboard",
    },
    {
      icon: Star,
      title: t({ en: "Success stories", gu: "સફળતાની વાર્તાઓ", hi: "सफलता की कहानियाँ", mr: "यशोगाथा" }),
      desc: t({
        en: "Real students who found their path with HBK — and how they did it.",
        gu: "HBK સાથે પોતાનો માર્ગ શોધનાર વાસ્તવિક વિદ્યાર્થીઓ — અને તેણે કેવી રીતે કર્યું.",
        hi: "HBK से अपना रास्ता पाने वाले असली छात्र — और उन्होंने कैसे किया।",
        mr: "HBK सोबत स्वतःचा मार्ग शोधणारे खरे विद्यार्थी — आणि त्यांनी ते कसे केले.",
      }),
      to: "/success-stories",
    },
    {
      icon: Users,
      title: t({ en: "For parents", gu: "વાલીઓ માટે", hi: "अभिभावकों के लिए", mr: "पालकांसाठी" }),
      desc: t({
        en: "Understand your child's report and support their career choice.",
        gu: "તમારા બાળકનો રિપોર્ટ સમજો અને તેમની કારકિર્દી પસંદગીમાં સાથ આપો.",
        hi: "अपने बच्चे की रिपोर्ट समझें और उसके करियर चुनाव में साथ दें।",
        mr: "तुमच्या मुलाचा अहवाल समजून घ्या आणि त्यांच्या करिअर निवडीत साथ द्या.",
      }),
      to: "/parents",
    },
    {
      icon: Building2,
      title: t({ en: "For schools", gu: "શાળાઓ માટે", hi: "स्कूलों के लिए", mr: "शाळांसाठी" }),
      desc: t({
        en: "Run the test for a whole class and get batch-wise reports.",
        gu: "આખા વર્ગ માટે ટેસ્ટ લો અને બેચ-વાઈઝ રિપોર્ટ મેળવો.",
        hi: "पूरी कक्षा के लिए टेस्ट कराएँ और बैच-वार रिपोर्ट पाएँ।",
        mr: "संपूर्ण वर्गासाठी चाचणी घ्या आणि बॅचनिहाय अहवाल मिळवा.",
      }),
      to: "/for-schools",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-14">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs text-accent font-semibold uppercase tracking-widest">
          {t({ en: "Everything in one place", gu: "બધું એક જ જગ્યાએ", hi: "सब कुछ एक ही जगह", mr: "सर्व काही एकाच ठिकाणी" })}
        </div>
        <h2 className="mt-3 font-serif text-3xl md:text-4xl">
          {t({
            en: "Everything you can do here",
            gu: "અહીં તમે શું બધું કરી શકો",
            hi: "यहाँ आप क्या-क्या कर सकते हैं",
            mr: "इथे तुम्ही काय काय करू शकता",
          })}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {t({
            en: "One free platform — from discovering your direction to reaching the right college.",
            gu: "એક મફત પ્લેટફોર્મ — તમારી દિશા શોધવાથી લઈને યોગ્ય કોલેજ સુધી પહોંચવા સુધી.",
            hi: "एक मुफ़्त प्लेटफ़ॉर्म — अपनी दिशा खोजने से लेकर सही कॉलेज तक पहुँचने तक।",
            mr: "एक मोफत व्यासपीठ — तुमची दिशा शोधण्यापासून योग्य महाविद्यालयात पोहोचेपर्यंत.",
          })}
        </p>
      </div>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f, i) => {
          const tone = `var(${TONES[i % TONES.length]})`;
          const inner = (
            <>
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: `color-mix(in oklab, ${tone} 16%, transparent)`, color: tone }}
              >
                <f.icon className="h-6 w-6" />
              </span>
              <div className="mt-4 font-serif text-lg leading-tight">{f.title}</div>
              <div className="text-sm mt-1.5 text-muted-foreground leading-relaxed">{f.desc}</div>
              <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: "var(--accent)" }}>
                {f.hint ?? (
                  <>
                    {t({ en: "Open", gu: "ખોલો", hi: "खोलें", mr: "उघडा" })}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </div>
            </>
          );
          const cls =
            "group rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1 hover:shadow-[var(--shadow-card)]";
          return f.to ? (
            <Link key={f.title} to={f.to} className={cls}>
              {inner}
            </Link>
          ) : (
            <div key={f.title} className={cls}>
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}
