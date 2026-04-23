import summariesJson from "./handbookSummaries.json";

export type HandbookExam = {
  code: string;
  fullName?: string;
  purpose: string;
  website?: string;
};

export type HandbookInstitute = {
  rank: number;
  name: string;
  entrance?: string;
  website?: string;
  category?: string;
};

export type HandbookStream = {
  stream: string;
  professions: string[];
  exams: HandbookExam[];
  institutes: HandbookInstitute[];
};

export type HandbookSummary = {
  stream: string;
  slug: string;
  professionsCount: number;
  examsCount: number;
  institutesCount: number;
};

export const HANDBOOK_SUMMARIES = summariesJson as HandbookSummary[];

const EMOJI: Record<string, string> = {
  "Agriculture and Allied Sciences": "🌾",
  "Architecture and Planning": "🏛️",
  "Arts, Humanities and Social Sciences": "🎭",
  "Business Management": "💼",
  "Commerce and Finance": "💰",
  "Computer Applications and Sciences": "💻",
  "Design and Fine Arts": "🎨",
  Economics: "📈",
  "Engineering and Technology": "⚙️",
  "Hotel, Hospitality and Tourism Management": "🏨",
  Law: "⚖️",
  "Liberal Studies": "📚",
  "Mass Communication / Mass Media": "📰",
  "Mass Communication": "📰",
  "Medicine and Surgery": "🩺",
  "Paramedical Sciences": "🚑",
  "Performing Arts": "🎤",
  "Pure Sciences": "🔬",
  "Rehabilitation Sciences": "🦾",
  "Sports & Physical Education": "🏅",
  "Veterinary and Fishery Sciences": "🐾",
};

export function streamEmoji(name: string): string {
  return EMOJI[name] ?? "🎓";
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Eager-loaded import map for code-splitting per stream JSON file
const streamLoaders = import.meta.glob<{ default: HandbookStream }>("./handbook/*.json");

export const HANDBOOK_SUMMARY_BY_SLUG: Record<string, HandbookSummary> = Object.fromEntries(
  HANDBOOK_SUMMARIES.map((s) => [s.slug, s]),
);

const cache = new Map<string, HandbookStream>();

export async function loadHandbookStream(slug: string): Promise<HandbookStream | null> {
  if (cache.has(slug)) return cache.get(slug)!;
  const key = `./handbook/${slug}.json`;
  const loader = streamLoaders[key];
  if (!loader) return null;
  const mod = await loader();
  cache.set(slug, mod.default);
  return mod.default;
}
