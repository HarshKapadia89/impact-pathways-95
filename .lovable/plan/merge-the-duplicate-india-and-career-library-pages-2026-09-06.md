# Merge the duplicate "India" and "Career Library" pages

## Problem
The header has two tabs that do the same thing:
- **India** (`/handbook`) — lists the same 48 streams with professions/exams/institutes counts
- **Career Library** (`/career-library`) — lists the same 48 streams, plus an A–Z letter filter and a search that also matches all 1,600+ professions

Career Library is the richer page, so it stays; the India index page goes away.

## What changes

1. **Keep `/career-library` as the single library page.** Move over the small things only the India page had:
   - The "Compiled in-house from official regulators (AICTE, NMC, BCI, ICAI, NTA, ACPC Gujarat…)" credit line, shown at the bottom of the Career Library page.
   - Its SEO title/description merged into Career Library's metadata (mentions India-wide coverage).

2. **Redirect `/handbook` → `/career-library`.**
   - The `/handbook` index becomes a permanent redirect, so old links and bookmarks keep working.
   - All stream and profession pages (`/handbook/engineering-and-technology/...`) stay exactly as they are — only the duplicate index page is removed.

3. **Update navigation and links.**
   - Header: remove the duplicate tab, keep one tab labelled "Career Library" (4 languages).
   - Homepage "Career Handbook" tile and any other links that pointed to `/handbook` now point to `/career-library`.

4. **Verify:** header shows no duplicate tabs, `/handbook` redirects correctly, stream/profession pages still open, typecheck passes.

## Technical notes
- Redirect via TanStack `redirect()` in the `/handbook` route's `beforeLoad` (301-style client redirect; update `public/sitemap.xml` entry too).
- Files touched: `src/routes/handbook.tsx`, `src/routes/career-library.tsx`, `src/components/PublicLayout.tsx`, `src/routes/index.tsx`, `public/sitemap.xml`.
- No changes to data files or the 48 stream JSONs.
