# LevelUp Lab: end-of-topic quiz, certificates, and real study material

## 1. Quiz moves to the end of each topic

- Lesson pages stop showing their own question-and-answer block; all those questions feed one combined MCQ quiz that sits at the end of the topic.
- Each topic page ends with a clear "Chapter test" card, unlocked once the lessons are marked done (still openable earlier, with a nudge).
- Quiz format: multiple choice, one mark per question, no negative marking.
- The "marks per question" selector is removed from the LevelUp Lab quiz and from the aptitude test setup. Everything is 1 mark per question, and the total is simply the number of questions.
- The learner still chooses how many questions: 10, 15, 20, 25, 30, 40 or 50 (capped by how many questions the topic has).
- Score, pass mark (60%), correct answers and a retry button stay as they are now.

## 2. Self-certification download

- After finishing every lesson in a topic and passing that topic's chapter test, a "Download certificate" button appears on the topic page.
- After all 15 topics are cleared, a master "LevelUp Lab Completion Certificate" is offered on the main LevelUp page.
- The learner types their name once (saved on the device) and gets a printable A4 PDF certificate: HBK Careers branding, learner name, topic name (or all 15 topics for the master), lessons and hours completed, quiz score, date, and a self-certification line stating the learner completed the programme themselves.
- Certificate text follows the site language (English, Hindi, Gujarati, Marathi), using the same Indic fonts already used for the test report PDF.
- Progress and certificate state stay on the device, as with the current lesson progress.

## 3. Real study material in the 7-day plan

Each of the 7 days becomes an actual study session instead of a one-line task:

- **Day title and focus** (kept)
- **Read** — 250-350 words of teaching content for that day: the concept, why it matters, a worked Indian-student example, and common mistakes
- **Do** — the practical task (current one-liner, kept)
- **Check yourself** — 2 short reflection prompts
- Each day is a collapsible card, with a "mark day done" tick so learners can work through the week.

Scope: 15 topics x 10 lessons x 7 days = 1,050 study sessions. This is generated in batches and reviewed; the day cards fall back to the current short task if a batch is not yet filled, so the site never breaks mid-way. Hindi, Gujarati and Marathi versions follow the same batching as the existing lesson translations.

## Technical notes

- Extend `StudyDay` in `src/lib/upskilling/types.ts` with optional `read: string` and `checkpoints: string[]`; JSON topic files under `src/lib/upskilling/topics/` are regenerated in batches via the AI gateway, keeping existing fields intact.
- `src/routes/upskill.$topic.$lesson.tsx`: remove the quiz section, render expandable day cards with read/do/check, add per-day tick stored in `upskillProgress`.
- `src/components/UpskillQuiz.tsx`: drop the marks state and marks buttons, fix 1 mark per question, keep count presets; `src/routes/upskill.$topic.quiz.tsx` head/copy updated.
- `src/routes/upskill.$topic.index.tsx` and `upskill.index.tsx`: chapter-test CTA, quiz-pass state, certificate buttons.
- New `src/lib/upskillCertificate.ts` using jsPDF (same font loading pattern as `src/lib/psychometricReport.ts`) for topic and master certificates.
- `src/lib/upskillProgress.ts`: add `quizResult(topic)`, `setQuizResult`, `dayDone` helpers and learner name storage.
- `src/routes/test.index.tsx` / `test.take.tsx`: remove `marksPerQ` UI and default to 1; keep the 10-50 question slider and the report's marks line consistent.
- New strings added to `src/lib/upskillStrings.ts` in all four languages.
- Verify with a typecheck plus a browser pass: lesson day cards, topic quiz scoring, certificate PDF render.
