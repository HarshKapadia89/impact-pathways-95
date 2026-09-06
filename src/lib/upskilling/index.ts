import type { Topic, Lesson } from "./types";

import timeManagement from "./topics/time-management.json";
import personalityDevelopment from "./topics/personality-development.json";
import communication from "./topics/communication-public-speaking.json";
import englishFluency from "./topics/english-fluency-writing.json";
import studySkills from "./topics/study-skills-memory.json";
import emotionalIntelligence from "./topics/emotional-intelligence-wellbeing.json";
import criticalThinking from "./topics/critical-thinking-problem-solving.json";
import digitalAi from "./topics/digital-literacy-ai.json";
import financialLiteracy from "./topics/financial-literacy.json";
import leadership from "./topics/leadership-teamwork.json";
import entrepreneurship from "./topics/entrepreneurship-innovation.json";
import careerReadiness from "./topics/career-readiness.json";
import creativity from "./topics/creativity-design-thinking.json";
import onlineSafety from "./topics/online-safety-ethics.json";
import healthHabits from "./topics/health-fitness-habits.json";

export type { Topic, Lesson, StudyDay, CaseStudy, QuizItem, Resource } from "./types";

export const UPSKILL_TOPICS: Topic[] = [
  timeManagement,
  personalityDevelopment,
  communication,
  englishFluency,
  studySkills,
  emotionalIntelligence,
  criticalThinking,
  digitalAi,
  financialLiteracy,
  leadership,
  entrepreneurship,
  careerReadiness,
  creativity,
  onlineSafety,
  healthHabits,
] as unknown as Topic[];

export const TOTAL_TOPICS = UPSKILL_TOPICS.length;
export const TOTAL_LESSONS = UPSKILL_TOPICS.reduce((n, t) => n + t.lessons.length, 0);
export const TOTAL_MINUTES = UPSKILL_TOPICS.reduce(
  (n, t) => n + t.lessons.reduce((m, l) => m + (l.minutes || 30), 0),
  0,
);

export function getTopic(slug: string): Topic | undefined {
  return UPSKILL_TOPICS.find((t) => t.slug === slug);
}

export function getLesson(topicSlug: string, lessonSlug: string): { topic: Topic; lesson: Lesson; index: number } | undefined {
  const topic = getTopic(topicSlug);
  if (!topic) return undefined;
  const index = topic.lessons.findIndex((l) => l.slug === lessonSlug);
  if (index < 0) return undefined;
  return { topic, lesson: topic.lessons[index], index };
}

export function topicMinutes(topic: Topic): number {
  return topic.lessons.reduce((m, l) => m + (l.minutes || 30), 0);
}

export interface LessonHit {
  topicSlug: string;
  topicTitle: string;
  emoji: string;
  lessonSlug: string;
  lessonTitle: string;
  level: string;
  minutes: number;
}

export const ALL_LESSONS: LessonHit[] = UPSKILL_TOPICS.flatMap((t) =>
  t.lessons.map((l) => ({
    topicSlug: t.slug,
    topicTitle: t.title,
    emoji: t.emoji,
    lessonSlug: l.slug,
    lessonTitle: l.title,
    level: l.level,
    minutes: l.minutes,
  })),
);

export function searchLessons(q: string, limit = 40): LessonHit[] {
  const needle = q.trim().toLowerCase();
  if (needle.length < 2) return [];
  return ALL_LESSONS.filter(
    (l) => l.lessonTitle.toLowerCase().includes(needle) || l.topicTitle.toLowerCase().includes(needle),
  ).slice(0, limit);
}
