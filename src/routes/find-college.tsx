import { t4 } from "@/lib/t4";
import { useLang, type Lang } from "@/lib/lang";
import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/PublicLayout";
import { GUJ_COLLEGES } from "@/lib/gujaratColleges";
import { INDIA_COLLEGES, INDIA_STATES, type IndiaCollege } from "@/lib/indiaColleges";
import {
  Search,
  MapPin,
  Filter,
  IndianRupee,
  Users,
  Sparkles,
  ExternalLink,
  Building2,
  Globe2,
  X,
} from "lucide-react";
import { Badge, Input } from "@/design-system/hbk-career-brand-guidelines-4f1c39";
import careerStudents from "@/assets/hbk-career-students.jpg";

export const Route = createFileRoute("/find-college")({
  head: () => ({
    meta: [
      { title: "Find Your College — Search Gujarat & India | HBK Careers" },
      {
        name: "description",
        content:
          "Search across 200+ colleges in Gujarat and India. Filter by college name, course, city, state, category and type. IITs, NITs, AIIMS, IIMs, NLUs, NIDs, Gujarat state colleges and more.",
      },
      { property: "og:title", content: "Find Your College — HBK Careers" },
      {
        property: "og:description",
        content:
          "Full search across Gujarat + India colleges by name, course, city, state, category and type.",
      },
    ],
  }),
  component: FindCollegePage,
});

type UnifiedCollege = {
  name: string;
  city: string;
  state: string;
  type: string;
  category: string;
  categoryLabel: string;
  established?: number;
  courses: string[];
  website?: string;
  notable?: string;
  feesRange?: string;
  approxIntake?: string;
  region: "Gujarat" | "India";
};

function buildUnified(): UnifiedCollege[] {
  const guj: UnifiedCollege[] = GUJ_COLLEGES.flatMap((cat) =>
    cat.colleges.map((c) => ({
      name: c.name,
      city: c.city,
      state: "Gujarat",
      type: c.type,
      category: cat.id,
      categoryLabel: cat.title,
      established: c.established,
      courses: c.courses,
      website: c.website,
      notable: c.notable,
      feesRange: c.feesRange,
      approxIntake: c.approxIntake,
      region: "Gujarat",
    })),
  );
  const india: UnifiedCollege[] = INDIA_COLLEGES.map((c: IndiaCollege) => ({
    name: c.name,
    city: c.city,
    state: c.state,
    type: c.type,
    category: c.category,
    categoryLabel: prettyCat(c.category),
    established: c.established,
    courses: c.courses,
    website: c.website,
    notable: c.notable,
    feesRange: c.feesRange,
    approxIntake: c.approxIntake,
    region: "India",
  }));
  return [...guj, ...india];
}

const CATEGORIES = [
  { id: "engineering", label: "Engineering & Technology", emoji: "⚙️" },
  { id: "medical", label: "Medical (MBBS/BDS)", emoji: "🩺" },
  { id: "pharmacy", label: "Pharmacy", emoji: "💊" },
  { id: "law", label: "Law", emoji: "⚖️" },
  { id: "management", label: "Management / MBA", emoji: "📈" },
  { id: "design-architecture", label: "Design & Architecture", emoji: "🎨" },
  { id: "commerce", label: "Commerce", emoji: "💼" },
  { id: "arts-science", label: "Arts & Science", emoji: "📚" },
  { id: "agriculture", label: "Agriculture & Veterinary", emoji: "🌾" },
  { id: "hotel-mass-comm", label: "Hotel & Mass Comm", emoji: "🎬" },
  { id: "polytechnic-iti", label: "Polytechnic / ITI", emoji: "🛠️" },
];

function prettyCat(id: string) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

