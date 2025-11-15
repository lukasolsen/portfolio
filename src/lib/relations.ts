import type { Relation } from "@/common/blog/blog";
import type { Project } from "@/common/project/project";
import type { Blog } from "@/common/blog/blog";

/**
 * Helper function to create a relation from a project
 */
export function createProjectRelation(project: Project): Relation {
  return {
    id: project.id,
    type: "project",
    title: project.title,
    description: project.description,
    tags: project.tags,
    thumbnail: project.logo,
  };
}

/**
 * Helper function to create a relation from a blog
 */
export function createBlogRelation(blog: Blog): Relation {
  return {
    id: blog.id,
    type: "blog",
    title: blog.title,
    description: blog.subtitle,
    tags: blog.tags,
    publishedAt: blog.created_at,
  };
}

/**
 * Helper function to create an external relation
 */
export function createExternalRelation(
  id: string,
  title: string,
  url: string,
  description?: string,
  tags?: string[]
): Relation {
  return {
    id,
    type: "external",
    title,
    description,
    url,
    tags,
  };
}

/**
 * Helper function to create a GitHub relation
 */
export function createGitHubRelation(
  repo: string,
  title: string,
  description?: string,
  tags?: string[]
): Relation {
  return {
    id: repo,
    type: "github",
    title,
    description,
    url: `https://github.com/${repo}`,
    tags,
  };
}

/**
 * Helper function to create a video relation
 */
export function createVideoRelation(
  id: string,
  title: string,
  url: string,
  description?: string,
  tags?: string[]
): Relation {
  return {
    id,
    type: "video",
    title,
    description,
    url,
    tags,
  };
}

/**
 * Helper function to create a paper/article relation
 */
export function createPaperRelation(
  id: string,
  title: string,
  url: string,
  description?: string,
  tags?: string[],
  publishedAt?: string
): Relation {
  return {
    id,
    type: "paper",
    title,
    description,
    url,
    tags,
    publishedAt,
  };
}
