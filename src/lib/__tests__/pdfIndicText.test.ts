import { describe, it, expect } from "vitest";
import { isIndic, maskReportString, translateReportString } from "../pdfIndicText";

describe("Indic PDF text", () => {
  it("sends Gujarati, Hindi and Marathi text down the shaped path", () => {
    expect(isIndic("એપ્ટિટ્યુડ સ્નેપશોટ")).toBe(true);
    expect(isIndic("मल्टिपल इंटेलिजेंस")).toBe(true);
    expect(isIndic("Aptitude Snapshot")).toBe(false);
  });

  it("translates leftover English with the student's name and numbers kept", () => {
    const dict = { "{N0} scored {D0}% overall.": "{N0}એ કુલ {D0}% મેળવ્યા." };
    const out = translateReportString("Aarav scored 75% overall.", dict, ["Aarav"]);
    expect(out).toBe("Aaravએ કુલ 75% મેળવ્યા.");
    expect(maskReportString("Riya scored 12", ["Riya"]).key).toBe("{N0} scored {D0}");
  });

  it("leaves text untouched when no translation exists", () => {
    expect(translateReportString("CLAT", {}, [])).toBe("CLAT");
  });
});
