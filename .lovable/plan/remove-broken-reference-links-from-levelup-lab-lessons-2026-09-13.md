# Remove broken reference links from LevelUp Lab lessons

## Problem

Every LevelUp lesson page shows a "Resources" section with website reference links. Many of these links no longer work. There are ~450 links across the 15 topic files — too many to verify and fix one by one.

## Fix

Remove the links from the student-facing pages entirely:

1. **Lesson page** (`src/routes/upskill.$topic.$lesson.tsx`)
   - Remove the "Resources" section that renders the list of reference links.
   - Keep everything else on the page unchanged: the 7-day study plan, notes, case studies, practice task, and quiz entry.

2. **Check for other places that render these links**
   - Search all routes/components for other usages of `lesson.resources` (e.g. print view, quiz page) and remove them the same way.

3. **Leave the data files untouched**
   - The `resources` entries stay in the topic JSON files but are simply no longer displayed. This keeps the change small and safe; nothing else reads them.

## Verification

- TypeScript check passes.
- Open several lesson pages in English and Hindi in the browser: confirm the Resources section is gone, the rest of the lesson renders correctly, and there are no console errors.
