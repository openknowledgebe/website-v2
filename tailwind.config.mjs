import relumePreset from "@relume_io/relume-tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,js,ts,jsx,tsx,mdx}"],
  presets: [relumePreset],
  theme: {
    extend: {
      // Re-point gradient stops (the preset replaces theme.gradientColorStops).
      gradientColorStops: ({ theme }) => theme("colors"),

      fontFamily: {
        // Titles: Work Sans. Body: Chivo. (Matches OKBE brand.)
        title: ['"Work Sans Variable"', '"Work Sans"', "system-ui", "sans-serif"],
        body: ['"Chivo"', "system-ui", "sans-serif"],
        sans: ['"Chivo"', "system-ui", "sans-serif"],
      },

      // Relume typographic ramp the published v3 preset omits.
      fontSize: {
        h1: ["3.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        h2: ["3rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        h3: ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        h4: ["2rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        h5: ["1.5rem", { lineHeight: "1.35", letterSpacing: "-0.01em" }],
        h6: ["1.25rem", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
        large: ["1.25rem", { lineHeight: "1.5" }],
        medium: ["1.125rem", { lineHeight: "1.6" }],
        regular: ["1rem", { lineHeight: "1.6" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        tiny: ["0.75rem", { lineHeight: "1.5" }],
      },

      colors: {
        // OKBE brand
        brand: {
          DEFAULT: "#301948", // deep purple (primary)
          50: "#f4f1f9",
          100: "#e7e0f2",
          200: "#cfc0e6",
          300: "#a98fd1",
          400: "#7f5bb8",
          500: "#5f37a0",
          600: "#4a2782",
          700: "#301948", // primary
          800: "#241236",
          900: "#180c24",
        },
        electric: {
          DEFAULT: "#641bff", // electric purple (secondary / accent)
          50: "#f1ebff",
          100: "#e2d5ff",
          200: "#c6acff",
          300: "#a882ff",
          400: "#8a58ff",
          500: "#641bff",
          600: "#5314e0",
          700: "#420fb3",
          800: "#310b85",
          900: "#210758",
        },
        // Relume neutral ramp remapped toward the brand purple.
        neutral: {
          darkest: "#301948",
          darker: "#3f2560",
          dark: "#6b5a85",
          DEFAULT: "#a99fb8",
          light: "#e9e5ef",
          lighter: "#f5f3f9",
          lightest: "#ffffff",
          white: "#ffffff",
          black: "#180c24",
        },
        // Default (light) scheme — sections override per scheme.
        scheme: {
          background: "#ffffff",
          foreground: "#f5f3f9",
          text: "#301948",
          border: "#301948",
          "btn-text": "#ffffff",
        },
      },

      // Modern refresh: soft rounded corners (old site was mostly sharp).
      borderRadius: {
        button: "0.5rem",
        card: "0.75rem",
        image: "1rem",
        form: "0.5rem",
        badge: "9999px",
        checkbox: "0.25rem",
        carousel: "0.75rem",
        dropdown: "0.5rem",
      },
    },
  },
};
