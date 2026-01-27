import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBackrand } from "@/context/backrand-context";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { InfoIcon, Settings2 } from "lucide-react";
import type { ModelOption } from "@/common/backrand/models";

export const ModelOptions = () => {
  const { currentModel, params, updateModelOption } = useBackrand();

  if (!currentModel.options)
    return (
      <div className="text-sm text-muted-foreground text-center py-8">
        No dynamic parameters available for this engine.
      </div>
    );

  // Filter options based on conditions
  const visibleOptions = currentModel.options.filter((opt) => {
    if (!opt.condition) return true;
    const dependentValue = params.model_options?.[opt.condition.key];
    return dependentValue === opt.condition.value;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-2 border-b border-border/50">
        <div className="flex items-center gap-2">
          <Settings2 className="w-4 h-4 text-primary/80" />
          <h3 className="text-sm font-semibold tracking-tight">
            Engine Tuning
          </h3>
        </div>
        <span className="text-[10px] font-bold bg-primary/10 text-primary px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          {currentModel.displayName || currentModel.name}
        </span>
      </div>

      <div className="grid gap-6">
        {visibleOptions.map((opt: ModelOption) => {
          const value = params.model_options?.[opt.key] ?? opt.default;

          return (
            <div key={opt.key} className="space-y-3 group/opt">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground group-hover/opt:text-foreground transition-colors">
                    {opt.label}
                  </Label>
                  {opt.description && (
                    <HoverCard openDelay={200}>
                      <HoverCardTrigger>
                        <InfoIcon className="w-3.5 h-3.5 text-muted-foreground/40 hover:text-primary transition-colors" />
                      </HoverCardTrigger>
                      <HoverCardContent className="w-72 p-3 text-xs leading-relaxed bg-popover/95 backdrop-blur-sm border-primary/20">
                        <p className="font-medium mb-1 text-primary">
                          {opt.label}
                        </p>
                        {opt.description}
                      </HoverCardContent>
                    </HoverCard>
                  )}
                </div>
                {opt.type === "slider" && (
                  <span className="text-[10px] font-mono font-medium text-primary/80 bg-primary/5 px-2 py-0.5 rounded">
                    {Number(value).toFixed(2)}
                  </span>
                )}
              </div>

              {opt.type === "slider" && (
                <Slider
                  value={[Number(value)]}
                  min={opt.min}
                  max={opt.max}
                  step={opt.step || 0.1}
                  onValueChange={([v]) => updateModelOption(opt.key, v)}
                  className="[&_.span]:h-4 [&_.span]:w-4"
                />
              )}

              {opt.type === "select" && (
                <Select
                  value={String(value)}
                  onValueChange={(v) => updateModelOption(opt.key, v)}
                >
                  <SelectTrigger className="h-9 text-xs bg-background/40 hover:bg-background/80 border-border/50 transition-all">
                    <SelectValue>
                      {
                        opt.options?.find((o) => o.value === String(value))
                          ?.label
                      }
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-popover/95 backdrop-blur-md">
                    {opt.options?.map((o) => (
                      <SelectItem
                        key={o.value}
                        value={o.value}
                        className="text-xs py-2"
                      >
                        <div className="flex flex-col gap-0.5">
                          <span className="font-medium">{o.label}</span>
                          {o.description && (
                            <span className="text-[10px] text-muted-foreground font-normal">
                              {o.description}
                            </span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {opt.type === "boolean" && (
                <div className="flex items-center justify-between border border-border/50 rounded-lg p-3 bg-background/30 hover:bg-background/50 transition-colors">
                  <span className="text-xs font-medium text-muted-foreground">
                    Enabled
                  </span>
                  <Switch
                    checked={Boolean(value)}
                    onCheckedChange={(v) => updateModelOption(opt.key, v)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
