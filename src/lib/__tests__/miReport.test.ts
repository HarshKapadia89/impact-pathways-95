import { describe, it, expect } from "vitest";
import { buildReport, MI_ITEMS } from "@/lib/psychometricData";
import { normalizeMiForReport } from "@/lib/psychometricReport";
import { getReportStrings } from "@/lib/psychometricReportStrings";

describe("Multiple Intelligences in the PDF report", () => {
  it("shows 100 for every intelligence when all MI answers are 'strongly agree'", () => {
    const mi = Object.fromEntries(MI_ITEMS.map((i) => [i.id, 5]));
    const r = normalizeMiForReport(buildReport({}, mi, {}));
    const t = getReportStrings("en");
    for (const k of Object.keys(t.mi)) expect(r.mi[k]).toBe(100);
    expect(t.mi[r.miTop[0]]).toBeDefined();
  });
});
