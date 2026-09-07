# Powerful, Feature-Rich Landing Page

Turn the homepage into a strong showcase of everything the platform offers — with real statistics, a complete feature showcase, and stronger calls to action. All existing sections keep working; we add and polish, not remove.

## What changes on the homepage (`src/routes/index.tsx`)

### 1. Live statistics band (new, right under the hero)
A bold 4-stat strip showing real platform numbers, pulled from actual data sources so they never go stale:
- 48 career streams (from the career library data)
- 1,600+ professions (profession index)
- 100 entrance exams and 100 scholarships (tracker data)
- 150 free lessons across 15 skill tracks (LevelUp Lab)
Plus supporting stats already implied by content: 4 languages, 20-page report, grades 6–12.

### 2. Complete feature showcase (new section)
A grid of 8–10 feature cards, each linking into the site, covering everything a visitor can do:
- Psychometric test (RIASEC + Multiple Intelligences + Aptitude)
- Instant 20-page PDF report in your language
- Career Library (1,600+ professions, compare careers)
- 100 entrance exams and 100 scholarships
- LevelUp Lab (150 free lessons, quizzes, certificates)
- Resume / profile builder
- HBK Career Counsellor chatbot (4 languages)
- Book a counsellor session
- College finder / directory
- Shareable report links for parents and teachers

### 3. Stronger hero
- Add a small stats row inside the hero (test takers-style trust numbers kept honest — only real counts like streams/professions/lessons).
- Keep both existing CTAs; add a third subtle link "Explore all features" that scrolls to the showcase.

### 4. Trust + How-it-works + Report preview + Vibe quiz + Streams + FAQ
These stay, but get spacing/typography polish so the page flows: hero → stats → features → how it works → report preview → vibe quiz → streams → FAQ → final CTA.

### 5. Final call-to-action band (new, above FAQ)
A full-width closing section: "Ready to find your direction?" with the test CTA — so no visitor reaches the footer without an action.

## Languages
Every new string added in all four languages (English, Gujarati, Hindi, Marathi) using the existing `translator` pattern — the current language rule applies to all new content.

## Technical details
- All edits in `src/routes/index.tsx` (plus a small new `StatsBand` and `FeatureShowcase` component if the file gets long, kept in `src/components/`).
- Counts computed from existing data modules (`professionIndex.json`, `careerData`, `scholarshipsData`, `entranceExamsData`, `upskilling`) — no hardcoded numbers that can drift.
- Semantic design tokens only (existing `--brand-*`, `primary`, `accent`, card shadows); current Indigo & Amber theme and header untouched.
- SEO: update the homepage head title/description to reflect the full platform (test + library + exams + scholarships + upskilling); keep a single H1.
- Verified with a TypeScript check and a Playwright screenshot of the full page at desktop and mobile widths, in English and Hindi.
