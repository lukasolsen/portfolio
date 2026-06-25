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
import type { ModelOption } from "@/common/backrand/models";

export const ModelOptions = () => {
  const { currentModel, params, updateModelOption } = useBackrand();

  if (!currentModel.options || currentModel.options.length === 0) {
    return (
      <p className="text-[11px] text-muted-foreground/40 text-center py-4">
        No parameters for this engine
      </p>
    );
  }

  const visibleOptions = currentModel.options.filter((opt) => {
    if (!opt.condition) return true;
    const dependentValue = params.model_options?.[opt.condition.key];
    return dependentValue === opt.condition.value;
  });

  return (
    <div className="space-y-4">
      {visibleOptions.map((opt: ModelOption) => {
        const value = params.model_options?.[opt.key] ?? opt.default;

        return (
          <div key={opt.key} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-[10px] text-muted-foreground/60">
                {opt.label}
              </Label>
              {opt.type === "slider" && (
                <span className="text-[10px] font-mono text-muted-foreground/40">
                  {Number(value).toFixed(opt.step && opt.step >= 1 ? 0 : 2)}
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
              />
            )}

            {opt.type === "select" && (
              <Select
                value={String(value)}
                onValueChange={(v) => updateModelOption(opt.key, v)}
              >
                <SelectTrigger className="h-8 bg-muted/20 border-border/30 text-xs">
                  <SelectValue>
                    {opt.options?.find((o) => o.value === String(value))?.label}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {opt.options?.map((o) => (
                    <SelectItem key={o.value} value={o.value} className="text-xs">
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {opt.type === "boolean" && (
              <div className="flex items-center justify-between py-1">
                <span className="text-[11px] text-muted-foreground">
                  {Boolean(value) ? "On" : "Off"}
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
  );
};
