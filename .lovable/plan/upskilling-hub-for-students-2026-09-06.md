# Upskilling Hub for Students

A new "Upskill" section where students learn life and career skills that the career test and library don't cover — time management, personality, communication, money sense, AI tools and more. Every topic is broken into 10 short lessons, each with a study plan, revision notes, a real global example, a practice task and a self-check.

## The 15 topics

1. Time Management & Productivity
2. Personality Development & Self-Confidence
3. Communication & Public Speaking
4. English Fluency & Everyday Writing
5. Study Skills, Memory & Exam Strategy
6. Emotional Intelligence & Mental Wellbeing
7. Critical Thinking & Problem Solving
8. Digital Literacy & Using AI Well
9. Financial Literacy & Money Skills
10. Leadership & Teamwork
11. Entrepreneurship & Innovation
12. Career Readiness — Resume, Interview, LinkedIn
13. Creativity & Design Thinking
14. Online Safety, Digital Citizenship & Ethics
15. Health, Fitness & Habit Building

That is 150 lessons in total (15 topics x 10 lessons).

## What each lesson contains

- **Why it matters** — 2-3 lines in student language
- **Study plan** — a 7-day mini plan with a 15-30 minute action for each day
- **Notes** — 6-10 crisp revision points a student can read before a class or interview
- **Global case study** — a real person or organisation from India and the wider world (for example Sundar Pichai on communication, Toyota's 5-Whys on problem solving, Malala on courage, Duolingo on habit design), each with the lesson to take away
- **Try this week** — one practical task
- **Self-check** — 3 quick questions with answers
- **Go deeper** — free, reputable links (NCERT, Khan Academy, Harvard/MIT open material, Government of India skill portals)

## Pages

- `/upskill` — hub page: all 15 topic cards, search, difficulty and time filters, and a "continue where you left off" strip
- `/upskill/<topic>` — topic page: intro, outcomes, the 10 lessons as a numbered path, estimated hours, progress bar
- `/upskill/<topic>/<lesson>` — the lesson page with the sections above, plus "mark complete", previous/next navigation and a print-friendly layout

Progress (lessons completed, streak, badges at 25/50/100%) is saved on the student's own device, the same way the existing dashboard and bookmarks work, and surfaces on the Dashboard page. A new "Upskill" entry goes into the main navigation next to Career Library.

## Language

All page furniture — navigation, buttons, section headings, filters, progress labels — will be in English, Gujarati, Hindi and Marathi. Lesson text is authored in English first (consistent with the career directory today), with a polite note offering the English version when another language is selected. Translating all 150 lessons can be a follow-up once you approve the content.

## Build order

1. Content model + hub, topic and lesson pages working with the first 3 topics
2. Remaining 12 topics of content
3. Progress tracking, badges, Dashboard integration, navigation entry
4. SEO titles/descriptions per topic page, and a QA pass across the four languages

## Technical notes

- Content lives as typed data under `src/lib/upskilling/` — one file per topic plus an index with summaries, mirroring the `src/lib/handbook/` pattern so search and counts stay fast.
- Routes: `src/routes/upskill.tsx` (layout with `<Outlet />`), `upskill.index.tsx`, `upskill.$topic.index.tsx`, `upskill.$topic.$lesson.tsx`, each with its own `head()` metadata.
- Progress uses the existing local-storage store (`src/lib/dashboardStore.ts`) with a new `upskillProgress` slice; no backend changes required.
- Labels go through the existing `useLang`/`pick` helpers in `src/lib/lang.ts`.
- While in the area, fix the header hydration warning caused by the language-dependent tagline in `PublicLayout.tsx` rendering different text on server and client.
