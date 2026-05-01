import { generatePsychometricPDF } from "../src/lib/psychometricReport.ts";
import { buildSampleReportInput } from "../src/lib/sampleReport.ts";
import fs from "fs";
for (const lang of ["en","gu"]) {
  const doc = generatePsychometricPDF(buildSampleReportInput(lang));
  const buf = Buffer.from(doc.output("arraybuffer"));
  fs.writeFileSync(`/tmp/sample-${lang}.pdf`, buf);
  console.log(lang, buf.length);
}
