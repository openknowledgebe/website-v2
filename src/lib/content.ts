import { getCollection, type CollectionEntry } from "astro:content";

export type Story = CollectionEntry<"stories">;
export type Activity = CollectionEntry<"activities">;

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

/** Strip markdown to a short plain-text excerpt. */
export function excerptFrom(markdown: string, max = 160): string {
  const text = markdown
    .replace(/^---[\s\S]*?---/, "") // frontmatter (safety)
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> text
    .replace(/`{1,3}[^`]*`{1,3}/g, "") // inline/blocks code
    .replace(/[#>*_~-]/g, "") // md symbols
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

export async function getSortedStories(): Promise<Story[]> {
  const stories = await getCollection("stories");
  return stories.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getActivities(): Promise<Activity[]> {
  const activities = await getCollection("activities");
  return activities.sort((a, b) => a.data.name.localeCompare(b.data.name));
}

/** Activities split into running, paused (waiting for organisers), spun out and archived groups. */
export async function getActivitiesByStatus(): Promise<{
  active: Activity[];
  paused: Activity[];
  independent: Activity[];
  past: Activity[];
}> {
  const all = await getActivities();
  return {
    active: all.filter((a) => a.data.status === "active"),
    paused: all.filter((a) => a.data.status === "paused"),
    independent: all.filter((a) => a.data.status === "independent"),
    past: all.filter((a) => a.data.status === "past"),
  };
}

/** One short line for a project's status, or null for plain past projects in a list. */
export function statusLine(a: Activity): string {
  const d = a.data;
  if (d.status === "active") return "Running now";
  if (d.status === "paused") return "Paused, looking for organisers";
  if (d.status === "independent") {
    return d.independent_since ? `Independent since ${d.independent_since}` : "Now independent";
  }
  return "Past project";
}

import fs from "node:fs";
import logoLuminance from "@/data/logo-luminance.json";

/**
 * Web-sized copy of an activity's featured image (made by scripts/make-web-images.mjs),
 * falling back to the original upload when no copy exists yet.
 */
export function activityImage(a: Activity): string | null {
  const original = a.data.featured_image?.image;
  if (!original) return null;
  const web = `/uploads/web/activities/${a.id}.webp`;
  return fs.existsSync(`public${web}`) ? web : original;
}

const BRAND_DARK = "#301948"; // fallback dark chip for light logos with no brand colour

// Normalise a stored brand colour to a usable CSS hex, or null if white/empty.
export function brandColor(color?: string): string | null {
  if (!color) return null;
  const c = color.trim().toLowerCase();
  if (c === "#ffff" || c === "#fff" || c === "#ffffff" || c === "white" || c === "") return null;
  return c;
}

/**
 * Pick a chip background so the logo is always legible:
 * - light logo  → its brand colour if set, else brand purple
 * - dark logo   → white
 */
export function logoChipBg(slug: string, color?: string): string {
  const isLight = (logoLuminance as Record<string, string>)[slug] === "light";
  if (!isLight) return "#ffffff";
  return brandColor(color) ?? BRAND_DARK;
}

export function storyExcerpt(story: Story): string {
  return story.data.excerpt || excerptFrom(story.body ?? "");
}

export const STORIES_PER_PAGE = 24;
