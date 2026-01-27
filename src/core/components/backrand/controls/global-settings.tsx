import { type FC } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  BackrandAspectRatio,
  BackrandAspectRatios,
} from "@/common/backrand/aspect-ratio";
import {
  BackrandQuality,
  BackrandQualityLabels,
} from "@/common/backrand/quality";
import { BackrandModels, BackrandModelType } from "@/common/backrand/models";
import { Button } from "@/components/ui/button";
import { useBackrand } from "@/context/backrand-context";
import { cn } from "@/lib/utils";
import { Monitor, Cpu, Box } from "lucide-react";

type Props = { showOption: (key: string) => boolean };

export const GlobalSettings: FC<Props> = ({ showOption }) => {
  const { params, updateSetting, setModel } = useBackrand();

  return (
    <div className="space-y-6">
      {/* === Model Selection === */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Box className="w-4 h-4" />
          <h3 className="text-xs font-semibold uppercase tracking-wider">
            Algoritme
          </h3>
        </div>
        <div className="p-3 rounded-xl border border-border bg-card/30 space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Valgt Modell</Label>
            <Select
              value={params.model.id}
              onValueChange={(v) => {
                const model = BackrandModels[v as BackrandModelType];
                setModel(model.id);
              }}
            >
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Velg modell" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(BackrandModelType).map((m) => (
                  <SelectItem key={m} value={m}>
                    {BackrandModels[m].name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* === Dimensions === */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Monitor className="w-4 h-4" />
          <h3 className="text-xs font-semibold uppercase tracking-wider">
            Dimensjoner
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4 p-3 rounded-xl border border-border bg-card/30">
          {showOption("aspect_ratio") && (
            <div className="space-y-1.5 col-span-2">
              <Label className="text-xs">Sideforhold</Label>
              <Select
                value={params.aspect_ratio}
                onValueChange={(v) =>
                  updateSetting("aspect_ratio", v as BackrandAspectRatio)
                }
              >
                <SelectTrigger className="bg-background/50 h-8 text-xs">
                  <SelectValue placeholder="Velg" />
                </SelectTrigger>
                <SelectContent>
                  {BackrandAspectRatios.map((r) => (
                    <SelectItem
                      key={r.value}
                      value={r.value}
                      className="text-xs"
                    >
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {showOption("size") && (
            <div className="space-y-1.5 col-span-2">
              <Label className="text-xs">Oppløsning (WxH)</Label>
              <Input
                value={params.size}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow typing, validate on blur ideally, but simple regex check here
                  updateSetting("size", value as `${number}x${number}`);
                }}
                className="bg-background/50 h-8 text-xs font-mono"
                placeholder="1024x1024"
              />
            </div>
          )}
        </div>
      </section>

      {/* === Quality / Compute === */}
      {showOption("quality") && (
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Cpu className="w-4 h-4" />
            <h3 className="text-xs font-semibold uppercase tracking-wider">
              Kvalitet
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {Object.values(BackrandQuality).map((q) => {
              const isSelected = params.quality === q;
              return (
                <Button
                  key={q}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateSetting("quality", q)}
                  className={cn(
                    "h-8 text-[10px] px-0",
                    isSelected &&
                      "ring-1 ring-primary ring-offset-1 ring-offset-background",
                  )}
                >
                  {BackrandQualityLabels[q]}
                </Button>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
