# Open Knowledge Belgium website

The website of **[Open Knowledge Belgium](https://openknowledge.be)**, a non-profit (vzw/asbl) that
gives open-knowledge and open-data projects in Belgium a home.

[![Live site](https://img.shields.io/badge/live-openknowledge.be-641bff)](https://openknowledge.be)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](LICENSE)
[![Deploy to GitHub Pages](https://github.com/openknowledgebe/website-v2/actions/workflows/deploy.yml/badge.svg)](https://github.com/openknowledgebe/website-v2/actions/workflows/deploy.yml)

It is a static site built with [Astro](https://astro.build). All content is plain Markdown in this
repository, so anyone can read it, review it and propose a change. There is no CMS and no login.

---

## ✨ Contributing

Contributions are welcome: fix a typo, add a story, update a project, or improve the site itself.

The easiest way is to **edit a Markdown file on GitHub** (the ✏️ button on any file) and open a
pull request. For anything bigger, fork the repository and run it locally (see below).

| I want to… | Edit |
|---|---|
| Publish a **story** | add a file in [`src/content/stories/`](src/content/stories) |
| Add or update a **project** | a file in [`src/content/activities/`](src/content/activities) |
| Change the **About** or **Team** page, or the **board** | [`src/content/pages/`](src/content/pages) |
| Change the **homepage** | [`src/pages/index.astro`](src/pages/index.astro) |
| Update **navigation, footer or contact details** | [`src/config/site.ts`](src/config/site.ts) |

A maintainer reviews every pull request. Once it is merged into `main`, the site rebuilds and
deploys to [openknowledge.be](https://openknowledge.be) automatically.

Found a mistake but do not want to edit it yourself?
[Open an issue](https://github.com/openknowledgebe/website-v2/issues) or write to
info@openknowledge.be.

**Two things we will not merge from outside the board:** changes to the bank account in
`src/config/site.ts`, and changes to who is listed on the board.

## 🚀 Run it locally

You need [Node.js](https://nodejs.org) 22 or newer and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # production build in dist/ (this is also what CI runs)
pnpm preview    # serve the production build
```

## 📝 Editing content

Content files are Markdown with a small YAML block at the top.

**A story**: `src/content/stories/<yyyymmdd-slug>.md`

```yaml
---
title: Your headline
date: 2026-01-31
author: Your name
tags: [open data, event]
excerpt: One-sentence summary (optional).
---
Your post, in Markdown. Images go in public/uploads/stories/<slug>/ and are
referenced like /uploads/stories/<slug>/photo.jpg
```

**A project** (called an "activity" in the code): `src/content/activities/<slug>.md`

- `status` decides where it appears on the Projects page:

  | `status` | Section |
  |---|---|
  | `active` | Running now |
  | `paused` | Looking for organisers |
  | `independent` | Now independent (add `independent_since: 2024` if you know the year) |
  | `past` (the default) | Built since 2012 |

- Other fields: `name`, `logo`, `color`, `tags`, `to` (website), `catchphrase`, `featured_image`,
  `contact_info`, `members`.
- After adding or replacing a `featured_image`, run `node scripts/make-web-images.mjs`. It makes
  the web-sized copy the pages use.
- After adding or replacing a logo, run `node scripts/analyze-logos.mjs`. It decides whether the
  logo needs a light or a dark background.

**About and Team**: `src/content/pages/about.md` and `team.md`. The board of directors lives in
`team.md` under `board.members` and also appears on the homepage.

**Photos of people**: only add photos you have the right to publish, and strip location data
from them first.

## 🧩 How it is built

| | |
|---|---|
| Framework | [Astro](https://astro.build), static output, no client framework |
| Styling | One plain CSS file, [`src/styles/site.css`](src/styles/site.css) |
| Scripts | Two small inline scripts (mobile menu, donate amounts) |
| Content | Markdown via Astro content collections |
| Hosting | GitHub Pages, deployed on every push to `main` |

```
src/
├── components/     # Astro components (navigation, footer, iRail map, donate block…)
├── content/
│   ├── stories/    # stories (Markdown)
│   ├── activities/ # projects and communities (Markdown)
│   └── pages/      # About and Team (Markdown + frontmatter)
├── config/site.ts  # navigation, footer, contact and donation details, in one place
├── data/           # generated data: station coordinates, logo brightness
├── layouts/        # the page shell: head, navigation, "Where next", footer
├── lib/            # content and map helpers
├── pages/          # routes
└── styles/site.css # all styles
public/uploads/     # images, referenced with absolute /uploads/… paths
scripts/            # image and logo helpers
```

More detail for people (and AI assistants) working on the code:

- [`CLAUDE.md`](CLAUDE.md): orientation, conventions and gotchas
- [`DESIGN.md`](DESIGN.md): the visual system (colours, type, components, what to avoid)
- [`PRODUCT.md`](PRODUCT.md): who the site is for and what must stay true

## 🎨 Design in three lines

- White pages, near-black purple text, and the logo purple `#641bff` only on things you can click
- One typeface: Work Sans
- Photographs and maps carry the pages; text stays short

## 💜 Donations

The donate block (homepage and [`/donate`](src/pages/donate.astro)) shows the organisation's bank
account and builds a payment QR code (the EPC / SEPA standard that Belgian banking apps scan) for
each amount at build time. There is no payment provider and no third-party script.

## 🚆 The iRail map

The map of Belgium on the homepage is drawn from the station coordinates in
`src/data/stations.json`, taken once from [iRail](https://docs.irail.be/)'s open data. It is a
picture made at build time: the site makes no requests to iRail and does not embed it. iRail
itself lives at [irail.be](https://irail.be/).

## 📄 License

The code is released under the [MIT License](LICENSE). Site content is © Open Knowledge Belgium
and shared under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) unless noted otherwise.
Logos of projects and partners belong to their owners.
