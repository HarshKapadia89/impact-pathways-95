import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  HANDBOOK_SUMMARY_BY_SLUG,
  loadHandbookStream,
  streamEmoji,
} from "@/lib/handbookData";
import {
  buildProfessionProfile,
  loadOverlays,
  professionSlug,
  type ProfessionProfile,
} from "@/lib/professionData";
import { getOverview } from "@/lib/handbookOverviews";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  ExternalLink,
  Globe,
  GraduationCap,
  ListChecks,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  FileCheck,
  Info,
  Brain,
} from "lucide-react";

const SECTIONS = [
  { id: "summary", label: "Summary", icon: Info },
  { id: "opportunities", label: "Opportunities", icon: Briefcase },
  { id: "path", label: "Career Path", icon: GraduationCap },
  { id: "facts", label: "Important Facts", icon: ListChecks },
  { id: "institutes", label: "Leading Institutes", icon: Building2 },
  { id: "abroad", label: "Institutes Abroad", icon: Globe },
  { id: "exams", label: "Entrance Exams", icon: FileCheck },
  { id: "work", label: "Work Description", icon: Sparkles },
  { id: "proscons", label: "Pros & Cons", icon: ThumbsUp },
] as const;

const BLOCK = [
  "var(--brand-1)",
  "var(--brand-2)",
  "var(--brand-3)",
  "var(--brand-4)",
  "var(--brand-5)",
  "var(--brand-6)",
];

