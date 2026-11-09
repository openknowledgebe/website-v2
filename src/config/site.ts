// Central site configuration (nav, footer, socials, contact).
// Derived from the old Gatsby content/settings so editors have one place to look.

export const site = {
  name: "Open Knowledge Belgium",
  shortName: "OKBE",
  url: "https://openknowledge.be",
  description:
    "Open Knowledge Belgium is an umbrella organisation (non-profit/vzw/asbl) for numerous Open Knowledge initiatives in Belgium. We make knowledge sharing possible and let different organisations and individuals cross-pollinate.",
  tagline: "A world where knowledge creates power for the many, not the few",
  email: "info@openknowledge.be",
  teamEmail: "team@openknowledge.be",
};

export const nav = [
  { label: "About", to: "/about" },
  { label: "Activities", to: "/activities" },
  { label: "Stories", to: "/stories" },
  { label: "Team", to: "/team" },
];

export const socials = {
  github: "https://github.com/openknowledgebe",
  twitter: "https://twitter.com/openknowledgebe",
  facebook: "https://www.facebook.com/OpenKnowledgeBE",
  linkedin: "https://www.linkedin.com/company/open-knowledge-belgium/",
};

export const contact = {
  lines: [
    "Open Knowledge Belgium VZW / asbl",
    "Kempische steenweg 303/48",
    "3500 Hasselt, Belgium",
    "BE 0845 419 930",
  ],
  email: "info@openknowledge.be",
};

export const footerNav = [
  { label: "About", to: "/about" },
  { label: "Team", to: "/team" },
  { label: "Activities", to: "/activities" },
  { label: "Stories", to: "/stories" },
  { label: "Jobs", to: "/team#opportunities" },
];

export const attributions =
  "Source code available under the MIT license. Content on this site is licensed under a Creative Commons Attribution 4.0 International License.";

// Newsletter signup endpoint, injected at build time (never hard-code it here).
// Set PUBLIC_NEWSLETTER_ENDPOINT in .env locally, or the NEWSLETTER_ENDPOINT repository
// variable for the GitHub Pages build. When it is empty, the signup block falls back to
// an "email us" link instead of a form that cannot submit.
export const newsletterEndpoint: string =
  (import.meta.env.PUBLIC_NEWSLETTER_ENDPOINT as string | undefined)?.trim() ?? "";
