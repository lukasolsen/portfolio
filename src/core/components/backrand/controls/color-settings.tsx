import { Label } from "@/components/ui/label";
import { useState, type FC } from "react";
import { ColorPresetSelector } from "../color-preset";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBackrand } from "@/context/backrand-context";

export const ColorSettings: FC = () => {
  const { params, updateSetting } = useBackrand();

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const colors = params.colors ? params.colors.split(",") : [];

  const updateColor = (index: number, value: string) => {
    const updated = [...colors];
    updated[index] = value;
    updateSetting("colors", updated.join(","));
  };

  const addColor = () => {
    const updated = [...colors, "#ffffff"];
    updateSetting("colors", updated.join(","));
  };

  const removeColor = (index: number) => {
    const updated = colors.filter((_, i) => i !== index);
    updateSetting("colors", updated.join(","));
  };

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium text-foreground flex items-center gap-2">
        🎨 Fargepalett
      </Label>

      {/* Preset Selector */}
      <ColorPresetSelector
        onChange={(newColors) => updateSetting("colors", newColors.join(","))}
      />

      {/* Editable Color List */}
      <motion.div layout className="flex flex-wrap items-center gap-2 pt-2">
        <AnimatePresence>
          {colors.map((color, i) => (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={cn(
                "relative flex items-center gap-2 p-2 rounded-xl border border-border bg-card/30 shadow-sm",
                "transition-all hover:bg-accent/30"
              )}
            >
              {/* Color swatch */}
              <div
                className={cn(
                  "w-8 h-8 rounded-md border shadow-inner cursor-pointer",
                  "transition-transform hover:scale-105"
                )}
                style={{ backgroundColor: color }}
                onClick={() => setEditingIndex(editingIndex === i ? null : i)}
              />

              {/* Color hex */}
              <Input
                value={color}
                onChange={(e) => updateColor(i, e.target.value)}
                className="w-24 text-xs"
              />

              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeColor(i)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2Icon className="w-4 h-4" />
              </Button>

              {/* Inline color picker when editing */}
              <AnimatePresence>
                {editingIndex === i && (
                  <motion.div
                    key="picker"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute left-0 top-10 bg-card border border-border p-2 rounded-md shadow-md z-10"
                  >
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => updateColor(i, e.target.value)}
                      className="w-24 h-8 cursor-pointer border rounded"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        <Button
          variant="outline"
          size="sm"
          onClick={addColor}
          className="flex items-center gap-1"
        >
          <PlusIcon className="w-4 h-4" /> Legg til farge
        </Button>
      </motion.div>
    </div>
  );
};
