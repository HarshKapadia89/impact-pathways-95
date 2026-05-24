import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { supabase } from "@/integrations/supabase/client";
import { STREAM_BY_ID, type StreamId } from "@/lib/careerData";
import {
  getCurrentToken,
  getCurrentStudentName,
  listSavedCareers,
  listSavedColleges,
  listChecklist,
  listRoadmap,
  setRoadmap,
  addChecklistItem,
  toggleChecklistItem,
  removeChecklistItem,
  toggleSavedCareer,
  toggleSavedCollege,
  type ChecklistItem,
  type RoadmapStep,
  type SavedCareer,
  type SavedCollege,
} from "@/lib/dashboardStore";
import {
  Brain,
  FileText,
  Star,
  School,
  Map as MapIcon,
  ListChecks,
  Trash2,
  Plus,
  Sparkles,
  ChevronRight,
  Download,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "My Dashboard — HBK Careers" },
      { name: "description", content: "Your saved careers, colleges, roadmap and 90-day checklist." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: DashboardPage,
});

type Tab = "report" | "careers" | "colleges" | "roadmap" | "checklist";

interface SubmissionRow {
  id: string;
  student_name: string | null;
  grade: string | null;
  school_name: string | null;
  riasec_top: string[] | null;
  mi_top: string[] | null;
  recommended_streams: string[] | null;
  recommended_careers: string[] | null;
  taken_at: string | null;
  report_token: string | null;
}

