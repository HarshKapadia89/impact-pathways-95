# Two-Row Header Layout

## Scope
Single file: `src/components/PublicLayout.tsx`. No route, data, or footer changes.

## Change

Restructure the floating glass bar into **two stacked rows** inside the same dual-layer pill, so nothing gets clipped at 1050px or above:

**Row 1 (brand row):**
- Left: HBK Careers logo + "Student Guidance Hub" subtitle (always fully visible, no truncation, no `hidden` breakpoint on the subtitle — show it on all sizes ≥ sm)
- Right: mobile hamburger (only `<lg`)

**Row 2 (nav row, desktop ≥lg):**
- Full horizontal nav with all 9 items including Resume Builder
- Use `flex-wrap` so tabs wrap to a second visual line on narrow widths instead of being clipped or hidden behind scroll
- Drop the `overflow-x-auto` scroll trick — wrapping is friendlier and guarantees no text is cut
- Slightly tighter padding (`px-2 py-1.5`) and `text-[13px]` retained so all 9 tabs fit comfortably on one wrapped line at 1050px

**Mobile (<lg):** unchanged dropdown menu, still triggered from row 1.

## Visual rules preserved
- Same dual-layer glass pill (outer white/40 border, inner teal ring, backdrop-blur)
- Same gradient active-pill styling for tabs
- Resume Builder keeps its accent outline treatment in idle state
- Shape changes from a rounded-full pill to `rounded-3xl` to accommodate two rows cleanly

## Out of scope
Footer, ThemeSwitcher (already removed), language toggle location (stays in footer), any non-header file.
