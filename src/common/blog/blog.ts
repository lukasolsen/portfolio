import React from "react";

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

export interface Blog {
  id: string;
  title: string;
  subtitle?: string;

  content: string | React.ReactElement; // markdown content or MDX component
  rawContent?: string; // raw content for heading extraction when using MDX

  tags: string[];
  type: "personal" | "work";
  relations?: Relation[]; // multiple relations instead of single related

  created_at: string;
  updated_at?: string;
}
