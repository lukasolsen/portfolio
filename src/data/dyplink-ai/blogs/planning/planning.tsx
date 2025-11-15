import type { Blog } from "@/common/blog/blog";
import Content from "./content.mdx";

export const planningBlog: Blog = {
  id: "planning-your-ai-integration",
  title: "Planlegging av AI-integrasjon",
  content: <Content />,
  subtitle: "Hvordan jeg planla en god AI-integrasjon for Dyplink AI",
  tags: ["AI", "Integrasjon", "Planlegging", "Teknologi"],
  type: "work",
  relations: [
    {
      id: "dyplink-ai",
      type: "project",
      title: "Dyplink AI",
      description:
        "Et AI system som tilbyr hjelpemidler og funksjoner til Dyplink sine kunder",
      tags: ["AI", "Node.js", "React", "PHP"],
      thumbnail: "/images/dyplink-ai/brand.png",
    },
  ],
  created_at: "2024-06-15T10:00:00Z",
  updated_at: "2024-06-15T10:00:00Z",
};
