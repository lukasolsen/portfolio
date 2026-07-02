import type { Blog } from "@/common/blog/blog";
import { dyplinkAiProject } from "@/data/dyplink-ai/dyplink-ai";
import { createProjectRelation } from "@/lib/relations";
import Content from "./content.mdx";

export const dyplinkEditorialAiBlog: Blog = {
  id: "dyplink-ai-editorial-workflows",
  title: "Designing AI workflows for editors",
  subtitle:
    "How Dyplink AI frames summaries and text-to-speech as reviewable editorial tools.",
  tagline: "Human review stays in the critical path",
  summary:
    "A project note on Dyplink AI, focused on editorial workflow design, provider abstraction, model metadata, and quality checks for generated summaries and audio.",
  Content,
  readingTime: 8,
  tags: ["Dyplink AI", "Editorial tools", "LLM", "Text-to-speech"],
  category: "AI",
  status: "Published",
  featured: true,
  audience: "Developers building AI features inside existing publishing systems.",
  projectId: dyplinkAiProject.id,
  heroImage: {
    src: "/images/dyplink-ai/summary.png",
    alt: "Dyplink AI summary interface",
    caption: "Summary generation surface from Dyplink AI.",
  },
  keyTakeaways: [
    "The useful interface is narrow: summary, audio, metadata, and review.",
    "Provider abstraction keeps model changes away from editorial UI.",
    "Generated content needs visible provenance and a human review state.",
  ],
  type: "work",
  relations: [createProjectRelation(dyplinkAiProject)],
  created_at: new Date("2026-01-18T09:00:00Z").toISOString(),
  updated_at: new Date("2026-01-18T09:00:00Z").toISOString(),
};
