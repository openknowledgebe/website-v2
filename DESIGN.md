---
name: Open Knowledge Belgium
description: White ground, purple-black ink, real photographs and a station map; every page ends in a signpost with giving first.
colors:
  purple: "#641bff"
  purple-deep: "#4b0fd0"
  paper: "#ffffff"
  ink: "#1c1229"
  ink-2: "#584f66"
  line: "#e3deeb"
  tint: "#f4f0fd"
  ink-on-tint: "#4f4466"
  line-on-tint: "#d6cdea"
  control-line-on-tint: "#c9bfe0"
typography:
  display:
    fontFamily: "'Work Sans Variable', 'Work Sans', system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 1.1rem + 2.6vw, 3rem)"
    fontWeight: 620
    lineHeight: 1.12
    letterSpacing: "-0.022em"
  headline:
    fontFamily: "'Work Sans Variable', 'Work Sans', system-ui, sans-serif"
    fontSize: "clamp(1.625rem, 1.15rem + 1.6vw, 2.375rem)"
    fontWeight: 620
    lineHeight: 1.12
    letterSpacing: "-0.022em"
  title-lg:
    fontFamily: "'Work Sans Variable', 'Work Sans', system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1rem + 1.2vw, 1.875rem)"
    fontWeight: 620
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'Work Sans Variable', 'Work Sans', system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 620
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "'Work Sans Variable', 'Work Sans', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  body-article:
    fontFamily: "'Work Sans Variable', 'Work Sans', system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.65
  small:
    fontFamily: "'Work Sans Variable', 'Work Sans', system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "'Work Sans Variable', 'Work Sans', system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.55
  caption:
    fontFamily: "'Work Sans Variable', 'Work Sans', system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.55
rounded:
  control: "6px"
  image: "4px"
spacing:
  gutter: "clamp(1.125rem, 4vw, 2.5rem)"
  wrap: "76rem"
  section: "clamp(4rem, 9vw, 7.5rem)"
  section-tight: "clamp(2rem, 4.5vw, 3.5rem)"
  column-gap: "clamp(2rem, 5vw, 4.5rem)"
  header-gap: "clamp(2rem, 4vw, 3.25rem)"
  measure: "42rem"
components:
  button-primary:
    backgroundColor: "{colors.purple}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "0 1.25rem"
    height: "2.875rem"
  button-primary-hover:
    backgroundColor: "{colors.purple-deep}"
    textColor: "{colors.paper}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 1.25rem"
    height: "2.875rem"
  button-quiet-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  arrow-link:
    textColor: "{colors.purple}"
  nav:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    height: "4.25rem"
  amount-option:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 1rem"
    height: "2.875rem"
  amount-option-checked:
    backgroundColor: "{colors.purple}"
    textColor: "{colors.paper}"
  station-pick:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "999px"
    padding: "0 0.8rem"
    height: "2.25rem"
  station-pick-pressed:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  give-band:
    backgroundColor: "{colors.tint}"
    textColor: "{colors.ink}"
  signpost-row:
    textColor: "{colors.ink}"
    typography: "{typography.title-lg}"
    padding: "clamp(1rem, 2.2vw, 1.5rem) 0"
---

# Design System: Open Knowledge Belgium

Recorded on 2026-11-09 from the shipped code (`src/styles/site.css`, `src/layouts/SiteLayout.astro`, `src/components/*.astro`, `src/pages/`). Where this file and the stylesheet disagree, the stylesheet is right and this file needs an update.

## Overview

**Creative North Star: "The Signpost"**

The site shows the people and the running infrastructure instead of describing them. The ground is white, the ink is a near-black purple, and the logo purple appears only where something can be done: a button, a link, the station you picked. Everything else is photographs of the organisation's own community, a map of Belgium drawn from 577 station coordinates, and short text set in one typeface at modest sizes. The wayfinding comes from the Belgian cycle-node network: each page ends in a "Where next" list of places to go, and the first of them is always a way to give.

Structure is carried by hairlines and whitespace, not by containers. Lists are ruled rows (stories, signpost), sections are separated by generous vertical space, and the only filled surface is the lightly tinted band that holds the donate block. There are no shadows at rest, no gradients and no ornament.

