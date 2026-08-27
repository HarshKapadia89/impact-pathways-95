import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/PublicLayout";
import jsPDF from "jspdf";
import { toast } from "sonner";
import { FileText, Download, Plus, Trash2, Save } from "lucide-react";

export const Route = createFileRoute("/profile-builder")({
  head: () => ({
    meta: [
      { title: "Student Resume Builder — Free PDF Export | HBK Careers" },
      { name: "description", content: "Build your student resume free. Add education, skills, projects and achievements. Export as polished PDF in one click." },
    ],
  }),
  component: ProfileBuilderPage,
});

type Profile = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  objective: string;
  education: { institution: string; qualification: string; year: string; grade: string }[];
  skills: string;
  achievements: { title: string; detail: string }[];
  projects: { title: string; detail: string }[];
  hobbies: string;
};

const EMPTY: Profile = {
  fullName: "", email: "", phone: "", city: "",
  objective: "",
  education: [{ institution: "", qualification: "", year: "", grade: "" }],
  skills: "",
  achievements: [{ title: "", detail: "" }],
  projects: [{ title: "", detail: "" }],
  hobbies: "",
};

const STORAGE_KEY = "hbk-student-profile";

function ProfileBuilderPage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith("gu") ? "gu" : "en") as "en" | "gu";
  const [p, setP] = useState<Profile>(EMPTY);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setP({ ...EMPTY, ...JSON.parse(raw) });
    } catch { /* ignore */ }
  }, []);

  const save = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
      toast.success(lang === "gu" ? "સાચવ્યું" : "Saved to this device");
    } catch {
      toast.error("Could not save");
    }
  };

  const exportPDF = () => {
    if (!p.fullName.trim()) {
      toast.error(lang === "gu" ? "પૂરું નામ ઉમેરો" : "Please enter your full name");
      return;
    }
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 48;
    let y = margin;

    // Header
    doc.setFont("helvetica", "bold").setFontSize(22);
    doc.text(p.fullName, margin, y);
    y += 22;
    doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(90);
    const contact = [p.email, p.phone, p.city].filter(Boolean).join("  •  ");
    if (contact) { doc.text(contact, margin, y); y += 16; }
    doc.setDrawColor(180); doc.line(margin, y, pageWidth - margin, y); y += 18;

    const section = (title: string) => {
      doc.setFont("helvetica", "bold").setFontSize(12).setTextColor(30);
      doc.text(title.toUpperCase(), margin, y); y += 14;
      doc.setDrawColor(220); doc.line(margin, y - 4, pageWidth - margin, y - 4);
      doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(50);
    };
    const text = (s: string, indent = 0) => {
      const lines = doc.splitTextToSize(s, pageWidth - margin * 2 - indent);
      lines.forEach((ln: string) => {
        if (y > 780) { doc.addPage(); y = margin; }
        doc.text(ln, margin + indent, y); y += 13;
      });
    };

    if (p.objective.trim()) { section("Career Objective"); text(p.objective); y += 8; }

    const edu = p.education.filter((e) => e.institution || e.qualification);
    if (edu.length) {
      section("Education");
      edu.forEach((e) => {
        doc.setFont("helvetica", "bold"); text(`${e.qualification || "—"} — ${e.institution || "—"}`);
        doc.setFont("helvetica", "normal").setTextColor(110);
        text([e.year, e.grade].filter(Boolean).join(" • "));
        doc.setTextColor(50); y += 4;
      });
      y += 4;
    }

    if (p.skills.trim()) { section("Skills"); text(p.skills); y += 8; }

    const proj = p.projects.filter((x) => x.title || x.detail);
    if (proj.length) {
      section("Projects");
      proj.forEach((x) => {
        doc.setFont("helvetica", "bold"); text(x.title || "—");
        doc.setFont("helvetica", "normal"); if (x.detail) text(x.detail, 8);
        y += 4;
      });
      y += 4;
    }

    const ach = p.achievements.filter((x) => x.title || x.detail);
    if (ach.length) {
      section("Achievements");
      ach.forEach((x) => {
        doc.setFont("helvetica", "bold"); text(x.title || "—");
        doc.setFont("helvetica", "normal"); if (x.detail) text(x.detail, 8);
        y += 4;
      });
      y += 4;
    }

    if (p.hobbies.trim()) { section("Hobbies & Interests"); text(p.hobbies); }

    doc.setFont("helvetica", "italic").setFontSize(8).setTextColor(150);
    doc.text(`Generated via HBK Careers — hbkcareers.org`, margin, 820);

    const safe = p.fullName.replace(/[^a-z0-9]+/gi, "_");
    doc.save(`${safe || "resume"}_HBK.pdf`);
    toast.success(lang === "gu" ? "PDF ડાઉનલોડ થયું" : "PDF downloaded");
  };

  const addEdu = () => setP({ ...p, education: [...p.education, { institution: "", qualification: "", year: "", grade: "" }] });
  const rmEdu = (i: number) => setP({ ...p, education: p.education.filter((_, idx) => idx !== i) });
  const addProj = () => setP({ ...p, projects: [...p.projects, { title: "", detail: "" }] });
  const rmProj = (i: number) => setP({ ...p, projects: p.projects.filter((_, idx) => idx !== i) });
  const addAch = () => setP({ ...p, achievements: [...p.achievements, { title: "", detail: "" }] });
  const rmAch = (i: number) => setP({ ...p, achievements: p.achievements.filter((_, idx) => idx !== i) });

  const L = (en: string, gu: string) => (lang === "gu" ? gu : en);
  const input = "w-full px-3 py-2 text-sm rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30";

  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary px-3 py-1 text-xs font-medium">
            <FileText className="h-3.5 w-3.5" />
            {L("Resume Builder", "રિઝ્યુમ બિલ્ડર")}
          </div>
          <h1 className="font-serif text-3xl md:text-5xl mt-3">{L("Build Your Student Resume", "તમારો વિદ્યાર્થી રિઝ્યુમ બનાવો")}</h1>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            {L(
              "Free, no-login resume builder for school and college students. Fill the form, get a polished PDF. Saved on this device.",
              "શાળા અને કોલેજ વિદ્યાર્થીઓ માટે મફત રિઝ્યુમ બિલ્ડર. ફોર્મ ભરો, PDF મેળવો. આ ડિવાઇસ પર સચવાય છે."
            )}
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* Basic */}
        <Block title={L("Basic Info", "મૂળભૂત માહિતી")}>
          <div className="grid md:grid-cols-2 gap-3">
            <Field label={L("Full name", "પૂરું નામ")}><input className={input} value={p.fullName} onChange={(e) => setP({ ...p, fullName: e.target.value })} /></Field>
            <Field label={L("Email", "ઇમેલ")}><input className={input} value={p.email} onChange={(e) => setP({ ...p, email: e.target.value })} /></Field>
            <Field label={L("Phone", "ફોન")}><input className={input} value={p.phone} onChange={(e) => setP({ ...p, phone: e.target.value })} /></Field>
            <Field label={L("City", "શહેર")}><input className={input} value={p.city} onChange={(e) => setP({ ...p, city: e.target.value })} /></Field>
          </div>
        </Block>

        <Block title={L("Career Objective", "કારકિર્દી ઉદ્દેશ")}>
          <textarea className={input} rows={3} value={p.objective} onChange={(e) => setP({ ...p, objective: e.target.value })}
            placeholder={L("A 2-3 line summary of who you are and what you want to do next.", "તમે કોણ છો અને આગળ શું કરવા માંગો છો તેનો 2-3 લાઈનનો સારાંશ.")} />
        </Block>

        <Block title={L("Education", "શિક્ષણ")} onAdd={addEdu}>
          {p.education.map((e, i) => (
            <div key={i} className="grid md:grid-cols-2 gap-3 mb-3 pb-3 border-b border-border/60 last:border-0 last:pb-0">
              <input className={input} placeholder={L("Institution", "સંસ્થા")} value={e.institution} onChange={(ev) => { const c = [...p.education]; c[i] = { ...c[i], institution: ev.target.value }; setP({ ...p, education: c }); }} />
              <input className={input} placeholder={L("Qualification / Class", "લાયકાત / ધોરણ")} value={e.qualification} onChange={(ev) => { const c = [...p.education]; c[i] = { ...c[i], qualification: ev.target.value }; setP({ ...p, education: c }); }} />
              <input className={input} placeholder={L("Year", "વર્ષ")} value={e.year} onChange={(ev) => { const c = [...p.education]; c[i] = { ...c[i], year: ev.target.value }; setP({ ...p, education: c }); }} />
              <div className="flex gap-2">
                <input className={input} placeholder={L("Grade / %", "ગ્રેડ / %")} value={e.grade} onChange={(ev) => { const c = [...p.education]; c[i] = { ...c[i], grade: ev.target.value }; setP({ ...p, education: c }); }} />
                {p.education.length > 1 && <button onClick={() => rmEdu(i)} className="p-2 rounded-md border border-border hover:bg-destructive/10 text-destructive"><Trash2 className="h-4 w-4" /></button>}
              </div>
            </div>
          ))}
        </Block>

        <Block title={L("Skills", "કૌશલ્યો")}>
          <textarea className={input} rows={2} value={p.skills} onChange={(e) => setP({ ...p, skills: e.target.value })}
            placeholder={L("Comma-separated: Python, public speaking, MS Excel...", "અલ્પવિરામથી અલગ: Python, જાહેર વક્તવ્ય, MS Excel...")} />
        </Block>

        <Block title={L("Projects", "પ્રોજેક્ટ્સ")} onAdd={addProj}>
          {p.projects.map((x, i) => (
            <div key={i} className="space-y-2 mb-3 pb-3 border-b border-border/60 last:border-0 last:pb-0">
              <div className="flex gap-2">
                <input className={input} placeholder={L("Project title", "પ્રોજેક્ટ શીર્ષક")} value={x.title} onChange={(ev) => { const c = [...p.projects]; c[i] = { ...c[i], title: ev.target.value }; setP({ ...p, projects: c }); }} />
                {p.projects.length > 1 && <button onClick={() => rmProj(i)} className="p-2 rounded-md border border-border hover:bg-destructive/10 text-destructive"><Trash2 className="h-4 w-4" /></button>}
              </div>
              <textarea className={input} rows={2} placeholder={L("What you did, tools, outcome", "તમે શું કર્યું, ટૂલ્સ, પરિણામ")} value={x.detail} onChange={(ev) => { const c = [...p.projects]; c[i] = { ...c[i], detail: ev.target.value }; setP({ ...p, projects: c }); }} />
            </div>
          ))}
        </Block>

        <Block title={L("Achievements", "સિદ્ધિઓ")} onAdd={addAch}>
          {p.achievements.map((x, i) => (
            <div key={i} className="space-y-2 mb-3 pb-3 border-b border-border/60 last:border-0 last:pb-0">
              <div className="flex gap-2">
                <input className={input} placeholder={L("Achievement", "સિદ્ધિ")} value={x.title} onChange={(ev) => { const c = [...p.achievements]; c[i] = { ...c[i], title: ev.target.value }; setP({ ...p, achievements: c }); }} />
                {p.achievements.length > 1 && <button onClick={() => rmAch(i)} className="p-2 rounded-md border border-border hover:bg-destructive/10 text-destructive"><Trash2 className="h-4 w-4" /></button>}
              </div>
              <textarea className={input} rows={2} placeholder={L("Context, year, scale", "વિગત, વર્ષ, સ્તર")} value={x.detail} onChange={(ev) => { const c = [...p.achievements]; c[i] = { ...c[i], detail: ev.target.value }; setP({ ...p, achievements: c }); }} />
            </div>
          ))}
        </Block>

        <Block title={L("Hobbies & Interests", "શોખ અને રુચિઓ")}>
          <input className={input} value={p.hobbies} onChange={(e) => setP({ ...p, hobbies: e.target.value })}
            placeholder={L("Reading, cricket, robotics club...", "વાંચન, ક્રિકેટ, રોબોટિક્સ ક્લબ...")} />
        </Block>

        <div className="sticky bottom-4 z-20 flex flex-wrap gap-2 justify-end bg-card/90 backdrop-blur border border-border rounded-xl p-3 shadow-lg">
          <button onClick={save} className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border text-sm hover:bg-muted">
            <Save className="h-4 w-4" /> {L("Save draft", "ડ્રાફ્ટ સાચવો")}
          </button>
          <button onClick={exportPDF} className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
            <Download className="h-4 w-4" /> {L("Download PDF", "PDF ડાઉનલોડ કરો")}
          </button>
        </div>
      </section>
    </PublicLayout>
  );
}

function Block({ title, children, onAdd }: { title: string; children: React.ReactNode; onAdd?: () => void }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-lg">{title}</h2>
        {onAdd && (
          <button onClick={onAdd} className="text-xs inline-flex items-center gap-1 text-primary hover:underline">
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        )}
      </div>
      {children}
    </div>
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
