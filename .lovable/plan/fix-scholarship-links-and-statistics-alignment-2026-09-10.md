# Fix scholarship links and statistics alignment

Two problems, both confirmed:

1. **Statistics strip looks ragged.** Longer labels wrap onto two or three lines, so the big numbers below them sit at different heights across the green band.
2. **Scholarship "apply" links are broken.** Every card turns its "where to apply" text into a web link, but many entries hold a description rather than a web address — "State SCERT portals", "MahaDBT 2.0", "scholarships.gov.in / state portal", "Buddy4Study", "Organiser portal". Those become dead links. Your list of 43 names matches these cases, and the uploaded check document flags the same ones as BROKEN / REPLACE.

## What changes for visitors

**Statistics band**
- All eight numbers line up on the same baseline regardless of how long the label is, on phone and desktop.

**Scholarships page**
- Every card gets a real, working "Apply / official page" link pointing at the correct official portal (National Scholarship Portal, MahaDBT, Digital Gujarat, MSCE Pune, SEB Gujarat, AICTE, Buddy4Study scheme page, Vidya Lakshmi, agnipankh.in, and so on).
- Where a scheme genuinely has no single application website (for example NMMS, which runs through each state's SCERT), the card shows the guidance text plainly plus the nearest official national page — no fake link.
- Notes corrected per the check document: Agnipankh marked as a private, non-government exam; Central Sector Interest Subsidy and Sainik-school maintenance allowance described as loan-interest / allowance routes rather than scholarships; Bihar Kanya Utthan and Student Credit Card separated into two entries with their own portals; EMRS, Navodaya and Sainik School kept but labelled as admission/residential support rather than cash scholarships.
- Kotak Shiksha Nidhi / Kotak Kanya link corrected, along with the other REPLACE items in the document (Ishan Uday, PMSSS J&K/Ladakh, National Fellowship SC and ST, AICTE Pragati, AICTE Saksham, AICTE Swanath, Nikon, SBI Asha, Infosys, Tamil Nadu, Telangana/AP ePASS, MP, West Bengal).

Nothing else on the page changes: same look, same filters, same four languages.

## Technical notes

- Add an optional `applyUrl` (absolute https) to the `Scholarship` type in `src/lib/scholarshipsData.ts`, keeping `applyAt` as the human-readable portal name. Populate `applyUrl` for all 100 rows where an official page exists; leave it empty for the state-dependent ones.
- `src/routes/scholarships.tsx`: render an anchor only when `applyUrl` is set; otherwise render `applyAt` as plain text with a short "apply through your state portal" hint. Remove the current `https://${applyAt}` string concatenation.
- Apply the document's FIX / RECLASSIFY wording to `notes`, `category` and `amount` for the affected rows; split the Bihar row into two (total becomes 101 unless one REMOVE/RECLASSIFY row is folded in — keep the headline count at 100 by merging the two NIOS/EMRS reclassified duplicates as noted, and update `src/lib/platformStats.ts` only if the final count changes).
- `src/components/StatsBand.tsx`: give each grid cell a full-height flex column that pushes content to a common bottom edge so values align; layout-only change, no design-system component restyling.
- Verify with a typecheck plus a browser pass over `/scholarships` (desktop and mobile) and a link-format check that every rendered href is absolute https.
