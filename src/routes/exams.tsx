import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/PublicLayout";
import { ENTRANCE_EXAMS } from "@/lib/entranceExamsData";
import { Search, Calendar, ExternalLink, FileCheck, X, Filter } from "lucide-react";

export const Route = createFileRoute("/exams")({
  head: () => ({
    meta: [
      { title: "Entrance Exams — JEE, NEET, GUJCET, CUET & More | HBK Careers" },
      { name: "description", content: "Complete guide to entrance exams for Indian students: JEE, NEET, GUJCET, CUET, CLAT, NID, NIFT, CAT and more. Eligibility, pattern, dates." },
      { property: "og:title", content: "Entrance Exams Directory — HBK Careers" },
      { property: "og:description", content: "Filter by field, level and scope. Gujarat-state and national entrance exams in one place." },
    ],
  }),
  component: ExamsPage,
});

function ExamsPage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith("gu") ? "gu" : "en") as "en" | "gu";
  const [q, setQ] = useState("");
  const [field, setField] = useState("all");
  const [level, setLevel] = useState("all");
  const [scope, setScope] = useState("all");

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ENTRANCE_EXAMS.filter((e) => {
      if (field !== "all" && e.field !== field) return false;
      if (level !== "all" && e.level !== level) return false;
      if (scope !== "all" && e.scope !== scope) return false;
      if (!needle) return true;
      return [e.name, e.fullName, e.conductedBy, e.eligibility, ...e.forStreams].join(" ").toLowerCase().includes(needle);
    });
  }, [q, field, level, scope]);

  const activeFilters = (q ? 1 : 0) + (field !== "all" ? 1 : 0) + (level !== "all" ? 1 : 0) + (scope !== "all" ? 1 : 0);
  const clearAll = () => { setQ(""); setField("all"); setLevel("all"); setScope("all"); };
  const fields = Array.from(new Set(ENTRANCE_EXAMS.map((e) => e.field)));

  return (
    <PublicLayout>
      <section className="poster-hero border-b-4 border-ink">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary px-3 py-1 text-xs font-medium">
            <FileCheck className="h-3.5 w-3.5" />
            {lang === "gu" ? "પ્રવેશ પરીક્ષાઓ" : "Entrance Exams"}
          </div>
          <h1 className="font-serif text-3xl md:text-5xl mt-3">
            {lang === "gu" ? "પ્રવેશ પરીક્ષાઓ" : "Entrance Exams"}
          </h1>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            {lang === "gu"
              ? `${ENTRANCE_EXAMS.length}+ ભારતીય પ્રવેશ પરીક્ષાઓ — JEE, NEET, GUJCET, CUET, CAT, CLAT, NID અને વધુ. પાત્રતા, પેટર્ન અને તારીખો.`
              : `${ENTRANCE_EXAMS.length}+ Indian entrance exams — JEE, NEET, GUJCET, CUET, CAT, CLAT, NID and more. Eligibility, pattern, dates.`}
          </p>
        </div>
      </section>

      <section className="border-b-2 border-border bg-card sticky top-[57px] z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={lang === "gu" ? "દા.ત. JEE, NEET, CUET..." : "e.g. JEE, NEET, CUET, design..."}
              className="w-full pl-9 pr-9 py-2.5 text-sm rounded-md border-2 border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            {q && (
              <button onClick={() => setQ("")} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-muted" aria-label="Clear">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2">
            <select value={field} onChange={(e) => setField(e.target.value)} className="w-full px-3 py-2 text-xs rounded-md border-2 border-border bg-background">
              <option value="all">{lang === "gu" ? "બધાં ક્ષેત્રો" : "All fields"}</option>
              {fields.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
            <select value={level} onChange={(e) => setLevel(e.target.value)} className="w-full px-3 py-2 text-xs rounded-md border-2 border-border bg-background">
              <option value="all">{lang === "gu" ? "બધાં ધોરણ" : "All levels"}</option>
              <option value="Class 12 / UG">Class 12 / UG</option>
              <option value="PG">PG</option>
              <option value="Diploma">Diploma</option>
            </select>
            <select value={scope} onChange={(e) => setScope(e.target.value)} className="w-full px-3 py-2 text-xs rounded-md border-2 border-border bg-background">
              <option value="all">{lang === "gu" ? "બધાં પ્રદેશો" : "All scope"}</option>
              <option value="Gujarat">Gujarat</option>
              <option value="National">National</option>
            </select>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="text-muted-foreground">
              <span className="font-semibold text-foreground">{results.length}</span>{" "}
              {lang === "gu" ? "પરીક્ષાઓ" : "exams"}
              {activeFilters > 0 && <span className="ml-2 text-primary">({activeFilters} {lang === "gu" ? "ફિલ્ટર" : "filter(s)"})</span>}
            </div>
            {activeFilters > 0 && (
              <button onClick={clearAll} className="text-primary hover:underline inline-flex items-center gap-1">
                <X className="h-3 w-3" /> {lang === "gu" ? "સાફ કરો" : "Clear all"}
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
            <Filter className="h-8 w-8 text-muted-foreground mx-auto" />
            <div className="font-medium mt-3">{lang === "gu" ? "કોઈ પરિણામ નથી" : "No exams match"}</div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {results.map((e) => (
              <article key={e.id} className="rounded-xl border-2 border-border bg-card p-5 hover:border-primary/40 hover:shadow-[var(--shadow-card)] transition-all">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="font-serif text-lg leading-snug">{e.name}</h2>
                    <div className="text-xs text-muted-foreground mt-0.5">{e.fullName}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{lang === "gu" ? "આયોજક" : "By"}: {e.conductedBy}</div>
                  </div>
                  <span className={`text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded shrink-0 ${e.scope === "Gujarat" ? "bg-primary/15 text-primary" : "bg-accent/30 text-accent-foreground"}`}>
                    {e.scope}
                  </span>
                </div>
                <div className="mt-3 text-xs inline-flex items-center gap-1 text-foreground/85">
                  <Calendar className="h-3 w-3" /> {e.typicalMonth}
                </div>
                <div className="mt-2 text-xs text-foreground/85 bg-muted/40 rounded p-2 space-y-1">
                  <div><span className="font-medium">{lang === "gu" ? "પાત્રતા:" : "Eligibility:"} </span>{e.eligibility}</div>
                  <div><span className="font-medium">{lang === "gu" ? "પેટર્ન:" : "Pattern:"} </span>{e.pattern}</div>
                </div>
                <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">{e.field}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded border-2 border-border">{e.level}</span>
                  {e.forStreams.slice(0, 2).map((s) => <span key={s} className="text-[10px] px-1.5 py-0.5 rounded border-2 border-border">{s}</span>)}
                </div>
                <a href={`https://${e.website}`} target="_blank" rel="noreferrer" className="mt-3 text-xs text-primary inline-flex items-center gap-1 hover:underline">
                  <ExternalLink className="h-3 w-3" /> {e.website}
                </a>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-14">
        <div className="rounded-2xl border-2 border-border bg-primary/5 p-6 md:p-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-serif text-lg md:text-xl">{lang === "gu" ? "કયા ક્ષેત્રમાં જવું?" : "Not sure which exam fits you?"}</div>
            <div className="text-sm text-muted-foreground mt-1">{lang === "gu" ? "મફત મનો-યોગ્યતા ટેસ્ટ — RIASEC + અભિરુચિ આધારિત ભલામણો." : "Take the free aptitude test for personalised recommendations."}</div>
          </div>
          <Link to="/test" className="bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-medium hover:opacity-90">
            {lang === "gu" ? "ટેસ્ટ આપો" : "Take the test"}
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
