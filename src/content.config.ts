import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const stories = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/stories" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string().optional(),
    tags: z.array(z.string()).default([]),
    excerpt: z.string().optional(),
  }),
});

const member = z.object({
  name: z.string(),
  task: z.string().optional(),
  picture: z.string().optional(),
  contact_info: z
    .object({
      email: z.string().optional(),
      twitter: z.string().optional(),
      linkedin: z.string().optional(),
      github: z.string().optional(),
    })
    .partial()
    .optional(),
  id: z.string().optional(),
});

const activities = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/activities" }),
  schema: z.object({
    name: z.string(),
    // "active" = currently running, "past" = archived. Defaults to past, so an
    // activity is only shown as current when explicitly marked active.
    status: z.enum(["active", "past"]).default("past"),
    // Force the "pick this up / revive it" CTA on a past activity even if it still
    // has a live external site. (Dead-site activities get the CTA automatically.)
    revivable: z.boolean().default(false),
    logo: z.string().optional(),
    color: z.string().optional(),
    tags: z.array(z.string()).default([]),
    to: z.string().optional(),
    catchphrase: z.string().optional(),
    featured_image: z
      .object({ alt: z.string().optional(), image: z.string().optional() })
      .optional(),
    contact_info: z
      .object({
        email: z.string().optional(),
        socials: z
          .object({
            twitter: z.string().optional(),
            facebook: z.string().optional(),
            linkedin: z.string().optional(),
            github: z.string().optional(),
          })
          .partial()
          .optional(),
      })
      .partial()
      .optional(),
    members: z.array(member).default([]),
  }),
});

// Singleton pages (home, about, team) — loose, passthrough frontmatter.
const pages = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/pages" }),
  schema: z
    .object({
      seo: z.object({ title: z.string().optional(), description: z.string().optional() }).partial().optional(),
    })
    .passthrough(),
});

export const collections = { stories, activities, pages };
