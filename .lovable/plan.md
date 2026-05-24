# De-risk the handbook content (avoid mohitmangal.com copyright exposure)

The 22 vertical handbooks under `src/lib/handbook/*.json` (engineering, medicine, commerce, design, etc.) clearly mirror Mohit Mangal's "22 career verticals" free handbook structure. The facts (entrance exams, degrees, college names, scope) are not copyrightable — but their **wording, ordering of bullets, taglines, and any distinctive phrasing** are. Same for FAQ/stream-choice articles if we've reused any of them.

The goal: keep every fact, lose every borrowed sentence, and make the result visibly *ours* — HBK Careers, Gujarat-rooted, in our voice — with primary public sources cited so we never depend on mohitmangal.com.

## Approach (recommended): heavy paraphrase + restructure + HBK layer

Three things happen to every handbook entry:

1. **Rewrite** every prose sentence in HBK's voice (warmer, parent-friendly, bilingual-aware). Facts unchanged.
2. **Restructure** sections into a new HBK schema (below) so the on-page order and grouping no longer match the source.
3. **Augment** with HBK-original content that the source doesn't have — Gujarat colleges, GUJCET/ACPC exam paths, scholarship list from `gujaratColleges.ts`, alumni-style example student journeys, and a "How HBK helps" footer.

Net effect: same coverage and depth, ~0% sentence overlap with the source, and a unique local angle.

## New HBK handbook schema

Each `src/lib/handbook/<slug>.json` migrates to:

```jsonc
{
  "slug": "engineering-and-technology",
  "title": "Engineering & Technology",
  "tagline": "<HBK-original one-liner>",
  "version": "hbk-v2",
  "lastReviewed": "2026-05",
  "sources": [
    "https://www.aicte-india.org/...",
    "https://gujacpc.admissions.nic.in/...",
    "https://www.education.gov.in/..."
  ],
  "overview": "<3-4 paragraph HBK rewrite>",
  "whoFitsWell": ["<RIASEC + MI cues, mapped to our test>"],
  "subFields": [{ "name": "...", "whatYouDo": "...", "skillsBuilt": [...] }],
  "afterClass10": { "streamsRequired": [...], "subjectsToTake": [...] },
  "afterClass12": { "degreePaths": [...], "diplomaPaths": [...] },
  "entranceExams": [{ "name": "JEE Main", "level": "national", "window": "Jan & Apr", "officialUrl": "..." }],
  "topInstitutes": { "national": [...], "gujarat": [...] },     // Gujarat list = HBK addition
  "scholarships": [...],                                         // pulled from our DB
  "careerOutcomes": [{ "role": "...", "typicalEmployers": [...], "earlySalaryRangeINR": "..." }],
  "studentJourneys": [                                           // HBK-original mini case studies
    { "name": "Riya, Ahmedabad", "path": "Class 11 PCM \u2192 GUJCET \u2192 LDCE \u2192 ..." }
  ],
  "commonMisconceptions": ["<HBK-written, not copied>"],
  "hbkNextSteps": "<how HBK counsellors / the test help here>"
}
```

The fields `tagline`, `whoFitsWell`, `topInstitutes.gujarat`, `scholarships`, `studentJourneys`, `commonMisconceptions`, and `hbkNextSteps` are **net-new HBK content** — together they make each page substantially different from the source.

## How the rewrite is done (operationally)

For each of the 22 handbooks:

1. **Extract facts** from the existing JSON into a "facts only" sheet (lists of exams, degrees, colleges, salaries — no prose).
2. **Re-source every fact** against a primary public source and record it in `sources[]`:
   - AICTE, NMC, BCI, ICAI, NCHMCT, COA for regulators
   - Official exam sites (JEE, NEET, CLAT, NIFT, NID, CUET, GUJCET, ACPC) for windows & eligibility
   - Official college sites for fees / programmes
   - NCERT / Ministry of Education for stream/subject framing
3. **Generate fresh prose** with Lovable AI Gateway (Gemini 2.5 Pro) using a strict prompt: "Write in HBK Careers' voice for an Indian Class 9–12 student and parent. Use only the facts in the input JSON. Do not reuse phrasing from any external site. Keep paragraphs short. Add bilingual-friendly word choices."
4. **Manual pass** by a counsellor (you / school staff) on 2–3 handbooks first to lock the voice, then apply the same prompt template to the other 19.
5. **Plagiarism check** — run each rewritten handbook through a similarity check vs the original source (script using cosine similarity on shingled n-grams). Anything > 15% overlap goes back through step 3.

## What changes in the codebase

- **`src/lib/handbook/*.json` (22 files)** — rewritten in place to the new schema above. Old fields removed.
- **`src/lib/handbookData.ts`** — extend the TypeScript type to match the new schema; provide back-compat getters so existing pages don't break during the migration.
- **`src/routes/handbook.$slug.tsx`** — render the new sections (`whoFitsWell`, `topInstitutes.gujarat`, `studentJourneys`, `commonMisconceptions`, `hbkNextSteps`, `sources`). Add a small "Sources" footer listing `sources[]` as links.
- **`src/lib/handbookSummaries.json`** — regenerated from the new `tagline` + first paragraph so the index page reflects the new copy.
- **New `scripts/rewriteHandbook.ts`** (one-off, runs locally) — reads old JSON, calls Lovable AI Gateway with the template prompt, writes new JSON. Not shipped to the app bundle.
- **New `scripts/similarityCheck.ts`** — compares each new handbook against a `sources/originals/*.txt` cache (gitignored) and prints overlap %. Used as a gate before merging.
- **Footer note on every handbook page**: "© HBK Careers. Compiled from public sources (AICTE, NCERT, official exam and college websites)." Removes any implicit attribution to a third party.

## Other surfaces to audit

While we're at it, sweep these for borrowed phrasing and apply the same paraphrase pass:

- `src/lib/psychometricReportStrings.ts` (report copy) — if any RIASEC/MI descriptions came from a counselling site, rewrite.
- `src/lib/parentSummary.ts` — verify the parent-facing tone is HBK-original.
- `src/lib/chatbotContext.ts` — the system prompt should reference HBK + cited public sources, not any third party.
- `src/routes/index.tsx`, `src/routes/test.index.tsx`, `src/routes/career.*` — any tagline or "why a career test matters" paragraph gets the same rewrite.

## What we deliberately do NOT do

- Don't shrink the catalog — all 22 verticals stay.
- Don't drop facts (entrance exams, college lists, salary ranges).
- Don't claim originality on data that is public (exam dates, eligibility) — just cite the official source.
- Don't keep any verbatim taglines, headings, or "did you know" boxes from the source.

## Risk after this work

- **Copyright**: very low — facts are uncopyrightable, prose is rewritten and AI-paraphrased with a similarity gate, structure is HBK-specific, and we add substantial original sections (Gujarat layer, journeys, HBK next steps).
- **Trademark**: zero — we never mention or imply Mohit Mangal anywhere.
- **Accuracy**: improved, because every fact is now tied to a primary public source in `sources[]` and dated via `lastReviewed`.

## Suggested rollout

1. Migrate the schema + rewrite **2 pilot handbooks** (e.g. Engineering, Commerce) end-to-end so you can sign off on the voice.
2. Apply the same template to the remaining 20.
3. Run the similarity gate, fix outliers, then ship.
