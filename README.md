# Open Knowledge Belgium website

The official website of **[Open Knowledge Belgium](https://openknowledge.be)** — an umbrella
organisation (vzw/asbl) for the many open-knowledge and open-data initiatives in Belgium.

[![Live site](https://img.shields.io/badge/live-openknowledge.be-641bff)](https://openknowledge.be)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](LICENSE)
[![Deploy to GitHub Pages](https://github.com/openknowledgebe/website-v2/actions/workflows/deploy.yml/badge.svg)](https://github.com/openknowledgebe/website-v2/actions/workflows/deploy.yml)

It's a fast, static site built with [Astro](https://astro.build). All content lives as plain
Markdown in this repo, so it's easy to read, review, and contribute to — no CMS or login required.

---

## ✨ Contributing

We welcome contributions from the community — fixing a typo, adding a story, updating an
activity, or improving the site itself.

The easiest way: **edit a Markdown file straight on GitHub** (use the ✏️ button on any file) and
open a pull request. For anything bigger, fork the repo and run it locally (below).

Common edits:

| I want to… | Edit |
|---|---|
| Publish a **story / blog post** | add a file in [`src/content/stories/`](src/content/stories) |
| Add or update an **activity / project** | a file in [`src/content/activities/`](src/content/activities) |
| Change the **Home / About / Team** pages | [`src/content/pages/`](src/content/pages) |
| Update **navigation, footer, contact** | [`src/config/site.ts`](src/config/site.ts) |

See [Editing content](#-editing-content) for the field details. Every pull request gets a preview
build, and once merged it deploys to [openknowledge.be](https://openknowledge.be) automatically.

## 🚀 Run it locally

Requires [Node.js](https://nodejs.org) 22+ and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # production build → dist/
pnpm preview    # preview the production build
```

## 🧩 Tech stack

| | |
|---|---|
| Framework | [Astro](https://astro.build) — static output |
| Interactivity & animation | React islands + [`motion`](https://motion.dev) (scroll reveals, hover) |
| Styling | Tailwind CSS + the [Relume](https://relume.io) design system + OKBE brand tokens |
| Content | Markdown via Astro content collections |
| Hosting | GitHub Pages (auto-deploy on push to `main`) |

## 📁 Project structure

```
src/
├── components/
│   ├── react/     # interactive/animated islands (Hero, Navbar, grids, newsletter…)
│   └── ui/        # design-system primitives (button, card, input)
├── content/
│   ├── stories/    # blog posts (Markdown)
│   ├── activities/ # projects & communities (Markdown)
│   └── pages/      # Home / About / Team (Markdown frontmatter)
├── config/site.ts  # nav, footer, socials, contact — one place
├── layouts/        # page shell + SEO/head
├── lib/            # content helpers
├── pages/          # routes
└── styles/         # global styles + article typography
public/uploads/     # images, referenced with absolute /uploads/… paths
```

## 📝 Editing content

All content is plain Markdown with a small YAML frontmatter block at the top.

**A story** — `src/content/stories/<yyyymmdd-slug>.md`

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

**An activity** — `src/content/activities/<slug>.md`

- `status: active` lists it under **“Active now”**; `status: past` (the default) files it under
  **“Past activities”**. When nothing is active, the site invites people to start something.
- Other fields: `name`, `logo`, `tags`, `to` (website), `catchphrase`, `featured_image`,
  `contact_info`, `members`.

**Home / About / Team** — `src/content/pages/{home,about,team}.md`.

## 🎨 Brand

- Deep purple `#301948` and electric purple `#641bff`
- Headings in **Work Sans**, body in **Chivo**

## 📣 Newsletter

The signup form posts to an [n8n](https://n8n.io) automation
(`automation.openknowledge.be`) that stores subscribers. The endpoint lives in
[`src/config/site.ts`](src/config/site.ts).

## 📄 License

Code is released under the [MIT License](LICENSE). Site content is © Open Knowledge Belgium,
shared under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) unless noted otherwise.
