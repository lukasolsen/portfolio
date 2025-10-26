import { createRootRoute } from "@tanstack/react-router";
import { Layout } from "../core/layout";
import { TooltipProvider } from "@/components/ui/tooltip";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <TooltipProvider delayDuration={0}>
      <Layout />
    </TooltipProvider>
  );
}
