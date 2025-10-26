import { createFileRoute } from "@tanstack/react-router";
import { ProjectHero } from "@/core/components/project-view/project-hero";
import { ProjectMeta } from "@/core/components/project-view/project-meta";
import { ProjectSection } from "@/core/components/project-view/project-section";
import { ProjectGallery } from "@/core/components/project-view/project-gallery";
import { dyplinkAiProject } from "@/data/dyplink-ai";

export const Route = createFileRoute("/projects/dyplink-ai")({
  component: RouteComponent,
});

function RouteComponent() {
  const project = dyplinkAiProject;

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <ProjectHero project={project} />
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {project.stats && <ProjectMeta project={project} />}

        <ProjectSection
          title="Om prosjektet"
          content={project.overview}
          highlights={project.highlights}
        />
        <ProjectGallery
          images={[
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
          ]}
        />
        <ProjectSection
          title="Teknologier"
          content="Prosjektet er integrert mot flere nettaviser som bruker Wordpress. Dyplink AI støtter flere LLM-leverandører, inkludert Gemini."
        />
      </div>
    </div>
  );
}
