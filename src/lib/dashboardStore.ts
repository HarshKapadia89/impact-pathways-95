// Lightweight per-device "My Dashboard" store. No login required.
// Keyed by the report token created at end of /test, persisted in localStorage.

const TOKEN_KEY = "hbk-report-token";
const NAME_KEY = "hbk-student-name";

const ck = (kind: string, token: string) => `hbk-dash-${kind}-${token}`;

export type SavedCareer = {
  stream: string;
  pathKey: string;
  title: string;
  savedAt: number;
};

export type SavedCollege = {
  id: string;
  name: string;
  city?: string;
  district?: string;
  savedAt: number;
};

export type ChecklistItem = {
  id: string;
  label: string;
  done: boolean;
  source: "ai" | "manual";
  createdAt: number;
};

export type RoadmapStep = {
  id: string;
  label: string;
  note?: string;
  yearOffset: number; // 0..N years from now
  done: boolean;
};

export function getCurrentToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function getCurrentStudentName(): string | null {
  try {
    return localStorage.getItem(NAME_KEY);
  } catch {
    return null;
  }
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch { /* ignore */ }
}

// ---------- Careers ----------
export function listSavedCareers(token: string): SavedCareer[] {
  return read<SavedCareer[]>(ck("careers", token), []);
}
export function isCareerSaved(token: string, stream: string, pathKey: string): boolean {
  return listSavedCareers(token).some((c) => c.stream === stream && c.pathKey === pathKey);
}
export function toggleSavedCareer(token: string, c: Omit<SavedCareer, "savedAt">): boolean {
  const all = listSavedCareers(token);
  const i = all.findIndex((x) => x.stream === c.stream && x.pathKey === c.pathKey);
  if (i >= 0) {
    all.splice(i, 1);
    write(ck("careers", token), all);
    return false;
  }
  all.unshift({ ...c, savedAt: Date.now() });
  write(ck("careers", token), all);
  return true;
}

// ---------- Colleges ----------
export function listSavedColleges(token: string): SavedCollege[] {
  return read<SavedCollege[]>(ck("colleges", token), []);
}
export function isCollegeSaved(token: string, id: string): boolean {
  return listSavedColleges(token).some((c) => c.id === id);
}
export function toggleSavedCollege(token: string, c: Omit<SavedCollege, "savedAt">): boolean {
  const all = listSavedColleges(token);
  const i = all.findIndex((x) => x.id === c.id);
  if (i >= 0) {
    all.splice(i, 1);
    write(ck("colleges", token), all);
    return false;
  }
  all.unshift({ ...c, savedAt: Date.now() });
  write(ck("colleges", token), all);
  return true;
}

// ---------- Checklist ----------
export function listChecklist(token: string): ChecklistItem[] {
  return read<ChecklistItem[]>(ck("checklist", token), []);
}
export function setChecklist(token: string, items: ChecklistItem[]): void {
  write(ck("checklist", token), items);
}
export function addChecklistItem(token: string, label: string, source: ChecklistItem["source"] = "manual"): ChecklistItem {
  const items = listChecklist(token);
  const item: ChecklistItem = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    label,
    done: false,
    source,
    createdAt: Date.now(),
  };
  items.unshift(item);
  setChecklist(token, items);
  return item;
}
export function toggleChecklistItem(token: string, id: string): void {
  const items = listChecklist(token).map((i) => (i.id === id ? { ...i, done: !i.done } : i));
  setChecklist(token, items);
}
export function removeChecklistItem(token: string, id: string): void {
  const items = listChecklist(token).filter((i) => i.id !== id);
  setChecklist(token, items);
}

// ---------- Roadmap ----------
export function listRoadmap(token: string): RoadmapStep[] {
  return read<RoadmapStep[]>(ck("roadmap", token), []);
}
export function setRoadmap(token: string, steps: RoadmapStep[]): void {
  write(ck("roadmap", token), steps);
}
