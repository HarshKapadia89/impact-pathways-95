import { describe, expect, it } from "vitest";
import { rowToScoreReport } from "../adminReportPdf";

describe("admin PDF regeneration from stored scores", () => {
  it("keeps stored MI scores and averages aptitude percentages", () => {
    const r = rowToScoreReport({
      student_name: "A", grade: "10", age: 15,
      riasec: { R: 40 }, multiple_intelligences: { Linguistic: 80 },
      aptitude: { verbal: 60, numerical: 80 },
      riasec_top: ["R"], mi_top: ["Linguistic"], aptitude_top: ["numerical"],
    });
    expect(r.mi.Linguistic).toBe(80);
    expect(r.aptitudeOverall).toBe(70);
  });
});