export const Route = createFileRoute("/handbook/$slug/$profession")({
  loader: async ({ params }): Promise<{ profile: ProfessionProfile; siblings: string[] }> => {
    if (!HANDBOOK_SUMMARY_BY_SLUG[params.slug]) throw notFound();
    const stream = await loadHandbookStream(params.slug);
    if (!stream) throw notFound();
    const name = stream.professions.find((p) => professionSlug(p) === params.profession);
    if (!name) throw notFound();
    const overlays = await loadOverlays(params.slug);
    return {
      profile: buildProfessionProfile(stream, params.slug, name, overlays[params.profession]),
      siblings: stream.professions,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Profession not found | HBK Careers" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.profile;
    const title = `${p.name} — Career Path, Institutes & Entrance Exams | HBK Careers`;
    const description = `How to become a ${p.name} in India: study route after Class 10, entrance exams, leading Indian and overseas institutes, work description and pros & cons.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: `${p.name} — Complete Career Profile` },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: ProfessionPage,
  pendingComponent: () => (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center text-sm text-muted-foreground">
      Loading profession profile…
    </div>
  ),
  notFoundComponent: () => (
    <>
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="display-caps text-3xl">Profession not found</h1>
        <Link to="/handbook" className="mt-4 inline-block font-bold uppercase text-sm underline">
          ← Back to the India handbook
        </Link>
      </div>
    </>
  ),
});

function ProfessionPage() {
  const { profile, siblings } = Route.useLoaderData();
  const { slug } = Route.useParams();
  const overview = getOverview(slug);
  const [jump, setJump] = useState("");

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--ink)] text-[var(--cream)]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
          <Link
            to="/handbook/$slug"
            params={{ slug }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide border-2 border-[var(--cream)] px-3 py-1.5 hover:bg-[oklch(0.96_0.022_95_/_12%)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {profile.streamName}
          </Link>
          <div className="mt-5 flex items-start gap-4">
            <span className="text-4xl md:text-5xl">{streamEmoji(profile.streamName)}</span>
            <div>
              <h1 className="display-caps text-4xl md:text-6xl">{profile.name}</h1>
              <p className="mt-3 max-w-3xl text-sm md:text-base text-[oklch(0.96_0.022_95_/_75%)]">
                {overview?.tagline}
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-wide">
            {[
              `${profile.institutes.length} institutes`,
              `${profile.exams.length} entrance exams`,
              `${profile.abroad.length} options abroad`,
            ].map((chip, i) => (
              <span
                key={chip}
                className="px-3 py-1 border-2 border-[var(--cream)]"
                style={{ background: BLOCK[i % BLOCK.length], color: "oklch(0.16 0.01 270)" }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
        <div className="bar-stripes h-2 w-full" />
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid lg:grid-cols-[220px_1fr] gap-8">
        {/* Sticky section rail */}
        <aside className="lg:sticky lg:top-40 self-start">
          <nav className="border-2 border-[var(--ink)] bg-card">
            {SECTIONS.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-2 px-3 py-2.5 text-xs font-bold uppercase tracking-wide border-b-2 border-[var(--ink)] last:border-b-0 hover:bg-secondary"
              >
                <s.icon className="h-3.5 w-3.5" style={{ color: BLOCK[i % BLOCK.length] }} />
                {s.label}
              </a>
            ))}
          </nav>

          {/* Jump to another profession */}
          <div className="mt-4 border-2 border-[var(--ink)] bg-card p-3">
            <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">
              Another profession
            </label>
            <select
              value={jump}
              onChange={(e) => {
                const v = e.target.value;
                setJump(v);
                if (v) window.location.href = `/handbook/${slug}/${v}`;
              }}
              className="w-full border-2 border-[var(--ink)] bg-background px-2 py-2 text-xs"
            >
              <option value="">Choose…</option>
              {siblings.map((p) => (
                <option key={p} value={professionSlug(p)}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </aside>

        <div className="space-y-10">
          <Section id="summary" title="Summary" color={BLOCK[0]}>
            <p className="text-sm leading-relaxed text-foreground/85">{profile.summary}</p>
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              <Panel title="Core skills">
                <BulletList items={profile.skills} />
              </Panel>
              <Panel title="Where you can work">
                <BulletList items={profile.sectors} />
              </Panel>
            </div>
          </Section>

          <Section id="opportunities" title="Professional Opportunities" color={BLOCK[1]}>
            <div className="grid sm:grid-cols-2 gap-3">
              {profile.sectors.map((s, i) => (
                <div
                  key={s}
                  className="border-2 border-[var(--ink)] bg-card p-4 text-sm font-semibold"
                >
                  <span
                    className="inline-block h-3 w-8 mb-2"
                    style={{ background: BLOCK[i % BLOCK.length] }}
                    aria-hidden
                  />
                  <div>{s}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="path" title="Career Path" color={BLOCK[2]}>
            <BlockTable
              head={["Stage", "What you study", "Duration"]}
              rows={profile.path.map((r) => [r.stage, r.options, r.duration])}
            />
          </Section>

          <Section id="facts" title="Important Facts" color={BLOCK[3]}>
            <BulletList items={profile.facts} />
          </Section>

          <Section id="institutes" title="Leading Institutes in India" color={BLOCK[4]}>
            <BlockTable
              head={["#", "Institute", "Entrance / Category", "Website"]}
              rows={profile.institutes.map((i) => [
                String(i.rank),
                i.name,
                i.entrance ?? i.category ?? "—",
                i.website ?? "",
              ])}
              linkColumn={3}
            />
          </Section>

          <Section id="abroad" title="Institutions Abroad" color={BLOCK[5]}>
            <BlockTable
              head={["Institute", "Country", "Website"]}
              rows={profile.abroad.map((a) => [a.name, a.country, a.website])}
              linkColumn={2}
            />
          </Section>

          <Section id="exams" title="Entrance Exams" color={BLOCK[0]}>
            <BlockTable
              head={["Exam", "Full name", "What it admits you to", "Website"]}
              rows={profile.exams.map((e) => [
                e.code,
                e.fullName ?? "—",
                e.purpose,
                e.website ?? "",
              ])}
              linkColumn={3}
            />
          </Section>

          <Section id="work" title="Work Description" color={BLOCK[1]}>
            <ol className="space-y-3">
              {profile.duties.map((d, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span
                    className="shrink-0 w-7 h-7 flex items-center justify-center border-2 border-[var(--ink)] font-display text-xs"
                    style={{ background: BLOCK[i % BLOCK.length], color: "oklch(0.16 0.01 270)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="pt-1 text-foreground/85">{d}</span>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="proscons" title="Pros & Cons" color={BLOCK[2]}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border-2 border-[var(--ink)] bg-card p-4">
                <div className="flex items-center gap-2 font-display text-sm mb-3">
                  <ThumbsUp className="h-4 w-4" style={{ color: "var(--brand-3)" }} /> Pros
                </div>
                <BulletList items={profile.pros} />
              </div>
              <div className="border-2 border-[var(--ink)] bg-card p-4">
                <div className="flex items-center gap-2 font-display text-sm mb-3">
                  <ThumbsDown className="h-4 w-4" style={{ color: "var(--brand-4)" }} /> Cons
                </div>
                <BulletList items={profile.cons} />
              </div>
            </div>
          </Section>

          {/* Fit check CTA */}
          <section className="border-2 border-[var(--ink)] shadow-[6px_6px_0_var(--ink)] p-6 flex flex-wrap items-center gap-4 justify-between" style={{ background: "var(--brand-5)" }}>
            <div className="text-[oklch(0.16_0.01_270)]">
              <div className="font-display text-xl">Are you fit for this career?</div>
              <p className="text-sm mt-1">
                Take the free HBK psychometric test and see how {profile.name} matches your interests and aptitude.
              </p>
            </div>
            <Link
              to="/test"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold uppercase tracking-wide border-2 border-[var(--ink)] bg-[var(--ink)] text-[var(--cream)]"
            >
              <Brain className="h-4 w-4" /> Take the free test
            </Link>
          </section>

          {overview && (
            <div className="border-2 border-dashed border-[var(--ink)] p-4">
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Sources
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                © HBK Careers. Compiled in-house from official regulators, exam bodies and
                institute websites. Exam and institute records on this page are the same records
                used across the HBK handbook and exams pages.
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                {overview.sources.map((s) => (
                  <a
                    key={s.url}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs underline inline-flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Section({
  id,
  title,
  color,
  children,
}: {
  id: string;
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-44">
      <h2 className="display-caps text-2xl md:text-3xl mb-4">
        <span className="inline-block h-4 w-10 mr-3 align-middle" style={{ background: color }} aria-hidden />
        {title}
      </h2>
      {children}
    </section>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-2 border-[var(--ink)] bg-card p-4">
      <div className="font-display text-sm mb-3">{title}</div>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm text-foreground/85">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-1.5 h-2 w-2 shrink-0" style={{ background: BLOCK[i % BLOCK.length] }} aria-hidden />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function BlockTable({
  head,
  rows,
  linkColumn,
}: {
  head: string[];
  rows: string[][];
  linkColumn?: number;
}) {
  return (
    <div className="overflow-x-auto border-2 border-[var(--ink)] bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[var(--ink)] text-[var(--cream)]">
            {head.map((h) => (
              <th key={h} className="text-left px-3 py-2 font-display text-xs uppercase tracking-wide">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t-2 border-[var(--ink)] align-top">
              {r.map((cell, j) => (
                <td key={j} className="px-3 py-2">
                  {linkColumn === j && cell ? (
                    <a
                      href={cell.startsWith("http") ? cell : `https://${cell}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 underline break-all"
                    >
                      <ExternalLink className="h-3 w-3 shrink-0" />
                      {cell.replace(/^https?:\/\//, "")}
                    </a>
                  ) : (
                    cell || "—"
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
