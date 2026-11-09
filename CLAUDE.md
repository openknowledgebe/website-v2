# Contributor & AI-assistant notes

Quick orientation for anyone (human or AI) working in this repo. See the
[README](README.md) for the friendly overview and contribution guide.

This is the **Open Knowledge Belgium website** — a static [Astro](https://astro.build) site.
Content is plain Markdown in `src/content/`; there is intentionally **no CMS**. Please keep it
that way.

## Commands

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # static build → dist/  (also the CI check)
```

Node 22+ is required. Deploys happen automatically via GitHub Actions on push to `main`.

## Layout

```
src/
├── components/         # Astro components: SiteNav, SiteFooter, Signpost, IrailMap, GivePanel, …
├── content/{stories,activities,pages}/   # Markdown content collections
├── config/site.ts      # nav, footer, socials, contact, bank account — single source
├── layouts/SiteLayout.astro  # head + nav + "Where next" signpost + footer, used by every page
├── lib/content.ts      # collection helpers (sorting, excerpts, logo colours, web image paths)
├── lib/stations.ts     # projects station coordinates for the map
├── data/               # generated: stations.json, logo-luminance.json
├── styles/site.css     # all styles, plain CSS, scoped under body.ok
└── pages/              # routes
public/uploads/         # all images (referenced with absolute /uploads/… paths)
public/uploads/web/     # generated web-sized copies of the large photos
scripts/                # analyze-logos.mjs, make-web-images.mjs, migrate-content.mjs (one-shot import)
```

There is no Tailwind, no React and no animation library: pages are Astro components with one
stylesheet and a few small inline scripts. `PRODUCT.md` records who the site is for and what must
stay true, and `DESIGN.md` records the visual system (tokens, type scale, components,
what is refused); read both before design work.

## Content notes

- **Activities** (`src/content/activities/*.md`, shown as "Projects"):
  `status: active | paused | independent | past` (default `past`). Active ones appear under
  "Running now", paused ones (still part of OKBE, waiting for organisers) under "Looking for
  organisers", independent ones (spun out of OKBE; optional `independent_since: <year>`) under
  "Now independent"; with none active the page shows an invitation. After adding or replacing a `featured_image`, run `node scripts/make-web-images.mjs`
  (pages use the copy in `public/uploads/web/activities/<slug>.webp` and fall back to the original).
  After adding or replacing a logo, run `node scripts/analyze-logos.mjs` to refresh
  `data/logo-luminance.json`, which picks the background behind each logo.
- **Stories** (`src/content/stories/*.md`): listed by year, paginated 24 per page.
- **Team** (`src/content/pages/team.md`): board members live under `board.members`
  (`name`, `role`, `photo`, `linkedin`); photos in `public/uploads/team/`. The homepage reads the
  same list.
- **Donations**: `donate` in `src/config/site.ts` holds the IBAN and the headline of the ask.
  `GiveCase.astro` is the reason to give, `GivePanel.astro` the bank details and QR codes (built
  at build time). Gifts are for all projects: do not centre the ask on iRail, and do not publish
  cost figures. Gifts are not tax-deductible; do not claim otherwise. The ask must name the thing
  and the stake: never a headline with an unexplained "it".
- **Not published, on purpose**: a postal address, and any newsletter signup (there is no
  newsletter). Do not write that the organisation is run by volunteers.
- **Homepage** is `src/pages/index.astro` (no Markdown file). Its iRail map is a static
  picture drawn from `src/data/stations.json` at build time.
- **iRail is not embedded here**: no live departures, no calls to `api.irail.be`. The site shows
  it in its own colours (`IrailMap.astro`) and links to https://irail.be/.

## Design rules

- White ground, ink `#1c1229`, and the logo purple `#641bff` only on actions and links.
- One typeface (Work Sans Variable). Headings stay modest: no display sizes above 3rem.
- Real photographs and maps carry the pages. No decorative shapes, gradients, cards with borders,
  eyebrow labels or numbered sections. Keep copy short.
- Every page ends with the "Where next" signpost and offers a way to give.
- Text on the tinted donate band uses `#4f4466`, not the grey used on white.

## Gotchas worth knowing

- **Markdown headings are shifted down**: a `#` heading inside content renders as `<h2>` (see the
  small rehype plugin in `astro.config.mjs`), because the page title is already the `<h1>`.
- **CSS resets use `:where()`** so single-class rules can override them. Keep it that way; a
  plain `.ok p { margin: 0 }` would beat component rules.
- **Images with `width`/`height` attributes need `height: auto`** in CSS when their width is fluid.
- **pnpm 11.9+** reads native-build approval from `pnpm-workspace.yaml`
  (`allowBuilds: { esbuild: true, sharp: true }` + `onlyBuiltDependencies`); the `package.json`
  `pnpm` field is ignored, and `astro build` fails its dependency check without it.
- The `Duplicate id` build warning only appears while `pnpm dev` is running alongside a
  build (shared `.astro` cache) — a clean `pnpm build` is silent. Not a real bug.

## Verifying changes

Prefer confirming a change with `pnpm build` and by checking the built output in `dist/`. Use
`pnpm dev` for visual review.
