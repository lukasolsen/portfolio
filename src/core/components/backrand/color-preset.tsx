import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { colorPresets } from "@/common/backrand/colors";

export function ColorPresetSelector({
  onChange,
}: {
  onChange: (colors: string[]) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (preset: (typeof colorPresets)[number]) => {
    setSelected(preset.id);
    onChange(preset.colors);
  };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-1.5">
        {colorPresets.map((preset, i) => (
          <motion.button
            key={preset.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.02 }}
            onClick={() => handleSelect(preset)}
            className={cn(
              "flex flex-col items-start gap-1.5 p-2 rounded-lg border transition-all text-left",
              selected === preset.id
                ? "border-primary/50 bg-primary/5"
                : "border-border/20 bg-muted/10 hover:border-border/40 hover:bg-muted/20"
            )}
          >
            <div className="flex w-full gap-0.5">
              {preset.colors.slice(0, 5).map((c, j) => (
                <div
                  key={j}
                  className="flex-1 h-3 first:rounded-l-sm last:rounded-r-sm"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <span className="text-[10px] text-muted-foreground/70 font-medium truncate w-full">
              {preset.name}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
