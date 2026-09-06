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

/* ---------------- Day-level progress, quiz results, learner name ---------------- */

const DAY_KEY = "hbk-upskill-days-v1";
const QUIZ_KEY = "hbk-upskill-quiz-v1";
const NAME_KEY = "hbk-upskill-name-v1";

export const PASS_PCT = 60;

export type QuizResult = { correct: number; total: number; pct: number; at: number };

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent("hbk-upskill-change"));
  } catch {
    /* storage unavailable */
  }
}

export const dayKey = (topic: string, lesson: string, day: number) => `${topic}/${lesson}#${day}`;

export function getDays(): Record<string, number> {
  return readJSON<Record<string, number>>(DAY_KEY, {});
}

export function toggleDay(topic: string, lesson: string, day: number): boolean {
  const map = getDays();
  const k = dayKey(topic, lesson, day);
  if (map[k]) delete map[k];
  else map[k] = Date.now();
  writeJSON(DAY_KEY, map);
  return !!map[k];
}

export function getQuizResults(): Record<string, QuizResult> {
  return readJSON<Record<string, QuizResult>>(QUIZ_KEY, {});
}

export function saveQuizResult(topic: string, correct: number, total: number) {
  const map = getQuizResults();
  const pct = total ? Math.round((correct / total) * 100) : 0;
  const prev = map[topic];
  if (!prev || pct >= prev.pct) map[topic] = { correct, total, pct, at: Date.now() };
  writeJSON(QUIZ_KEY, map);
}

export function topicPassed(topic: string): boolean {
  const r = getQuizResults()[topic];
  return !!r && r.pct >= PASS_PCT;
}

export function getLearnerName(): string {
  try {
    return localStorage.getItem(NAME_KEY) || "";
  } catch {
    return "";
  }
}

export function setLearnerName(name: string) {
  try {
    localStorage.setItem(NAME_KEY, name);
    window.dispatchEvent(new CustomEvent("hbk-upskill-change"));
  } catch {
    /* storage unavailable */
  }
}
