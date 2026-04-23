import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  HANDBOOK_BY_SLUG,
  type HandbookStream,
  streamEmoji,
} from "@/lib/handbookData";
import { ArrowLeft, Briefcase, FileText, Building2, ExternalLink } from "lucide-react";

type TabKey = "professions" | "exams" | "institutes";

export const Route = createFileRoute("/handbook/$slug")({
  loader: ({ params }): { stream: HandbookStream } => {
    const stream = HANDBOOK_BY_SLUG[params.slug];
    if (!stream) throw notFound();
    return { stream };
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            {
              title: `${loaderData.stream.stream} — Professions, Exams & Top Institutes | Disha`,
            },
            {
              name: "description",
              content: `Detailed list of ${loaderData.stream.professions.length} professions, ${loaderData.stream.exams.length} entrance exams and ${loaderData.stream.institutes.length} top institutes for ${loaderData.stream.stream}.`,
            },
            { property: "og:title", content: `${loaderData.stream.stream} — Career Handbook` },
            {
              property: "og:description",
              content: `Professions, entrance exams and top institutes for ${loaderData.stream.stream}.`,
            },
          ],
        }
      : {},
  component: StreamDetail,
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 className="font-serif text-3xl">Stream not found</h1>
      <Link to="/handbook" className="text-primary mt-4 inline-block">
        ← Back to handbook
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <p>Something went wrong: {error.message}</p>
      <Link to="/handbook" className="text-primary mt-4 inline-block">
        ← Back
      </Link>
    </div>
  ),
});

