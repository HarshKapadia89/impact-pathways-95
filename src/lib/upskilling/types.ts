// Upskilling Hub content model.
// One JSON file per topic under src/lib/upskilling/topics/, generated from a
// curated brief and hand-checked. English is the authoring language.

export interface StudyDay {
  day: number;
  focus: string;
  task: string;
}

export interface CaseStudy {
  title: string;
  who: string;
  country: string;
  story: string;
  takeaway: string;
}

export interface QuizItem {
  q: string;
  a: string;
}

export interface Resource {
  label: string;
  url: string;
}

export interface Lesson {
  slug: string;
  title: string;
  minutes: number;
  level: "Starter" | "Builder" | "Advanced";
  why: string;
  studyPlan: StudyDay[];
  notes: string[];
  caseStudies: CaseStudy[];
  practice: string;
  quiz: QuizItem[];
  resources: Resource[];
}

export interface Topic {
  slug: string;
  title: string;
  tagline: string;
  emoji: string;
  intro: string;
  outcomes: string[];
  lessons: Lesson[];
}
