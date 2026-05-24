# Make the aptitude/psychometric test materially more accurate (AI-assisted)

## Honest framing first

No psychometric test can be "100% accurate" — that's not how the science works, and any product promising it loses credibility with counsellors and schools. What we *can* do is make HBK's test demonstrably more accurate than the typical Indian career-test product by combining:

1. **Validated deterministic scoring** (what we have — RIASEC, MI, aptitude % per category, grade-banded item pool). This must remain the source of truth.
2. **AI-assisted response-quality checks** that catch the things that actually wreck accuracy in real student data: straight-lining, contradictory answers, rushing, language confusion.
3. **An AI interpretation layer** that turns the raw scores into a personalised narrative + career recommendations using the **best available reasoning model**, grounded in our deterministic numbers (not free-form guessing).
4. **A small calibration set** so we can measure accuracy honestly over time instead of asserting it.

The headline claim on the marketing page changes from "100% accuracy" to something defensible — e.g. *"Validated RIASEC + MI + aptitude scoring, reviewed by an AI counsellor model on every report."*

## What currently exists (baseline)

- `src/lib/psychometricData.ts` — item bank (30 RIASEC + 24 MI + ~75 aptitude with grade bands) and `buildReport()` deterministic scoring.
- `src/lib/careerMatch.ts` — `recommendStreamsAccurate` + `rankCareerPaths` mapping scores to streams/careers.
- `src/lib/psychometricReport.ts` — PDF generation from the report object.
- `src/routes/test.take.tsx` — test runner. No response-quality check; submits straight to PDF.
- `supabase/functions/chat-career` — chatbot using `google/gemini-2.5-flash`.

The scoring is deterministic and reasonable. The two real accuracy gaps are: (a) we don't detect low-quality response patterns, and (b) we don't use any AI to interpret the report — the PDF text comes from hand-written templates in `psychometricReportStrings.ts`.

## The plan

### 1. Response-quality validation (deterministic, runs before AI)

Add `src/lib/responseQuality.ts` that, given the raw RIASEC/MI/aptitude answers, computes:

- **Straight-lining score**: % of identical consecutive Likert answers in each section. Flag > 60%.
- **Variance score**: standard deviation per section. Flag near-zero variance.
- **Contradiction score**: pairs of items in the same RIASEC type / MI type where the answers diverge by ≥ 3 points. Flag > N contradictions.
- **Time-per-item** (if we capture it — small addition to `test.take.tsx`): flag sections answered faster than a realistic threshold (~2 sec/item).
- **Aptitude effort**: % blank or "I don't know" responses.

Output: `{ quality: "high" | "medium" | "low", flags: string[] }`. Low-quality submissions get a soft warning in the UI and a note on the PDF — "These results may not reflect the student accurately; retake recommended." This alone removes the biggest source of bad reports in real schools.

### 2. New AI counsellor edge function — `supabase/functions/interpret-report`

A new Lovable AI Gateway function that takes the *already-computed* `ScoreReport` plus quality flags and returns a structured interpretation.

- **Model**: `openai/gpt-5.5` (top-tier reasoning) with `reasoning: { effort: "high" }`, fallback to `google/gemini-2.5-pro` if rate-limited. Both are on the Lovable AI Gateway, no extra keys needed.
- **Structured output via tool calling** (not free-form JSON) with this schema:

```ts
{
  consistencyVerdict: "high" | "medium" | "low",
  consistencyExplanation: string,
  riasecNarrative: string,            // 2 short paras, references actual top-3 types
  miNarrative: string,                // 2 short paras, references actual top-3 intelligences
  aptitudeNarrative: string,          // ties aptitude % to RIASEC/MI fit
  recommendedStreams: [{ slug, fitRationale }],   // must be one of our 20 handbook slugs
  recommendedCareers: [{ name, fitRationale, watchOuts }],
  developmentSuggestions: string[],
  parentTalkingPoints: string[],
  redFlags: string[]                  // e.g. "answered too fast", "all 3s"
}
```

- **Grounding rules** baked into the system prompt: only use the numbers we pass in; never invent scores; recommended streams MUST be from our 20-slug list; if quality is "low", say so plainly instead of producing a confident narrative.
- **Two-model cross-check** (optional toggle, off by default to control cost): if `consistencyVerdict` is "high" but the second model disagrees on the top stream, mark the report as `needs-counsellor-review`.

### 3. Wire the interpretation into the report

- `src/routes/test.take.tsx` — after `buildReport()`, call the new edge function, await the structured response, and pass it into PDF generation.
- `src/lib/psychometricReport.ts` — render the AI narrative sections alongside the existing deterministic charts. The numbers (RIASEC bars, MI bars, aptitude %) stay exactly as they are; the AI only writes the prose around them.
- Cache the AI response in the saved report so re-opening doesn't re-call the model.
- Loading state in the UI: "Your counsellor AI is reviewing your answers… ~15–25 sec."

### 4. Calibrate the item bank itself (one-time cleanup)

A one-off `scripts/auditItems.ts` (not shipped) that uses GPT-5.5 to review every item in `psychometricData.ts` for:
- Ambiguity / double-barrelled wording
- Gujarati translation drift vs the English original
- Aptitude items with multiple defensible answers
- RIASEC items that map to the wrong type
- Difficulty mis-bucketing by grade band

The script outputs a CSV of suggested fixes; you (or a counsellor) approve them; we patch `psychometricData.ts`. This is the single highest-leverage accuracy win — bad items create bad scores no matter how good the AI on top is.

### 5. Marketing/UX honesty

Replace any "100% accurate" copy with one of:
- "Validated RIASEC + Multiple Intelligences + grade-banded aptitude, every report reviewed by an AI counsellor."
- "Each report is double-checked: deterministic scoring + an AI consistency review before it reaches you."
- Add a "How accurate is this?" link on `/test` that explains the methodology, the response-quality checks, and the option to retake.

### 6. Measurement (so we can improve over time)

Add a `report_feedback` table: student/parent/counsellor rates each report 1–5 + free-text. Surface aggregate accuracy in the admin view. Without measurement, "accuracy" is just a vibe.

## Files we'll touch

- **New**: `supabase/functions/interpret-report/index.ts` (+ `supabase/config.toml` block)
- **New**: `src/lib/responseQuality.ts`
- **New**: `src/lib/aiInterpretation.ts` (client wrapper + types)
- **New**: `scripts/auditItems.ts` (one-off, local)
- **New migration**: `report_feedback` table with RLS
- **Edited**: `src/lib/psychometricReport.ts` (render AI sections)
- **Edited**: `src/routes/test.take.tsx` (call interpretation, show loading, capture timing)
- **Edited**: `src/routes/test.index.tsx` (replace accuracy claims with honest copy + methodology link)
- **Edited**: `src/lib/sampleReport.ts` (include sample AI narrative so the sample PDF reflects the new flow)

## What I am NOT proposing

- Replacing the deterministic score with an AI score. The numbers stay deterministic and auditable — the AI only interprets them.
- Sending raw answers to the AI before scoring. The AI sees aggregated scores + quality flags only — no item-level data — to keep latency, cost and risk down.
- Claiming "100% accuracy" anywhere in the product. We'd rather lose that line than lose a counsellor's trust.
