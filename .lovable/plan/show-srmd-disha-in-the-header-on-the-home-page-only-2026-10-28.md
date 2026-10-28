# Show "SRMD Disha" in the header on the home page only

## What changes
- On the home page, the HBK Careers logo at the top left is replaced by the name **SRMD Disha** in text. It uses the brand headline font and purple colour, at about the same size as the logo, and still links to the home page.
- Every other page keeps the HBK Careers logo.
- The footer logo, the tab title, the badge and the PDF reports stay the same. Say if any of these should change too.

## Note
There is no SRMD Disha logo image, so the name is shown as styled text. If you have a logo file, send it and I'll use that instead.

## Technical details
- In `PublicLayout.tsx` (header, line 74), read the current path with `useLocation`. When the path is `/`, render a `<span className="font-display text-heading text-highlight">SRMD Disha</span>` inside the existing home link. On all other paths keep `<Logotype size="md" />`.
- The text uses design tokens only. It is a deliberate exception to the "always use the supplied logo" brand rule, because you asked for it.
