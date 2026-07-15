# Open Knowledge Belgium — website (v2)

A modern rebuild of [openknowledge.be](https://openknowledge.be), the umbrella-organisation
site for Open Knowledge Belgium.

Built with **Astro** + **React islands** + **Tailwind** (Relume design system), with animated
sections and git-based Markdown content (no CMS).

## Tech stack

| Concern | Choice |
|---|---|
| Framework | [Astro 5](https://astro.build) (static output) |
| Interactive/animated sections | React islands hydrated with `client:visible` / `client:load` |
| Animation | [`motion`](https://motion.dev) (Framer Motion), tasteful scroll reveals + hover |
| Styling | Tailwind 3 + [`@relume_io/relume-tailwind`](https://relume.io) preset + OKBE brand tokens |
| UI components | Relume (vendored, shadcn-style — we own the files) |
| Content | Markdown in `src/content/*` via Astro content collections |
| Package manager | pnpm |

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # static build -> dist/
pnpm preview    # preview the production build
```

## Project structure

```
src/
├── components/
│   ├── react/        # animated islands (Hero, Navbar, grids, CTA, Reveal)
│   ├── ui/           # vendored Relume primitives (button, card, input)
│   ├── Footer.astro
│   └── PageHeader.astro
├── content/
│   ├── stories/      # ~130 blog posts (Markdown)
│   ├── activities/   # project/community pages (Markdown)
│   └── pages/        # home / about / team singletons (Markdown frontmatter)
├── config/site.ts    # nav, footer, socials, contact
├── layouts/          # BaseLayout (SEO/head) + PageLayout (nav + footer)
├── lib/content.ts    # collection helpers (sorting, excerpts, cards)
├── pages/            # routes
└── styles/global.css # Tailwind + fonts + article/prose styles

public/uploads/       # migrated images (stories / activities / team / home)
```

## Editing content

All content is plain Markdown — edit it in the repo (or on GitHub) and push.

- **A story:** add `src/content/stories/<yyyymmdd-slug>.md` with frontmatter
  `title`, `date`, `author`, `tags`, optional `excerpt`. Images go in
  `public/uploads/stories/<slug>/` and are referenced with absolute `/uploads/...` paths.
- **An activity:** add `src/content/activities/<slug>.md` (`name`, `status`, `logo`,
  `tags`, `to`, `catchphrase`, `featured_image`, `contact_info`, `members`).
  - `status: active` shows it under **"Active now"** on `/activities` and on the home page.
  - `status: past` (the default) files it under **"Past activities"**.
  - With no active activities, the home page and `/activities` show an invitation to
    start one instead of an empty grid.
- **Home / About / Team:** edit `src/content/pages/{home,about,team}.md`.
- **Nav / footer / contact:** edit `src/config/site.ts`.

## Brand

- Deep purple `#301948` (`brand`), electric purple `#641bff` (`electric`)
- Titles: Work Sans · Body: Chivo

## Notes

- The old Gatsby + Netlify CMS site was migrated with `scripts/migrate-content.mjs`
  (kept for reference).
- The newsletter form currently falls back to a `mailto:` subscribe. Wire a real
  endpoint by passing `action` to `<NewsletterCTA>`.
