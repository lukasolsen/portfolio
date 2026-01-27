import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useBackrand } from "@/context/backrand-context";
import { type FC } from "react";
import { Zap, Waves, Activity } from "lucide-react";

type Props = {
  showOption: (key: string) => boolean;
};

export const EffectsSettings: FC<Props> = ({ showOption }) => {
  const { params, updateSetting } = useBackrand();

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-4 h-4 text-amber-400" />
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Post-Prosessering
        </h3>
      </div>

      <div className="grid gap-6">
        {/* Blur Control */}
        {showOption("blur_radius") && (
          <div className="space-y-3 p-3 border border-border/50 rounded-xl bg-card/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Waves className="w-3.5 h-3.5 text-blue-400" />
                <Label className="text-sm">Uskarphet (Blur)</Label>
              </div>
              <span className="text-xs font-mono text-muted-foreground">
                {params.blur_radius}px
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
        )}

        {/* Grain Control */}
        {showOption("grain") && (
          <div className="space-y-3 p-3 border border-border/50 rounded-xl bg-card/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-green-400" />
                <Label className="text-sm">Støy (Grain)</Label>
              </div>
              <span className="text-xs font-mono text-muted-foreground">
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
        )}

        {/* Example: Future Feature Toggle */}
        <div className="flex items-center justify-between p-3 border border-border/50 rounded-xl bg-card/20 opacity-60">
          <div className="space-y-0.5">
            <Label className="text-sm">HDR Modus</Label>
            <p className="text-[10px] text-muted-foreground">
              Øker kontrast og fargedybde
            </p>
          </div>
          <Switch disabled checked={false} />
        </div>
      </div>
    </div>
  );
};
