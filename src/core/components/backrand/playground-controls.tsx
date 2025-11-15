import { type FC, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

import { GeneralSettings } from "./controls/general-settings";
import { ColorSettings } from "./controls/color-settings";
import { ModelOptions } from "./controls/model-options";
import { WarpSelector } from "./warp-selector";
import { AdvancedSettings } from "./controls/advanced-settings";
import { Header5 } from "@/components/typography/typography";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useBackrand } from "@/context/backrand-context";

export const PlaygroundControls: FC = () => {
  const { loading, handleGenerate, currentModel: model } = useBackrand();

  const [tab, setTab] = useState("general");

  const showOption = (key: string) => !model.blacklistedOptions?.includes(key);

  const tabs = [
    { key: "general", label: "Generelt" },
    { key: "colors", label: "Farger" },
    { key: "model", label: "Modell" },
    { key: "warp", label: "Warp" },
    { key: "advanced", label: "Avansert" },
  ];

  return (
    <div className="flex flex-col h-full border rounded-xl backdrop-blur-sm shadow-lg col-span-2">
      {/* === Sticky top bar === */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/40 backdrop-blur-sm p-3">
        <Header5>Innstillinger</Header5>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={handleGenerate}
            disabled={loading}
            className={cn(
              "font-medium transition-all",
              loading && "opacity-80 cursor-wait"
            )}
          >
            {loading ? (
              <>
                <Loader2Icon className="w-4 h-4 animate-spin mr-2" />
                Genererer...
              </>
            ) : (
              "Generer"
            )}
          </Button>
        </div>
      </div>

      {/* === Tabbed settings area === */}
      <Tabs
        value={tab}
        onValueChange={setTab}
        className="flex-1 flex flex-col w-full"
      >
        <ScrollArea>
          <TabsList className="mb-3 w-full rounded-none">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.key} value={tab.key}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="flex-1 overflow-y-auto px-2 space-y-6">
          <TabsContent value="general">
            <GeneralSettings showOption={showOption} />
          </TabsContent>

          <TabsContent value="colors">
            <ColorSettings />
          </TabsContent>

          <TabsContent value="model">
            {model.options ? (
              <ModelOptions />
            ) : (
              <p className="text-sm text-muted-foreground">
                Denne modellen har ingen egne innstillinger.
              </p>
            )}
          </TabsContent>

          <TabsContent value="warp">
            {model.allowedWarps && model.allowedWarps.length > 0 ? (
              <WarpSelector />
            ) : (
              <p className="text-sm text-muted-foreground">
                Warp ikke tilgjengelig for denne modellen.
              </p>
            )}
          </TabsContent>

          <TabsContent value="advanced">
            <AdvancedSettings showOption={showOption} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
