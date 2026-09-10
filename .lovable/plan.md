# Header: one-line navigation + fix tab highlighting

## What you asked
1. All top tabs on a single line instead of two rows.
2. Fix the bug where opening **Career Library** also highlights the **Gujarat guidance** tab.

## Root cause of the highlighting bug
The header marks a tab active with `pathname.startsWith("/career")`. Since `/career-library` starts with `/career`, the Gujarat tab lights up whenever Career Library is open.

## Changes (all in `src/components/PublicLayout.tsx`)

### 1. Single-line navigation
- Merge the two nav lists (Home, Aptitude Test, Career Library, Colleges, LevelUp Lab, Counsellor, Gujarat guidance, Scholarships, Entrance exams, Dashboard, Resume Builder) into one row in the main header bar.
- Remove the entire second row (including the "Find the right direction" tagline, which already appears in the footer).
- To fit 11 items on one line: compact padding, small caption text, icons hidden on medium screens (shown again on very wide screens), and the mobile hamburger menu unchanged for small screens.
- Language dropdown stays at the top right as before.

### 2. Fix active-tab matching
- Change the active check from `startsWith(to)` to exact match or `startsWith(to + "/")`, so `/career-library` no longer activates `/career`.

## Technical details
- File touched: `src/components/PublicLayout.tsx` only.
- Labels and translations stay exactly as they are — only layout and the active-state condition change.
- Mobile menu keeps all links; nothing is removed from the site.

## Verification
- Typecheck passes.
- Browser check: header shows one line of tabs on desktop; visiting `/career-library` highlights only Career Library; visiting `/career` highlights only Gujarat guidance; mobile menu still works.
