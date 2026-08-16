import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/PublicLayout";
import { SCHOLARSHIPS, type Scholarship } from "@/lib/scholarshipsData";
import { Search, IndianRupee, Calendar, ExternalLink, GraduationCap, Filter, X } from "lucide-react";

export const Route = createFileRoute("/scholarships")({
  head: () => ({
    meta: [
      { title: "Scholarships for Gujarat & India Students — HBK Careers" },
      { name: "description", content: "Curated list of Gujarat-state and national scholarships for Class 10, Class 11-12, UG, PG and Diploma students. Filter by category, level and scope." },
      { property: "og:title", content: "Scholarships — HBK Careers" },
      { property: "og:description", content: "Gujarat-first scholarships directory: MYSY, Digital Gujarat, NMMS, INSPIRE, Reliance Foundation and more." },
    ],
  }),
  component: ScholarshipsPage,
});

function ScholarshipsPage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith("gu") ? "gu" : "en") as "en" | "gu";
  const [q, setQ] = useState("");
  const [scope, setScope] = useState<string>("all");
  const [level, setLevel] = useState<string>("all");
  const [cat, setCat] = useState<string>("all");

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return SCHOLARSHIPS.filter((s) => {
      if (scope !== "all" && s.scope !== scope) return false;
      if (level !== "all" && !s.level.includes(level as Scholarship["level"][number])) return false;
      if (cat !== "all" && !s.category.includes(cat as Scholarship["category"][number])) return false;
      if (!needle) return true;
      return [s.name, s.provider, s.eligibility, s.amount].join(" ").toLowerCase().includes(needle);
    });
  }, [q, scope, level, cat]);

  const activeFilters = (q ? 1 : 0) + (scope !== "all" ? 1 : 0) + (level !== "all" ? 1 : 0) + (cat !== "all" ? 1 : 0);
  const clearAll = () => { setQ(""); setScope("all"); setLevel("all"); setCat("all"); };

  return (
    <PublicLayout>
      <section className="poster-hero border-b-4 border-ink">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary px-3 py-1 text-xs font-medium">
            <GraduationCap className="h-3.5 w-3.5" />
            {lang === "gu" ? "શિષ્યવૃત્તિ ડિરેક્ટરી" : "Scholarships Directory"}
          </div>
          <h1 className="font-serif text-3xl md:text-5xl mt-3">
            {lang === "gu" ? "શિષ્યવૃત્તિ" : "Scholarships"}
          </h1>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            {lang === "gu"
              ? `ગુજરાત રાજ્ય અને રાષ્ટ્રીય સ્તરની ${SCHOLARSHIPS.length}+ શિષ્યવૃત્તિઓ — તમારા ધોરણ, કેટેગરી અને જરૂરિયાત મુજબ ફિલ્ટર કરો.`
              : `${SCHOLARSHIPS.length}+ Gujarat-state and national scholarships — filter by class level, category and need.`}
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
              placeholder={lang === "gu" ? "દા.ત. MYSY, NMMS, ગર્લ્સ..." : "e.g. MYSY, NMMS, girls, merit..."}
              className="w-full pl-9 pr-9 py-2.5 text-sm rounded-md border-2 border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            {q && (
              <button onClick={() => setQ("")} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-muted" aria-label="Clear">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2">
            <select value={scope} onChange={(e) => setScope(e.target.value)} className="w-full px-3 py-2 text-xs rounded-md border-2 border-border bg-background">
              <option value="all">{lang === "gu" ? "બધાં પ્રદેશો" : "All scope"}</option>
              <option value="Gujarat">Gujarat</option>
              <option value="National">National</option>
            </select>
            <select value={level} onChange={(e) => setLevel(e.target.value)} className="w-full px-3 py-2 text-xs rounded-md border-2 border-border bg-background">
              <option value="all">{lang === "gu" ? "બધાં ધોરણ" : "All levels"}</option>
              <option value="Class 10">Class 10</option>
              <option value="Class 11-12">Class 11–12</option>
              <option value="UG">UG</option>
              <option value="PG">PG</option>
              <option value="Diploma">Diploma</option>
            </select>
            <select value={cat} onChange={(e) => setCat(e.target.value)} className="w-full px-3 py-2 text-xs rounded-md border-2 border-border bg-background">
              <option value="all">{lang === "gu" ? "બધી શ્રેણીઓ" : "All categories"}</option>
              <option value="Merit">Merit</option>
              <option value="Need-based">Need-based</option>
              <option value="SC/ST/OBC">SC/ST/OBC</option>
              <option value="Minority">Minority</option>
              <option value="Girls">Girls</option>
              <option value="Sports">Sports</option>
              <option value="Disability">Disability</option>
            </select>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="text-muted-foreground">
              <span className="font-semibold text-foreground">{results.length}</span>{" "}
              {lang === "gu" ? "શિષ્યવૃત્તિઓ" : "scholarships"}
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
            <div className="font-medium mt-3">{lang === "gu" ? "કોઈ પરિણામ નથી" : "No scholarships match"}</div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {results.map((s) => (
              <article key={s.id} className="rounded-xl border-2 border-border bg-card p-5 hover:border-primary/40 hover:shadow-[var(--shadow-card)] transition-all">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="font-serif text-lg leading-snug">{s.name}</h2>
                    <div className="text-xs text-muted-foreground mt-0.5">{s.provider}</div>
                  </div>
                  <span className={`text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded shrink-0 ${s.scope === "Gujarat" ? "bg-primary/15 text-primary" : "bg-accent/30 text-accent-foreground"}`}>
                    {s.scope}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-sm font-medium">
                  <IndianRupee className="h-3.5 w-3.5 text-primary" />
                  {s.amount}
                </div>
                <div className="mt-1.5 text-xs text-muted-foreground inline-flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {s.deadline}
                </div>
                <div className="mt-3 text-xs text-foreground/85 bg-muted/40 rounded p-2">
                  <span className="font-medium">{lang === "gu" ? "પાત્રતા:" : "Eligibility:"} </span>{s.eligibility}
                </div>
                <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                  {s.level.map((l) => <span key={l} className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">{l}</span>)}
                  {s.category.map((c) => <span key={c} className="text-[10px] px-1.5 py-0.5 rounded border-2 border-border">{c}</span>)}
                </div>
                <a href={`https://${s.website}`} target="_blank" rel="noreferrer" className="mt-3 text-xs text-primary inline-flex items-center gap-1 hover:underline">
                  <ExternalLink className="h-3 w-3" /> {s.website}
                </a>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-14">
        <div className="rounded-2xl border-2 border-border bg-primary/5 p-6 md:p-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-serif text-lg md:text-xl">{lang === "gu" ? "પ્રવેશ પરીક્ષાઓ પણ જુઓ" : "Looking for entrance exams?"}</div>
            <div className="text-sm text-muted-foreground mt-1">{lang === "gu" ? "JEE, NEET, GUJCET, CUET — અમારી પૂરી યાદી" : "JEE, NEET, GUJCET, CUET — full directory."}</div>
          </div>
          <Link to="/exams" className="bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-medium hover:opacity-90">
            {lang === "gu" ? "પરીક્ષાઓ જુઓ" : "Browse exams"}
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
