# Resume Builder in Top Nav + Gen Z Header Redesign

## Scope (frontend only)

Two changes, both confined to `src/components/PublicLayout.tsx`:

1. **Promote Resume Builder into the primary nav.**
   - Move `{ to: "/profile-builder", label: { en: "Resume Builder", gu: "રિઝ્યુમ બિલ્ડર" }, icon: FileText }` out of `FOOTER_EXTRA` and into the `NAV` array.
   - Position: right after `Dashboard` (so the journey reads: Home → Career GJ → Career IN → Colleges → Scholarships → Exams → Aptitude → Dashboard → Resume).
   - Footer keeps "For Schools" only.
   - Mobile menu inherits the change automatically (it maps over `NAV`).

2. **Redesign the top tab bar to feel youth / Gen Z friendly.**
   Current bar is a flat row of muted-text links with a thin underline on active. Too utilitarian for a student audience.

   I'll generate 3 rendered design directions for the header (desktop + mobile collapse), all locked to the existing brand tokens in `src/styles.css`. Directions will explore:

   - **Direction A — "Sticker Pack"**: pill tabs with playful soft-shadow chips, rotating accent colors per tab, micro-bounce on hover, emoji-adjacent icon treatment.
   - **Direction B — "Neo-Brutalist Pop"**: chunky bordered tabs with hard offset shadows, high-contrast active state, marker-style underline that draws on hover.
   - **Direction C — "Glassy Gradient Rail"**: floating glass nav with animated gradient active pill (think Linear/Arc browser), subtle blur, gradient sweep on hover, soft glow on the active tab.

   Each direction includes: logo lockup, full tab row with the new Resume entry, theme/lang controls on the right, and mobile hamburger state.

   After you pick one, I'll port the chosen design's tokens/classes into `PublicLayout.tsx` exactly (no re-derivation), keeping all routes, i18n labels, and active-route logic intact.

## Out of scope

- No changes to page bodies, route files, data, or backend.
- No changes to footer styling beyond removing the Resume entry from `FOOTER_EXTRA`.
- No new dependencies.

## Technical notes

- Active route detection (`location.pathname.startsWith(item.to)`) stays as-is.
- Mobile menu rendering loop stays as-is — new styles will apply to both.
- All colors via semantic tokens (`--primary`, `--accent`, `--brand-2`, etc.); any new gradients/shadows added to `src/styles.css` as tokens, not inline.
- `lang` toggle and `ThemeSwitcher` remain in the right cluster.

## Next step after approval

1. Capture the current header from the live preview.
2. Generate 3 directions with that screenshot as visual reference.
3. Show them to you as a prototype picker. You pick one → I build it + promote Resume Builder to nav in the same commit.
