// Make web-sized copies of the large photos the site shows at full width.
// The originals in public/uploads/ are camera files (up to 11 MB); pages use the
// copies in public/uploads/web/ instead.
//
// - every activity's featured image  → public/uploads/web/activities/<slug>.webp
// - the homepage photos listed below → public/uploads/web/home/…
// - the social sharing image         → public/og-default.jpg
//
// Run after adding or replacing a featured image:  node scripts/make-web-images.mjs

import fs from "node:fs";
import path from "node:path";

// Resolve sharp from pnpm's non-hoisted store.
const pnpmDir = "node_modules/.pnpm";
const sharpPkg = fs.readdirSync(pnpmDir).find((d) => d.startsWith("sharp@"));
const sharp = (await import(path.resolve(pnpmDir, sharpPkg, "node_modules/sharp/lib/index.js")))
  .default;

const ROOT = process.cwd();
const UP = path.join(ROOT, "public/uploads");
const ACT = path.join(ROOT, "src/content/activities");

// The osoc 2019 group photo, cropped to the band that holds the crowd (2:1).
const heroCrop = { left: 0, top: 597, width: 5305, height: 2652 };
const osoc19 = "activities/open-summer-of-code/osoc19.jpg";
const osoc18 =
  "stories/20210125-new-year-new-challenge-i’m-leaving-open-knowledge-belgium-after-4-fantastic-years/osoc18.jpg";

const jobs = [
  { src: osoc19, out: "web/home/hero-2400.webp", extract: heroCrop, width: 2400, quality: 78 },
  { src: osoc19, out: "web/home/hero-1400.webp", extract: heroCrop, width: 1400 },
  { src: osoc19, out: "web/home/hero-mobile-1000.webp", width: 1000 },
  { src: osoc18, out: "web/home/osoc18.webp", width: 1400 },
  { src: "home/29451957778_1b81cd8128_o.jpg", out: "web/home/working-session.webp", width: 1800 },
  { src: "team/openbelgium.jpg", out: "web/home/volunteers.webp", width: 1400 },
];

for (const f of fs.readdirSync(ACT).filter((f) => f.endsWith(".md"))) {
  const slug = f.replace(/\.md$/, "");
  const md = fs.readFileSync(path.join(ACT, f), "utf8");
  const m = md.match(/^featured_image:\n(?:\s+.*\n)*?\s+image:\s*(\/uploads\/\S+)/m);
  if (m) jobs.push({ src: m[1].replace(/^\/uploads\//, ""), out: `web/activities/${slug}.webp`, width: 1400 });
}

for (const job of jobs) {
  const from = path.join(UP, job.src);
  const to = path.join(UP, job.out);
  if (!fs.existsSync(from)) {
    console.warn(`skip (missing): ${job.src}`);
    continue;
  }
  fs.mkdirSync(path.dirname(to), { recursive: true });
  let img = sharp(from).rotate();
  if (job.extract) img = img.extract(job.extract);
  const info = await img
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: job.quality ?? 76 })
    .toFile(to);
  console.log(`${job.out}  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)} kB`);
}

// Social sharing image: the same crowd, 1200×630.
const og = await sharp(path.join(UP, osoc19))
  .extract(heroCrop)
  .resize({ width: 1200, height: 630, fit: "cover" })
  .jpeg({ quality: 80 })
  .toFile(path.join(ROOT, "public/og-default.jpg"));
console.log(`og-default.jpg  ${og.width}×${og.height}  ${(og.size / 1024).toFixed(0)} kB`);
