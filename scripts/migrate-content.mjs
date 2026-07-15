// One-shot migration from the old Gatsby repo's /content into Astro collections.
// - Stories  -> src/content/stories/<slug>.md   (+ images to public/uploads/stories/<slug>/)
// - Activities-> src/content/activities/<slug>.md (+ images to public/uploads/activities/<slug>/)
// - Pages    -> src/content/pages/{home,about,team}.md
// - Settings -> src/data/{footer,site,tags}.json (+ header)
// All image references are rewritten to absolute /uploads/... paths so Astro
// never has to resolve them at build time.

import fs from "node:fs";
import path from "node:path";

const OLD = process.argv[2];
const ROOT = process.argv[3];
if (!OLD || !ROOT) {
  console.error("usage: node migrate-content.mjs <oldContentDir> <projectRoot>");
  process.exit(1);
}

const CONTENT = path.join(OLD); // points at .../existing-website/content
const OUT_STORIES = path.join(ROOT, "src/content/stories");
const OUT_ACT = path.join(ROOT, "src/content/activities");
const OUT_PAGES = path.join(ROOT, "src/content/pages");
const OUT_DATA = path.join(ROOT, "src/data");
const PUB = path.join(ROOT, "public/uploads");

for (const d of [OUT_STORIES, OUT_ACT, OUT_PAGES, OUT_DATA, PUB]) {
  fs.mkdirSync(d, { recursive: true });
}

const IMG_EXT = /\.(png|jpe?g|gif|svg|webp|avif)$/i;

function splitFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { fm: "", body: raw };
  return { fm: m[1], body: m[2] };
}

// Rewrite markdown body image references:
//  - protocol-relative  //host/x.png        -> https://host/x.png
//  - bare/relative local file.png (co-located) -> /uploads/<kind>/<slug>/file.png
function rewriteBody(body, urlBase, localFiles) {
  let out = body;
  // protocol-relative -> https
  out = out.replace(/\((\/\/[^)\s]+)\)/g, (_, u) => `(https:${u})`);
  // markdown image/link targets that match a co-located local file
  out = out.replace(/\(([^)\s]+?)(\s+["'][^)]*["'])?\)/g, (full, target, title = "") => {
    const clean = target.replace(/^\.\//, "");
    const base = clean.split("/").pop();
    if (localFiles.has(base) && !/^https?:/i.test(clean) && !clean.startsWith("//")) {
      return `(${urlBase}/${base}${title})`;
    }
    return full;
  });
  return out;
}

function copyImages(srcDir, destDir) {
  const files = fs.readdirSync(srcDir).filter((f) => IMG_EXT.test(f));
  if (files.length) fs.mkdirSync(destDir, { recursive: true });
  for (const f of files) fs.copyFileSync(path.join(srcDir, f), path.join(destDir, f));
  return new Set(files);
}

let counts = { stories: 0, activities: 0, pages: 0 };

// ---- STORIES ----
const storiesDir = path.join(CONTENT, "stories");
for (const slug of fs.readdirSync(storiesDir)) {
  const dir = path.join(storiesDir, slug);
  const md = path.join(dir, "index.md");
  if (!fs.statSync(dir).isDirectory() || !fs.existsSync(md)) continue;
  const raw = fs.readFileSync(md, "utf8");
  const { fm, body } = splitFrontmatter(raw);
  const localFiles = copyImages(dir, path.join(PUB, "stories", slug));
  const newBody = rewriteBody(body, `/uploads/stories/${slug}`, localFiles);
  fs.writeFileSync(path.join(OUT_STORIES, `${slug}.md`), `---\n${fm}\n---\n\n${newBody.trimStart()}`);
  counts.stories++;
}

// ---- ACTIVITIES ----
const actDir = path.join(CONTENT, "activities");
for (const slug of fs.readdirSync(actDir)) {
  const dir = path.join(actDir, slug);
  const md = path.join(dir, "index.md");
  if (!fs.statSync(dir).isDirectory() || !fs.existsSync(md)) continue;
  const raw = fs.readFileSync(md, "utf8");
  let { fm, body } = splitFrontmatter(raw);
  const localFiles = copyImages(dir, path.join(PUB, "activities", slug));
  // rewrite frontmatter image filenames -> absolute /uploads path
  const base = `/uploads/activities/${slug}`;
  fm = fm.replace(/^(\s*(?:logo|image|picture):\s*)(?!\/|https?:|["']?\/)["']?([^"'\n]+?\.(?:png|jpe?g|gif|svg|webp|avif))["']?\s*$/gim,
    (_, k, file) => `${k}${base}/${file.split("/").pop()}`);
  const newBody = rewriteBody(body, base, localFiles);
  fs.writeFileSync(path.join(OUT_ACT, `${slug}.md`), `---\n${fm}\n---\n\n${newBody.trimStart()}`);
  counts.activities++;
}

// ---- PAGES (home, about, team) ----
for (const p of ["home", "about", "team"]) {
  const dir = path.join(CONTENT, "pages", p);
  const md = path.join(dir, "index.md");
  if (!fs.existsSync(md)) continue;
  const raw = fs.readFileSync(md, "utf8");
  let { fm, body } = splitFrontmatter(raw);
  const localFiles = copyImages(dir, path.join(PUB, p));
  const base = `/uploads/${p}`;
  fm = fm.replace(/^(\s*(?:image|picture):\s*)(?!\/|https?:|["']?\/)["']?([^"'\n]+?\.(?:png|jpe?g|gif|svg|webp|avif))["']?\s*$/gim,
    (_, k, file) => `${k}${base}/${file.split("/").pop()}`);
  const newBody = rewriteBody(body, base, localFiles);
  fs.writeFileSync(path.join(OUT_PAGES, `${p}.md`), `---\n${fm}\n---\n\n${newBody.trimStart()}`);
  counts.pages++;
}

// ---- SETTINGS ----
const footerRaw = fs.readFileSync(path.join(CONTENT, "settings/footer/index.md"), "utf8");
fs.writeFileSync(path.join(OUT_DATA, "footer.md"), footerRaw);
fs.copyFileSync(path.join(CONTENT, "settings/sitemetadata/index.json"), path.join(OUT_DATA, "site.json"));
fs.copyFileSync(path.join(CONTENT, "settings/tags/index.json"), path.join(OUT_DATA, "tags.json"));

console.log("Migration complete:", counts);