function DashboardPage() {
  const [token, setToken] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [row, setRow] = useState<SubmissionRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("report");
  const [careers, setCareers] = useState<SavedCareer[]>([]);
  const [colleges, setColleges] = useState<SavedCollege[]>([]);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [roadmap, setRoadmapState] = useState<RoadmapStep[]>([]);

  useEffect(() => {
    const t = getCurrentToken();
    setToken(t);
    setName(getCurrentStudentName());
    if (!t) {
      setLoading(false);
      return;
    }
    setCareers(listSavedCareers(t));
    setColleges(listSavedColleges(t));
    setChecklist(listChecklist(t));
    setRoadmapState(listRoadmap(t));
    (async () => {
      const { data } = await supabase
        .from("psychometric_submissions")
        .select(
          "id,student_name,grade,school_name,riasec_top,mi_top,recommended_streams,recommended_careers,taken_at,report_token",
        )
        .eq("report_token", t)
        .maybeSingle();
      if (data) setRow(data as SubmissionRow);
      setLoading(false);
    })();
  }, []);

  // Seed roadmap once based on top recommended stream.
  const topStreamId = useMemo<StreamId | null>(() => {
    if (!row?.recommended_streams?.length) return null;
    const name = row.recommended_streams[0].toLowerCase();
    if (name.includes("pcm")) return "science-pcm";
    if (name.includes("pcb")) return "science-pcb";
    if (name.includes("commerce")) return "commerce";
    if (name.includes("humanities") || name.includes("arts")) return "humanities";
    if (name.includes("vocational")) return "vocational";
    return null;
  }, [row]);

  useEffect(() => {
    if (!token || roadmap.length > 0 || !topStreamId || !row) return;
    const stream = STREAM_BY_ID[topStreamId];
    const path = stream?.paths?.[0];
    if (!path) return;
    const gradeNum = parseInt(row.grade || "10", 10) || 10;
    const yearsTo12 = Math.max(0, 12 - gradeNum);
    const seeded: RoadmapStep[] = [
      { id: "r1", label: `Class ${gradeNum} — strengthen NCERT fundamentals`, yearOffset: 0, done: false },
      { id: "r2", label: `Pick ${stream.name} stream after Class 10`, yearOffset: yearsTo12, done: false },
      { id: "r3", label: `Prepare for: ${(path.entranceExams || []).slice(0, 2).join(", ") || "stream entrance exams"}`, yearOffset: yearsTo12 + 1, done: false },
      { id: "r4", label: `Target: ${path.title}`, yearOffset: yearsTo12 + 2, done: false },
      { id: "r5", label: `Shortlist colleges (e.g. ${(path.topColleges || []).slice(0, 2).join(", ") || "top institutes"})`, yearOffset: yearsTo12 + 2, done: false },
      { id: "r6", label: `First role aligned to ${path.title}`, yearOffset: yearsTo12 + 6, done: false },
    ];
    setRoadmap(token, seeded);
    setRoadmapState(seeded);
  }, [token, roadmap.length, topStreamId, row]);

  // Seed initial checklist
  useEffect(() => {
    if (!token || checklist.length > 0 || !row) return;
    const seeds = [
      "Read sample report end-to-end with a parent",
      "Pick 2 long-form books in your top intelligence area",
      "Try 1 free online course aligned to your top career",
      "Talk to a senior already in your top stream",
      "Bookmark 3 colleges from /find-college",
    ];
    let next: ChecklistItem[] = [];
    seeds.forEach((s) => {
      next = [...next, addChecklistItem(token, s, "ai")];
    });
    setChecklist(listChecklist(token));
  }, [token, checklist.length, row]);

  if (loading) {
    return (
      <PublicLayout>
        <section className="max-w-4xl mx-auto px-4 py-20 text-center text-muted-foreground">
          Loading your dashboard…
        </section>
      </PublicLayout>
    );
  }

  if (!token || !row) {
    return (
      <PublicLayout>
        <section className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="mx-auto h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <h1 className="mt-5 font-serif text-3xl">Your dashboard is waiting</h1>
          <p className="text-sm text-muted-foreground mt-3">
            Take the 20-minute psychometric test to unlock your personalised report,
            shortlists, roadmap and 90-day checklist — all on this device.
          </p>
          <Link
            to="/test"
            className="inline-flex mt-6 items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-medium"
          >
            Take the test <ChevronRight className="h-4 w-4" />
          </Link>
          <p className="text-[11px] text-muted-foreground mt-6">
            Already took the test on another device? Open your shareable report link to restore access.
          </p>
        </section>
      </PublicLayout>
    );
  }

  const studentName = row.student_name || name || "Student";
  const tabs: { id: Tab; label: string; icon: typeof Brain; count?: number }[] = [
    { id: "report", label: "My Report", icon: FileText },
    { id: "careers", label: "Careers", icon: Star, count: careers.length },
    { id: "colleges", label: "Colleges", icon: School, count: colleges.length },
    { id: "roadmap", label: "Roadmap", icon: MapIcon, count: roadmap.length },
    { id: "checklist", label: "Checklist", icon: ListChecks, count: checklist.filter((c) => !c.done).length },
  ];

  return (
    <PublicLayout>
      <section className="border-b border-border bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
          <div className="text-xs uppercase tracking-widest text-accent flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> My Dashboard
          </div>
          <h1 className="mt-2 font-serif text-3xl md:text-4xl">Welcome back, {studentName.split(" ")[0]}.</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Grade {row.grade || "—"}
            {row.school_name ? ` · ${row.school_name}` : ""}
            {row.taken_at ? ` · report dated ${new Date(row.taken_at).toLocaleDateString()}` : ""}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {tabs.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-sm transition ${
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-card border border-border hover:bg-muted"
                  }`}
                >
                  <t.icon className="h-4 w-4" />
                  {t.label}
                  {typeof t.count === "number" && t.count > 0 && (
                    <span className={`ml-1 text-[10px] rounded-full px-1.5 py-0.5 ${active ? "bg-primary-foreground/20" : "bg-accent/15 text-accent"}`}>
                      {t.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        {tab === "report" && <ReportTab row={row} token={token} />}
        {tab === "careers" && (
          <CareersTab
            items={careers}
            onRemove={(c) => {
              toggleSavedCareer(token, { stream: c.stream, pathKey: c.pathKey, title: c.title });
              setCareers(listSavedCareers(token));
            }}
          />
        )}
        {tab === "colleges" && (
          <CollegesTab
            items={colleges}
            onRemove={(c) => {
              toggleSavedCollege(token, { id: c.id, name: c.name, city: c.city, district: c.district });
              setColleges(listSavedColleges(token));
            }}
          />
        )}
        {tab === "roadmap" && (
          <RoadmapTab
            steps={roadmap}
            onToggle={(id) => {
              const next = roadmap.map((s) => (s.id === id ? { ...s, done: !s.done } : s));
              setRoadmap(token, next);
              setRoadmapState(next);
            }}
          />
        )}
        {tab === "checklist" && (
          <ChecklistTab
            items={checklist}
            onToggle={(id) => {
              toggleChecklistItem(token, id);
              setChecklist(listChecklist(token));
            }}
            onAdd={(label) => {
              addChecklistItem(token, label, "manual");
              setChecklist(listChecklist(token));
            }}
            onRemove={(id) => {
              removeChecklistItem(token, id);
              setChecklist(listChecklist(token));
            }}
          />
        )}
      </section>
    </PublicLayout>
  );
}

function ReportTab({ row, token }: { row: SubmissionRow; token: string }) {
  return (
    <div className="grid md:grid-cols-3 gap-5">
      <div className="md:col-span-2 rounded-2xl border border-border bg-card p-6">
        <div className="text-xs uppercase tracking-widest text-accent">Your latest report</div>
        <h2 className="font-serif text-2xl mt-2">20-page personalised PDF</h2>
        <div className="mt-4 grid sm:grid-cols-3 gap-3">
          <Stat label="Holland code" value={(row.riasec_top || []).join("-") || "—"} />
          <Stat label="Top intelligence" value={row.mi_top?.[0] || "—"} />
          <Stat label="Top stream" value={row.recommended_streams?.[0] || "—"} />
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            to="/r/$token"
            params={{ token }}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90"
          >
            <FileText className="h-4 w-4" /> Open web report
          </Link>
          <Link
            to="/r/$token"
            params={{ token }}
            className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2 rounded-md text-sm hover:bg-muted"
          >
            <Download className="h-4 w-4" /> Download PDF
          </Link>
          <Link
            to="/test"
            className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2 rounded-md text-sm hover:bg-muted"
          >
            Retake test
          </Link>
        </div>
      </div>
      <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6">
        <div className="text-xs uppercase tracking-widest text-accent">Recommended careers</div>
        <ul className="mt-3 space-y-2 text-sm">
          {(row.recommended_careers || []).slice(0, 6).map((c) => (
            <li key={c} className="flex items-start gap-2">
              <Star className="h-3.5 w-3.5 text-accent mt-1 shrink-0" />
              <span>{c}</span>
            </li>
          ))}
          {(!row.recommended_careers || row.recommended_careers.length === 0) && (
            <li className="text-muted-foreground text-xs">No recommendations yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-background border border-border p-4">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="font-serif text-lg mt-1">{value}</div>
    </div>
  );
}

function CareersTab({ items, onRemove }: { items: SavedCareer[]; onRemove: (c: SavedCareer) => void }) {
  if (items.length === 0)
    return (
      <EmptyState
        title="No saved careers yet"
        desc="Browse handbook profiles and tap Save to keep them here."
        href="/handbook"
        cta="Browse careers"
      />
    );
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {items.map((c) => (
        <div key={`${c.stream}/${c.pathKey}`} className="rounded-xl border border-border bg-card p-5 flex items-start gap-3">
          <Star className="h-4 w-4 text-accent mt-1 shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="font-serif text-base">{c.title}</div>
            <div className="text-xs text-muted-foreground mt-0.5 capitalize">{c.stream.replace(/-/g, " ")}</div>
            <div className="mt-3 flex items-center gap-2">
              <Link
                to="/career/$stream/$path"
                params={{ stream: c.stream, path: c.pathKey }}
                className="text-xs font-medium text-primary hover:underline"
              >
                Open guide →
              </Link>
              <button
                onClick={() => onRemove(c)}
                className="text-xs text-muted-foreground hover:text-destructive ml-auto inline-flex items-center gap-1"
              >
                <Trash2 className="h-3 w-3" /> Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CollegesTab({ items, onRemove }: { items: SavedCollege[]; onRemove: (c: SavedCollege) => void }) {
  if (items.length === 0)
    return (
      <EmptyState
        title="No saved colleges yet"
        desc="Save colleges from Find Your College to compare them here."
        href="/find-college"
        cta="Find colleges"
      />
    );
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {items.map((c) => (
        <div key={c.id} className="rounded-xl border border-border bg-card p-5 flex items-start gap-3">
          <School className="h-4 w-4 text-primary mt-1 shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="font-serif text-base truncate">{c.name}</div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {[c.city, c.district].filter(Boolean).join(", ") || "—"}
            </div>
            <button
              onClick={() => onRemove(c)}
              className="mt-3 text-xs text-muted-foreground hover:text-destructive inline-flex items-center gap-1"
            >
              <Trash2 className="h-3 w-3" /> Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function RoadmapTab({ steps, onToggle }: { steps: RoadmapStep[]; onToggle: (id: string) => void }) {
  if (steps.length === 0)
    return <EmptyState title="Roadmap not yet generated" desc="It appears here once your report is loaded." />;
  return (
    <ol className="relative border-l-2 border-border ml-3 space-y-6">
      {steps.map((s) => (
        <li key={s.id} className="ml-6">
          <button
            onClick={() => onToggle(s.id)}
            className={`absolute -left-3 h-5 w-5 rounded-full border-2 flex items-center justify-center transition ${
              s.done ? "bg-primary border-primary" : "bg-background border-border hover:border-primary"
            }`}
            aria-pressed={s.done}
          >
            {s.done && <span className="h-2 w-2 bg-primary-foreground rounded-full" />}
          </button>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="text-[10px] uppercase tracking-widest text-accent">
              {s.yearOffset === 0 ? "Now" : `+${s.yearOffset} year${s.yearOffset === 1 ? "" : "s"}`}
            </div>
            <div className={`font-serif text-base mt-1 ${s.done ? "line-through text-muted-foreground" : ""}`}>
              {s.label}
            </div>
            {s.note && <p className="text-xs text-muted-foreground mt-1">{s.note}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

function ChecklistTab({
  items,
  onToggle,
  onAdd,
  onRemove,
}: {
  items: ChecklistItem[];
  onToggle: (id: string) => void;
  onAdd: (label: string) => void;
  onRemove: (id: string) => void;
}) {
  const [draft, setDraft] = useState("");
  const submit = () => {
    const v = draft.trim();
    if (!v) return;
    onAdd(v);
    setDraft("");
  };
  return (
    <div className="max-w-2xl">
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Add a goal for the next 90 days…"
          className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <button
          onClick={submit}
          className="inline-flex items-center gap-1 bg-primary text-primary-foreground rounded-md px-3 py-2 text-sm font-medium hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>
      <ul className="mt-5 space-y-2">
        {items.map((c) => (
          <li
            key={c.id}
            className="flex items-start gap-3 rounded-xl border border-border bg-card p-3"
          >
            <input
              type="checkbox"
              checked={c.done}
              onChange={() => onToggle(c.id)}
              className="mt-1 h-4 w-4 accent-primary"
            />
            <div className="flex-1 min-w-0">
              <div className={`text-sm ${c.done ? "line-through text-muted-foreground" : ""}`}>
                {c.label}
              </div>
              {c.source === "ai" && (
                <div className="text-[10px] uppercase tracking-widest text-accent mt-0.5">Suggested</div>
              )}
            </div>
            <button
              onClick={() => onRemove(c.id)}
              className="text-muted-foreground hover:text-destructive"
              aria-label="Remove"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </li>
        ))}
        {items.length === 0 && (
          <li className="text-sm text-muted-foreground">No items yet. Add your first goal above.</li>
        )}
      </ul>
    </div>
  );
}

function EmptyState({ title, desc, href, cta }: { title: string; desc: string; href?: string; cta?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
      <h3 className="font-serif text-xl">{title}</h3>
      <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">{desc}</p>
      {href && cta && (
        <Link
          to={href}
          className="inline-flex mt-5 items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium"
        >
          {cta} <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
