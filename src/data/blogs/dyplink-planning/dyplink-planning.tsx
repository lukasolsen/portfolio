import type { Blog } from "@/common/blog/blog";
import { dyplinkAiProject } from "@/data/dyplink-ai/dyplink-ai";
import { createProjectRelation } from "@/lib/relations";
import Content from "./content.mdx";

export const dyplinkPlanningBlog: Blog = {
  id: "planning-your-ai-integration",
  title: "Planning an AI integration",
  subtitle:
    "A practical planning note from Dyplink AI: data shape, review state, provider boundaries, and operational metadata.",
  tagline: "A model call is not a workflow",
  summary:
    "How the Dyplink AI planning process moved from simple generation toward a traceable workflow with review status, provider isolation, and model metadata.",
  Content,
  readingTime: 7,
  tags: ["Dyplink AI", "Planning", "Architecture", "AI integration"],
  category: "Engineering",
  status: "Updated",
  audience: "Teams adding AI features to existing content platforms.",
  projectId: dyplinkAiProject.id,
  heroImage: {
    src: "/images/dyplink-ai/tts.png",
    alt: "Dyplink AI text-to-speech interface",
    caption: "Text-to-speech generation surface from Dyplink AI.",
  },
  keyTakeaways: [
    "Traceability matters as much as generation quality.",
    "Provider-specific code should stay behind internal interfaces.",
    "Review state, prompt version, and token usage belong in the core data model.",
  ],
  type: "work",
  relations: [createProjectRelation(dyplinkAiProject)],
  created_at: new Date("2025-11-15T10:00:00Z").toISOString(),
  updated_at: new Date("2026-01-25T10:00:00Z").toISOString(),
};
