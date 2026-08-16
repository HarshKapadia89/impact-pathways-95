import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/PublicLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Building2, Check, Sparkles, Users, BarChart3, BookOpen, Headphones, Send,
} from "lucide-react";

export const Route = createFileRoute("/for-schools")({
  head: () => ({
    meta: [
      { title: "For Schools — Career Guidance Program | HBK Careers" },
      { name: "description", content: "Bring evidence-based career counselling to your school. Aptitude testing, AI-interpreted reports, parent sessions and counsellor workshops. Book a demo." },
      { property: "og:title", content: "Career Guidance for Schools — HBK Careers" },
      { property: "og:description", content: "Partner with HBK Careers to deliver psychometric testing, AI reports and counsellor training for your students." },
    ],
  }),
  component: ForSchoolsPage,
});

function ForSchoolsPage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith("gu") ? "gu" : "en") as "en" | "gu";
  const L = (en: string, gu: string) => (lang === "gu" ? gu : en);

  const [form, setForm] = useState({
    school_name: "", contact_person: "", role: "", email: "", phone: "", city: "",
    student_count: "", message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.school_name.trim() || !form.contact_person.trim() || !form.email.trim()) {
      toast.error(L("School name, contact name and email are required", "શાળાનું નામ, સંપર્ક નામ અને ઇમેલ જરૂરી છે"));
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("school_leads").insert({
      school_name: form.school_name.trim(),
      contact_person: form.contact_person.trim(),
      role: form.role.trim() || null,
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      city: form.city.trim() || null,
      student_count: form.student_count ? Number(form.student_count) : null,
      message: form.message.trim() || null,
    });
    setSubmitting(false);
    if (error) {
      toast.error(L("Could not send. Please try again.", "મોકલી શકાયું નથી. ફરી પ્રયત્ન કરો."));
      return;
    }
    setDone(true);
    toast.success(L("Request sent. We'll be in touch within 2 working days.", "વિનંતી મોકલી. 2 કાર્યદિવસમાં સંપર્ક કરીશું."));
  };

  const input = "w-full px-3 py-2 text-sm rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30";

  return (
    <PublicLayout>
      {/* HERO */}
      <section className="poster-hero border-b-4 border-ink">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary px-3 py-1 text-xs font-medium">
            <Building2 className="h-3.5 w-3.5" />
            {L("For Schools", "શાળાઓ માટે")}
          </div>
          <h1 className="font-serif text-3xl md:text-5xl mt-3 max-w-3xl">
            {L("Bring evidence-based career guidance to every student in your school.", "તમારી શાળાના દરેક વિદ્યાર્થી માટે પુરાવા-આધારિત કારકિર્દી માર્ગદર્શન.")}
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            {L(
              "HBK Careers partners with schools to deliver RIASEC + Multiple Intelligences + Aptitude testing, AI-interpreted reports, parent communication and counsellor training.",
              "HBK Careers શાળાઓ સાથે મળીને RIASEC + મલ્ટિપલ ઇન્ટેલિજન્સ + એપ્ટિટ્યુડ ટેસ્ટ, AI-આધારિત રિપોર્ટ, વાલીઓ સાથે સંવાદ અને કાઉન્સેલર તાલીમ આપે છે."
            )}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#demo" className="bg-primary text-primary-foreground px-6 py-3 rounded-md text-sm font-medium hover:opacity-90">
              {L("Book a demo", "ડેમો બુક કરો")}
            </a>
            <a href="#what-you-get" className="border border-border bg-background px-6 py-3 rounded-md text-sm font-medium hover:bg-muted">
              {L("See what's included", "શું શામેલ છે જુઓ")}
            </a>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section id="what-you-get" className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <h2 className="font-serif text-2xl md:text-3xl text-center">
          {L("Everything your students need in one program", "તમારા વિદ્યાર્થીઓની જરૂરિયાત માટેનું એક પ્રોગ્રામ")}
        </h2>
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {[
            { icon: BarChart3, t: L("Psychometric Testing", "મનો-યોગ્યતા ટેસ્ટ"), d: L("Standardised RIASEC, MI and aptitude tests. Class 6–12, in English & Gujarati.", "પ્રમાણિત RIASEC, MI અને એપ્ટિટ્યુડ ટેસ્ટ. ધોરણ 6-12, અંગ્રેજી અને ગુજરાતીમાં.") },
            { icon: Sparkles, t: L("AI-Interpreted Reports", "AI-આધારિત રિપોર્ટ"), d: L("Each student gets a 20-page report explaining strengths, stream fit and recommended careers.", "દરેક વિદ્યાર્થીને 20-પૃષ્ઠનો રિપોર્ટ — શક્તિ, સ્ટ્રીમ યોગ્યતા અને ભલામણ કરેલ કારકિર્દી.") },
            { icon: Users, t: L("Parent Sessions", "વાલી સત્રો"), d: L("On-campus or online sessions to align parents on the student's strengths and stream choice.", "વાલીઓને વિદ્યાર્થીની શક્તિ અને સ્ટ્રીમ સાથે જોડવા માટે કેમ્પસ અથવા ઑનલાઇન સત્રો.") },
            { icon: BookOpen, t: L("Counsellor Workshops", "કાઉન્સેલર વર્કશોપ"), d: L("Train your in-house teachers/coordinators to interpret reports and run 1:1 sessions.", "તમારા શિક્ષક/સંકલકોને રિપોર્ટ સમજવા અને 1:1 સત્રો માટે તાલીમ.") },
            { icon: Building2, t: L("School Dashboard", "શાળા ડેશબોર્ડ"), d: L("Cohort-level analytics: who needs intervention, popular streams, parent engagement.", "ગ્રુપ-સ્તરનું વિશ્લેષણ: કોને હસ્તક્ષેપ જરૂર, લોકપ્રિય સ્ટ્રીમ, વાલી જોડાણ.") },
            { icon: Headphones, t: L("Ongoing Support", "સતત સહાય"), d: L("Year-round access to our team for student queries, college choices and exam guidance.", "વિદ્યાર્થી પ્રશ્નો, કોલેજ પસંદગી અને પરીક્ષા માર્ગદર્શન માટે વાર્ષિક સહાય.") },
          ].map((f) => (
            <div key={f.t} className="rounded-xl border border-border bg-card p-5">
              <f.icon className="h-6 w-6 text-primary" />
              <div className="font-medium mt-3">{f.t}</div>
              <div className="text-sm text-muted-foreground mt-1">{f.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING TIERS */}
      <section className="bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">
          <h2 className="font-serif text-2xl md:text-3xl text-center">{L("Partnership Tiers", "ભાગીદારી સ્તરો")}</h2>
          <p className="text-center text-sm text-muted-foreground mt-2">{L("Customised pricing based on student count and selected modules.", "વિદ્યાર્થી સંખ્યા અને પસંદ કરેલ મોડ્યુલ આધારે કસ્ટમ ભાવો.")}</p>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {[
              {
                name: L("Essentials", "આવશ્યક"),
                tagline: L("For schools starting their career-guidance journey.", "કારકિર્દી માર્ગદર્શન શરૂ કરતી શાળાઓ માટે."),
                features: [
                  L("Psychometric test for all Class 9–12 students", "ધોરણ 9-12 માટે ટેસ્ટ"),
                  L("AI-interpreted PDF reports", "AI PDF રિપોર્ટ"),
                  L("1 parent session (online)", "1 વાલી સત્ર (ઑનલાઇન)"),
                ],
              },
              {
                name: L("Standard", "સ્ટાન્ડર્ડ"),
                tagline: L("Most chosen — balanced impact.", "સૌથી પસંદગીની — સંતુલિત અસર."),
                features: [
                  L("Everything in Essentials", "આવશ્યકમાં બધું"),
                  L("On-campus parent session", "કેમ્પસ પર વાલી સત્ર"),
                  L("Counsellor workshop (1 day)", "કાઉન્સેલર વર્કશોપ (1 દિવસ)"),
                  L("School dashboard access", "શાળા ડેશબોર્ડ"),
                ],
                highlight: true,
              },
              {
                name: L("Flagship", "ફ્લેગશિપ"),
                tagline: L("Year-round program with deep follow-through.", "વાર્ષિક પ્રોગ્રામ — ઊંડું અનુસરણ."),
                features: [
                  L("Everything in Standard", "સ્ટાન્ડર્ડમાં બધું"),
                  L("Termly counsellor trainings", "ત્રિમાસિક કાઉન્સેલર તાલીમ"),
                  L("1:1 sessions for select students", "પસંદ વિદ્યાર્થીઓ માટે 1:1 સત્ર"),
                  L("College & exam guidance year-round", "વાર્ષિક કોલેજ-પરીક્ષા માર્ગદર્શન"),
                  L("Priority WhatsApp support", "પ્રાધાન્ય WhatsApp સહાય"),
                ],
              },
            ].map((tier) => (
              <div key={tier.name} className={`rounded-2xl border bg-card p-6 ${tier.highlight ? "border-primary shadow-[var(--shadow-card)] ring-1 ring-primary/30" : "border-border"}`}>
                {tier.highlight && <div className="text-[10px] uppercase tracking-wide bg-primary text-primary-foreground inline-block px-2 py-0.5 rounded mb-2">{L("Most chosen", "સૌથી પસંદગી")}</div>}
                <div className="font-serif text-xl">{tier.name}</div>
                <div className="text-xs text-muted-foreground mt-1 min-h-[2.5rem]">{tier.tagline}</div>
                <ul className="mt-4 space-y-2 text-sm">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#demo" className={`mt-6 inline-flex items-center justify-center w-full px-4 py-2.5 rounded-md text-sm font-medium ${tier.highlight ? "bg-primary text-primary-foreground hover:opacity-90" : "border border-border hover:bg-muted"}`}>
                  {L("Contact for pricing", "ભાવ માટે સંપર્ક કરો")}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO FORM */}
      <section id="demo" className="max-w-3xl mx-auto px-4 md:px-8 py-14">
        <h2 className="font-serif text-2xl md:text-3xl">{L("Book a demo", "ડેમો બુક કરો")}</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {L("Fill the form below. Our team will reach out within 2 working days.", "નીચેનું ફોર્મ ભરો. અમારી ટીમ 2 કાર્યદિવસમાં સંપર્ક કરશે.")}
        </p>

        {done ? (
          <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
            <Check className="h-8 w-8 text-primary mx-auto" />
            <div className="font-medium mt-3">{L("Thank you — request received!", "આભાર — વિનંતી મળી!")}</div>
            <div className="text-sm text-muted-foreground mt-1">
              {L("We've noted your details. Expect a call/email from our team soon.", "તમારી વિગતો નોંધાઈ. અમારી ટીમ ટૂંક સમયમાં સંપર્ક કરશે.")}
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 rounded-xl border border-border bg-card p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-3">
              <Field label={L("School name *", "શાળાનું નામ *")}><input required className={input} value={form.school_name} onChange={(e) => setForm({ ...form, school_name: e.target.value })} /></Field>
              <Field label={L("City", "શહેર")}><input className={input} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></Field>
              <Field label={L("Contact person *", "સંપર્ક વ્યક્તિ *")}><input required className={input} value={form.contact_person} onChange={(e) => setForm({ ...form, contact_person: e.target.value })} /></Field>
              <Field label={L("Role (Principal, Coordinator...)", "પદ (પ્રિન્સિપાલ, સંકલક...)")}><input className={input} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} /></Field>
              <Field label={L("Email *", "ઇમેલ *")}><input required type="email" className={input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
              <Field label={L("Phone", "ફોન")}><input className={input} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
              <Field label={L("Approx. student count (Class 6–12)", "આશરે વિદ્યાર્થી સંખ્યા (ધોરણ 6-12)")}><input type="number" min="0" className={input} value={form.student_count} onChange={(e) => setForm({ ...form, student_count: e.target.value })} /></Field>
            </div>
            <Field label={L("Anything specific to discuss?", "ચર્ચા માટે કંઈ ખાસ?")}>
              <textarea rows={3} className={input} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </Field>
            <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-60">
              <Send className="h-4 w-4" />
              {submitting ? L("Sending...", "મોકલી રહ્યું છે...") : L("Send request", "વિનંતી મોકલો")}
            </button>
          </form>
        )}
      </section>
    </PublicLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground mb-1 block">{label}</span>
      {children}
    </label>
  );
}
