import { createRootRoute } from "@tanstack/react-router";
import { Layout } from "../core/layout";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/hooks/use-translation";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <TooltipProvider delayDuration={0}>
      <I18nProvider>
        <Layout />
      </I18nProvider>
    </TooltipProvider>
  );
}
