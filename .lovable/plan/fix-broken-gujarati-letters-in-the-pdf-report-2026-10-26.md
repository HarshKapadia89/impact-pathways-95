# Fix broken Gujarati letters in the PDF report

## What is actually wrong
The words in the report are spelled correctly (એપ્ટિટ્યુડ, સ્નેપશોટ, મલ્ટિપલ ઇન્ટેલિજન્સ, રિપોર્ટ). The PDF tool draws them wrongly: it puts each letter piece side by side instead of joining them.
- The halant (્) shows up instead of joining letters: "એપ્ટિટ્યુડ" comes out as એપ્‌ટિ...
- The ि sign lands after the letter instead of before it: "રિપોર્ટ" comes out as રપિોર્ટ.
- Joined letters like સ્ન and ન્સ come out broken.

A different AI model won't fix this, because the text is already right. The same problem also breaks Hindi and Marathi reports.

## Fix
1. **Draw Gujarati, Hindi and Marathi text through the browser's own text engine.** The browser joins letters correctly, the same way the website shows them. Every heading, paragraph, label, table cell and chart label in those languages is drawn sharp and high-resolution, then placed in the PDF. English text stays as normal PDF text. Line wrapping uses the browser's own text measurement, so long sentences still wrap correctly.
2. **Second proofread with a stronger model.** Run every report string and every test question in Gujarati through the strongest available model, `openai/gpt-6-astra` (reasoning set to high), using a strict brief: natural, standard Gujarati, the usual spellings for English loanwords (એપ્ટિટ્યુડ, ઇન્ટેલિજન્સ, રિપોર્ટ, સ્નેપશોટ), no mixed scripts. Your four examples go in as the reference spellings. Hindi and Marathi report strings get the same pass.
3. **Translate what is still in English** in the Gujarati, Hindi and Marathi PDFs: the cover page, the parent summary paragraphs, the reasons under each career match, and the aptitude area names.
4. **Regenerate the sample PDFs in a real browser** for grades 8, 10 and 12 in all four languages. Save them as new `_v2` files.
5. **Check every page by eye** for the Gujarati PDFs, and spot-check the Hindi and Marathi ones. In particular, check that the four headings you sent read exactly as you wrote them. Nothing is delivered until no broken letters remain.

## Technical details
- Add `src/lib/pdfIndicText.ts`: load the Noto Gujarati/Devanagari fonts through `FontFace`, then render strings to a canvas at 4x scale. `drawText(doc, text, x, y, {size, weight, color, align, maxWidth})` returns the height it used. `wrap()` uses `measureText`.
- In `psychometricReport.ts` and `pdfCharts.ts`, send every `doc.text` or `splitTextToSize` call through a helper that uses the canvas path when the text contains Indic script, and native jsPDF text otherwise.
- The same helper is used by the post-test download, the `/r/$token` share link, the sample report and the admin copy, so all four are fixed.
- Add a test that a Gujarati string goes down the image path and Latin text does not.
