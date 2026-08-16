import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { PublicLayout } from "@/components/PublicLayout";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Search, MapPin, Globe, GraduationCap, Building2, Filter } from "lucide-react";

type College = Tables<"colleges">;

export const Route = createFileRoute("/colleges")({
  head: () => ({
    meta: [
      { title: "Gujarat Colleges Directory — IIT, IIM, NID, GNLU, MSU & more | HBK Careers" },
      {
        name: "description",
        content:
          "Browse and search 500+ colleges across Gujarat — engineering, medical, commerce, design, law, agriculture, vocational. Filter by stream, district and type.",
      },
      { property: "og:title", content: "Gujarat Colleges Directory — HBK Careers" },
      { property: "og:description", content: "Search 500+ colleges across all streams." },
    ],
  }),
  component: CollegesPage,
});

const STREAM_OPTIONS = [
  "engineering",
  "medical",
  "science",
  "commerce",
  "humanities",
  "management",
  "law",
  "design",
  "vocational",
] as const;

function CollegesPage() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith("gu") ? "gu" : "en") as "en" | "gu";
  const [data, setData] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [stream, setStream] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [type, setType] = useState<string>("");

  useEffect(() => {
    (async () => {
      const { data: rows } = await supabase
        .from("colleges")
        .select("*")
        .eq("active", true)
        .order("name");
      setData(rows ?? []);
      setLoading(false);
    })();
  }, []);

  const districts = useMemo(
    () => Array.from(new Set(data.map((c) => c.district).filter(Boolean) as string[])).sort(),
    [data]
  );
  const types = useMemo(
    () => Array.from(new Set(data.map((c) => c.type).filter(Boolean) as string[])).sort(),
    [data]
  );

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return data.filter((c) => {
      if (ql && !`${c.name} ${c.city ?? ""} ${c.district ?? ""}`.toLowerCase().includes(ql))
        return false;
      if (stream && !(c.streams ?? []).includes(stream)) return false;
      if (district && c.district !== district) return false;
      if (type && c.type !== type) return false;
      return true;
    });
  }, [data, q, stream, district, type]);

  return (
    <PublicLayout>
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
          <h1 className="font-serif text-3xl md:text-5xl">
            {lang === "gu" ? "ગુજરાત કોલેજ ડિરેક્ટરી" : "Gujarat Colleges Directory"}
          </h1>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            {lang === "gu"
              ? "પ્રવાહ, જિલ્લો અને પ્રકાર પ્રમાણે શોધો. ફી, હોસ્ટેલ, સ્કોલરશિપ અને પ્રવેશ પરીક્ષાઓ સહિત."
              : "Search by stream, district and type. Includes fees, hostel, scholarships and entrance exams."}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="rounded-2xl border border-border bg-card p-4 grid md:grid-cols-12 gap-3">
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={lang === "gu" ? "કોલેજ, શહેર શોધો…" : "Search college or city…"}
              className="w-full pl-9 pr-3 py-2.5 rounded-md border border-input bg-background text-sm"
            />
          </div>
          <select
            value={stream}
            onChange={(e) => setStream(e.target.value)}
            className="md:col-span-3 px-3 py-2.5 rounded-md border border-input bg-background text-sm"
          >
            <option value="">{lang === "gu" ? "બધા પ્રવાહો" : "All streams"}</option>
            {STREAM_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="md:col-span-2 px-3 py-2.5 rounded-md border border-input bg-background text-sm"
          >
            <option value="">{lang === "gu" ? "બધા જિલ્લા" : "All districts"}</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="md:col-span-2 px-3 py-2.5 rounded-md border border-input bg-background text-sm"
          >
            <option value="">{lang === "gu" ? "પ્રકાર" : "Type"}</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3 text-xs text-muted-foreground inline-flex items-center gap-1">
          <Filter className="h-3 w-3" />
          {loading
            ? lang === "gu"
              ? "લોડ થઈ રહ્યું છે…"
              : "Loading…"
            : `${filtered.length} ${lang === "gu" ? "કોલેજો" : "colleges"}`}
        </div>

        {!loading && data.length === 0 && (
          <div className="mt-6 rounded-xl border border-dashed border-border bg-card/50 p-8 text-center">
            <Building2 className="h-8 w-8 text-muted-foreground mx-auto" />
            <p className="mt-2 text-sm text-muted-foreground">
              {lang === "gu"
                ? "હજી કોલેજો ઉમેરાઈ નથી. એડમિન શરૂઆતનો ડેટા આયાત કરી શકે છે."
                : "No colleges yet. An admin can seed the directory or import an Excel sheet."}
            </p>
            <Link to="/admin/colleges" className="mt-3 inline-block text-sm text-primary hover:underline">
              {lang === "gu" ? "એડમિન પેજ" : "Open admin page"} →
            </Link>
          </div>
        )}

        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <article key={c.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-serif text-base leading-snug">{c.name}</h3>
                {c.type && (
                  <span className="text-[10px] rounded-full bg-secondary px-2 py-0.5 shrink-0">
                    {c.type}
                  </span>
                )}
              </div>
              <div className="mt-2 text-xs text-muted-foreground inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {[c.city, c.district].filter(Boolean).join(", ")}
              </div>
              {c.affiliation && (
                <div className="mt-1 text-xs text-muted-foreground inline-flex items-center gap-1">
                  <GraduationCap className="h-3 w-3" />
                  {c.affiliation}
                  {c.established ? ` · est. ${c.established}` : ""}
                </div>
              )}
              {(c.streams ?? []).length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {(c.streams ?? []).slice(0, 4).map((s) => (
                    <span key={s} className="text-[10px] rounded-md bg-primary/10 text-primary px-1.5 py-0.5">
                      {s}
                    </span>
                  ))}
                </div>
              )}
              {(c.entrance_exams ?? []).length > 0 && (
                <div className="mt-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground/80">Exams:</span>{" "}
                  {(c.entrance_exams ?? []).slice(0, 4).join(", ")}
                </div>
              )}
              {c.fees_range && (
                <div className="mt-1 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground/80">Fees:</span> {c.fees_range}
                </div>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                {c.hostel && <span>🏠 Hostel</span>}
                {c.scholarships && <span>🎓 Scholarships</span>}
                {c.website && (
                  <a
                    href={`https://${c.website.replace(/^https?:\/\//, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary inline-flex items-center gap-1 hover:underline"
                  >
                    <Globe className="h-3 w-3" /> {c.website}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
