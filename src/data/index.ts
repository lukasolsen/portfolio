import { dyplinkAiProject } from "./dyplink-ai/dyplink-ai";
import { backrandProject } from "./backrand/backrand";
import type { Project } from "@/common/project/project";
import type { Blog } from "@/common/blog/blog";
import { planningBlog } from "./dyplink-ai/blogs/planning/planning.tsx";

export const projects: Array<Project> = [dyplinkAiProject, backrandProject];
export const blogs: Array<Blog> = [planningBlog];
