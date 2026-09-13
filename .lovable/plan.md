# Chapter Test: one level, 10–50 marks, MCQ

## Goal
Make the LevelUp chapter test exactly match the intended flow: the student picks ONE difficulty (Easy / Medium / Hard) for the whole test — never a mix — and picks a test size from 10 to 50 marks, answering simple tap-to-select MCQs.

## Current state (verified in `src/components/UpskillQuiz.tsx`)
- Difficulty is already uniform: one `level` applies to every question in the test. No mixing.
- Question count 10–50 selectable. Answers are tap-to-select MCQ option tiles.
- A "marks per question" selector (1 / 2 / 5) still exists — this was meant to be removed. Per your rule, every question is 1 mark by default.

## Changes

1. **Remove the marks-per-question selector** (`UpskillQuiz.tsx`)
   - Delete the 1/2/5 marks button row and its state.
   - Fix 1 mark per question, so total marks = question count (10–50).
   - Update the setup summary to show "Total: X marks" from the count alone.
   - Update the per-question label and the results panel to use the fixed 1-mark scoring (score = correct count).

2. **Keep one-level-per-test behavior, make it explicit**
   - The level buttons (Easy / Medium / Hard) already apply to the entire test; keep them.
   - Keep the difficulty mechanics: Easy = 3 answer choices, Medium = 4, Hard = 5 with closer look-alike distractors.
   - Adjust the level note strings in `src/lib/upskillStrings.ts` (all 4 languages) so they clearly say the chosen level applies to the whole test.

3. **MCQ format**
   - Already tap-to-select MCQs with one correct answer; keep as is. No typing anywhere.

4. **Verify**
   - Playwright: start a chapter test on Easy and Hard, confirm the level applies to all questions, total marks match the chosen count, scoring and pass/fail banner still work, and Hindi view renders translated labels with no console errors.

## Out of scope
- No changes to the aptitude/psychometric test or its payment flow.
- No changes to lesson content or certificates.
