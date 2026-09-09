import { Lang, translator } from "@/lib/lang";
import { Link } from "@tanstack/react-router";
import { Brain, FileText, Compass, ArrowRight } from "lucide-react";

export function HowItWorks({ lang }: { lang: Lang }) {
  const t = translator(lang);
  const T = {
    eyebrow: t({ en: "How it works", gu: "કેવી રીતે કામ કરે છે", hi: "यह कैसे काम करता है", mr: "हे कसे चालते" }),
    title: t({
      en: "Your direction in 3 steps",
      gu: "ત્રણ સ્ટેપમાં તમારી દિશા",
      hi: "तीन चरणों में अपनी दिशा पाएँ",
      mr: "तीन टप्प्यांत तुमची दिशा",
    }),
    sub: t({
      en: "Starts in minutes. Stays useful for years.",
      gu: "મિનિટોમાં શરૂ થાય છે. વર્ષો સુધી ઉપયોગી રહે છે.",
      hi: "मिनटों में शुरू। वर्षों तक उपयोगी।",
      mr: "काही मिनिटांत सुरू. वर्षानुवर्षे उपयुक्त.",
    }),
    cta: t({ en: "Start now", gu: "હમણાં શરૂ કરો", hi: "अभी शुरू करें", mr: "आत्ताच सुरू करा" }),
  };
  const steps = [
    {
      icon: Brain,
      n: "01",
      title: t({ en: "Take the test", gu: "ટેસ્ટ આપો", hi: "टेस्ट दें", mr: "चाचणी द्या" }),
      desc: t({
        en: "60 questions in your language. RIASEC + Multiple Intelligences + Aptitude. ~25 minutes.",
        gu: "તમારી ભાષામાં 60 પ્રશ્નો. RIASEC + મલ્ટિપલ ઇન્ટેલિજન્સ + યોગ્યતા. આશરે 25 મિનિટ.",
        hi: "आपकी भाषा में 60 प्रश्न। RIASEC + मल्टीपल इंटेलिजेंस + योग्यता। लगभग 25 मिनट।",
        mr: "तुमच्या भाषेत 60 प्रश्न. RIASEC + बहुविध बुद्धिमत्ता + अभिक्षमता. सुमारे 25 मिनिटे.",
      }),
    },
    {
      icon: FileText,
      n: "02",
      title: t({ en: "Get your report", gu: "રિપોર્ટ મેળવો", hi: "अपनी रिपोर्ट पाएँ", mr: "तुमचा अहवाल मिळवा" }),
      desc: t({
        en: "Personalised 20-page PDF — graphs, career matches and a 90-day action plan.",
        gu: "વ્યક્તિગત 20-પાનાનો PDF — ગ્રાફ, વ્યવસાય મેચ અને 90-દિવસનો એક્શન પ્લાન.",
        hi: "व्यक्तिगत 20-पृष्ठ PDF — ग्राफ़, करियर मैच और 90-दिन की कार्ययोजना।",
        mr: "वैयक्तिक 20-पानी PDF — आलेख, करिअर जुळणी आणि 90-दिवसांची कृती योजना.",
      }),
    },
    {
      icon: Compass,
      n: "03",
      title: t({ en: "Explore paths", gu: "માર્ગો શોધો", hi: "रास्ते खोजें", mr: "मार्ग शोधा" }),
      desc: t({
        en: "Dive into matched streams, colleges, entrance exams and scholarships.",
        gu: "મેચ થયેલા પ્રવાહો, કોલેજો, પ્રવેશ પરીક્ષાઓ અને શિષ્યવૃત્તિમાં ઊંડા ઊતરો.",
        hi: "मिलते-जुलते स्ट्रीम, कॉलेज, प्रवेश परीक्षाएँ और छात्रवृत्तियाँ देखें।",
        mr: "जुळणारे प्रवाह, महाविद्यालये, प्रवेश परीक्षा आणि शिष्यवृत्ती पाहा.",
      }),
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-14">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs text-accent font-semibold uppercase tracking-widest">
          {T.eyebrow}
        </div>
        <h2 className="mt-3 font-serif text-3xl md:text-4xl">{T.title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{T.sub}</p>
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-4 relative">
        {steps.map((s, i) => (
          <div
            key={s.n}
            className="relative rounded-2xl border border-border bg-card p-6 hover:-translate-y-1 hover:shadow-lift transition"
          >
            <div
              className="absolute -top-3 -left-3 h-10 w-10 rounded-xl flex items-center justify-center font-serif text-sm font-bold text-white shadow-md"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--accent) 60%, var(--primary)))",
              }}
            >
              {s.n}
            </div>
            <s.icon className="h-6 w-6 text-accent mt-2" />
            <div className="mt-3 font-serif text-lg">{s.title}</div>
            <div className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{s.desc}</div>
            {i < steps.length - 1 && (
              <ArrowRight className="hidden md:block absolute top-1/2 -right-3 h-5 w-5 text-accent/40" />
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/test"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-6 py-3 text-sm font-semibold shadow-[var(--shadow-glow-primary)] hover:-translate-y-0.5 transition"
        >
          {T.cta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
