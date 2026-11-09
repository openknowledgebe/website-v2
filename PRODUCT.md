# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Organisations that build on open data** (public bodies, companies): they check who is behind a project, then sponsor or partner.
- **People who use or passed through the projects**: developers, alumni, mappers, travellers. They give small amounts or their time.
- **Students and volunteers**: they come to join or to start something.
- **Funders and press**: they check mission, governance and track record.

## Product Purpose

The public website of Open Knowledge Belgium vzw/asbl. It shows what the organisation hosts and has built, who is behind it, and how to support it. Success: a first-time visitor understands what Open Knowledge Belgium does and finds a way to give or to get involved within seconds.

## Positioning

Open Knowledge Belgium gives open projects in Belgium a home: servers, a legal structure and help getting started. It hosts iRail and Open Summer of Code. OpenStreetMap Belgium and HackYourFuture Belgium grew up here and now stand on their own. Founded in 2012, local chapter of the Open Knowledge network.

## Operating Context

Static Astro site on GitHub Pages, no backend, no CMS; content is Markdown in `src/content/`.

## Capabilities and Constraints

- No backend: forms and payments must be links or build-time output.
- Donations are by bank transfer (account in `src/config/site.ts`, QR codes built at build time). Gifts are not tax-deductible; never claim otherwise.
- Projects carry `status: active | paused | independent | past`.
- The site does not embed other projects' services (for example iRail's live data); it links to them.
- The site does not publish a postal address and has no newsletter signup.

## Brand Commitments

- Keep the logo recognisable.
- Mission line: "A world where knowledge creates power for the many, not the few."
- Little text. Real people, photographs and maps carry the pages.
- No dark, loud or decorative look: no giant headlines, tickers, ornamental shapes or outlined numbered cards.

## Evidence on Hand

- Photography in `public/uploads/`: Open Summer of Code group shots, working sessions, the Open Belgium 2019 crew, community photos.
- Artefacts: the EqualStreetNames Brussels map, project logos, 130 stories (2012 to 2022), the station coordinates behind the iRail map.
- Never to be fabricated: testimonials, donor counts, financial figures, event dates, tax-deductibility.

## Product Principles

1. Show the work, do not describe it.
2. Every page offers one way to give.
3. Name concrete things; no vague slogans.
4. Only claim what is true today.
