import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { colorPresets } from "@/common/backrand/colors";

export function ColorPresetSelector({
  onChange,
}: {
  onChange: (colors: string[]) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      <Label className="text-sm font-medium">Velg palett</Label>

      <Select
        onValueChange={(presetId) => {
          const preset = colorPresets.find((p) => p.id === presetId);
          if (preset) onChange(preset.colors);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Velg en fargepalett" />
        </SelectTrigger>
        <SelectContent>
          {colorPresets.map((preset) => (
            <SelectItem key={preset.id} value={preset.id}>
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                  {preset.colors.map((c, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full border border-border shadow-sm"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{preset.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
}
