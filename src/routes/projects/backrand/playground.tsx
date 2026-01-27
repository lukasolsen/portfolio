import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { BackrandProvider, useBackrand } from "@/context/backrand-context";
import { PlaygroundLayout } from "@/core/components/backrand/playground-layout";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/projects/backrand/playground")({
  component: () => (
    <BackrandProvider>
      <div className="h-screen w-full bg-background text-foreground overflow-hidden flex flex-col font-sans selection:bg-primary/30">
        <BackrandPlayground />
        <Toaster position="bottom-center" />
      </div>
    </BackrandProvider>
  ),
});

function BackrandPlayground() {
  const { handleGenerate, loading } = useBackrand();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isInput =
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement;

      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        if (!loading) handleGenerate();
      }

      if (event.code === "Space" && !loading && !isInput) {
        event.preventDefault();
        handleGenerate();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleGenerate, loading]);

  return <PlaygroundLayout />;
}
