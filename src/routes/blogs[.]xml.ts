import { blogs } from "@/data";
import {
  escapeXml,
  getAbsoluteBlogUrl,
  getExcerpt,
  serializeBlog,
} from "@/lib/blogs";
import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://lukasolsen.no";

const buildFeed = () => {
  const items = blogs
    .map((blog) => {
      const item = serializeBlog(blog);
      const url = getAbsoluteBlogUrl(blog);
      const updatedAt = blog.updated_at ?? blog.created_at;

      return `
    <item>
      <title>${escapeXml(blog.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <description>${escapeXml(getExcerpt(blog))}</description>
      <pubDate>${new Date(blog.created_at).toUTCString()}</pubDate>
      <category>${escapeXml(blog.category)}</category>
      <author>hello@lukasolsen.no (Lukas Olsen)</author>
      <source url="${escapeXml(new URL("/blogs.xml", SITE_URL).toString())}">Lukas Olsen</source>
      <comments>${escapeXml(url)}</comments>
      <updated>${escapeXml(new Date(updatedAt).toISOString())}</updated>
      <lukas:tagline>${escapeXml(blog.tagline)}</lukas:tagline>
      <lukas:readingTime>${item.readingTime}</lukas:readingTime>
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:lukas="https://lukasolsen.no/xmlns/blog">
  <channel>
    <title>Lukas Olsen blog</title>
    <link>${SITE_URL}/blogs</link>
    <description>Technical notes on projects, AI systems, design tools, and engineering decisions.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <ttl>60</ttl>${items}
  </channel>
</rss>`;
};

export const Route = createFileRoute("/blogs.xml")({
  server: {
    handlers: {
      GET: async () => {
        return new Response(buildFeed(), {
          headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
          },
        });
      },
    },
  },
});
