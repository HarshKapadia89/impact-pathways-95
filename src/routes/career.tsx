import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/PublicLayout";
import { STREAMS, ENTRANCE_EXAMS } from "@/lib/careerData";
import { GUJ_COLLEGES, GUJ_COLLEGE_STATS, type CategoryGroup } from "@/lib/gujaratColleges";
import {
  MapPin,
  BookOpen,
  Sparkles,
  Building2,
  GraduationCap,
  ExternalLink,
  IndianRupee,
  Calendar,
  Users,
  Search as SearchIcon,
} from "lucide-react";

export const Route = createFileRoute("/career")({
  head: () => ({
    meta: [
      { title: "Career Guidance — Gujarat | Top Colleges, Streams & Entrance Exams | Disha" },
      {
        name: "description",
        content:
          "Complete Gujarat career guide after Class 12 — IIT Gandhinagar, IIM Ahmedabad, GNLU, NID, CEPT, GMERS medical colleges, B. J. Medical, GUJCET, NEET, MYSY scholarship, ACPC counselling. 100+ Gujarat colleges across engineering, medical, law, design, commerce, arts.",
      },
      { property: "og:title", content: "Career Guidance — Gujarat | Disha" },
      {
        property: "og:description",
        content: "Top Gujarat colleges across every stream + entrance exams (GUJCET, JEE, NEET, CLAT, NID) + MYSY scholarship + ACPC counselling.",
      },
    ],
  }),
  component: CareerIndex,
});

