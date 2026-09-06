import { t4 } from "@/lib/t4";
import { useLang } from "@/lib/lang";
import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { SCHOLARSHIPS, DO_NOT_CIRCULATE, SCHOLARSHIP_PRIORITY_ORDER } from "@/lib/scholarshipsData";
import { Search, IndianRupee, Calendar, ExternalLink, GraduationCap, Filter, X, AlertTriangle, Users } from "lucide-react";

export const Route = createFileRoute("/scholarships")({
  head: () => ({
    meta: [
      { title: "100 Scholarships for Indian Students — HBK Careers" },
      { name: "description", content: "Directory of 100 central, state, technical and private scholarships for Class 9-10, Class 11-12, UG, PG and research students. Amount, income limit, portal and last date." },
      { property: "og:title", content: "Scholarships Directory — HBK Careers" },
      { property: "og:description", content: "Filter 100 verified scholarships by state, category and class level. Discontinued schemes flagged." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ScholarshipsPage,
});

const PRIORITY_STYLE: Record<string, string> = {
  "Top priority": "bg-primary text-primary-foreground",
  High: "bg-primary/15 text-primary",
  Medium: "bg-accent/30 text-accent-foreground",
  "Portal only": "bg-muted text-muted-foreground",
  Low: "bg-muted text-muted-foreground",
  "Not applicable": "bg-muted text-muted-foreground",
};

function ScholarshipsPage() {
  const lang = useLang();
  const [q, setQ] = useState("");
  const [state, setState] = useState("all");
  const [group, setGroup] = useState("all");
  const [levelGroup, setLevelGroup] = useState("all");
  const [showRetired, setShowRetired] = useState(false);

  const states = useMemo(() => Array.from(new Set(SCHOLARSHIPS.map((s) => s.appliesTo))).sort(), []);
  const groups = useMemo(() => Array.from(new Set(SCHOLARSHIPS.map((s) => s.group))).sort(), []);
  const levels = useMemo(() => Array.from(new Set(SCHOLARSHIPS.map((s) => s.levelGroup))).sort(), []);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return SCHOLARSHIPS.filter((s) => {
      if (state !== "all" && s.appliesTo !== state) return false;
      if (group !== "all" && s.group !== group) return false;
      if (levelGroup !== "all" && s.levelGroup !== levelGroup) return false;
      if (!needle) return true;
      return [s.name, s.category, s.whoFor, s.amount, s.applyAt, s.classLevel, s.notes].join(" ").toLowerCase().includes(needle);
    }).sort((a, b) => {
      const pa = SCHOLARSHIP_PRIORITY_ORDER.indexOf(a.priority);
      const pb = SCHOLARSHIP_PRIORITY_ORDER.indexOf(b.priority);
      return (pa < 0 ? 99 : pa) - (pb < 0 ? 99 : pb);
    });
  }, [q, state, group, levelGroup]);

  const activeFilters = (q ? 1 : 0) + (state !== "all" ? 1 : 0) + (group !== "all" ? 1 : 0) + (levelGroup !== "all" ? 1 : 0);
  const clearAll = () => { setQ(""); setState("all"); setGroup("all"); setLevelGroup("all"); };

  return (
    <PublicLayout>
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary px-3 py-1 text-xs font-medium">
            <GraduationCap className="h-3.5 w-3.5" />
            {t4(lang, "Scholarships Directory", "શિષ્યવૃત્તિ ડિરેક્ટરી")}
          </div>
          <h1 className="font-serif text-3xl md:text-5xl mt-3">
            {t4(lang, "Scholarships", "શિષ્યવૃત્તિ")}
          </h1>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            {`${SCHOLARSHIPS.length} `}
            {t4(lang, "central, state, technical and private scholarships — with amount, income limit, portal and last date.", "કેન્દ્ર, રાજ્ય, ટેકનિકલ અને ખાનગી શિષ્યવૃત્તિઓ — રકમ, આવક મર્યાદા, પોર્ટલ અને છેલ્લી તારીખ સાથે.")}
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-card sticky top-[57px] z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t4(lang, "e.g. MYSY, NMMS, girls, pre-matric...", "દા.ત. MYSY, NMMS, ગર્લ્સ...")}
              className="w-full pl-9 pr-9 py-2.5 text-sm rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            {q && (
              <button onClick={() => setQ("")} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-muted" aria-label="Clear">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2">
            <select value={state} onChange={(e) => setState(e.target.value)} className="w-full px-3 py-2 text-xs rounded-md border border-border bg-background">
              <option value="all">{t4(lang, "All states", "બધાં રાજ્યો")}</option>
              {states.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={group} onChange={(e) => setGroup(e.target.value)} className="w-full px-3 py-2 text-xs rounded-md border border-border bg-background">
              <option value="all">{t4(lang, "All categories", "બધી શ્રેણીઓ")}</option>
              {groups.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
            <select value={levelGroup} onChange={(e) => setLevelGroup(e.target.value)} className="w-full px-3 py-2 text-xs rounded-md border border-border bg-background">
              <option value="all">{t4(lang, "All levels", "બધાં ધોરણ")}</option>
              {levels.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="text-muted-foreground">
              <span className="font-semibold text-foreground">{results.length}</span>{" "}
              {t4(lang, "scholarships", "શિષ્યવૃત્તિઓ")}
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
            <div className="font-medium mt-3">{t4(lang, "No scholarships match", "કોઈ પરિણામ નથી")}</div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {results.map((s) => (
              <article key={s.id} className="rounded-xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-[var(--shadow-card)] transition-all">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="font-serif text-lg leading-snug">{s.name}</h2>
                    <div className="text-xs text-muted-foreground mt-0.5">{s.category} · {s.appliesTo}</div>
                  </div>
                  <span className={`text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded shrink-0 ${PRIORITY_STYLE[s.priority] ?? "bg-muted text-muted-foreground"}`}>
                    {s.priority}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-sm font-medium">
                  <IndianRupee className="h-3.5 w-3.5 text-primary" />
                  {s.amount}
                </div>
                <div className="mt-1.5 text-xs text-muted-foreground inline-flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {s.window}
                </div>
                <div className="mt-3 text-xs text-foreground/85 bg-muted/40 rounded p-2 space-y-1">
                  <div className="inline-flex items-start gap-1"><Users className="h-3 w-3 mt-0.5 shrink-0" /><span><span className="font-medium">{t4(lang, "Who it's for:", "કોના માટે:")} </span>{s.whoFor}</span></div>
                  <div><span className="font-medium">{t4(lang, "Class / level:", "ધોરણ / સ્તર:")} </span>{s.classLevel}</div>
                  <div><span className="font-medium">{t4(lang, "Income limit:", "આવક મર્યાદા:")} </span>{s.incomeLimit || "—"}</div>
                  {s.notes && <div><span className="font-medium">{t4(lang, "Note:", "નોંધ:")} </span>{s.notes}</div>}
                </div>
                <a href={`https://${s.applyAt.replace(/^https?:\/\//, "")}`} target="_blank" rel="noreferrer" className="mt-3 text-xs text-primary inline-flex items-center gap-1 hover:underline">
                  <ExternalLink className="h-3 w-3" /> {s.applyAt}
                </a>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-10">
        <div className="rounded-2xl border border-border bg-muted/30 p-5">
          <button onClick={() => setShowRetired((v) => !v)} className="w-full flex items-center justify-between gap-2 text-left">
            <span className="inline-flex items-center gap-2 text-sm font-medium">
              <AlertTriangle className="h-4 w-4 text-primary" />
              {t4(lang, "Schemes that no longer run — do not apply", "હવે બંધ થયેલી યોજનાઓ — અરજી ન કરો")}
            </span>
            <span className="text-xs text-primary">{showRetired ? t4(lang, "Hide", "છુપાવો") : t4(lang, "Show", "બતાવો")}</span>
          </button>
          {showRetired && (
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              {DO_NOT_CIRCULATE.map((d) => (
                <li key={d.name}>
                  <span className="font-medium text-foreground">{d.name}</span> — {d.status}{d.note ? `. ${d.note}` : ""}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-14">
        <div className="rounded-2xl border border-border bg-primary/5 p-6 md:p-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-serif text-lg md:text-xl">{t4(lang, "Looking for entrance exams?", "પ્રવેશ પરીક્ષાઓ પણ જુઓ")}</div>
            <div className="text-sm text-muted-foreground mt-1">{t4(lang, "100 exams — JEE, NEET, GUJCET, CUET and more.", "100 પરીક્ષાઓ — JEE, NEET, GUJCET, CUET અને વધુ")}</div>
          </div>
          <Link to="/exams" className="bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-medium hover:opacity-90">
            {t4(lang, "Browse exams", "પરીક્ષાઓ જુઓ")}
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
