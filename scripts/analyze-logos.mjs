// Classify each activity logo as "light" or "dark" by average luminance over
// its non-transparent pixels, so the site can pick a contrasting chip background
// (white logos get a dark chip, dark logos get a white chip).
// Output: src/data/logo-luminance.json  { "<slug>": "light" | "dark" }
// Run:    node scripts/analyze-logos.mjs

import fs from "node:fs";
import path from "node:path";

// Resolve sharp from pnpm's non-hoisted store.
const pnpmDir = "node_modules/.pnpm";
const sharpPkg = fs.readdirSync(pnpmDir).find((d) => d.startsWith("sharp@"));
const sharp = (await import(path.resolve(pnpmDir, sharpPkg, "node_modules/sharp/lib/index.js")))
  .default;

const ROOT = process.cwd();
const ACT = path.join(ROOT, "src/content/activities");
const LIGHT_THRESHOLD = 0.62;

const out = {};
for (const f of fs.readdirSync(ACT).filter((f) => f.endsWith(".md"))) {
  const slug = f.replace(/\.md$/, "");
  const md = fs.readFileSync(path.join(ACT, f), "utf8");
  const m = md.match(/^logo:\s*(\S+)/m);
  if (!m) continue;
  const file = path.join(ROOT, "public", m[1]);
  if (!fs.existsSync(file)) continue;
  const { data, info } = await sharp(file)
    .resize(64, 64, { fit: "inside" })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const ch = info.channels;
  let lum = 0,
    n = 0;
  for (let i = 0; i < data.length; i += ch) {
    const a = ch === 4 ? data[i + 3] : 255;
    if (a < 40) continue; // ignore transparent pixels
    lum += (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
    n++;
  }
  const L = n ? lum / n : 0;
  out[slug] = L > LIGHT_THRESHOLD ? "light" : "dark";
}

const dest = path.join(ROOT, "src/data/logo-luminance.json");
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, JSON.stringify(out, null, 2) + "\n");
console.log("Wrote", dest);
console.log(out);
