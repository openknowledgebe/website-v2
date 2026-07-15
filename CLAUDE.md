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
├── components/react/   # interactive/animated islands (Hero, Navbar, grids, NewsletterCTA, Reveal)
├── components/ui/      # design-system primitives (button, card, input)
├── content/{stories,activities,pages}/   # Markdown content collections
├── config/site.ts      # nav, footer, socials, contact — single source
├── lib/content.ts      # collection helpers (sorting, excerpts, cards, logo colours)
├── data/logo-luminance.json  # generated: which activity logos are light/dark
└── pages/              # routes
public/uploads/         # all images (referenced with absolute /uploads/… paths)
scripts/                # analyze-logos.mjs, migrate-content.mjs (one-shot import)
```

## Content notes

- **Activities** (`src/content/activities/*.md`): `status: active | past` (default `past`).
  Active ones appear under “Active now”; with none active the page shows an invitation band.
  The logo chip background is picked automatically from each logo's brightness — after adding or
  replacing a logo, run `node scripts/analyze-logos.mjs` to refresh `data/logo-luminance.json`.
- **Stories** (`src/content/stories/*.md`): paginated 24 per page.
- **Team** (`src/content/pages/team.md`): board members live under `board.members`
  (`name`, `role`, `photo`, `linkedin`); photos in `public/uploads/team/`.

## Gotchas worth knowing

- **The Relume Tailwind preset replaces some core scales.** It overrides `maxWidth`
  (only `xxs…xxl`, and `xl` = 64rem!), `fontSize`, and `gradientColorStops`, so classes like
  `max-w-2xl` / `max-w-3xl` silently render full-width. Use arbitrary values such as
  `max-w-[42rem]` for reading measures.
- **Animation uses the `motion` package** (`import … from "motion/react"`), **not** `framer-motion`.
- **`relume-icons`** ships ~60 icons only (e.g. no `ArrowOutward` — use `ArrowForward`).
- **pnpm 11.9+** reads native-build approval from `pnpm-workspace.yaml`
  (`allowBuilds: { esbuild: true, sharp: true }` + `onlyBuiltDependencies`); the `package.json`
  `pnpm` field is ignored, and `astro build` fails its dependency check without it.
- **No-JS fallback:** `motion` bakes `opacity:0` into the SSR HTML, so `BaseLayout` has a
  `<noscript>` rule that forces revealed content visible. Keep it.
- The `Duplicate id "team"` build warning only appears while `pnpm dev` is running alongside a
  build (shared `.astro` cache) — a clean `pnpm build` is silent. Not a real bug.

## Verifying changes

Prefer confirming a change with `pnpm build` and by checking the built output in `dist/`. Use
`pnpm dev` for visual review.
