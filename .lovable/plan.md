# Full navigation, Vision page, marketing homepage

## 1. All tabs visible in the header

Today the top bar shows 9 items; About, For Parents, Success Stories, FAQ and For Schools live only in the footer.

- Show every section in the main header nav: Home, Gujarat, India, Colleges, Scholarships, Exams, Aptitude, Dashboard, Resume, Career Cards, Vision, About, Parents, Success Stories, FAQ, For Schools.
- Keep the two-row poster header: brand on row one, nav wrapping across row two in the same flat colour-block style, sized so no label is clipped down to ~1000px width.
- Mobile keeps the full list in the slide-down menu, grouped so it stays scannable.
- Footer keeps the same links for SEO.

## 2. New Vision page (`/vision`)

A dedicated poster-style page carrying the full vision:

- Hero statement of the vision.
- Mission pillars (guidance for every student, evidence-based assessment, regional-language access, school partnership).
- What we are building — the long-term picture (career discovery, assessment, colleges/exams/scholarships, counselling, school programmes).
- Impact goals and the values that guide the work.
- Closing call to action into the aptitude test and career guidance.
- Bilingual (EN/GU) copy matching the rest of the site, own `head()` metadata, added to the sitemap.

Vision copy will be written from the existing About / For Schools / Parents material so it reads as one coherent statement; you can send exact wording later and I will swap it in.

## 3. Marketing-focused homepage

Rework `src/routes/index.tsx` into a full feature-led marketing page while keeping the poster look:

- Hero: keep the animated word stack and the two primary CTAs, with a benefit-led subheadline.
- Feature grid covering every capability: psychometric + aptitude assessment in 3 languages, 20-page personalised report, career guidance for Gujarat, India career handbook (935+ professions), career cards with comparison, college finder, scholarships, entrance exams, resume builder, student dashboard, HBK Career Counsellor chat, school programmes.
- "Inside the report" and "How it works" stay, repositioned in the flow.
- Numbers strip, vision teaser linking to `/vision`, success-story pull quotes, FAQ, and a final CTA band.
- Marquee and streams strip retained.

## 4. Remove "free" and "no login" messaging

Strip pricing/login claims from all product copy and metadata (EN and GU): hero badge, header/footer lines, sticky mobile CTA, test intro, About, FAQ, career and college pages, chatbot prompts, dashboard, resume builder, page titles and descriptions. Replace with value-led wording ("Built for Gujarat students", "Start in minutes").

Not touched: the word "free" where it describes third-party facts, e.g. scholarship amounts or fee-waiver details in scholarship/college data — that is factual content, not a claim about this platform.

## Technical notes

- New file `src/routes/vision.tsx` with `createFileRoute("/vision")` and its own head metadata; add entry to `public/sitemap.xml`.
- `NAV` array in `src/components/PublicLayout.tsx` becomes the single source for header and footer links; `FOOTER_EXTRA` merged into it.
- Homepage sections reuse existing components (`TrustLayer`, `HowItWorks`, `ReportPreview`, `VibeQuizCard`, `FAQAccordion`) plus a new feature-grid section, all using existing design tokens — no new colours.
- No backend, data model, or test-logic changes.
