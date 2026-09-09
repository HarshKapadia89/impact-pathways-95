import { t4 } from "@/lib/t4";
import { useLang } from "@/lib/lang";
import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { ENTRANCE_EXAMS } from "@/lib/entranceExamsData";
import { Search, Calendar, FileCheck, X, Filter, ArrowRight, Building2 } from "lucide-react";
import { Badge, Input, Select } from "@/design-system/hbk-career-brand-guidelines-4f1c39";

export const Route = createFileRoute("/exams")({
  head: () => ({
    meta: [
      { title: "100 Entrance Exams — JEE, NEET, GUJCET, CUET & More | HBK Careers" },
      { name: "description", content: "Directory of 100 Indian entrance exams after Class 10, Class 12 and graduation. Stream, qualifying level, conducting body, exam months and the route each exam opens." },
      { property: "og:title", content: "Entrance Exams Directory — HBK Careers" },
      { property: "og:description", content: "Filter 100 entrance exams by stream, qualifying level and how realistic they are for your cohort." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExamsPage,
});

const REALISTIC_ORDER = ["Yes", "Maybe", "No"];

function ExamsPage() {
  const lang = useLang();
  const [q, setQ] = useState("");
  const [field, setField] = useState("all");
  const [level, setLevel] = useState("all");
  const [realistic, setRealistic] = useState("all");

  const fields = useMemo(() => Array.from(new Set(ENTRANCE_EXAMS.map((e) => e.field))).sort(), []);
  const levels = useMemo(() => Array.from(new Set(ENTRANCE_EXAMS.map((e) => e.level))).sort(), []);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ENTRANCE_EXAMS.filter((e) => {
      if (field !== "all" && e.field !== field) return false;
      if (level !== "all" && e.level !== level) return false;
      if (realistic !== "all" && e.realistic !== realistic) return false;
      if (!needle) return true;
      return [e.name, e.stream, e.conductedBy, e.qualifyingLevel, e.routeOpens, e.notes].join(" ").toLowerCase().includes(needle);
    }).sort((a, b) => {
      const ra = REALISTIC_ORDER.indexOf(a.realistic);
      const rb = REALISTIC_ORDER.indexOf(b.realistic);
      return (ra < 0 ? 9 : ra) - (rb < 0 ? 9 : rb);
    });
  }, [q, field, level, realistic]);

  const activeFilters = (q ? 1 : 0) + (field !== "all" ? 1 : 0) + (level !== "all" ? 1 : 0) + (realistic !== "all" ? 1 : 0);
  const clearAll = () => { setQ(""); setField("all"); setLevel("all"); setRealistic("all"); };

  return (
    <PublicLayout>
      <section className="bg-highlight text-highlight-foreground">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <Badge variant="accent" withArrow>{t4(lang, "Entrance Exams", "પ્રવેશ પરીક્ષાઓ")}</Badge>
          <h1 className="font-display text-title md:text-display mt-6">
            {t4(lang, "Entrance Exams", "પ્રવેશ પરીક્ષાઓ")}
          </h1>
          <p className="mt-4 text-subheading text-highlight-foreground/80 max-w-3xl">
            {`${ENTRANCE_EXAMS.length} `}
            {t4(lang, "exams after Class 10, Class 12 and graduation — who conducts them, when they are held and which route each one opens.", "ધોરણ 10, ધોરણ 12 અને સ્નાતક પછીની પરીક્ષાઓ — કોણ લે છે, ક્યારે થાય છે અને કયો રસ્તો ખૂલે છે.")}
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-card sticky top-[57px] z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t4(lang, "e.g. JEE, NEET, ITI, design...", "દા.ત. JEE, NEET, ITI...")}
              className="pl-9 pr-9"
            />
            {q && (
              <button onClick={() => setQ("")} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-muted" aria-label="Clear">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Select value={field} onChange={(e) => setField(e.target.value)} size="sm">
              <option value="all">{t4(lang, "All fields", "બધાં ક્ષેત્રો")}</option>
              {fields.map((f) => <option key={f} value={f}>{f}</option>)}
            </Select>
            <Select value={level} onChange={(e) => setLevel(e.target.value)} size="sm">
              <option value="all">{t4(lang, "All levels", "બધાં ધોરણ")}</option>
              {levels.map((l) => <option key={l} value={l}>{l}</option>)}
            </Select>
            <Select value={realistic} onChange={(e) => setRealistic(e.target.value)} size="sm">
              <option value="all">{t4(lang, "Any fit", "કોઈપણ")}</option>
              <option value="Yes">{t4(lang, "Good fit", "યોગ્ય")}</option>
              <option value="Maybe">{t4(lang, "Maybe", "કદાચ")}</option>
              <option value="No">{t4(lang, "Stretch", "મુશ્કેલ")}</option>
            </Select>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="text-muted-foreground">
              <span className="font-semibold text-foreground">{results.length}</span>{" "}
              {t4(lang, "exams", "પરીક્ષાઓ")}
              {activeFilters > 0 && <span className="ml-2 text-primary">({activeFilters} {t4(lang, "filter(s)", "ફિલ્ટર")})</span>}
            </div>
            {activeFilters > 0 && (
              <button onClick={clearAll} className="text-primary hover:underline inline-flex items-center gap-1">
                <X className="h-3 w-3" /> {t4(lang, "Clear all", "સાફ કરો")}
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
            <Filter className="h-8 w-8 text-muted-foreground mx-auto" />
            <div className="font-medium mt-3">{t4(lang, "No exams match", "કોઈ પરિણામ નથી")}</div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {results.map((e) => (
              <article key={e.id} className="rounded-xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-[var(--shadow-card)] transition-all">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="font-serif text-lg leading-snug">{e.name}</h2>
                    <div className="text-xs text-muted-foreground mt-0.5">{e.stream}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5 inline-flex items-start gap-1">
                      <Building2 className="h-3 w-3 mt-0.5 shrink-0" /> {e.conductedBy}
                    </div>
                  </div>
                  <span className={`text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded shrink-0 ${e.realistic === "Yes" ? "bg-primary/15 text-primary" : e.realistic === "Maybe" ? "bg-accent/30 text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                    {e.realistic === "Yes" ? t4(lang, "Good fit", "યોગ્ય") : e.realistic === "Maybe" ? t4(lang, "Maybe", "કદાચ") : t4(lang, "Stretch", "મુશ્કેલ")}
                  </span>
                </div>
                <div className="mt-3 text-xs inline-flex items-center gap-1 text-foreground/85">
                  <Calendar className="h-3 w-3" /> {e.typicalMonth}
                </div>
                <div className="mt-2 text-xs text-foreground/85 bg-muted/40 rounded p-2 space-y-1">
                  <div><span className="font-medium">{t4(lang, "Qualifying level:", "પાત્રતા:")} </span>{e.qualifyingLevel}</div>
                  <div className="inline-flex items-start gap-1"><ArrowRight className="h-3 w-3 mt-0.5 shrink-0" /><span><span className="font-medium">{t4(lang, "Opens:", "શું ખૂલે છે:")} </span>{e.routeOpens}</span></div>
                  {e.notes && <div><span className="font-medium">{t4(lang, "Note:", "નોંધ:")} </span>{e.notes}</div>}
                </div>
                <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">{e.field}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded border border-border">{e.level}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded border border-border">{e.scope}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-14">
        <div className="rounded-2xl border border-border bg-primary/5 p-6 md:p-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-serif text-lg md:text-xl">{t4(lang, "Not sure which exam fits you?", "કયા ક્ષેત્રમાં જવું?")}</div>
            <div className="text-sm text-muted-foreground mt-1">{t4(lang, "Take the free aptitude test for personalised recommendations.", "મફત મનો-યોગ્યતા ટેસ્ટ — RIASEC + અભિરુચિ આધારિત ભલામણો.")}</div>
          </div>
          <Link to="/test" className="bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-medium hover:opacity-90">
            {t4(lang, "Take the test", "ટેસ્ટ આપો")}
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
