import type { BackrandParams } from "@/common/backrand/backrand";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, type FC } from "react";

type Props = {
  showOption: (key: string) => boolean;
  params: BackrandParams;
  setParams: (params: BackrandParams) => void;
};

export const AdvancedSettings: FC<Props> = (props) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { showOption, params, setParams } = props;

  return (
    <div className="border-t border-border/40 pt-5">
      <button
        onClick={() => setShowAdvanced((s) => !s)}
        className="flex items-center justify-between w-full text-sm font-medium"
      >
        Avanserte innstillinger
        {showAdvanced ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-4"
          >
            {showOption("blur_radius") && (
              <div className="space-y-2">
                <Label>Uskarphet: {params.blur_radius}</Label>
                <Slider
                  value={[params.blur_radius]}
                  min={0}
                  max={50}
                  step={1}
                  onValueChange={([v]) =>
                    setParams({ ...params, blur_radius: v })
                  }
                />
              </div>
            )}

            {showOption("grain") && (
              <div className="space-y-2">
                <Label>Grain: {params.grain.toFixed(2)}</Label>
                <Slider
                  value={[params.grain]}
                  min={0}
                  max={0.2}
                  step={0.01}
                  onValueChange={([v]) => setParams({ ...params, grain: v })}
                />
              </div>
            )}

            {showOption("num_points") && (
              <div className="space-y-2">
                <Label>Antall punkter: {params.num_points}</Label>
                <Slider
                  value={[params.num_points]}
                  min={3}
                  max={20}
                  step={1}
                  onValueChange={([v]) =>
                    setParams({ ...params, num_points: v })
                  }
                />
              </div>
            )}

            {showOption("seed") && (
              <div className="space-y-2">
                <Label>Seed</Label>
                <Input
                  type="number"
                  value={params.seed || ""}
                  onChange={(e) =>
                    setParams({ ...params, seed: Number(e.target.value) })
                  }
                  placeholder="La stå tom for tilfeldig"
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
