import type { Blog } from "@/common/blog/blog";
import { markdownToText } from "@/lib/markdown";

const SITE_URL = "https://lukasolsen.no";
const WORDS_PER_MINUTE = 220;

export type BlogListItem = Omit<Blog, "Content" | "rawContent"> & {
  url: string;
  excerpt: string;
};

export const getBlogUrl = (blog: Pick<Blog, "id">) => `/blogs/${blog.id}`;

export const getAbsoluteBlogUrl = (blog: Pick<Blog, "id">) =>
  new URL(getBlogUrl(blog), SITE_URL).toString();

export const getReadingTime = (
  blog: Pick<Blog, "readingTime"> & Partial<Pick<Blog, "rawContent">>,
) => {
  if (blog.readingTime) return blog.readingTime;

  const text =
    typeof blog.rawContent === "string" ? markdownToText(blog.rawContent) : "";
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
};

export const getExcerpt = (
  blog: Pick<Blog, "summary"> & Partial<Pick<Blog, "rawContent">>,
) => {
  if (blog.summary) return blog.summary;

  const text =
    typeof blog.rawContent === "string"
      ? markdownToText(blog.rawContent).replace(/\s+/g, " ").trim()
      : "";
  return text.length > 180 ? `${text.slice(0, 177)}...` : text;
};

export const serializeBlog = (blog: Blog): BlogListItem => {
  const { Content: _Content, rawContent: _rawContent, ...metadata } = blog;

  return {
    ...metadata,
    url: getBlogUrl(blog),
    readingTime: getReadingTime(blog),
    excerpt: getExcerpt(blog),
  };
};

export const serializeBlogs = (blogs: Array<Blog>) => blogs.map(serializeBlog);

export const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
