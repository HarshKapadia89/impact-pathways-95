## Goals

1. **Sheet entry missing** — root cause confirmed: the Google Sheet has no tab named `Submissions`. The append API returns `400 Unable to parse range: Submissions!A1:V1`. The DB row exists, but the sheet write silently failed (it's wrapped in a non-fatal try/catch).
2. **Report quality** — make the 20-page PDF look genuinely world-class: better cover, proper RIASEC radar (hexagon) chart, MI radar, refined typography, score legends, color coding per dimension, "what this means for you" callouts, and a polished snapshot/exec-summary page.

---

## Part A — Fix Google Sheet sync (small, surgical)

Two changes, no new features:

1. **Auto-create the `Submissions` tab if missing.** Before reading `A1:V1`, call the spreadsheet metadata endpoint; if the sheet name doesn't exist, call `batchUpdate` with an `addSheet` request, then proceed to write headers + append.
2. **Backfill the one DB row that didn't sync.** After the fix deploys, trigger one append for the existing submission (`13444772-…`) so the sheet matches the database.

Files: `src/server/sheetsSync.functions.ts` only.

User action required: nothing — the code will create the tab automatically. (Alternative if you'd prefer: you manually rename the existing tab to `Submissions`. Either works.)

---

## Part B — World-class PDF redesign

All changes in `src/lib/psychometricReport.ts` (+ a small new helper module for chart drawing). No data shape changes, no new dependencies — pure jsPDF vector drawing.

### B1. New: RIASEC Hexagon (Holland Hexagon) chart
The canonical RIASEC visualization is a hexagon with R-I-A-S-E-C at the six vertices, with the student's scores plotted as a filled polygon inside. This is the chart psychometricians and counsellors expect.

```text
            R
         .  |  .
       .    |    .
     C------+------I
     |\    /|\    /|
     | \  / | \  / |
     |  \/  |  \/  |
     E------+------A
       .    |    .
         .  |  .
            S
```

- Drawn at ~80mm wide, vector strokes + light fill, with axis labels and percentage rings (25/50/75/100).
- Renders on the new dedicated **Page 5 — RIASEC Profile**, replacing the current bar-only layout. Bars stay below the hexagon as a secondary read.

### B2. New: MI radar (8-axis spider)
Same vector approach: 8 axes for the 8 intelligences, polygon fill in accent colour. Replaces the plain MI bar list on Page 7 (bars stay as a secondary detail).

### B3. New: Aptitude category chart
A clean horizontal grouped bar with score, max, and a coloured proficiency band (Beginner / Developing / Proficient / Advanced) so the number means something.

### B4. Cover page redesign
- Two-tone composition (deep primary field, accent stripe) with serif display title, small caps subtitle, monogrammed "HBK" mark, student name in large display weight, meta line in muted small caps.
- "Inside this report" right-aligned vertical index (5 highlights, not paragraph text).
- Date + report ID in tiny mono at the foot.

### B5. New page: Executive Summary (becomes new page 3, pushing TOC to page 2)
A single-page "at a glance" with three large stat tiles (Top Holland Code, Top Intelligence, Aptitude %), a one-paragraph narrative auto-composed from the top scores, and a thin recommendation strip showing the two streams. This is what counsellors / parents will read first.

### B6. Typography & spacing pass
- Larger section numerals (display-weight) with hairline accent rule.
- Consistent 11/9/8 pt scale, more line-height, more white space.
- Section pages get a coloured chapter-tab in the top-right corner.
- Page footer: thin rule + small caps brand left, page count right (already there but restyled).
- Replace plain `•` bullets with custom small squares in accent colour.

### B7. "What this means" callouts
On each detailed-insights page (RIASEC, MI, Aptitude), add a tinted callout box with a personalised one-line interpretation derived from the student's top score in that dimension.

### B8. Score legend & methodology mini-section
A short box at the bottom of the snapshot/exec-summary explaining the 0–100 score, sample size, and that this is guidance not diagnosis. Builds trust.

### B9. Better recommended-streams cards
Cards get an icon (emoji we already have), a subtle gradient, and three labelled chips: *Class 11–12 subjects · Top exam · Avg starting salary*. Currently it's only tagline + subjects.

---

## Out of scope (not changing this round)

- No new data collection or schema changes.
- No bilingual content — English only as already decided.
- No changes to test flow, payment flow, or admin.
- No new npm dependencies — all charts are pure jsPDF vector drawing so the bundle size is unchanged.

---

## Technical notes

- Hexagon and radar geometry: standard polar→cartesian (`cx + r*cos(θ), cy + r*sin(θ)`) with θ stepping by `2π/n`. jsPDF `lines()` and `triangle()`/`lines()` support filled polygons.
- All new colours added as semantic constants in the existing `COLORS` object — no design-token changes elsewhere in the app.
- Page numbering re-stamp at the end of `generatePsychometricPDF` already handles dynamic page counts; new pages slot in cleanly.
- For Part A, the metadata call is `GET /spreadsheets/{id}?fields=sheets.properties.title` and the create call is `POST /spreadsheets/{id}:batchUpdate` with `{ requests: [{ addSheet: { properties: { title: "Submissions" } } }] }`.

---

## Deliverables
- Updated `src/lib/psychometricReport.ts` (redesigned report).
- New tiny helper `src/lib/pdfCharts.ts` (hexagon + radar drawing functions).
- Updated `src/server/sheetsSync.functions.ts` (auto-create tab + backfill the missed row once on next deploy via a one-off call from a small admin-only script — or simply on next student submission, which will trigger header init too).
- No UI/route changes.
