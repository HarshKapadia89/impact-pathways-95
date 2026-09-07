import fs from "node:fs";
import path from "node:path";
const topicDir = "src/lib/upskilling/topics";
const excludedKeys = new Set(["slug", "url", "emoji"]);
const phrases = [];
function collect(value, key = "") {
  if (Array.isArray(value)) return value.forEach((item) => collect(item, key));
  if (value && typeof value === "object") return Object.entries(value).forEach(([childKey, item]) => { if (!excludedKeys.has(childKey)) collect(item, childKey); });
  if (typeof value === "string" && value.trim()) phrases.push(value.trim());
}
for (const file of fs.readdirSync(topicDir).filter((file) => file.endsWith(".json"))) collect(JSON.parse(fs.readFileSync(path.join(topicDir, file), "utf8")));
let failed = false;
for (const lang of ["gu", "hi", "mr"]) {
  const dict = JSON.parse(fs.readFileSync(`public/auto/${lang}.json`, "utf8"));
  const missing = [...new Set(phrases)].filter((phrase) => !dict[phrase]);
  console.log(`${lang}: ${missing.length} missing LevelUp phrases`);
  if (missing.length) { console.log(missing.slice(0, 10).map((s) => `  - ${s.slice(0, 140)}`).join("\n")); failed = true; }
}
if (failed) process.exit(1);
