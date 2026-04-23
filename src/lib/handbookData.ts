import data from "./handbookData.json";

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

export const HANDBOOK_STREAMS = data as HandbookStream[];

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

export const HANDBOOK_BY_SLUG: Record<string, HandbookStream> = Object.fromEntries(
  HANDBOOK_STREAMS.map((s) => [slugify(s.stream), s]),
);
