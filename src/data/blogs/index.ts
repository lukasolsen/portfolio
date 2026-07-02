import type { Blog } from "@/common/blog/blog";
import { backgradSystemBlog } from "./backgrad-system/backgrad-system";
import { dyplinkEditorialAiBlog } from "./dyplink-editorial-ai/dyplink-editorial-ai";
import { dyplinkPlanningBlog } from "./dyplink-planning/dyplink-planning";

export const blogs = [
  backgradSystemBlog,
  dyplinkEditorialAiBlog,
  dyplinkPlanningBlog,
] satisfies Array<Blog>;

export const publishedBlogs = [...blogs].sort(
  (a, b) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
);

export const getBlogById = (id: string) =>
  publishedBlogs.find((blog) => blog.id === id);

