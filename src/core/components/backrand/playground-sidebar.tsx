import { type FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  PanelRightClose,
  Play,
  Dices,
  ChevronRight,
  Layers,
  Palette,
  Move,
  Gauge,
  Shuffle,
  Circle,
  Sparkles,
} from "lucide-react";
import { useBackrand } from "@/context/backrand-context";
import { cn } from "@/lib/utils";
import {
  BackrandAspectRatio,
  BackrandAspectRatios,
} from "@/common/backrand/aspect-ratio";
import {
  BackrandQuality,
  BackrandQualityLabels,
} from "@/common/backrand/quality";
import { ColorPresetSelector } from "./color-preset";
import { ModelOptions } from "./controls/model-options";
import { PresetSelector } from "./controls/preset-selector";

interface SidebarProps {
  onClose: () => void;
}

const Section = ({
  title,
  icon: Icon,
  defaultOpen = true,
  children,
}: {
  title: string;
  icon: FC<{ className?: string }>;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border/20 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-2.5 w-full py-3 px-1 text-left transition-colors",
          "hover:bg-muted/30 rounded-md -mx-1 group"
        )}
      >
        <Icon className="w-4 h-4 text-muted-foreground/50 group-hover:text-muted-foreground/80 transition-colors" />
        <span className="text-xs font-medium text-foreground/80 group-hover:text-foreground transition-colors flex-1">
          {title}
        </span>
        <ChevronRight
          className={cn(
            "w-3.5 h-3.5 text-muted-foreground/30 transition-transform duration-150",
            open && "rotate-90"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200 ease-out",
          open ? "opacity-100" : "opacity-0 max-h-0"
        )}
        style={{ maxHeight: open ? "2000px" : "0px" }}
      >
        <div className="pb-3 px-1">{children}</div>
      </div>
    </div>
  );
};

export const PlaygroundSidebar: FC<SidebarProps> = ({ onClose }) => {
  const { loading, handleGenerate, params, updateSetting, setModel, models } =
    useBackrand();

  const handleRandomizeSeed = () => {
    updateSetting("seed", Math.floor(Math.random() * 999999999));
  };

  const handleRandomizeColors = () => {
    const randomColors = Array.from({ length: 4 }, () =>
      `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`
    );
    updateSetting("colors", randomColors.join(","));
  };

  return (
    <div className="flex flex-col h-full bg-background border-l border-border/30">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-12 border-b border-border/20 shrink-0">
        <span className="text-sm font-medium">Controls</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-7 w-7"
        >
          <PanelRightClose className="w-4 h-4" />
        </Button>
      </div>

      {/* Generate Button */}
      <div className="px-4 pt-4 pb-2 shrink-0">
        <Button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full h-10 font-medium text-sm"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Generating</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Play className="w-4 h-4" fill="currentColor" />
              <span>Generate</span>
            </div>
          )}
        </Button>
        <p className="text-[10px] text-muted-foreground/40 text-center mt-1">
          <kbd className="px-1 py-0.5 rounded bg-muted/50 text-[9px] font-mono">
            Space
          </kbd>
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 scrollbar-thin">
        <Section title="Engine" icon={Layers} defaultOpen={true}>
          <div className="space-y-1.5">
            {models.map((m) => (
              <button
                key={m.id}
                onClick={() => setModel(m.id)}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-lg transition-all text-xs",
                  params.model.id === m.id
                    ? "bg-primary/10 text-foreground ring-1 ring-primary/20"
                    : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                )}
              >
                <div className="font-medium">{m.name}</div>
                <div className="text-[10px] text-muted-foreground/50 mt-0.5 line-clamp-1">
                  {m.description}
                </div>
              </button>
            ))}
          </div>
        </Section>

        <Section title="Presets" icon={Sparkles} defaultOpen={true}>
          <PresetSelector />
        </Section>

        <Section title="Palette" icon={Palette} defaultOpen={true}>
          <ColorPresetSelector
            onChange={(c) => updateSetting("colors", c.join(","))}
          />
        </Section>

        <Section title="Parameters" icon={Gauge} defaultOpen={true}>
          <ModelOptions />
        </Section>

        <Section title="Output" icon={Move} defaultOpen={false}>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-[10px] text-muted-foreground/50">
                Aspect Ratio
              </Label>
              <Select
                value={params.aspect_ratio}
                onValueChange={(v) =>
                  updateSetting("aspect_ratio", v as BackrandAspectRatio)
                }
              >
                <SelectTrigger className="h-9 bg-muted/20 border-border/20 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BackrandAspectRatios.map((r) => (
                    <SelectItem key={r.value} value={r.value} className="text-xs">
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-[10px] text-muted-foreground/50">
                Resolution
              </Label>
              <Input
                value={params.size}
                onChange={(e) =>
                  updateSetting("size", e.target.value as `${number}x${number}`)
                }
                className="h-9 text-xs font-mono bg-muted/20 border-border/20"
                placeholder="1920x1080"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-[10px] text-muted-foreground/50">
                Quality
              </Label>
              <div className="grid grid-cols-5 gap-1">
                {Object.values(BackrandQuality).map((q) => (
                  <Button
                    key={q}
                    variant="ghost"
                    size="sm"
                    onClick={() => updateSetting("quality", q)}
                    className={cn(
                      "h-8 text-[10px] px-0 font-normal",
                      params.quality === q
                        ? "bg-foreground text-background hover:bg-foreground/90"
                        : "text-muted-foreground hover:bg-muted/50"
                    )}
                  >
                    {BackrandQualityLabels[q]}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section title="Effects" icon={Circle} defaultOpen={false}>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-[10px] text-muted-foreground/50">
                  Blur
                </Label>
                <span className="text-[10px] font-mono text-muted-foreground/30">
                  {params.blur_radius}
                </span>
              </div>
              <Slider
                value={[params.blur_radius]}
                min={0}
                max={100}
                step={1}
                onValueChange={([v]) => updateSetting("blur_radius", v)}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-[10px] text-muted-foreground/50">
                  Grain
                </Label>
                <span className="text-[10px] font-mono text-muted-foreground/30">
                  {(params.grain * 100).toFixed(0)}%
                </span>
              </div>
              <Slider
                value={[params.grain]}
                min={0}
                max={0.3}
                step={0.01}
                onValueChange={([v]) => updateSetting("grain", v)}
              />
            </div>
          </div>
        </Section>
      </div>

      {/* Seed - Bottom */}
      <div className="px-4 py-3 border-t border-border/20 shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="flex-1 relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[9px] font-mono text-muted-foreground/30">
              SEED
            </span>
            <Input
              value={params.seed ?? ""}
              onChange={(e) => updateSetting("seed", Number(e.target.value))}
              className="h-9 pl-11 text-[11px] font-mono bg-muted/20 border-border/20"
              placeholder="—"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 shrink-0 border-border/20"
            onClick={handleRandomizeSeed}
          >
            <Dices className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 shrink-0 border-border/20"
            onClick={handleRandomizeColors}
          >
            <Shuffle className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