function CareerIndex() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith("gu") ? "gu" : "en") as "en" | "gu";

  const [activeCat, setActiveCat] = useState<string>("all");

  const filteredCategories = useMemo(() => {
    return GUJ_COLLEGES.filter((cat) => activeCat === "all" || cat.id === activeCat);
  }, [activeCat]);

  const totalShown = filteredCategories.reduce((n, c) => n + c.colleges.length, 0);

  return (
    <PublicLayout>
      {/* HERO */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary px-3 py-1 text-xs font-medium">
            <MapPin className="h-3.5 w-3.5" />
            {lang === "gu" ? "ગુજરાત-કેન્દ્રિત" : "100% Gujarat-focused"}
          </div>
          <h1 className="font-serif text-3xl md:text-5xl mt-3">
            {lang === "gu" ? "કારકિર્દી માર્ગદર્શન — ગુજરાત" : "Career Guidance — Gujarat"}
          </h1>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            {lang === "gu"
              ? "ધોરણ 12 પછીના દરેક પ્રવાહ માટે ગુજરાતની ટોચની કોલેજો, વિગતવાર કારકિર્દી, અભ્યાસક્રમો, પ્રવેશ પરીક્ષાઓ (GUJCET, JEE, NEET, CLAT, NID), ACPC કાઉન્સેલિંગ, MYSY શિષ્યવૃત્તિ અને રાજ્ય યોજનાઓ — એક જ જગ્યાએ."
              : "Top Gujarat colleges for every stream after Class 12 — careers, courses, entrance exams (GUJCET, JEE, NEET, CLAT, NID), ACPC counselling, MYSY scholarship and state schemes — all in one place."}
          </p>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3 max-w-4xl">
            <Stat label={lang === "gu" ? "પ્રવાહો" : "Streams"} value={String(STREAMS.length)} />
            <Stat
              label={lang === "gu" ? "કારકિર્દી માર્ગો" : "Career paths"}
              value={`${STREAMS.reduce((n, s) => n + s.paths.length, 0)}+`}
            />
            <Stat
              label={lang === "gu" ? "ગુજરાત કોલેજો" : "Gujarat colleges"}
              value={`${GUJ_COLLEGE_STATS.totalListed}+`}
            />
            <Stat
              label={lang === "gu" ? "MBBS સીટો" : "MBBS seats"}
              value={`${GUJ_COLLEGE_STATS.totalMBBSSeats.toLocaleString()}`}
            />
            <Stat label={lang === "gu" ? "ITI કેન્દ્રો" : "ITI centres"} value={`${GUJ_COLLEGE_STATS.iti}+`} />
          </div>

          <div className="mt-6 inline-flex items-start gap-2 text-xs text-muted-foreground bg-card/60 border border-border rounded-md px-3 py-2 max-w-3xl">
            <Sparkles className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
            <span>
              {lang === "gu" ? (
                <>
                  ભારત-વ્યાપી 935+ વ્યવસાયો અને 1,400+ ટોચની સંસ્થાઓ માટે,{" "}
                  <Link to="/handbook" className="text-primary hover:underline inline-flex items-center gap-1">
                    કારકિર્દી હેન્ડબુક <BookOpen className="h-3 w-3" />
                  </Link>{" "}
                  જુઓ.
                </>
              ) : (
                <>
                  Looking for an India-wide reference of 935+ professions and 1,400+ top institutes? See the{" "}
                  <Link to="/handbook" className="text-primary hover:underline inline-flex items-center gap-1">
                    Career Handbook <BookOpen className="h-3 w-3" />
                  </Link>
                  .
                </>
              )}
            </span>
          </div>
        </div>
      </section>

      {/* STREAMS section removed per request — stream navigation lives within the colleges directory cross-links and via /career/$stream URLs. */}

      {/* GUJARAT COLLEGES DIRECTORY */}
      <section className="bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl">
                {lang === "gu" ? "ગુજરાતની ટોચની કોલેજો — સંપૂર્ણ માર્ગદર્શિકા" : "Gujarat's Top Colleges — Complete Directory"}
              </h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-3xl">
                {lang === "gu"
                  ? `${GUJ_COLLEGE_STATS.totalListed}+ કોલેજો, ${GUJ_COLLEGE_STATS.categories} શ્રેણીઓમાં — એન્જિનિયરિંગ, મેડિકલ, કાયદો, મેનેજમેન્ટ, ડિઝાઇન, વાણિજ્ય, કળા-વિજ્ઞાન, કૃષિ, ITI અને વધુ. શ્રેણી પસંદ કરી બ્રાઉઝ કરો.`
                  : `${GUJ_COLLEGE_STATS.totalListed}+ colleges across ${GUJ_COLLEGE_STATS.categories} categories — engineering, medical, law, management, design, commerce, arts-science, agriculture, ITI and more. Pick a category to browse.`}
              </p>
              <Link
                to="/find-college"
                className="mt-3 inline-flex items-center gap-1.5 text-xs rounded-full border border-primary/40 bg-primary/5 text-primary px-3 py-1.5 hover:bg-primary/10 transition"
              >
                <SearchIcon className="h-3.5 w-3.5" />
                {lang === "gu"
                  ? "શોધી રહ્યા છો? — Find Your College ખોલો (ગુજરાત + ભારત)"
                  : "Looking for a specific college? Open Find Your College (Gujarat + India)"}
              </Link>
            </div>
            <div className="text-xs text-muted-foreground">
              {lang === "gu" ? "દર્શાવેલ" : "Showing"}: <span className="font-medium text-foreground">{totalShown}</span> /{" "}
              {GUJ_COLLEGE_STATS.totalListed}
            </div>
          </div>

          {/* Category quick chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCat("all")}
              className={`text-xs rounded-full border px-3 py-1.5 transition ${
                activeCat === "all"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border hover:border-primary/40"
              }`}
            >
              {lang === "gu" ? "બધી" : "All"} ({GUJ_COLLEGE_STATS.totalListed})
            </button>
            {GUJ_COLLEGES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                className={`text-xs rounded-full border px-3 py-1.5 transition ${
                  activeCat === c.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border hover:border-primary/40"
                }`}
              >
                {c.emoji} {lang === "gu" ? c.titleGu : c.title} ({c.colleges.length})
              </button>
            ))}
          </div>

          {/* Categories */}
          <div className="mt-8 space-y-10">
            {filteredCategories.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
                {lang === "gu" ? "કોઈ પરિણામ મળ્યું નથી." : "No results found."}
              </div>
            ) : (
              filteredCategories.map((cat) => <CategorySection key={cat.id} cat={cat} lang={lang} />)
            )}
          </div>
        </div>
      </section>

      {/* ENTRANCE EXAMS */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <h2 className="font-serif text-2xl md:text-3xl">
          {lang === "gu" ? "મુખ્ય પ્રવેશ પરીક્ષાઓ" : "Major Entrance Exams"}
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          {lang === "gu"
            ? "ગુજરાત અને રાષ્ટ્રીય સ્તરની પરીક્ષાઓ — તારીખો અને સત્તાવાર વેબસાઇટ સાથે."
            : "Gujarat and national-level exams — with dates and official websites."}
        </p>
        <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {ENTRANCE_EXAMS.map((e) => (
            <div key={e.code} className="rounded-xl border border-border bg-card p-4">
              <div className="font-medium text-foreground">{e.code}</div>
              <div className="text-xs text-muted-foreground mt-1">{e.for}</div>
              <div className="text-xs text-muted-foreground mt-2 inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {lang === "gu" ? "ક્યારે" : "When"}: {e.when}
              </div>
              <a
                href={`https://${e.website}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-primary mt-2 inline-flex items-center gap-1 hover:underline break-all"
              >
                <ExternalLink className="h-3 w-3" />
                {e.website}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* GUJARAT-SPECIFIC RESOURCES */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-14">
        <h2 className="font-serif text-2xl md:text-3xl">
          {lang === "gu" ? "ગુજરાત — શિષ્યવૃત્તિ અને કાઉન્સેલિંગ" : "Gujarat — Scholarships & Counselling"}
        </h2>
        <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          <ResourceCard
            title={lang === "gu" ? "MYSY શિષ્યવૃત્તિ" : "MYSY Scholarship"}
            sub={
              lang === "gu"
                ? "મુખ્યમંત્રી યુવા સ્વાવલંબન યોજના — ટ્યુશન ફી + હોસ્ટેલ + પુસ્તકો માટે ₹2L/વર્ષ સુધી."
                : "Mukhyamantri Yuva Swavalamban Yojana — up to ₹2L/year for tuition + hostel + books."
            }
            url="mysy.guj.nic.in"
          />
          <ResourceCard
            title="ACPC (Engineering / Pharmacy)"
            sub={
              lang === "gu"
                ? "GUJCET પછી રાજ્ય કોલેજ પ્રવેશ કાઉન્સેલિંગ."
                : "Post-GUJCET state college admission counselling."
            }
            url="jacpcldce.ac.in"
          />
          <ResourceCard
            title={lang === "gu" ? "ACPC મેડિકલ" : "ACPC Medical"}
            sub={
              lang === "gu"
                ? "MBBS, BDS, AYUSH, B.V.Sc, BPT માટે NEET-આધારિત રાજ્ય કાઉન્સેલિંગ."
                : "NEET-based state counselling for MBBS, BDS, AYUSH, B.V.Sc, BPT."
            }
            url="medadmgujarat.org"
          />
          <ResourceCard
            title="ACPDC (Diploma)"
            sub={
              lang === "gu"
                ? "ધોરણ 10 પછી 3-વર્ષીય ડિપ્લોમા એન્જિનિયરિંગ માટે કાઉન્સેલિંગ."
                : "3-yr Diploma Engineering admission after Class 10."
            }
            url="gujacpc.admissions.nic.in"
          />
          <ResourceCard
            title={lang === "gu" ? "ડિજિટલ ગુજરાત શિષ્યવૃત્તિઓ" : "Digital Gujarat Scholarships"}
            sub={
              lang === "gu"
                ? "SC/ST/OBC/EBC/લઘુમતી સમુદાયો માટે પોસ્ટ-મેટ્રિક શિષ્યવૃત્તિઓ."
                : "Post-matric scholarships for SC/ST/OBC/EBC/Minority students."
            }
            url="digitalgujarat.gov.in"
          />
          <ResourceCard
            title={lang === "gu" ? "Kaushalya — સ્કિલ યુનિવર્સિટી" : "Kaushalya — Skill University"}
            sub={
              lang === "gu"
                ? "ભારતની પ્રથમ રાજ્ય કૌશલ્ય યુનિવર્સિટી; ITI, Diploma અને ડિગ્રી માર્ગો."
                : "India's first state skill university; ITI, Diploma & degree pathways."
            }
            url="kaushalyauniversity.gujarat.gov.in"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-14">
        <div className="rounded-2xl border border-border bg-primary/5 p-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-serif text-xl">
              {lang === "gu" ? "હજી અનિશ્ચિત છો કે કયો પ્રવાહ પસંદ કરવો?" : "Still unsure which stream to pick?"}
            </div>
            <div className="text-sm text-muted-foreground mt-1 max-w-2xl">
              {lang === "gu"
                ? "મફત મનો-યોગ્યતા ટેસ્ટ આપો અને 20-પાનાનો વ્યક્તિગત રિપોર્ટ મેળવો — તમારા RIASEC, અભિરુચિ અને બહુવિધ બુદ્ધિના આધારે ગુજરાત-કેન્દ્રિત ભલામણો."
                : "Take the free psychometric test and get a 20-page personalised report — Gujarat-focused recommendations based on your RIASEC, aptitude and multiple-intelligences profile."}
            </div>
          </div>
          <Link
            to="/test"
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-medium hover:opacity-90"
          >
            {lang === "gu" ? "ટેસ્ટ આપો" : "Take the test"}
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}

/* ---------------------------- Subcomponents ---------------------------- */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card px-3 py-2.5">
      <div className="text-lg md:text-xl font-serif text-foreground">{value}</div>
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}

function ResourceCard({ title, sub, url }: { title: string; sub: string; url: string }) {
  return (
    <a
      href={`https://${url}`}
      target="_blank"
      rel="noreferrer"
      className="block rounded-xl border border-border bg-card p-4 hover:border-primary/40 hover:shadow-[var(--shadow-card)] transition-all"
    >
      <div className="font-medium text-foreground">{title}</div>
      <div className="text-xs text-muted-foreground mt-1">{sub}</div>
      <div className="text-xs text-primary mt-2 inline-flex items-center gap-1 hover:underline">
        <ExternalLink className="h-3 w-3" />
        {url}
      </div>
    </a>
  );
}

function CategorySection({ cat, lang }: { cat: CategoryGroup; lang: "en" | "gu" }) {
  return (
    <div>
      <div className="flex items-start justify-between flex-wrap gap-3 border-b border-border pb-3">
        <div>
          <h3 className="font-serif text-xl md:text-2xl flex items-center gap-2">
            <span className="text-2xl">{cat.emoji}</span>
            {lang === "gu" ? cat.titleGu : cat.title}
            <span className="text-xs text-muted-foreground font-sans font-normal">({cat.colleges.length})</span>
          </h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-3xl">
            {lang === "gu" ? cat.descriptionGu : cat.description}
          </p>
          {cat.counselling && (
            <div className="text-xs text-primary mt-1.5 inline-flex items-center gap-1">
              <GraduationCap className="h-3 w-3" />
              {lang === "gu" ? "કાઉન્સેલિંગ" : "Counselling"}: {cat.counselling}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {cat.colleges.map((c) => (
          <article
            key={c.name + c.city}
            className="rounded-xl border border-border bg-card p-4 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="font-medium text-foreground leading-snug">{c.name}</div>
              <span
                className={`text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded shrink-0 ${typeBadge(c.type)}`}
              >
                {c.type}
              </span>
            </div>
            <div className="text-xs text-muted-foreground mt-1.5 inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {c.city}
              {c.established ? ` • Est. ${c.established}` : ""}
            </div>
            <div className="text-xs mt-2">
              <span className="text-muted-foreground">{lang === "gu" ? "કોર્સ" : "Courses"}: </span>
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
                className="mt-3 text-xs text-primary inline-flex items-center gap-1 hover:underline"
              >
                <ExternalLink className="h-3 w-3" />
                {c.website}
              </a>
            )}
          </article>
        ))}
      </div>

      {/* Stream cross-link */}
      {cat.streams.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
            <Building2 className="h-3 w-3" />
            {lang === "gu" ? "સંબંધિત પ્રવાહ" : "Related streams"}:
          </span>
          {cat.streams.map((sid) => {
            const s = STREAMS.find((x) => x.id === sid);
            if (!s) return null;
            return (
              <Link
                key={sid}
                to="/career/$stream"
                params={{ stream: s.id }}
                className="text-xs rounded-full border border-border bg-card px-2.5 py-0.5 hover:border-primary/40 hover:text-primary"
              >
                {s.emoji} {lang === "gu" ? s.nameGu : s.name}
              </Link>
            );
          })}
        </div>
      )}
    </div>
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
