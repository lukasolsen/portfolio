import { useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BackgradHero } from "@/core/components/lab/backgrad-hero";
import { BackgradQuickstart } from "@/core/components/lab/backgrad-quickstart";
import { BackgradApproach } from "@/core/components/lab/backgrad-approach";
import { BackgradVisualizer } from "@/core/components/lab/backgrad-visualizer";
import { BackgradGallery } from "@/core/components/lab/backgrad-gallery";
import { ResearchPerformance } from "@/core/components/lab/research-performance";
import { ResearchStyles } from "@/core/components/lab/research-styles";
import { ResearchExtends } from "@/core/components/lab/research-extends";
import { BackgradUpdates } from "@/core/components/lab/backgrad-updates";
import { BackgradFooter } from "@/core/components/lab/backgrad-footer";
import { SpeechReaderButton } from "@/core/components/lab/speech-reader-button";

export const Route = createFileRoute("/lab/backgrad")({
  component: RouteComponent,
});

function RouteComponent() {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <div ref={contentRef}>
        <BackgradHero />
        <BackgradQuickstart />
        <BackgradGallery />
        <BackgradApproach />
        <BackgradVisualizer />
        <ResearchPerformance />
        <ResearchStyles />
        <BackgradUpdates />
        <ResearchExtends />
        <BackgradFooter />
      </div>
      <SpeechReaderButton targetRef={contentRef} />
    </div>
  );
}
