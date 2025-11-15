import type { Project } from "@/common/project/project";

export const dyplinkAiProject: Project = {
  id: "dyplink-ai",

  title: "Dyplink AI",
  description:
    "Et AI system som tilbyr hjelpemidler og funksjoner til Dyplink sine kunder. Bygget med tanke på sikkerhet, skalerbarhet og ytelse.",

  period: "2025 - Pågående",
  tags: ["AI", "Node.js", "React", "PHP"],

  socials: {
    website: "/projects/dyplink-ai",
  },
  stats: {},

  logo: "/images/dyplink-ai/brand.png",
  overview:
    "Dyplink AI er et system for å tilby hjelpemidler og funksjoner til Dyplink sine kunder. I dag brukes prosjektet til å generere sammendrag av artikler og opprette en lydversjon av artikkelen.",

  gallery: {
    images: [
      {
        alt: "Sammendrag",
        src: "/images/dyplink-ai/summary.png",
        caption: "AI-generert sammendrag av en artikkel.",
      },
      {
        alt: "Tekst til tale",
        src: "/images/dyplink-ai/tts.png",
        caption: "Visuell fremstilling av tekst til tale.",
      },
    ],
  },
  highlights: [],
  type: "work",
  highlighted: true,
  like: true,

  resources: [
    {
      id: "planning-your-ai-integration",
      type: "blog",
      title: "Planlegging av AI-integrasjon: En trinnvis veiledning",
      description:
        "Hvordan planlegge en vellykket AI-integrasjon for din bedrift",
      tags: ["AI", "Integrasjon", "Planlegging"],
    },
    {
      id: "gemini-api",
      type: "external",
      title: "Google Gemini API Documentation",
      description: "Offisiell dokumentasjon for Google Gemini AI API",
      url: "https://ai.google.dev/docs",
      tags: ["AI", "API", "Google"],
    },
    {
      id: "wordpress-rest-api",
      type: "external",
      title: "WordPress REST API Handbook",
      description: "Komplett guide til WordPress REST API integrasjon",
      url: "https://developer.wordpress.org/rest-api/",
      tags: ["WordPress", "API", "PHP"],
    },
  ],
};
