# Powerful Visitor-First Landing Page

Rebuild the homepage from a first-time visitor's point of view: within seconds they should see what the platform is, everything it offers, proof through real numbers, and one clear action — "Take the free test". All existing sections keep working; nothing is removed.

## Page flow (top to bottom)

### 1. Hero — "what is this and why should I care" in 5 seconds
- One strong headline, sub-line, and primary CTA (Take the free test) + secondary (Explore careers).
- Small trust strip inside the hero: Free • No login • 4 languages • Grades 6–12.
- Right side keeps the tinted feature cards, upgraded with counts (1,600+ professions, 20-page report).

### 2. Live statistics band (new)
Bold animated-feel stat strip using real counts from the data (never hardcoded): 48 streams • 1,600+ professions • 1,900+ institutes • 100 entrance exams • 100 scholarships • 150 free lessons • 4 languages.

### 3. "Everything you can do here" — full feature showcase (new)
An 8–10 card grid, each card with icon, one-line benefit (visitor wording, not technical), and a link:
- Psychometric & aptitude test
- Instant 20-page PDF report in your language
- Career Library — 1,600+ professions with compare
- 100 entrance exams & 100 scholarships
- LevelUp Lab — 150 free lessons, quizzes & certificates
- Resume / profile builder
- HBK Career Counsellor — AI chatbot in 4 languages
- Book a 1-on-1 counsellor session
- College finder
- Shareable report link for parents & teachers

### 4. Existing sections, polished and kept
How it works (3 steps) → Report preview → Vibe quiz hook → Streams strip → FAQ — kept, with spacing/typography polish for flow.

### 5. Final CTA band (new, above the footer)
Full-width closing banner: "Ready to find your direction?" + test CTA — no visitor reaches the footer without a clear next step.

## Visitor-first writing rules
- Every heading written as a benefit ("Know what fits you in 25 minutes"), not a feature name.
- One primary action repeated consistently: Take the free test.
- All new strings in English, Gujarati, Hindi, Marathi via the existing `translator` pattern — the site-wide language rule applies.

## Technical details
- Edits in `src/routes/index.tsx` plus two new components (`StatsBand`, `FeatureShowcase`) in `src/components/` to keep the route readable.
- Counts computed from existing modules (`professionIndex.json`, `careerData`, `scholarshipsData`, `entranceExamsData`, `upskilling`) so they stay accurate automatically.
- Semantic design tokens only; current Indigo & Amber theme, header, and language dropdown untouched.
- SEO: update homepage title/description to cover the full platform; keep a single H1.
- Verified with TypeScript check and Playwright screenshots at desktop and mobile widths in English and Hindi.
