import { type FC, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  PanelRightClose,
  Sparkles,
  Dices,
  RefreshCcw,
  Settings2,
  Palette,
  Wand2,
} from "lucide-react";
import { useBackrand } from "@/context/backrand-context";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { GlobalSettings } from "./controls/global-settings";
import { DesignSettings } from "./controls/design-settings";
import { EffectsSettings } from "./controls/effects-settings";

interface SidebarProps {
  onClose: () => void;
}

export const PlaygroundSidebar: FC<SidebarProps> = ({ onClose }) => {
  const { loading, handleGenerate, params, updateSetting } = useBackrand();
  const [activeTab, setActiveTab] = useState("design");

  const handleRandomizeSeed = () => {
    updateSetting("seed", Math.floor(Math.random() * 999999999));
  };

  return (
    <div className="flex flex-col h-full text-sm bg-card/50">
      <div className="flex items-center justify-between p-4 border-b border-border/40 bg-background/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="h-6 w-1 bg-primary rounded-full" />
          <div>
            <h2 className="font-semibold text-foreground leading-none">
              Konfigurasjon
            </h2>
            <p className="text-[10px] text-muted-foreground font-medium mt-1">
              Backrand Studio
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <PanelRightClose className="w-4 h-4" />
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col min-h-0"
      >
        <div className="px-4 py-3 border-b border-border/40 bg-muted/20">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="setup" className="gap-2">
              <Settings2 className="w-3.5 h-3.5" /> Setup
            </TabsTrigger>
            <TabsTrigger value="design" className="gap-2">
              <Palette className="w-3.5 h-3.5" /> Design
            </TabsTrigger>
            <TabsTrigger value="effects" className="gap-2">
              <Wand2 className="w-3.5 h-3.5" /> Effekter
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1 bg-background/20">
          <div className="p-5 space-y-6">
            <TabsContent
              value="setup"
              className="mt-0 outline-none animate-in slide-in-from-left-2 duration-300"
            >
              <GlobalSettings showOption={() => true} />
            </TabsContent>

            <TabsContent
              value="design"
              className="mt-0 outline-none animate-in slide-in-from-left-2 duration-300"
            >
              <DesignSettings />
            </TabsContent>

            <TabsContent
              value="effects"
              className="mt-0 outline-none animate-in slide-in-from-left-2 duration-300"
            >
              <EffectsSettings showOption={() => true} />
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>

      <div className="p-4 border-t border-border/40 bg-background/80 backdrop-blur-md space-y-3 z-10">
        {/* Seed Input */}
        <div className="grid grid-cols-[1fr_auto] gap-2 items-center">
          <div className="relative group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-muted-foreground group-hover:text-primary transition-colors">
              SEED
            </span>
            <Input
              value={params.seed || ""}
              onChange={(e) => updateSetting("seed", Number(e.target.value))}
              className="h-9 pl-12 text-xs font-mono bg-muted/30 border-border/50 focus-visible:bg-background transition-all"
              placeholder="Random"
            />
          </div>
          <Button
            variant="secondary"
            size="icon"
            className="h-9 w-9 border border-border/50"
            onClick={handleRandomizeSeed}
            title="Randomize Seed"
          >
            <Dices className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>

        <Separator className="bg-border/50" />

        <Button
          onClick={handleGenerate}
          disabled={loading}
          size="lg"
          className={cn(
            "w-full font-semibold shadow-lg transition-all duration-300 relative overflow-hidden",
            loading
              ? "opacity-90"
              : "hover:shadow-primary/25 hover:scale-[1.01]",
          )}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <RefreshCcw className="w-4 h-4 animate-spin" />
              <span>Genererer...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Generer Bakgrunn</span>
            </div>
          )}

          {loading && (
            <div className="absolute bottom-0 left-0 h-1 bg-white/20 w-full animate-progress-indeterminate" />
          )}
        </Button>
      </div>
    </div>
  );
};