function FindCollegePage() {
  const lang = useLang();

  const ALL = useMemo(buildUnified, []);

  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<"all" | "Gujarat" | "India">("all");
  const [stateFilter, setStateFilter] = useState<string>("all");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const allStates = useMemo(
    () => Array.from(new Set([...INDIA_STATES, "Gujarat"])).sort(),
    [],
  );
  const allCities = useMemo(() => {
    const base = ALL.filter(
      (c) =>
        (region === "all" || c.region === region) &&
        (stateFilter === "all" || c.state === stateFilter),
    );
    return Array.from(
      new Set(base.map((c) => c.city.split(",")[0].split("(")[0].trim())),
    ).sort();
  }, [ALL, region, stateFilter]);
  const allTypes = useMemo(
    () => Array.from(new Set(ALL.map((c) => c.type))).sort(),
    [ALL],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL.filter((c) => {
      if (region !== "all" && c.region !== region) return false;
      if (stateFilter !== "all" && c.state !== stateFilter) return false;
      if (cityFilter !== "all" && !c.city.toLowerCase().includes(cityFilter.toLowerCase()))
        return false;
      if (category !== "all" && c.category !== category) return false;
      if (typeFilter !== "all" && c.type !== typeFilter) return false;
      if (!q) return true;
      const hay = [
        c.name,
        c.city,
        c.state,
        c.categoryLabel,
        ...c.courses,
        c.notable ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [ALL, query, region, stateFilter, cityFilter, category, typeFilter]);

  const activeFilterCount =
    (query ? 1 : 0) +
    (region !== "all" ? 1 : 0) +
    (stateFilter !== "all" ? 1 : 0) +
    (cityFilter !== "all" ? 1 : 0) +
    (category !== "all" ? 1 : 0) +
    (typeFilter !== "all" ? 1 : 0);

  function clearAll() {
    setQuery("");
    setRegion("all");
    setStateFilter("all");
    setCityFilter("all");
    setCategory("all");
    setTypeFilter("all");
  }

  // Group by category for display
  const grouped = useMemo(() => {
    const map = new Map<string, UnifiedCollege[]>();
    for (const c of results) {
      const arr = map.get(c.category) ?? [];
      arr.push(c);
      map.set(c.category, arr);
    }
    return Array.from(map.entries()).sort((a, b) => b[1].length - a[1].length);
  }, [results]);

  const totalGuj = ALL.filter((c) => c.region === "Gujarat").length;
  const totalIndia = ALL.filter((c) => c.region === "India").length;

  return (
    <PublicLayout>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-accent text-accent-foreground">
        <img src={careerStudents} alt="Indian students exploring college options" width={1536} height={1024} className="absolute inset-0 -z-10 h-full w-full object-cover object-right opacity-20 mix-blend-multiply" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <Badge variant="highlight" withArrow>{t4(lang, "Full College Directory", "પૂર્ણ કોલેજ ડિરેક્ટરી")}</Badge>
          <h1 className="font-display text-title md:text-display mt-6">
            {t4(lang, "Find Your College", "તમારી કોલેજ શોધો")}
          </h1>
          <p className="mt-4 text-subheading max-w-3xl">
            {lang === "gu"
              ? `ગુજરાતની ${totalGuj}+ અને ભારતભરની ${totalIndia}+ ટોચની કોલેજો — નામ, કોર્સ, શહેર, રાજ્ય અથવા શ્રેણી દ્વારા શોધો.`
              : `Search ${totalGuj}+ Gujarat colleges and ${totalIndia}+ premier institutes across India — by name, course, city, state, category or type.`}
          </p>
        </div>
      </section>

      {/* SEARCH + FILTERS */}
      <section className="border-b border-border bg-card sticky top-[57px] z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 space-y-3">
          {/* Search bar */}
          <div>
            <Input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                t4(lang, "e.g. IIT, MBBS, Ahmedabad, Engineering, NID...", "દા.ત. IIT, MBBS, Ahmedabad, Engineering, NID...")
              }
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-muted"
                aria-label="Clear"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Filter row */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <FilterSelect
              icon={<Globe2 className="h-3.5 w-3.5" />}
              value={region}
              onChange={(v) => {
                setRegion(v as "all" | "Gujarat" | "India");
                setStateFilter("all");
                setCityFilter("all");
              }}
              options={[
                { value: "all", label: t4(lang, "All regions", "બધાં પ્રદેશો") },
                { value: "Gujarat", label: "Gujarat" },
                { value: "India", label: t4(lang, "Rest of India", "બાકીનું ભારત") },
              ]}
            />
            <FilterSelect
              icon={<MapPin className="h-3.5 w-3.5" />}
              value={stateFilter}
              onChange={(v) => {
                setStateFilter(v);
                setCityFilter("all");
              }}
              options={[
                { value: "all", label: t4(lang, "All states", "બધા રાજ્યો") },
                ...allStates.map((s) => ({ value: s, label: s })),
              ]}
            />
            <FilterSelect
              icon={<Building2 className="h-3.5 w-3.5" />}
              value={cityFilter}
              onChange={setCityFilter}
              options={[
                { value: "all", label: t4(lang, "All cities", "બધાં શહેરો") },
                ...allCities.map((c) => ({ value: c, label: c })),
              ]}
            />
            <FilterSelect
              icon={<Filter className="h-3.5 w-3.5" />}
              value={category}
              onChange={setCategory}
              options={[
                { value: "all", label: t4(lang, "All categories", "બધી શ્રેણીઓ") },
                ...CATEGORIES.map((c) => ({ value: c.id, label: `${c.emoji} ${c.label}` })),
              ]}
            />
            <FilterSelect
              icon={<Sparkles className="h-3.5 w-3.5" />}
              value={typeFilter}
              onChange={setTypeFilter}
              options={[
                { value: "all", label: t4(lang, "All types", "બધા પ્રકાર") },
                ...allTypes.map((t) => ({ value: t, label: t })),
              ]}
            />
          </div>

          {/* Result count + clear */}
          <div className="flex items-center justify-between text-xs">
            <div className="text-muted-foreground">
              {t4(lang, "Results", "પરિણામો")}:{" "}
              <span className="font-semibold text-foreground">{results.length}</span>{" "}
              {t4(lang, "colleges", "કોલેજો")}
              {activeFilterCount > 0 && (
                <span className="ml-2 text-primary">
                  ({activeFilterCount} {t4(lang, "active filter(s)", "ફિલ્ટર સક્રિય")})
                </span>
              )}
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={clearAll}
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                <X className="h-3 w-3" />
                {t4(lang, "Clear all filters", "બધાં ફિલ્ટર સાફ કરો")}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
            <Search className="h-8 w-8 text-muted-foreground mx-auto" />
            <div className="font-medium mt-3">
              {t4(lang, "No colleges match your search", "કોઈ કોલેજ મળી નથી")}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {t4(lang, "Try changing or clearing the filters.", "ફિલ્ટર બદલીને અથવા સાફ કરીને ફરી પ્રયાસ કરો.")}
            </p>
            <button
              onClick={clearAll}
              className="mt-4 text-sm text-primary-foreground bg-primary px-4 py-2 rounded-md hover:opacity-90"
            >
              {t4(lang, "Clear filters", "ફિલ્ટર સાફ કરો")}
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {grouped.map(([catId, list]) => {
              const meta = CATEGORIES.find((c) => c.id === catId);
              return (
                <div key={catId}>
                  <h2 className="font-serif text-xl md:text-2xl flex items-center gap-2 border-b border-border pb-2">
                    <span className="text-2xl">{meta?.emoji ?? "🎓"}</span>
                    {meta?.label ?? catId}
                    <span className="text-xs text-muted-foreground font-sans font-normal">
                      ({list.length})
                    </span>
                  </h2>
                  <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {list.map((c) => (
                      <CollegeCard key={`${c.name}-${c.city}`} c={c} lang={lang} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-14">
        <div className="rounded-2xl border border-border bg-primary/5 p-6 md:p-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-serif text-lg md:text-xl">
              {t4(lang, "Not sure which stream is right for you?", "પ્રવાહ વિશે હજી સ્પષ્ટ નથી?")}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {t4(lang, "Take the free aptitude test — RIASEC + interest-based recommendations.", "મફત મનો-યોગ્યતા ટેસ્ટ આપો — તમારા RIASEC + અભિરુચિ આધારિત ભલામણો.")}
            </div>
          </div>
          <Link
            to="/test"
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-medium hover:opacity-90"
          >
            {t4(lang, "Take the test", "ટેસ્ટ આપો")}
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}

/* ----------------- Subcomponents ----------------- */

function FilterSelect({
  icon,
  value,
  onChange,
  options,
}: {
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
        {icon}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-8 pr-3 py-2 text-xs rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none truncate"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function CollegeCard({ c, lang }: { c: UnifiedCollege; lang: Lang }) {
  return (
    <article className="rounded-xl border border-border bg-card p-4 hover:border-primary/30 hover:shadow-lift transition-all">
      <div className="flex items-start justify-between gap-2">
        <div className="font-medium text-foreground leading-snug">{c.name}</div>
        <span className={`text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded shrink-0 ${typeBadge(c.type)}`}>
          {c.type}
        </span>
      </div>
      <div className="text-xs text-muted-foreground mt-1.5 inline-flex items-center gap-1 flex-wrap">
        <MapPin className="h-3 w-3" />
        {c.city}, {c.state}
        {c.established ? ` • Est. ${c.established}` : ""}
      </div>
      <div className="text-xs mt-2">
        <span className="text-muted-foreground">{t4(lang, "Courses", "કોર્સ")}: </span>
        <span className="text-foreground/85">{c.courses.slice(0, 4).join(" · ")}</span>
      </div>
      {c.feesRange && (
        <div className="text-xs mt-1.5 inline-flex items-center gap-1 text-foreground/80">
          <IndianRupee className="h-3 w-3" />
          {c.feesRange}
        </div>
      )}
      {c.approxIntake && (
        <div className="text-xs mt-1 inline-flex items-center gap-1 text-foreground/80">
          <Users className="h-3 w-3" />
          {c.approxIntake}
        </div>
      )}
      {c.notable && (
        <div className="text-xs mt-2 text-foreground/85 bg-primary/5 border border-primary/15 rounded px-2 py-1.5">
          <Sparkles className="h-3 w-3 text-primary inline-block mr-1 -mt-0.5" />
          {c.notable}
        </div>
      )}
      {c.website && (
        <a
          href={`https://${c.website}`}
          target="_blank"
          rel="noreferrer"
          className="mt-3 text-xs text-primary inline-flex items-center gap-1 hover:underline break-all"
        >
          <ExternalLink className="h-3 w-3" />
          {c.website}
        </a>
      )}
    </article>
  );
}

function typeBadge(type: string): string {
  switch (type) {
    case "Government":
    case "Central":
    case "State":
      return "bg-primary/15 text-primary";
    case "Government-Aided":
      return "bg-accent/30 text-accent-foreground";
    case "Deemed":
    case "Autonomous":
      return "bg-secondary text-secondary-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
}
