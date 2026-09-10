import { useLang, translator } from "@/lib/lang";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { StudentPhotoHero } from "@/components/StudentPhotoHero";
import { StatsBand } from "@/components/StatsBand";
import { FAQAccordion } from "@/components/FAQAccordion";
import { HANDBOOK_SUMMARIES } from "@/lib/handbookData";
import { PLATFORM_STATS } from "@/lib/platformStats";
import {
  ArrowIcon,
  Badge,
  Card,
  CardDescription,
  CardTitle,
  Section,
} from "@/design-system/hbk-career-brand-guidelines-4f1c39";
import {
  Award,
  BookOpen,
  Brain,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Compass,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Library,
  MessageCircle,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import studentsHero from "@/assets/hbk-students-hero.jpg";
import studentsPath from "@/assets/hbk-students-path.jpg";
import reportCover from "@/assets/sample-report-cover.jpg";
import reportRiasec from "@/assets/sample-report-riasec.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HBK Careers — Career Guidance for Students" },
      { name: "description", content: "Discover your strengths, explore 1,651 professions, find institutes, exams and scholarships, and build your next-step plan with HBK Careers." },
      { property: "og:title", content: "HBK Careers — Find Your Direction" },
      { property: "og:description", content: "A complete career guidance platform for students in English, Gujarati, Hindi and Marathi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const lang = useLang();
  const t = translator(lang);
  const journey = [
    {
      icon: Compass,
      step: "01",
      title: t({ en: "Discover", gu: "શોધો", hi: "खोजें", mr: "शोधा" }),
      text: t({ en: "Start with your interests, strengths and the questions that matter to you.", gu: "તમારી રુચિઓ, શક્તિઓ અને તમારા માટે મહત્વના પ્રશ્નોથી શરૂઆત કરો.", hi: "अपनी रुचियों, क्षमताओं और ज़रूरी सवालों से शुरुआत करें।", mr: "तुमच्या आवडी, क्षमता आणि महत्त्वाच्या प्रश्नांपासून सुरुवात करा." }),
    },
    {
      icon: Brain,
      step: "02",
      title: t({ en: "Assess", gu: "મૂલ્યાંકન", hi: "आकलन", mr: "मूल्यांकन" }),
      text: t({ en: "Understand your RIASEC profile, intelligences and aptitude in your language.", gu: "તમારી ભાષામાં RIASEC પ્રોફાઇલ, બુદ્ધિમત્તા અને યોગ્યતા સમજો.", hi: "अपनी भाषा में RIASEC प्रोफ़ाइल, बुद्धिमत्ता और योग्यता समझें।", mr: "तुमच्या भाषेत RIASEC प्रोफाइल, बुद्धिमत्ता आणि अभिक्षमता समजा." }),
    },
    {
      icon: Library,
      step: "03",
      title: t({ en: "Explore", gu: "અન્વેષણ", hi: "जानकारी लें", mr: "अन्वेषण" }),
      text: t({ en: "Compare professions, streams, colleges, exams and scholarships with clarity.", gu: "વ્યવસાયો, પ્રવાહો, કોલેજો, પરીક્ષાઓ અને શિષ્યવૃત્તિઓની સ્પષ્ટ સરખામણી કરો.", hi: "पेशों, स्ट्रीम, कॉलेज, परीक्षाओं और छात्रवृत्तियों की स्पष्ट तुलना करें।", mr: "व्यवसाय, प्रवाह, महाविद्यालये, परीक्षा आणि शिष्यवृत्तींची स्पष्ट तुलना करा." }),
    },
    {
      icon: Rocket,
      step: "04",
      title: t({ en: "Plan", gu: "યોજના", hi: "योजना बनाएँ", mr: "नियोजन" }),
      text: t({ en: "Turn insight into a practical roadmap, stronger skills and confident next steps.", gu: "સમજને વ્યવહારુ માર્ગનકશો, મજબૂત કુશળતા અને આત્મવિશ્વાસભર્યા પગલાંમાં ફેરવો.", hi: "समझ को व्यावहारिक रोडमैप, बेहतर कौशल और आत्मविश्वासी कदमों में बदलें।", mr: "समजेला व्यावहारिक मार्गनकाशा, उत्तम कौशल्ये आणि आत्मविश्वासपूर्ण पावलांत बदला." }),
    },
  ];

  const features = [
    { icon: Library, to: "/career-library" as const, title: t({ en: "Career Library", gu: "કારકિર્દી લાઇબ્રેરી", hi: "करियर लाइब्रेरी", mr: "करिअर लायब्ररी" }), text: `${PLATFORM_STATS.professions.toLocaleString("en-IN")} ${t({ en: "professions across", gu: "વ્યવસાયો, કુલ", hi: "पेशे, कुल", mr: "व्यवसाय, एकूण" })} ${PLATFORM_STATS.careerStreams} ${t({ en: "streams", gu: "પ્રવાહો", hi: "स्ट्रीम", mr: "પ્રवाह" })}` },
    { icon: Search, to: "/find-college" as const, title: t({ en: "Find a College", gu: "કોલેજ શોધો", hi: "कॉलेज खोजें", mr: "महाविद्यालय शोधा" }), text: t({ en: "Search by course, city, state and institution type.", gu: "કોર્સ, શહેર, રાજ્ય અને સંસ્થાના પ્રકાર મુજબ શોધો.", hi: "कोर्स, शहर, राज्य और संस्थान के प्रकार से खोजें।", mr: "अभ्यासक्रम, शहर, राज्य आणि संस्थेच्या प्रकारानुसार शोधा." }) },
    { icon: ClipboardList, to: "/exams" as const, title: t({ en: "Entrance Exams", gu: "પ્રવેશ પરીક્ષાઓ", hi: "प्रवेश परीक्षाएँ", mr: "प्रवेश परीक्षा" }), text: `${PLATFORM_STATS.entranceExamListings} ${t({ en: "exam pathways with eligibility and dates.", gu: "પરીક્ષા માર્ગો, પાત્રતા અને તારીખો સાથે.", hi: "परीक्षा मार्ग, पात्रता और तारीखों के साथ।", mr: "परीक्षा मार्ग, पात्रता आणि तारखांसહ." })}` },
    { icon: Award, to: "/scholarships" as const, title: t({ en: "Scholarships", gu: "શિષ્યવૃત્તિઓ", hi: "छात्रवृत्तियाँ", mr: "शिष्यवृत्ती" }), text: `${PLATFORM_STATS.scholarships} ${t({ en: "opportunities with amounts and deadlines.", gu: "તકો, રકમ અને અંતિમ તારીખ સાથે.", hi: "अवसर, राशि और अंतिम तारीखों के साथ।", mr: "संधी, रक्कम आणि अंतिम तारखांसह." })}` },
    { icon: Rocket, to: "/upskill" as const, title: "LevelUp Lab", text: `${PLATFORM_STATS.skillLessons} ${t({ en: "skill lessons, quizzes and certificates.", gu: "કુશળતા પાઠ, ક્વિઝ અને પ્રમાણપત્રો.", hi: "कौशल पाठ, क्विज़ और प्रमाणपत्र।", mr: "कौशल्य धडे, प्रश्नमंजुषा आणि प्रमाणपत्रे." })}` },
    { icon: FileText, to: "/profile-builder" as const, title: t({ en: "Resume Builder", gu: "રિઝ્યુમે બિલ્ડર", hi: "रिज़्यूमे बिल्डर", mr: "रेझ्युमे बिल्डर" }), text: t({ en: "Create a student profile ready to download and share.", gu: "ડાઉનલોડ અને શેર કરવા તૈયાર વિદ્યાર્થી પ્રોફાઇલ બનાવો.", hi: "डाउनलोड और साझा करने योग्य छात्र प्रोफ़ाइल बनाएँ।", mr: "डाउनलोड आणि शेअर करण्यासाठी विद्यार्थी प्रोफाइल तयार करा." }) },
    { icon: LayoutDashboard, to: "/dashboard" as const, title: t({ en: "Student Dashboard", gu: "વિદ્યાર્થી ડૅશબોર્ડ", hi: "स्टूडेंट डैशबोर्ड", mr: "विद्यार्थी डॅशबोर्ड" }), text: t({ en: "Keep your reports, saved careers and progress together.", gu: "તમારા રિપોર્ટ, સાચવેલી કારકિર્દી અને પ્રગતિ એક સાથે રાખો.", hi: "अपनी रिपोर्ट, सहेजे करियर और प्रगति एक साथ रखें।", mr: "अहवाल, जतन केलेली करिअर्स आणि प्रगती एकत्र ठेवा." }) },
    { icon: CalendarCheck, to: "/counsellor" as const, title: t({ en: "Book a Counsellor", gu: "માર્ગદર્શક બુક કરો", hi: "काउंसलर बुक करें", mr: "समुपदेशक बुक करा" }), text: t({ en: "Get personal guidance connected to your assessment results.", gu: "તમારા મૂલ્યાંકન પરિણામો સાથે જોડાયેલ વ્યક્તિગત માર્ગદર્શન મેળવો.", hi: "अपने आकलन नतीजों से जुड़ा व्यक्तिगत मार्गदर्शन पाएँ।", mr: "तुमच्या मूल्यांकन निकालांशी जोडलेले वैयक्तिक मार्गदर्शन मिळवा." }) },
    { icon: MessageCircle, title: "HBK Career Counsellor", text: t({ en: "Ask career questions in any of four languages, any time.", gu: "ચાર ભાષામાં ક્યારેય પણ કારકિર્દી પ્રશ્નો પૂછો.", hi: "चार भाषाओं में कभी भी करियर के सवाल पूछें।", mr: "चार भाषांत कधीही करिअरचे प्रश्न विचारा." }) },
  ];

  return (
    <PublicLayout>
      <StudentPhotoHero
        image={studentsHero}
        imageAlt="Indian students discussing their future on a school campus"
        eyebrow={t({ en: "Grades 6–12 · Four languages", gu: "ધોરણ 6–12 · ચાર ભાષાઓ", hi: "कक्षा 6–12 · चार भाषाएँ", mr: "इयत्ता 6–12 · चार भाषा" })}
        title="HBK Careers"
        subtitle={t({ en: "Find your direction. Know your strengths, explore every possibility and build a clear plan for your future.", gu: "તમારી દિશા શોધો. તમારી શક્તિઓ જાણો, દરેક શક્યતા શોધો અને તમારા ભવિષ્ય માટે સ્પષ્ટ યોજના બનાવો.", hi: "अपनी दिशा खोजें। अपनी क्षमताएँ जानें, हर संभावना देखें और अपने भविष्य की स्पष्ट योजना बनाएँ।", mr: "तुमची दिशा शोधा. तुमच्या क्षमता जाणा, प्रत्येक शक्यता शोधा आणि भविष्यासाठी स्पष्ट योजना बनवा." })}
        actions={
          <>
              <Link to="/test" className="brand-link hbk-focus inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 font-body text-subheading font-semibold text-primary-foreground transition-[background-color,color,border-color,box-shadow] hover:brightness-95 active:brightness-90">
                <Brain className="h-5 w-5" aria-hidden />{t({ en: "Take the aptitude test", gu: "અભિરુચિ ટેસ્ટ આપો", hi: "एप्टीट्यूड टेस्ट दें", mr: "अ‍ॅप्टिट्यूड टेस्ट द्या" })}<ArrowIcon size={18} />
              </Link>
              <Link to="/career-library" className="brand-link hbk-focus inline-flex h-12 items-center justify-center gap-2 rounded-md border border-border bg-transparent px-6 font-body text-subheading font-semibold text-foreground transition-[background-color,color,border-color,box-shadow] hover:bg-muted">
                {t({ en: "Explore careers", gu: "કારકિર્દી શોધો", hi: "करियर देखें", mr: "करिअर शोधा" })}<ArrowIcon size={18} />
              </Link>
          </>
        }
      />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Section spacing="lg" eyebrow={t({ en: "One clear journey", gu: "એક સ્પષ્ટ સફર", hi: "एक स्पष्ट यात्रा", mr: "एक स्पष्ट प्रवास" })} title={t({ en: "From uncertainty to your next move", gu: "અનિશ્ચિતતાથી તમારા આગલા પગલા સુધી", hi: "उलझन से अपने अगले कदम तक", mr: "अनिश्चिततेपासून पुढच्या पावलापर्यंत" })} description={t({ en: "A connected path that helps you understand yourself before choosing what comes next.", gu: "આગળ શું પસંદ કરવું તે પહેલાં પોતાને સમજવામાં મદદ કરતો જોડાયેલ માર્ગ.", hi: "आगे क्या चुनना है, उससे पहले खुद को समझने में मदद करने वाला जुड़ा रास्ता।", mr: "पुढे काय निवडायचे याआधी स्वतःला समजून घेण्यास मदत करणारा सलग मार्ग." })}>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {journey.map((item, index) => <Card key={item.step} variant={index === 1 ? "highlight" : "arrow"} padding="lg"><span className="text-overline">{item.step}</span><item.icon className="mt-8 h-8 w-8" aria-hidden /><CardTitle className="mt-4">{item.title}</CardTitle><CardDescription className={index === 1 ? "text-highlight-foreground/80" : undefined}>{item.text}</CardDescription></Card>)}
          </div>
        </Section>
      </div>

      <section className="bg-accent text-accent-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-8">
          <div>
            <Badge variant="outline">{t({ en: "Psychometric + aptitude", gu: "સાયકોમેટ્રિક + યોગ્યતા", hi: "साइकोमेट्रिक + योग्यता", mr: "सायकोमेट्रिक + अभिक्षमता" })}</Badge>
            <h2 className="mt-4 font-display text-title">{t({ en: "A report that explains you—not just a score", gu: "માત્ર ગુણ નહીં—તમને સમજાવતો રિપોર્ટ", hi: "सिर्फ़ अंक नहीं—आपको समझाने वाली रिपोर्ट", mr: "फक्त गुण नाही—तुम्हाला समजावणारा अहवाल" })}</h2>
            <p className="mt-4 text-body">{t({ en: "Combine RIASEC interests, eight intelligences and grade-banded aptitude to see patterns, matching careers and practical next steps.", gu: "પેટર્ન, મેળ ખાતી કારકિર્દી અને વ્યવહારુ આગલા પગલાં જોવા RIASEC રુચિઓ, આઠ બુદ્ધિમત્તા અને ધોરણ આધારિત યોગ્યતાને જોડો.", hi: "पैटर्न, मेल खाते करियर और व्यावहारिक अगले कदम देखने के लिए RIASEC रुचियाँ, आठ बुद्धिमत्ताएँ और कक्षा-आधारित योग्यता जोड़ें।", mr: "नमुने, जुळणारी करिअर्स आणि व्यावहारिक पुढची पावले पाहण्यासाठी RIASEC आवडी, आठ बुद्धिमत्ता आणि इयत्तानुसार अभिक्षमता एकत्र करा." })}</p>
            <ul className="mt-6 grid gap-3 text-caption">
              {[t({ en: "Choose English, Gujarati, Hindi or Marathi before you begin", gu: "શરૂ કરતા પહેલાં અંગ્રેજી, ગુજરાતી, હિન્દી અથવા મરાઠી પસંદ કરો", hi: "शुरू करने से पहले अंग्रेज़ी, गुजराती, हिंदी या मराठी चुनें", mr: "सुरू करण्यापूर्वी इंग्रजी, गुजराती, हिंदी किंवा मराठी निवडा" }), t({ en: "Receive career matches and a 90-day action plan", gu: "કારકિર્દી મેળ અને 90-દિવસની કાર્ય યોજના મેળવો", hi: "करियर मिलान और 90-दिन की कार्ययोजना पाएँ", mr: "करिअर जुळणी आणि 90-दिवसांची कृती योजना मिळवा" }), t({ en: "Download a personalised 20-page PDF", gu: "વ્યક્તિગત 20-પાનાનો PDF ડાઉનલોડ કરો", hi: "व्यक्तिगत 20-पृष्ठ PDF डाउनलोड करें", mr: "वैयक्तिक 20-पानी PDF डाउनलोड करा" })].map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-success" />{item}</li>)}
            </ul>
            <Link to="/test" className="brand-link mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-highlight px-6 text-subheading font-semibold text-highlight-foreground">{t({ en: "See how the test works", gu: "ટેસ્ટ કેવી રીતે કામ કરે છે તે જુઓ", hi: "देखें टेस्ट कैसे काम करता है", mr: "चाचणी कशी काम करते ते पाहा" })}<ArrowIcon size={18} /></Link>
          </div>
          <div className="grid grid-cols-2 gap-4" aria-label="Sample report pages">
            <img src={reportCover} alt="Sample HBK Careers report cover" width={1024} height={1280} loading="lazy" className="w-full rounded-lg border border-border shadow-lift" />
            <img src={reportRiasec} alt="Sample RIASEC profile page" width={1024} height={1280} loading="lazy" className="mt-8 w-full rounded-lg border border-border shadow-lift" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Section spacing="lg" eyebrow={t({ en: "Your complete toolkit", gu: "તમારું સંપૂર્ણ ટૂલકિટ", hi: "आपका पूरा टूलकिट", mr: "तुमचे संपूर्ण टूलकिट" })} title={t({ en: "Everything you need to move ahead", gu: "આગળ વધવા માટે તમને જે જોઈએ તે બધું", hi: "आगे बढ़ने के लिए आपकी हर ज़रूरत", mr: "पुढे जाण्यासाठी आवश्यक सर्व काही" })}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const content = <><feature.icon className="h-8 w-8" aria-hidden /><CardTitle className="mt-6">{feature.title}</CardTitle><CardDescription>{feature.text}</CardDescription><span className="mt-6 inline-flex items-center gap-2 text-caption font-semibold">{t({ en: "Open", gu: "ખોલો", hi: "खोलें", mr: "उघडा" })}<ArrowIcon size={16} /></span></>;
              const cls = index === 0 ? "sm:col-span-2" : "";
              return "to" in feature && feature.to ? <Link key={feature.title} to={feature.to} className={`brand-link rounded-lg ${cls}`}><Card variant={index === 0 ? "highlight" : "arrow"} padding="lg" className="h-full">{content}</Card></Link> : <Card key={feature.title} variant="surface" padding="lg" className={cls}>{content}</Card>;
            })}
          </div>
        </Section>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid overflow-hidden rounded-xl bg-highlight text-highlight-foreground md:grid-cols-2">
          <img src={studentsPath} alt="Students building a career plan together" width={1600} height={900} loading="lazy" className="h-full w-full object-cover" />
          <div className="flex flex-col justify-center p-8 md:p-12">
            <Badge variant="accent" withArrow>{t({ en: "Guidance when it matters", gu: "જ્યારે જરૂરી હોય ત્યારે માર્ગદર્શન", hi: "जब ज़रूरत हो तब मार्गदर्शन", mr: "गरज असेल तेव्हा मार्गदर्शन" })}</Badge>
            <h2 className="mt-6 font-display text-title">{t({ en: "You do not have to decide alone", gu: "તમારે એકલા નિર્ણય લેવાની જરૂર નથી", hi: "आपको अकेले फैसला नहीं करना है", mr: "तुम्हाला एकट्याने निर्णय घ्यायचा नाही" })}</h2>
            <p className="mt-4 text-body text-highlight-foreground/80">{t({ en: "Bring your test results and career questions to a personal session with an HBK counsellor.", gu: "તમારા ટેસ્ટ પરિણામો અને કારકિર્દી પ્રશ્નો સાથે HBK માર્ગદર્શકના વ્યક્તિગત સત્રમાં આવો.", hi: "अपने टेस्ट नतीजे और करियर के सवाल लेकर HBK काउंसलर के व्यक्तिगत सत्र में आएँ।", mr: "तुमचे चाचणी निकाल आणि करिअरचे प्रश्न घेऊन HBK समुपदेशकाच्या वैयक्तिक सत्रात या." })}</p>
            <Link to="/counsellor" className="brand-link mt-8 inline-flex h-12 w-fit items-center gap-2 rounded-md bg-primary px-6 text-subheading font-semibold text-primary-foreground">{t({ en: "Book a session", gu: "સત્ર બુક કરો", hi: "सेशन बुक करें", mr: "सत्र बुक करा" })}<ArrowIcon size={18} /></Link>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 md:grid-cols-3 md:px-8">
          {[{ icon: Users, title: t({ en: "For parents", gu: "વાલીઓ માટે", hi: "अभिभावकों के लिए", mr: "पालकांसाठी" }), text: t({ en: "Understand the report and support your child without pressure.", gu: "રિપોર્ટ સમજો અને દબાણ વિના તમારા બાળકને ટેકો આપો.", hi: "रिपोर्ट समझें और बिना दबाव अपने बच्चे का साथ दें।", mr: "अहवाल समजा आणि दबाव न आणता मुलाला साथ द्या." }), to: "/parents" as const }, { icon: Building2, title: t({ en: "For schools", gu: "શાળાઓ માટે", hi: "स्कूलों के लिए", mr: "शाळांसाठी" }), text: t({ en: "Bring structured career discovery to an entire student cohort.", gu: "આખા વિદ્યાર્થી સમૂહ માટે સુવ્યવસ્થિત કારકિર્દી શોધ લાવો.", hi: "पूरे छात्र समूह के लिए व्यवस्थित करियर खोज लाएँ।", mr: "संपूर्ण विद्यार्थी गटासाठी संरचित करिअर शोध उपलब्ध करा." }), to: "/for-schools" as const }, { icon: ShieldCheck, title: t({ en: "Built for trust", gu: "વિશ્વાસ માટે બનાવેલ", hi: "भरोसे के लिए बनाया", mr: "विश्वासासाठी तयार" }), text: t({ en: "Transparent sources, student-first language and practical recommendations.", gu: "પારદર્શક સ્ત્રોતો, વિદ્યાર્થી-પ્રથમ ભાષા અને વ્યવહારુ ભલામણો.", hi: "पारदर्शी स्रोत, छात्र-केंद्रित भाषा और व्यावहारिक सुझाव।", mr: "पारदर्शक स्रोत, विद्यार्थी-केंद्रित भाषा आणि व्यावहारिक सूचना." }), to: "/about" as const }].map((item) => <Link key={item.title} to={item.to} className="brand-link rounded-lg"><Card variant="arrow" padding="lg" className="h-full"><item.icon className="h-8 w-8 text-primary" /><CardTitle className="mt-6">{item.title}</CardTitle><CardDescription>{item.text}</CardDescription></Card></Link>)}
        </div>
      </section>

      <FAQAccordion lang={lang} />

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 md:px-8">
        <div className="flex flex-col items-start gap-6 rounded-xl bg-accent p-8 text-accent-foreground md:flex-row md:items-center md:justify-between md:p-12">
          <div><p className="text-overline uppercase">{t({ en: "Your next step", gu: "તમારું આગળનું પગલું", hi: "आपका अगला कदम", mr: "तुमचे पुढचे पाऊल" })}</p><h2 className="mt-2 font-display text-title">{t({ en: "Start with what makes you, you.", gu: "તમને તમે બનાવે છે ત્યાંથી શરૂઆત કરો.", hi: "जो आपको आप बनाता है, वहीं से शुरू करें।", mr: "जे तुम्हाला तुम्ही बनवते, तिथून सुरुवात करा." })}</h2></div>
          <Link to="/test" className="brand-link inline-flex h-12 shrink-0 items-center gap-2 rounded-md bg-highlight px-6 text-subheading font-semibold text-highlight-foreground"><Brain className="h-5 w-5" />{t({ en: "Start assessment", gu: "મૂલ્યાંકન શરૂ કરો", hi: "मूल्यांकन शुरू करें", mr: "मूल्यांकन सुरू करा" })}<ArrowIcon size={18} /></Link>
        </div>
      </section>
    </PublicLayout>
  );
}