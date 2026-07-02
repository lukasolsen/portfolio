import type { ComponentType } from "react";

export interface Relation {
  id: string;
  type:
    | "project"
    | "blog"
    | "paper"
    | "video"
    | "external"
    | "github"
    | "article";
  title: string;
  description?: string;
  url?: string; // for external links
  tags?: string[];
  thumbnail?: string;
  publishedAt?: string;
}

export type BlogCategory =
  | "Engineering"
  | "AI"
  | "Design systems"
  | "Research"
  | "Operations";

export type BlogStatus = "Published" | "Draft" | "Updated";

export interface Blog {
  id: string;
  title: string;
  subtitle?: string;
  tagline: string;
  summary: string;

  Content: ComponentType;
  rawContent?: string;
  readingTime: number;

  tags: string[];
  category: BlogCategory;
  status?: BlogStatus;
  featured?: boolean;
  audience?: string;
  projectId?: string;
  heroImage?: {
    src: string;
    alt: string;
    caption?: string;
  };
  keyTakeaways?: string[];
  type: "personal" | "work";
  relations?: Relation[]; // multiple relations instead of single related

  created_at: string;
  updated_at?: string;
}
