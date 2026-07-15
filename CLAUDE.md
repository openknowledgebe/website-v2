# okbe website-v2

New version of the Open Knowledge Belgium org site (openknowledge.be). Replaces the
old Gatsby 2 + Netlify CMS site. Umbrella-org marketing site — NOT the iRail platform.

## Working preferences

- **Do NOT drive the browser to verify changes.** Don't use Playwright / browser
  screenshots. Verify with `pnpm build` output, by grepping the built HTML/CSS, or
  image analysis — and let the user preview themselves (`pnpm dev` → localhost:4321).
  Ask first if a visual check genuinely needs a screenshot.
- Content is plain Markdown, edited in-repo (no CMS). Keep it that way.
- Brand: deep purple `#301948` (`brand`), electric purple `#641bff` (`electric`).
  Titles = Work Sans, body = Chivo.

## Stack

Astro 5 (static) · React islands (`client:visible` / `client:load`) · Tailwind 3 +
Relume design system · `motion` (Framer Motion) for scroll reveals · pnpm.

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # static → dist/
```

## Structure

```
src/
├── components/react/   # animated islands (Hero, Navbar, ActivitiesGrid, StoriesGrid, NewsletterCTA, Reveal)
├── components/ui/      # vendored Relume primitives (button, card, input)
├── content/{stories,activities,pages}/   # Markdown content collections
├── config/site.ts      # nav, footer, socials, contact (single source)
├── lib/content.ts      # collection helpers (sorting, excerpts, cards, logoChipBg)
├── data/logo-luminance.json  # generated: which activity logos are light/dark
└── pages/              # routes
public/uploads/         # all images (referenced by absolute /uploads/... paths)
scripts/                # migrate-content.mjs (one-shot), analyze-logos.mjs
```

## Content notes

- **Activities** (`src/content/activities/*.md`): `status: active | past` (default `past`).
  Active ones show under "Active now" on `/activities` + home; with none active, both show
  an invitation band. Logo chip background is chosen automatically by logo brightness — if you
  add/replace a logo, run `node scripts/analyze-logos.mjs` to refresh `logo-luminance.json`.
- **Stories** (`src/content/stories/*.md`): ~130 migrated posts, paginated 24/page.
- **Team** (`src/content/pages/team.md`): board members live under `board.members`
  (name, role, photo, linkedin). Photos in `public/uploads/team/`.
- **Newsletter/GA forms** feed a Notion CRM (workspace "Open Knowledge Belgium",
  MCP `notion-okbe`). See the session memory `okbe-notion-crm` for DB IDs.

## Gotchas (learned the hard way)

- **Relume Tailwind preset replaces core scales.** It overrides `maxWidth`
  (only xxs/xs/sm/md/lg/xl/xxl, and `xl`=64rem!), `fontSize`, and `gradientColorStops`.
  So `max-w-2xl`/`max-w-3xl` silently render full-width. **Use arbitrary values**
  like `max-w-[42rem]` for reading measures. Article body = `max-w-[42rem]`.
- **Use the `motion` package, import `motion/react`** — NOT `framer-motion`.
- **`relume-icons`** has no `ArrowOutward`; use `ArrowForward`. ~60 icons only.
- **pnpm 11.9** needs `pnpm-workspace.yaml` with `allowBuilds: {esbuild: true, sharp: true}`
  + `onlyBuiltDependencies` — the `package.json` `pnpm` field is ignored, and `astro build`
  fails its deps-check without it.
- **No-JS reveal fallback:** motion bakes `opacity:0` into SSR HTML; `BaseLayout` has a
  `<noscript>` rule forcing that content visible. Keep it.
- **The `Duplicate id "team"` build warning** only appears while `pnpm dev` is also running
  (shared `.astro` cache) — a clean `pnpm build` is silent. Not a real bug.
