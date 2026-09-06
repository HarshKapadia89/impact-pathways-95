// Per-device upskilling progress. No login required — mirrors dashboardStore.

const KEY = "hbk-upskill-progress-v1";

export type ProgressMap = Record<string, number>; // `${topic}/${lesson}` -> completedAt

function read(): ProgressMap {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

function write(map: ProgressMap) {
  try {
    localStorage.setItem(KEY, JSON.stringify(map));
    window.dispatchEvent(new CustomEvent("hbk-upskill-change"));
  } catch {
    /* storage unavailable */
  }
}

export const lessonKey = (topic: string, lesson: string) => `${topic}/${lesson}`;

export function getProgress(): ProgressMap {
  return read();
}

export function isDone(topic: string, lesson: string): boolean {
  return !!read()[lessonKey(topic, lesson)];
}

export function toggleLesson(topic: string, lesson: string): boolean {
  const map = read();
  const k = lessonKey(topic, lesson);
  if (map[k]) delete map[k];
  else map[k] = Date.now();
  write(map);
  return !!map[k];
}

export function topicDoneCount(topic: string, lessonSlugs: string[]): number {
  const map = read();
  return lessonSlugs.filter((s) => map[lessonKey(topic, s)]).length;
}

export function totalDone(): number {
  return Object.keys(read()).length;
}

export function lastLesson(): { topic: string; lesson: string; at: number } | null {
  const map = read();
  let best: { topic: string; lesson: string; at: number } | null = null;
  for (const [k, at] of Object.entries(map)) {
    const [topic, lesson] = k.split("/");
    if (!topic || !lesson) continue;
    if (!best || at > best.at) best = { topic, lesson, at };
  }
  return best;
}

export type Badge = { id: string; label: string; earned: boolean };

export function badges(total: number, totalLessons: number): Badge[] {
  const pct = totalLessons ? (total / totalLessons) * 100 : 0;
  return [
    { id: "starter", label: "First lesson", earned: total >= 1 },
    { id: "q1", label: "25% complete", earned: pct >= 25 },
    { id: "q2", label: "50% complete", earned: pct >= 50 },
    { id: "q3", label: "100% complete", earned: pct >= 100 },
  ];
}
