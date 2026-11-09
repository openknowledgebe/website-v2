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
  { label: "Projects", to: "/activities" },
  { label: "Stories", to: "/stories" },
  { label: "About", to: "/about" },
  { label: "Team", to: "/team" },
];

export const socials = {
  github: "https://github.com/openknowledgebe",
  twitter: "https://twitter.com/openknowledgebe",
  facebook: "https://www.facebook.com/OpenKnowledgeBE",
  linkedin: "https://www.linkedin.com/company/open-knowledge-belgium/",
};

// The registered office is deliberately not published on the site.
export const contact = {
  name: "Open Knowledge Belgium VZW / asbl",
  enterpriseNumber: "BE 0845 419 930",
  email: "info@openknowledge.be",
};

export const footerNav = [
  { label: "Projects", to: "/activities" },
  { label: "Stories", to: "/stories" },
  { label: "About", to: "/about" },
  { label: "Team", to: "/team" },
  { label: "Jobs", to: "/team#opportunities" },
];

export const attributions =
  "Source code available under the MIT license. Content on this site is licensed under a Creative Commons Attribution 4.0 International License.";

// Bank details for the donate block (homepage and /donate).
// Leave `iban` empty to hide the QR code; fill it in (spaces allowed) to switch it on.
export const donate = {
  iban: "BE45 0688 9551 0289",
  bic: "",
  beneficiary: "Open Knowledge Belgium vzw",
  message: "Donation Open Knowledge Belgium",
  sponsorEmail: "info@openknowledge.be",
  // The headline of the ask. It names the thing and the stake; keep it that concrete.
  headline: "Give open projects in Belgium a home.",
};
