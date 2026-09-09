import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { supabase } from "@/integrations/supabase/client";
import { getCurrentToken, getCurrentStudentName } from "@/lib/dashboardStore";
import { useLang } from "@/lib/lang";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  Video,
  Phone,
  MapPin,
  Sparkles,
  Brain,
} from "lucide-react";
import { Badge, Card, Input, Select } from "@/design-system/hbk-career-brand-guidelines-4f1c39";

export const Route = createFileRoute("/counsellor")({
  head: () => ({
    meta: [
      { title: "Book a Career Counsellor — HBK Careers" },
      {
        name: "description",
        content:
          "Book a free 1:1 career counselling session. We review your aptitude test results and help you pick the right stream, career and college.",
      },
      { property: "og:title", content: "Book a Career Counsellor — HBK Careers" },
      {
        property: "og:description",
        content: "Free 1:1 guidance session based on your HBK Careers aptitude test report.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CounsellorPage,
});

const SLOTS = [
  { id: "morning", en: "Morning (10 AM – 12 PM)", gu: "સવારે (10 – 12)", hi: "सुबह (10 – 12)", mr: "सकाळी (10 – 12)" },
  { id: "afternoon", en: "Afternoon (12 – 3 PM)", gu: "બપોરે (12 – 3)", hi: "दोपहर (12 – 3)", mr: "दुपारी (12 – 3)" },
  { id: "evening", en: "Evening (4 – 7 PM)", gu: "સાંજે (4 – 7)", hi: "शाम (4 – 7)", mr: "संध्याकाळी (4 – 7)" },
];

const MODES = [
  { id: "video", icon: Video, en: "Video call", gu: "વિડિયો કૉલ", hi: "वीडियो कॉल", mr: "व्हिडिओ कॉल" },
  { id: "phone", icon: Phone, en: "Phone call", gu: "ફોન કૉલ", hi: "फ़ोन कॉल", mr: "फोन कॉल" },
  { id: "in-person", icon: MapPin, en: "In person", gu: "રૂબરૂ", hi: "सामने-सामने", mr: "समक्ष" },
];

type L = "en" | "gu" | "hi" | "mr";
const pick = (lang: L, o: { en: string; gu: string; hi: string; mr: string }) => o[lang] ?? o.en;

interface TestContext {
  name: string | null;
  grade: string | null;
  school: string | null;
  holland: string | null;
  topStream: string | null;
  careers: string[];
}

function CounsellorPage() {
  const lang = useLang() as L;
  const [ctx, setCtx] = useState<TestContext | null>(null);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [school, setSchool] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("morning");
  const [mode, setMode] = useState("video");
  const [profession, setProfession] = useState("");
  const [customProfession, setCustomProfession] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const token = getCurrentToken();
    const storedName = getCurrentStudentName();
    if (storedName) setName(storedName);
    if (!token) return;
    (async () => {
      const { data } = await supabase
        .from("psychometric_submissions")
        .select("student_name,grade,school_name,riasec_top,recommended_streams,recommended_careers")
        .eq("report_token", token)
        .maybeSingle();
      if (!data) return;
      const c: TestContext = {
        name: data.student_name,
        grade: data.grade,
        school: data.school_name,
        holland: (data.riasec_top || []).join("-") || null,
        topStream: data.recommended_streams?.[0] ?? null,
        careers: data.recommended_careers ?? [],
      };
      setCtx(c);
      if (c.name) setName(c.name);
      if (c.grade) setGrade(c.grade);
      if (c.school) setSchool(c.school);
    })();
  }, []);

  const professionOptions = useMemo(() => ctx?.careers?.slice(0, 8) ?? [], [ctx]);
  const finalProfession = profession === "__other" ? customProfession.trim() : profession;

  const minDate = useMemo(() => new Date(Date.now() + 86400000).toISOString().slice(0, 10), []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !mobile.trim() || !date) {
      setError(pick(lang, { en: "Please fill name, mobile and preferred date.", gu: "કૃપા કરી નામ, મોબાઇલ અને તારીખ ભરો.", hi: "कृपया नाम, मोबाइल और तारीख भरें।", mr: "कृपया नाव, मोबाइल आणि तारीख भरा." }));
      return;
    }
    if (!/^[0-9+\-\s]{8,15}$/.test(mobile.trim())) {
      setError(pick(lang, { en: "Please enter a valid mobile number.", gu: "માન્ય મોબાઇલ નંબર નાખો.", hi: "मान्य मोबाइल नंबर डालें।", mr: "वैध मोबाइल नंबर टाका." }));
      return;
    }
    setSubmitting(true);
    const { error: err } = await supabase.from("counsellor_bookings").insert({
      student_name: name.trim(),
      grade: grade || null,
      school_name: school || null,
      mobile: mobile.trim(),
      email: email.trim() || null,
      preferred_date: date,
      preferred_slot: slot,
      mode,
      report_token: getCurrentToken(),
      holland_code: ctx?.holland ?? null,
      top_stream: ctx?.topStream ?? null,
      chosen_profession: finalProfession || null,
      message: message.trim() || null,
    } as never);
    setSubmitting(false);
    if (err) {
      setError(pick(lang, { en: "Something went wrong. Please try again.", gu: "કંઈક ખોટું થયું. ફરી પ્રયાસ કરો.", hi: "कुछ गलत हुआ। फिर कोशिश करें।", mr: "काही चूक झाली. पुन्हा प्रयत्न करा." }));
      return;
    }
    setDone(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const inputCls = "w-full";

  return (
    <PublicLayout>
      <section className="bg-highlight text-highlight-foreground">
        <header className="mx-auto max-w-4xl px-4 py-16 text-center md:px-8 md:py-20">
          <Badge variant="accent" withArrow>{pick(lang, { en: "Free 1:1 Session", gu: "મફત 1:1 સત્ર", hi: "मुफ़्त 1:1 सत्र", mr: "मोफत 1:1 सत्र" })}</Badge>
          <h1 className="mt-6 font-display text-title md:text-display">
            {pick(lang, { en: "Talk to a Career Counsellor", gu: "કારકિર્દી માર્ગદર્શક સાથે વાત કરો", hi: "करियर काउंसलर से बात करें", mr: "करिअर समुपदेशकाशी बोला" })}
          </h1>
          <p className="mt-5 text-subheading text-highlight-foreground/80 max-w-2xl mx-auto">
            {pick(lang, {
              en: "Book a personal session. Our counsellor reviews your aptitude test results and helps you decide your stream, career and next steps.",
              gu: "વ્યક્તિગત સત્ર બુક કરો. અમારા માર્ગદર્શક તમારા ટેસ્ટના પરિણામો જોઈને પ્રવાહ, કારકિર્દી અને આગળના પગલાં નક્કી કરવામાં મદદ કરે છે.",
              hi: "व्यक्तिगत सत्र बुक करें। हमारे काउंसलर आपके टेस्ट के नतीजे देखकर स्ट्रीम, करियर और अगले कदम तय करने में मदद करते हैं।",
              mr: "वैयक्तिक सत्र बुक करा. आमचे समुपदेशक तुमच्या टेस्ट निकालांवरून प्रवाह, करिअर आणि पुढील पायऱ्या ठरवण्यास मदत करतात.",
            })}
          </p>
        </header>
      </section>
      <div className="mx-auto max-w-3xl px-4 py-10 md:py-14 space-y-8">

        {done ? (
          <div className="rounded-2xl border border-border bg-card p-8 text-center space-y-4 shadow-sm">
            <CheckCircle2 className="h-14 w-14 text-green-600 mx-auto" />
            <h2 className="font-serif text-2xl">
              {pick(lang, { en: "Booking received!", gu: "બુકિંગ મળી ગયું!", hi: "बुकिंग मिल गई!", mr: "बुकिंग मिळाली!" })}
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              {pick(lang, {
                en: "Our counsellor will call or message you within 24 hours to confirm your session time.",
                gu: "અમારા માર્ગદર્શક 24 કલાકમાં સમય કન્ફર્મ કરવા માટે તમને કૉલ કરશે.",
                hi: "हमारे काउंसलर 24 घंटे के भीतर समय पक्का करने के लिए आपको कॉल करेंगे।",
                mr: "आमचे समुपदेशक २४ तासांत वेळ निश्चित करण्यासाठी तुम्हाला कॉल करतील.",
              })}
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link to="/dashboard" className="rounded-xl bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium">
                {pick(lang, { en: "Go to Dashboard", gu: "ડૅશબોર્ડ પર જાઓ", hi: "डैशबोर्ड पर जाएँ", mr: "डॅशबोर्डवर जा" })}
              </Link>
              <Link to="/" className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium">
                {pick(lang, { en: "Back to Home", gu: "હોમ પર પાછા", hi: "होम पर वापस", mr: "मुख्यपृष्ठावर परत" })}
              </Link>
            </div>
          </div>
        ) : (
          <>
            {ctx?.holland && (
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 flex items-start gap-4">
                <Brain className="h-8 w-8 text-primary shrink-0 mt-0.5" />
                <div className="text-sm space-y-1">
                  <p className="font-semibold">
                    {pick(lang, { en: "Your test results are attached", gu: "તમારા ટેસ્ટના પરિણામો જોડાયેલા છે", hi: "आपके टेस्ट के नतीजे जुड़े हैं", mr: "तुमचे टेस्ट निकाल जोडले आहेत" })}
                  </p>
                  <p className="text-muted-foreground">
                    Holland code: <span className="font-medium text-foreground">{ctx.holland}</span>
                    {ctx.topStream && <> · {pick(lang, { en: "Top stream", gu: "ટોપ પ્રવાહ", hi: "टॉप स्ट्रीम", mr: "टॉप प्रवाह" })}: <span className="font-medium text-foreground">{ctx.topStream}</span></>}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {pick(lang, { en: "The counsellor will see these before your session.", gu: "માર્ગદર્શક સત્ર પહેલાં આ જોશે.", hi: "काउंसलर सत्र से पहले ये देखेंगे।", mr: "समुपदेशक सत्रापूर्वी हे पाहतील." })}
                  </p>
                </div>
              </div>
            )}

            {!ctx && (
              <div className="rounded-2xl border border-amber-300/50 bg-amber-50 dark:bg-amber-950/20 p-4 text-sm text-amber-900 dark:text-amber-200 flex items-center justify-between gap-4 flex-wrap">
                <span>
                  {pick(lang, {
                    en: "Tip: take the aptitude test first so the counsellor can prepare for you.",
                    gu: "ટિપ: પહેલા ટેસ્ટ આપો જેથી માર્ગદર્શક તૈયારી કરી શકે.",
                    hi: "सुझाव: पहले टेस्ट दें ताकि काउंसलर तैयारी कर सके।",
                    mr: "टीप: आधी टेस्ट द्या म्हणजे समुपदेशक तयारी करू शकतील.",
                  })}
                </span>
                <Link to="/test" className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-xs font-medium shrink-0">
                  {pick(lang, { en: "Take the test", gu: "ટેસ્ટ આપો", hi: "टेस्ट दें", mr: "टेस्ट द्या" })}
                </Link>
              </div>
            )}

            <form onSubmit={submit}>
            <Card variant="lifted" className="p-6 md:p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="space-y-1.5">
                  <span className="text-sm font-medium">{pick(lang, { en: "Student name *", gu: "વિદ્યાર્થીનું નામ *", hi: "विद्यार्थी का नाम *", mr: "विद्यार्थ्याचे नाव *" })}</span>
                  <Input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label className="space-y-1.5">
                  <span className="text-sm font-medium">{pick(lang, { en: "Mobile (WhatsApp) *", gu: "મોબાઇલ (WhatsApp) *", hi: "मोबाइल (WhatsApp) *", mr: "मोबाइल (WhatsApp) *" })}</span>
                  <Input className={inputCls} value={mobile} onChange={(e) => setMobile(e.target.value)} inputMode="tel" placeholder="98765 43210" required />
                </label>
                <label className="space-y-1.5">
                  <span className="text-sm font-medium">{pick(lang, { en: "Grade / Class", gu: "ધોરણ", hi: "कक्षा", mr: "इयत्ता" })}</span>
                  <Input className={inputCls} value={grade} onChange={(e) => setGrade(e.target.value)} placeholder="10" />
                </label>
                <label className="space-y-1.5">
                  <span className="text-sm font-medium">{pick(lang, { en: "School", gu: "શાળા", hi: "स्कूल", mr: "शाळा" })}</span>
                  <Input className={inputCls} value={school} onChange={(e) => setSchool(e.target.value)} />
                </label>
                <label className="space-y-1.5 sm:col-span-2">
                  <span className="text-sm font-medium">{pick(lang, { en: "Email (optional)", gu: "ઈમેઇલ (વૈકલ્પિક)", hi: "ईमेल (वैकल्पिक)", mr: "ईमेल (ऐच्छिक)" })}</span>
                  <Input className={inputCls} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <label className="space-y-1.5">
                  <span className="text-sm font-medium flex items-center gap-1.5">
                    <CalendarCheck className="h-4 w-4 text-primary" />
                    {pick(lang, { en: "Preferred date *", gu: "પસંદગીની તારીખ *", hi: "पसंदीदा तारीख *", mr: "पसंतीची तारीख *" })}
                  </span>
                   <Input className={inputCls} type="date" min={minDate} value={date} onChange={(e) => setDate(e.target.value)} required />
                </label>
                <label className="space-y-1.5">
                  <span className="text-sm font-medium flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-primary" />
                    {pick(lang, { en: "Time slot", gu: "સમય", hi: "समय", mr: "वेळ" })}
                  </span>
                  <Select className={inputCls} value={slot} onChange={(e) => setSlot(e.target.value)}>
                    {SLOTS.map((s) => (
                      <option key={s.id} value={s.id}>{pick(lang, s)}</option>
                    ))}
                  </Select>
                </label>
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium">{pick(lang, { en: "Session mode", gu: "સત્રની રીત", hi: "सत्र का तरीका", mr: "सत्राची पद्धत" })}</span>
                <div className="grid grid-cols-3 gap-2">
                  {MODES.map((m) => (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setMode(m.id)}
                      className={`rounded-xl border px-3 py-2.5 text-sm font-medium flex items-center justify-center gap-1.5 transition-colors ${
                        mode === m.id ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"
                      }`}
                    >
                      <m.icon className="h-4 w-4" />
                      {pick(lang, m)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium">
                  {pick(lang, { en: "Career / profession you want to discuss", gu: "જે કારકિર્દી વિશે ચર્ચા કરવી છે", hi: "जिस करियर पर चर्चा करनी है", mr: "ज्या करिअरबद्दल बोलायचे आहे" })}
                </span>
                {professionOptions.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {professionOptions.map((c) => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setProfession(c)}
                        className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                          profession === c ? "border-primary bg-primary/10 text-primary font-medium" : "border-border hover:bg-muted"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setProfession("__other")}
                      className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                        profession === "__other" ? "border-primary bg-primary/10 text-primary font-medium" : "border-border hover:bg-muted"
                      }`}
                    >
                      {pick(lang, { en: "Other…", gu: "અન્ય…", hi: "अन्य…", mr: "इतर…" })}
                    </button>
                  </div>
                ) : null}
                {(profession === "__other" || professionOptions.length === 0) && (
                  <input
                    className={inputCls}
                    value={customProfession}
                    onChange={(e) => setCustomProfession(e.target.value)}
                    placeholder={pick(lang, { en: "e.g. Software Engineer, Doctor, Designer…", gu: "દા.ત. સોફ્ટવેર એન્જિનિયર, ડૉક્ટર…", hi: "जैसे सॉफ्टवेयर इंजीनियर, डॉक्टर…", mr: "उदा. सॉफ्टवेअर इंजिनिअर, डॉक्टर…" })}
                  />
                )}
              </div>

              <label className="space-y-1.5 block">
                <span className="text-sm font-medium">{pick(lang, { en: "Anything you want to ask? (optional)", gu: "કંઈ પૂછવું છે? (વૈકલ્પિક)", hi: "कुछ पूछना है? (वैकल्पिक)", mr: "काही विचारायचे आहे? (ऐच्छिक)" })}</span>
                <textarea className={`${inputCls} min-h-24`} value={message} onChange={(e) => setMessage(e.target.value)} />
              </label>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-primary text-primary-foreground py-3 font-semibold text-sm hover:opacity-90 disabled:opacity-50"
              >
                {submitting
                  ? pick(lang, { en: "Booking…", gu: "બુક થઈ રહ્યું છે…", hi: "बुक हो रहा है…", mr: "बुक होत आहे…" })
                  : pick(lang, { en: "Book my free session", gu: "મારું મફત સત્ર બુક કરો", hi: "मेरा मुफ़्त सत्र बुक करें", mr: "माझे मोफत सत्र बुक करा" })}
              </button>
            </Card>
            </form>
          </>
        )}
      </div>
    </PublicLayout>
  );
}
