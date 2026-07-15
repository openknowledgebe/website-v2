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
