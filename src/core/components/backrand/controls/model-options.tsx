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
import { InfoIcon } from "lucide-react";

export const ModelOptions = () => {
  const { currentModel, params, updateModelOption } = useBackrand();

  if (!currentModel.options)
    return (
      <div className="text-sm text-muted-foreground text-center py-8">
        Ingen spesifikke innstillinger for denne modellen.
      </div>
    );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Parametere</h3>
        <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">
          {currentModel.name}
        </span>
      </div>

      <div className="grid gap-5">
        {currentModel.options.map((opt) => {
          const value = params.model_options?.[opt.key] ?? opt.default;

          return (
            <div key={opt.key} className="space-y-2 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Label className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {opt.label}
                  </Label>
                  {opt.description && (
                    <HoverCard>
                      <HoverCardTrigger>
                        <InfoIcon className="w-3 h-3 text-muted-foreground/50 hover:text-primary cursor-help" />
                      </HoverCardTrigger>
                      <HoverCardContent className="w-64 text-xs">
                        {opt.description}
                      </HoverCardContent>
                    </HoverCard>
                  )}
                </div>
                {opt.type === "slider" && (
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {Number(value).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Render Control based on Type */}
              {opt.type === "slider" && (
                <Slider
                  value={[Number(value)]}
                  min={opt.min}
                  max={opt.max}
                  step={opt.step || 0.1}
                  onValueChange={([v]) => updateModelOption(opt.key, v)}
                  className="[&_.span]:h-4 [&_.span]:w-4" // Customize slider handle via CSS if needed
                />
              )}

              {opt.type === "select" && (
                <Select
                  value={String(value)}
                  onValueChange={(v) => updateModelOption(opt.key, v)}
                >
                  <SelectTrigger className="h-8 text-xs bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {opt.options?.map((o) => (
                      <SelectItem
                        key={o.value}
                        value={o.value}
                        className="text-xs"
                      >
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {opt.type === "boolean" && (
                <div className="flex items-center justify-between border rounded-md p-2 bg-background/50">
                  <span className="text-xs text-muted-foreground">Aktiver</span>
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