The site deliberately avoids the dark poster look (giant headline, rotated ticker, concentric rings, outlined numbered cards, no photography): it reads as a template, not as this organisation.

**Key Characteristics:**
- White paper, purple-black ink, one accent that means "you can act here".
- One typeface, four weights, no heading above 3rem.
- Real photographs with plain captions, and a map made of data.
- Ruled lists and open space instead of cards.
- Every page closes with the "Where next" signpost and offers a way to give.
- Plain CSS in one file, tokens as custom properties on `body.ok`, classes prefixed `ok-`.

## Colors

A two-ink palette on white with a single saturated accent; the accent is the logo colour and it is rationed.

### Primary
- **Logo Purple** (`purple`, #641bff): primary buttons, arrow links, links inside article text, the signpost arrows, the selected donation amount, the picked station dot and its ring, the hover dot on the map, the underline under the current nav item, the focus ring, text selection and the caret. About 6.7:1 against white, so it carries text and white text sits on it.
- **Deep Purple** (`purple-deep`, #4b0fd0): the hover state of Logo Purple, on primary buttons and article links. Nothing else.

### Neutral
- **Paper** (`paper`, #ffffff): the page, the navigation bar, form controls, the QR panel.
- **Purple-Black Ink** (`ink`, #1c1229): all headings and body text, the map dots (at 0.66 opacity), the strong rule that opens a list, the quiet button outline, the pressed station chip, the map tooltip, code blocks, the QR modules.
- **Second Ink** (`ink-2`, #584f66): supporting text on white (ledes, captions, dates, platform numbers, footer). About 7.7:1 on white.
- **Hairline** (`line`, #e3deeb): 1px rules between rows and sections, the nav bottom border, the footer top border, chip and logo-frame outlines.
- **Lilac Tint** (`tint`, #f4f0fd): the donate band, the placeholder behind images and missing portraits, inline code, the "bring it back" panel on project pages.
- **Ink on Tint** (`ink-on-tint`, #4f4466): supporting text whenever it sits on Lilac Tint. Replaces Second Ink there.
- **Hairline on Tint** (`line-on-tint`, #d6cdea): section rules inside the donate band. **Control Line on Tint** (`control-line-on-tint`, #c9bfe0): borders of the amount options and copy buttons in that band.

### Named Rules
**The Action Purple Rule.** Purple marks something you can act on or the thing you just chose. It never fills a section, tints a heading, colours an icon that is not part of a link, or decorates. Navigation links and titles stay ink and show an underline on hover.

**The Tint Text Rule.** On the tinted band, supporting text uses Ink on Tint and rules use Hairline on Tint. Second Ink and Hairline are for white ground only.

**The Project Colour Exception.** The only colours outside this palette are a project's own brand colour or a computed light/dark backing behind its logo (`brandColor`, `logoChipBg` in `src/lib/content.ts`), set inline on that project's frame or chip. They belong to the project, not to the site.

## Typography

**Display Font:** Work Sans Variable (self-hosted through `@fontsource-variable/work-sans`; fallback Work Sans, system-ui, sans-serif)
**Body Font:** the same family
**Label/Mono Font:** none; code inherits the family at 0.9em on a tint chip

**Character:** One humanist grotesque doing every job. Hierarchy comes from weight and a short size ramp, not from a second face or from scale.

### Hierarchy
- **Display** (620, clamp(1.875rem, 1.1rem + 2.6vw, 3rem), 1.12, -0.022em, balanced): the single `h1` of a page. Capped at 24ch.
- **Headline** (620, clamp(1.625rem, 1.15rem + 1.6vw, 2.375rem), 1.12, -0.022em, balanced): section `h2`. Section headers are capped at 44rem.
- **Title Large** (620, clamp(1.25rem, 1rem + 1.2vw, 1.875rem), 1.2, -0.02em): signpost destinations. The picked station name (1.375 to 1.75rem) and a running project's name (1.5 to 2rem) are the same step tuned to their column.
- **Title** (620, 1.125rem, 1.3, -0.01em): `h3`, tile and person names. Drops to 1rem in compact grids and side columns.
- **Body** (400, 1.0625rem, 1.55): default text. Ledes are capped at 34 to 38rem.
- **Body Article** (400, 1.125rem, 1.65): long-form Markdown, capped at 42rem. Article headings are 1.625 / 1.3125 / 1.125rem at 620.
- **Small** (400, 0.9375rem): tile descriptions, signpost sub-lines, dates, facts, footer.
- **Label** (500 to 600, 0.875rem): chips, copy buttons, captions under photographs, platform numbers.
- **Caption** (400, 0.8125rem): definition-list terms, the map tooltip, the licence line.

Weights in use: 400 text, 500 nav links and chips, 560 story titles and fact values, 600 buttons and labels, 620 headings and emphasised figures. Times, amounts, years and account numbers use tabular numerals.

### Named Rules
**The Three Rem Rule.** No type on the site is larger than 3rem. If a page seems to need a bigger headline, it needs a photograph instead.

**The One Face Rule.** Work Sans Variable only. No second typeface, no uppercase tracking, no italics for emphasis; use weight 620.

**The Sentence Rule.** Headings are plain sentences in sentence case ("This map is 577 train stations. Pick one."). No label sits above a heading and no number in front of it.

## Layout

A centred column (`wrap`, 76rem plus a fluid gutter of clamp(1.125rem, 4vw, 2.5rem) each side). Photographs in `ok-hero` and `ok-band` ignore the column and run the full width of the window; their captions return to it, right-aligned.

- **Two-column splits** are asymmetric, 7fr / 5fr (opening statement, station map and its note, donate paths, running projects) or 5fr / 7fr (people, footer), with a column gap of clamp(2rem, 5vw, 4.5rem). Reading pages use a fixed side column: 13rem of facts beside a 42rem article, or an article beside an 18rem aside.
- **The project mosaic** is a 12-column grid: one row of 7 + 5, then rows of 4 + 4 + 4. Photographs are cropped to a fluid height (12.5 to 17.5rem, 15 to 26rem for the first row), not to a ratio.
- **Vertical rhythm:** sections take clamp(4rem, 9vw, 7.5rem) of padding top and bottom; inner pages use the tight variant (clamp(2rem, 4.5vw, 3.5rem) above, clamp(3rem, 6vw, 5rem) below). A section header sits clamp(2rem, 4vw, 3.25rem) above its content. Inside components, spacing steps are 0.5, 0.75, 1, 1.25, 1.5, 2 and 3rem.
- **Sticky elements:** the navigation (4.25rem tall) and, on wide screens, the facts column and project aside (offset 6rem). In-page anchors carry a 6rem scroll margin so they clear the bar.
- **Page skeleton** (`SiteLayout`): skip link, navigation, `main` (page intro or opening statement, sections, optional full-width photograph, "Where next" signpost), footer. Inner pages open with `PageIntro`: optional back link, `h1`, one-line lede, optional actions.

Breakpoints (max-width, in rem so they follow text size):

| Width | Change |
|---|---|
| 56rem | Every two-column split becomes one column; sticky side columns become static; mosaic goes to two per row with the wide tile full width |
| 48rem | Nav links collapse into the "Menu" disclosure; footer and paired columns stack; the large board grid goes from three to two |
| 40rem | Hero photograph changes from 2:1 to 3:2 (with a dedicated mobile crop); story years stack above their lists |
| 36rem | Mosaic becomes one column and its pictures take a 3:2 ratio |
| 30rem | QR code and bank details stack, details first |

## Elevation & Depth

Flat. Depth is conveyed by hairlines, by the tinted band, and by photographs. Nothing is lifted at rest and nothing gains a shadow on hover.

### Shadow Vocabulary
- **Menu drop** (`box-shadow: 0 24px 32px -24px rgb(28 18 41 / 0.3)`): under the open small-screen menu only, because it overlays page content.

### Named Rules
**The Flat Rule.** Surfaces separate by a 1px rule or by whitespace. A shadow is allowed only on something that floats over the page, and today that is the mobile menu alone.

## Shapes

Small, quiet corners: controls and panels at 6px (`rounded.control`), photographs and portraits at 4px (`rounded.image`). Full-width photographs have square corners because they bleed off the window. The station chips are the one fully rounded shape (999px). Borders are always 1px: ink for the rule that opens a list or a side column, hairline for the rows after it.

Recurring forms: the ruled row (ink rule on top, hairline between entries), the dot (577 station circles of radius 3.9 in the map's own units), and one arrow glyph drawn as a 24-unit stroke icon (`Arrow.astro`, stroke 2, round caps; 28px at stroke 1.75 in the signpost). No other icons exist.

## Components

Plain and direct: controls look like controls, lists look like timetables.

### Buttons
- **Shape:** 6px corners, minimum height 2.875rem, padding 0 1.25rem, weight 600. In the navigation bar, 2.5rem tall.
- **Primary:** Logo Purple fill, white text. Hover: Deep Purple. One per view is the norm, and it is the giving action when there is one.
- **Quiet:** transparent with a 1px ink outline. Hover: ink fill, white text. Used for the organisational path ("Talk to us about sponsoring", "Email the team").
- **Arrow link:** purple text at weight 600 followed (or preceded, for "back") by the arrow. Hover: underline, and the arrow slides 4px. This is the secondary action everywhere.
- **Focus (all interactive elements):** 2px Logo Purple outline, offset 3px.
- Transitions are colour only, 0.18s on the shared ease `cubic-bezier(0.16, 1, 0.3, 1)`.

### Chips
- **Station picks:** pill, 2.25rem tall, white with a hairline border, 0.875rem at weight 500. Hover: ink border. Pressed (`aria-pressed="true"`): ink fill, white text.
- **Amount options:** real radio inputs laid invisibly over a 6px box (minimum 4.5 by 2.875rem, white, Control Line on Tint border, weight 600, tabular numerals). Hover: purple border. Checked: purple fill, white text. Keyboard focus draws the standard ring on the box.
- **Copy buttons:** small text buttons (2rem tall, purple text, white fill) beside each bank detail; the label changes to "Copied" for two seconds.

### Cards / Containers
There are no cards. A project tile is a photograph in a 4px frame with its name and one line beneath, and the whole tile is the link (hover: the picture scales to 1.025 over 0.7s, the name underlines). A project without a photograph shows its logo centred on a plain panel with a hairline outline, backed by its own colour. The only filled containers are the tint band for giving (full width) and the "bring it back" panel on dormant project pages (tint, 6px corners, no border).

### Inputs / Fields
- **Select** (any other station): 2.75rem tall, white, 1px grey-purple border, 6px corners, 1rem text, with its label above at 0.875rem.
- **Bank details:** a definition list, term in Caption, value at weight 600 with tabular numerals.
- **QR panel:** 11rem white square with 0.75rem padding, modules in ink, one code per amount, built at build time. Without a bank account it becomes a dashed placeholder with a sentence.

### Navigation
- **Bar:** sticky, white, hairline beneath, 4.25rem tall. Logo left (2.5rem high); links at weight 500 in ink and a primary "Donate" button right.
- **States:** hover underlines; the current section carries a 2px purple underline offset 0.4em (`aria-current="page"`).
- **Small screens (48rem and below):** links move into a `details` disclosure labelled "Menu" (bordered text button, no icon). The panel spans the window under the bar with ruled rows at 1.125rem / 600 and the menu drop shadow. Escape and an outside click close it. "Donate" stays visible in the bar.
- **Footer:** hairline on top, Small text in Second Ink; organisation name and number left, a wrapping row of links right, the licence line beneath. Links darken to ink on hover.
- **Pager:** "Newer" and "Older" arrow links either side of "Page n of m".

### Signpost ("Where next")
The closing element of every page (`Signpost.astro`, rendered by the layout unless `signpost={false}`). A Headline, then at most four ruled rows: an ink rule on top, a hairline under each. Each row is one link: destination in Title Large, one short line in Small beneath, a 28px purple arrow at the right. Order is fixed with giving first (Donate, Sponsor as an organisation, Give your time, See the projects, Read the stories); the section the visitor is already in is left out. Hover: the text slides 0.75rem and the arrow 6px, over 0.35s.

### Station map (iRail panel)
- **Panel:** `IrailMap.astro` shows iRail in its own identity: a panel in iRail's red (`#c72929`, from the project's `color` field, a Project Colour Exception), its white mark and the name "iRail" at 750, and Belgium drawn as one white dot per train station (`StationDots.astro`, coordinates from `src/data/stations.json`). It is a static picture rendered at build time: not interactive, no requests to iRail.
- **Placement:** on the homepage in a 7fr / 5fr split beside a heading, one sentence and two actions (quiet button to irail.be, arrow link to the project page); on the projects index as the picture of the running project; on the iRail page as the lead figure.
- **Motion:** none. The site has no authored animation; only hover and focus transitions.

### Ruled lists
- **Stories:** grouped by year (year in a 6rem left column under an ink rule), each story a row of date (Small, tabular, Second Ink) and title (560). Hover: the title turns purple and underlines.
- **Facts and asides:** a narrow column opened by an ink rule; terms in Caption, values at 560.

### Photographs
Full colour, cropped with `object-fit: cover`, never filtered, overlaid or masked. Hero: full width, 2:1, at most 86vh. Band: full width, clamp(15rem, 40vw, 34rem) tall. Captions are one plain line (what, year) in Label size and Second Ink, right-aligned. Portraits are square at 4px; a missing portrait shows initials on tint.

### Accessibility conventions
- A skip link is the first element; `main` has `id="main"`.
- One `h1` per page; headings in Markdown content are shifted down a level at build time.
- State is carried by attributes, and the styles hang off them: `aria-current="page"`, `aria-pressed`, `:checked`, `details[open]`.
- The station map carries a text label (`role="img"` with `aria-label`); where it is decorative it is hidden from assistive technology.
- Pictures that repeat adjacent text take `alt=""`; photographs that carry information get a descriptive alt.
- `prefers-reduced-motion: reduce` removes every animation and transition.
- Resets are written with `:where()` so a single component class can override them.

## Do's and Don'ts

### Do:
- **Do** start a new page from `SiteLayout` and `PageIntro`, and let the layout close it with the "Where next" signpost.
- **Do** give every page a way to give: the signpost row, plus a primary button where giving is the point.
- **Do** keep Logo Purple (#641bff) for actions, links and the current choice, with Deep Purple (#4b0fd0) as its hover.
- **Do** use Ink on Tint (#4f4466) and Hairline on Tint (#d6cdea) for anything placed on the tinted band.
- **Do** build lists as ruled rows: 1px ink on top, 1px hairline between entries.
- **Do** use the organisation's own photographs, full colour, with a one-line caption; run them the full width or frame them at 4px.
- **Do** cap reading text at 42rem, ledes at 34 to 38rem, and the page title at 24ch.
- **Do** reuse the tokens on `body.ok` (`--paper`, `--ink`, `--ink-2`, `--line`, `--tint`, `--purple`, `--purple-deep`, `--radius`, `--radius-img`, `--gutter`, `--wrap`, `--ease`) and prefix new classes with `ok-`.
- **Do** give every new control a visible focus ring, a minimum height of 2.875rem, and a state that lives in an attribute.
- **Do** keep copy short and claim only what is true today.

### Don't:
- **Don't** set any type above 3rem.
- **Don't** put an eyebrow label, kicker or tag above a heading, and don't number sections.
- **Don't** wrap content in bordered or shadowed cards.
- **Don't** add gradients, decorative shapes, rings, tickers, patterns or illustrations.
- **Don't** use a dark poster look: dark loud grounds, a giant headline, no photography.
- **Don't** use stock or generated images; if there is no real picture, show the project's logo on a plain panel or the station map.
- **Don't** add a second typeface, uppercase letter-spaced text, or an icon set; the arrow is the only icon.
- **Don't** fill a section with purple or use it for decoration.
- **Don't** add scroll-triggered or entrance animation. The site has no authored motion beyond hover and focus transitions.
- **Don't** reintroduce Tailwind, React or an animation library for styling; the system is one plain CSS file.
