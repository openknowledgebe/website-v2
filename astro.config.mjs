import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Stories and pages are written with "#" headings; the page title is already the
// <h1>, so headings inside Markdown content start one level down.
function demoteH1() {
  const walk = (node) => {
    if (node.type === "element" && node.tagName === "h1") node.tagName = "h2";
    node.children?.forEach(walk);
  };
  return walk;
}

// https://astro.build/config
export default defineConfig({
  site: "https://openknowledge.be",
  integrations: [sitemap()],
  markdown: { rehypePlugins: [demoteH1] },
});
