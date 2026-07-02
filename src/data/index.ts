import { dyplinkAiProject } from "./dyplink-ai/dyplink-ai";
import { backgradProject } from "./backrand/backrand";
import type { Project } from "@/common/project/project";
import { publishedBlogs } from "./blogs";

export const projects: Array<Project> = [dyplinkAiProject, backgradProject];
export const blogs = publishedBlogs;
