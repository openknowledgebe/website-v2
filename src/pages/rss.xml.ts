import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getSortedStories, storyExcerpt } from "@/lib/content";
import { site } from "@/config/site";

export async function GET(context: APIContext) {
  const stories = await getSortedStories();
  return rss({
    title: `${site.name} — Stories`,
    description: site.description,
    site: context.site ?? site.url,
    items: stories.map((story) => ({
      title: story.data.title,
      pubDate: story.data.date,
      description: storyExcerpt(story),
      author: story.data.author,
      link: `/stories/${story.id}/`,
      categories: story.data.tags,
    })),
    customData: `<language>en</language>`,
  });
}
