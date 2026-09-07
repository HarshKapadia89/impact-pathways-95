import fs from "node:fs";
import path from "node:path";
const code = process.argv[2];
const names = { gu: "Gujarati", hi: "Hindi", mr: "Marathi" };
if (!names[code]) throw new Error("Usage: node scripts/translate-upskill.mjs gu|hi|mr");
const apiKey = process.env.LOVABLE_API_KEY;
if (!apiKey) throw new Error("LOVABLE_API_KEY is required");
const topicDir = "src/lib/upskilling/topics";
const excludedKeys = new Set(["slug", "url", "emoji"]);
const phrases = [];
function collect(value, key = "") {
  if (Array.isArray(value)) return value.forEach((item) => collect(item, key));
  if (value && typeof value === "object") return Object.entries(value).forEach(([childKey, item]) => { if (!excludedKeys.has(childKey)) collect(item, childKey); });
  if (typeof value === "string" && value.trim()) phrases.push(value.trim());
}
for (const file of fs.readdirSync(topicDir).filter((file) => file.endsWith(".json"))) collect(JSON.parse(fs.readFileSync(path.join(topicDir, file), "utf8")));
const dictionaryPath = `public/auto/${code}.json`;
const dictionary = JSON.parse(fs.readFileSync(dictionaryPath, "utf8"));
const missing = [...new Set(phrases)].filter((phrase) => !dictionary[phrase]);
const batches = Array.from({ length: Math.ceil(missing.length / 20) }, (_, i) => missing.slice(i * 20, i * 20 + 20));
console.log(`${code}: ${missing.length} missing phrases in ${batches.length} batches`);
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function translate(batch) {
  const values = Object.fromEntries(batch.map((value, index) => [String(index), value]));
  const prompt = `Translate every value in this JSON object from English into natural, grammatically correct ${names[code]} for Indian school students. Preserve numeric keys, paragraph breaks, numbers, acronyms, proper names, and URLs. Translate all ordinary educational prose. Return only one valid JSON object with exactly the same keys.\n${JSON.stringify(values)}`;
  for (let attempt = 0; attempt < 8; attempt += 1) {
    try {
      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: "google/gemini-2.5-flash", messages: [{ role: "system", content: "Expert educational translator. Return strict JSON only." }, { role: "user", content: prompt }], temperature: 0.1 }) });
      if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);
      const result = await response.json();
      let raw = result.choices[0].message.content.trim();
      if (raw.startsWith("```")) raw = raw.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
      const translated = JSON.parse(raw);
      if (Object.keys(translated).length !== batch.length || batch.some((_, index) => typeof translated[index] !== "string")) throw new Error("Translation response keys did not match");
      return batch.map((source, index) => [source, translated[index]]);
    } catch (error) { if (attempt === 7) throw error; await wait(Math.min(30000, 1000 * 2 ** attempt)); }
  }
}
let cursor = 0;
const workers = Array.from({ length: Math.min(10, batches.length) }, async () => {
  while (cursor < batches.length) {
    const index = cursor++;
    const translated = await translate(batches[index]);
    for (const [source, target] of translated) dictionary[source] = target;
    fs.writeFileSync(dictionaryPath, `${JSON.stringify(dictionary, null, 2)}\n`);
    if ((index + 1) % 10 === 0 || index + 1 === batches.length) console.log(`${code}: completed ${index + 1}/${batches.length}`);
  }
});
await Promise.all(workers);
console.log(`${code}: saved ${Object.keys(dictionary).length} phrases`);