function StreamDetail() {
  const { stream } = Route.useLoaderData() as { stream: HandbookStream };
  const { i18n } = useTranslation();
  const lang = (i18n.language?.startsWith("gu") ? "gu" : "en") as "en" | "gu";
  const [tab, setTab] = useState<TabKey>("professions");
  const [query, setQuery] = useState("");

  const tabs: Array<{ key: TabKey; label: { en: string; gu: string }; icon: typeof Briefcase; count: number }> = [
    {
      key: "professions",
      label: { en: "Professions", gu: "વ્યવસાયો" },
      icon: Briefcase,
      count: stream.professions.length,
    },
    {
      key: "exams",
      label: { en: "Entrance Exams", gu: "પ્રવેશ પરીક્ષાઓ" },
      icon: FileText,
      count: stream.exams.length,
    },
    {
      key: "institutes",
      label: { en: "Top Institutes", gu: "ટોચની સંસ્થાઓ" },
      icon: Building2,
      count: stream.institutes.length,
    },
  ];

  const q = query.trim().toLowerCase();

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <Link
            to="/handbook"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {lang === "gu" ? "બધા પ્રવાહો" : "All streams"}
          </Link>
          <div className="mt-3 flex items-start gap-4">
            <div className="text-5xl">{streamEmoji(stream.stream)}</div>
            <div>
              <h1 className="font-serif text-2xl md:text-4xl">{stream.stream}</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {stream.professions.length} {lang === "gu" ? "વ્યવસાયો" : "professions"} ·{" "}
                {stream.exams.length} {lang === "gu" ? "પરીક્ષાઓ" : "exams"} ·{" "}
                {stream.institutes.length} {lang === "gu" ? "સંસ્થાઓ" : "institutes"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-border">
          <div className="flex flex-wrap gap-1">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => {
                    setTab(t.key);
                    setQuery("");
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-t-md border-b-2 transition-colors ${
                    active
                      ? "border-primary text-primary font-medium bg-primary/5"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {t.label[lang]}
                  <span
                    className={`ml-1 text-xs px-1.5 py-0.5 rounded ${
                      active ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {t.count}
                  </span>
                </button>
              );
            })}
          </div>
          <input
            type="search"
            placeholder={lang === "gu" ? "શોધો…" : "Search…"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="md:w-64 px-3 py-2 text-sm rounded-md border border-border bg-card focus:outline-none focus:border-primary"
          />
        </div>

        <div className="py-6">
          {tab === "professions" && (
            <ProfessionsList items={stream.professions} q={q} />
          )}
          {tab === "exams" && <ExamsList items={stream.exams} q={q} lang={lang} />}
          {tab === "institutes" && <InstitutesList items={stream.institutes} q={q} lang={lang} />}
        </div>
      </section>
    </>
  );
}

function ProfessionsList({ items, q }: { items: string[]; q: string }) {
  const filtered = q ? items.filter((p) => p.toLowerCase().includes(q)) : items;
  if (!filtered.length)
    return <div className="text-sm text-muted-foreground py-8 text-center">No matches.</div>;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {filtered.map((p, i) => (
        <div
          key={`${p}-${i}`}
          className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm hover:border-primary/40 transition-colors"
        >
          {p}
        </div>
      ))}
    </div>
  );
}

function ExamsList({
  items,
  q,
  lang,
}: {
  items: import("@/lib/handbookData").HandbookExam[];
  q: string;
  lang: "en" | "gu";
}) {
  const filtered = q
    ? items.filter(
        (e) =>
          e.code.toLowerCase().includes(q) ||
          (e.fullName ?? "").toLowerCase().includes(q) ||
          e.purpose.toLowerCase().includes(q),
      )
    : items;
  if (!filtered.length)
    return <div className="text-sm text-muted-foreground py-8 text-center">No matches.</div>;
  return (
    <div className="grid md:grid-cols-2 gap-3">
      {filtered.map((e, i) => (
        <div key={`${e.code}-${i}`} className="rounded-xl border border-border bg-card p-4">
          <div className="font-medium text-foreground">{e.code}</div>
          {e.fullName && (
            <div className="text-xs text-muted-foreground italic mt-0.5">{e.fullName}</div>
          )}
          <div className="text-xs text-muted-foreground mt-2 leading-relaxed">{e.purpose}</div>
          {e.website && (
            <a
              href={`https://${e.website.replace(/^https?:\/\//, "")}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-primary mt-2 inline-flex items-center gap-1 hover:underline break-all"
            >
              <ExternalLink className="h-3 w-3 shrink-0" />
              {e.website}
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

function InstitutesList({
  items,
  q,
  lang,
}: {
  items: import("@/lib/handbookData").HandbookInstitute[];
  q: string;
  lang: "en" | "gu";
}) {
  const filtered = q
    ? items.filter(
        (it) =>
          it.name.toLowerCase().includes(q) ||
          (it.entrance ?? "").toLowerCase().includes(q) ||
          (it.category ?? "").toLowerCase().includes(q),
      )
    : items;
  if (!filtered.length)
    return <div className="text-sm text-muted-foreground py-8 text-center">No matches.</div>;

  // Group by category if any present
  const groups = new Map<string, typeof filtered>();
  for (const it of filtered) {
    const key = it.category && it.category.trim() ? it.category : "";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(it);
  }

  return (
    <div className="space-y-8">
      {Array.from(groups.entries()).map(([cat, list]) => (
        <div key={cat || "default"}>
          {cat && (
            <h3 className="font-serif text-lg mb-3 text-foreground/90">{cat}</h3>
          )}
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="text-left px-4 py-2.5 w-14">#</th>
                  <th className="text-left px-4 py-2.5">
                    {lang === "gu" ? "સંસ્થા" : "Institute"}
                  </th>
                  <th className="text-left px-4 py-2.5 hidden md:table-cell">
                    {lang === "gu" ? "પ્રવેશ" : "Entrance"}
                  </th>
                  <th className="text-left px-4 py-2.5 w-12"></th>
                </tr>
              </thead>
              <tbody>
                {list.map((it, i) => (
                  <tr
                    key={`${it.rank}-${it.name}-${i}`}
                    className="border-t border-border hover:bg-muted/30"
                  >
                    <td className="px-4 py-2.5 text-muted-foreground tabular-nums">{it.rank}</td>
                    <td className="px-4 py-2.5">{it.name}</td>
                    <td className="px-4 py-2.5 text-muted-foreground hidden md:table-cell">
                      {it.entrance || "—"}
                    </td>
                    <td className="px-4 py-2.5">
                      {it.website && (
                        <a
                          href={`https://${it.website.replace(/^https?:\/\//, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary hover:underline inline-flex items-center"
                          title={it.website}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
