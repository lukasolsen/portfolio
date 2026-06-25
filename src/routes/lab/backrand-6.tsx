import { useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ResearchHero } from "@/core/components/lab/research-hero";
import { ResearchQuestion } from "@/core/components/lab/research-question";
import { ResearchApproach } from "@/core/components/lab/research-approach";
import { ResearchExperiments } from "@/core/components/lab/research-experiments";
import { ResearchFindings } from "@/core/components/lab/research-findings";
import { ResearchPerformance } from "@/core/components/lab/research-performance";
import { ResearchStyles } from "@/core/components/lab/research-styles";
import { ResearchGallery } from "@/core/components/lab/research-gallery";
import { ResearchResult } from "@/core/components/lab/research-result";
import { ResearchExtends } from "@/core/components/lab/research-extends";
import { SpeechReaderButton } from "@/core/components/lab/speech-reader-button";

export const Route = createFileRoute("/lab/backrand-6")({
  component: RouteComponent,
});

function RouteComponent() {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <div ref={contentRef}>
        <ResearchHero />
        <ResearchQuestion />
        <ResearchApproach />
        <ResearchExperiments />
        <ResearchFindings />
        <ResearchPerformance />
        <ResearchStyles />
        <ResearchGallery />
        <ResearchResult />
        <ResearchExtends />
      </div>
      <SpeechReaderButton targetRef={contentRef} />
    </div>
  );
}
