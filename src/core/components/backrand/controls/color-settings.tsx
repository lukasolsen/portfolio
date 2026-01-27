import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  PlusIcon,
  Trash2Icon,
  Wand2,
  RefreshCcw,
  Copy,
  Hash,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useBackrand } from "@/context/backrand-context";
import { ColorPresetSelector } from "../color-preset";
import { toast } from "sonner";

// --- Color Utility Helpers (Internal for independence) ---
const ColorUtils = {
  hexToHsl: (hex: string) => {
    let r = 0,
      g = 0,
      b = 0;
    if (hex.length === 4) {
      r = parseInt("0x" + hex[1] + hex[1]);
      g = parseInt("0x" + hex[2] + hex[2]);
      b = parseInt("0x" + hex[3] + hex[3]);
    } else if (hex.length === 7) {
      r = parseInt("0x" + hex[1] + hex[2]);
      g = parseInt("0x" + hex[3] + hex[4]);
      b = parseInt("0x" + hex[5] + hex[6]);
    }
    r /= 255;
    g /= 255;
    b /= 255;
    const cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin;
    let h = 0,
      s = 0,
      l = 0;
    if (delta === 0) h = 0;
    else if (cmax === r) h = ((g - b) / delta) % 6;
    else if (cmax === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    return { h, s, l };
  },
  hslToHex: (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0,
      g = 0,
      b = 0;
    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    const toHex = (n: number) => {
      const hex = n.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  },
};

export const ColorSettings = () => {
  const { params, updateSetting } = useBackrand();
  const rawColors = params.colors ? params.colors.split(",") : [];

  // Internal state for managing the UI before committing to context if needed
  // Using direct context update for responsiveness here

  const handleUpdateColor = (index: number, newVal: string) => {
    const newColors = [...rawColors];
    newColors[index] = newVal;
    updateSetting("colors", newColors.join(","));
  };

  const handleAddColor = () => {
    const newColors = [...rawColors, "#000000"]; // Default black, user changes it
    updateSetting("colors", newColors.join(","));
  };

  const handleRemoveColor = (index: number) => {
    const newColors = rawColors.filter((_, i) => i !== index);
    updateSetting("colors", newColors.join(","));
  };

  // --- Remix Logic ---
  const remixPalette = (
    mode: "analogous" | "complementary" | "pastel" | "neon" | "random",
  ) => {
    const baseHue = Math.floor(Math.random() * 360);
    let newColors: string[] = [];

    switch (mode) {
      case "analogous":
        newColors = [0, 1, 2, 3].map((i) =>
          ColorUtils.hslToHex((baseHue + i * 30) % 360, 70, 50),
        );
        break;
      case "complementary":
        newColors = [
          ColorUtils.hslToHex(baseHue, 70, 50),
          ColorUtils.hslToHex((baseHue + 180) % 360, 70, 50),
          ColorUtils.hslToHex(baseHue, 50, 80),
          ColorUtils.hslToHex((baseHue + 180) % 360, 90, 20),
        ];
        break;
      case "pastel":
        newColors = [0, 1, 2, 3].map((i) =>
          ColorUtils.hslToHex((baseHue + i * 60) % 360, 60, 85),
        );
        break;
      case "neon":
        newColors = [0, 1, 2, 3].map((i) =>
          ColorUtils.hslToHex((baseHue + i * 45) % 360, 100, 50),
        );
        break;
      case "random":
      default:
        newColors = [0, 1, 2, 3].map(() =>
          ColorUtils.hslToHex(Math.random() * 360, 70, 50),
        );
        break;
    }
    updateSetting("colors", newColors.join(","));
    toast.success(`Generated ${mode} palette`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium flex items-center gap-2">
          🎨 Fargepalett
        </Label>

        {/* Remix Dropdown */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs gap-2 border-dashed border-primary/40 hover:border-primary"
            >
              <Wand2 className="w-3.5 h-3.5 text-primary" /> Remix
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-48 p-2">
            <Label className="px-2 text-xs text-muted-foreground mb-2 block">
              Algoritmisk Generering
            </Label>
            <div className="grid gap-1">
              {[
                { id: "analogous", label: "Analogous Flow" },
                { id: "complementary", label: "High Contrast" },
                { id: "pastel", label: "Soft Pastels" },
                { id: "neon", label: "Cyberpunk Neon" },
                { id: "random", label: "Total Chaos" },
              ].map((m) => (
                <Button
                  key={m.id}
                  variant="ghost"
                  size="sm"
                  className="justify-start text-xs h-8"
                  onClick={() => remixPalette(m.id as any)}
                >
                  <RefreshCcw className="w-3 h-3 mr-2 text-muted-foreground" />
                  {m.label}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Preset Selector */}
      <ColorPresetSelector
        onChange={(newColors) => updateSetting("colors", newColors.join(","))}
      />

      {/* Visualizer Bar - Shows blending */}
      {rawColors.length > 1 && (
        <div className="w-full h-3 rounded-full overflow-hidden shadow-inner border border-white/10 opacity-80 mt-2">
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(to right, ${rawColors.join(", ")})`,
            }}
          />
        </div>
      )}

      {/* Editable List */}
      <motion.div layout className="grid grid-cols-1 gap-2">
        <AnimatePresence>
          {rawColors.map((color, index) => (
            <ColorRow
              key={`${index}-${color}`} // Key combination ensures re-render on drastic changes but stability on edits
              color={color}
              index={index}
              onUpdate={handleUpdateColor}
              onRemove={() => handleRemoveColor(index)}
            />
          ))}
        </AnimatePresence>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddColor}
          className="w-full border-2 border-dashed border-muted hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-primary h-10 mt-2 rounded-xl transition-all"
        >
          <PlusIcon className="w-4 h-4 mr-2" /> Legg til farge
        </Button>
      </motion.div>
    </div>
  );
};

// --- Sub-Component: Individual Color Row with Advanced Popover ---
const ColorRow = ({
  color,
  index,
  onUpdate,
  onRemove,
}: {
  color: string;
  index: number;
  onUpdate: (i: number, v: string) => void;
  onRemove: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Parse HSL for local state management in the popup
  const [hsl, setHsl] = useState(ColorUtils.hexToHsl(color));

  // Sync internal state when external color changes (e.g. from remix)
  useEffect(() => {
    setHsl(ColorUtils.hexToHsl(color));
  }, [color]);

  const handleHslChange = (key: "h" | "s" | "l", val: number) => {
    const newHsl = { ...hsl, [key]: val };
    setHsl(newHsl);
    onUpdate(index, ColorUtils.hslToHex(newHsl.h, newHsl.s, newHsl.l));
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group relative flex items-center gap-2 p-1.5 pr-2 rounded-xl border border-border bg-card/40 hover:bg-accent/40 transition-colors shadow-sm"
    >
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            className="w-10 h-10 rounded-lg shadow-sm border border-border/50 cursor-pointer relative overflow-hidden transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50"
            style={{ backgroundColor: color }}
          >
            {/* Checkerboard for transparency indication if needed */}
            <div className="absolute inset-0 -z-10 bg-[url('/transparency-grid.png')] opacity-20" />
          </button>
        </PopoverTrigger>

        <PopoverContent
          side="left"
          className="w-72 p-0 rounded-xl overflow-hidden shadow-2xl border-border/60 backdrop-blur-xl bg-card/95"
        >
          {/* Header */}
          <div
            className="h-20 w-full relative"
            style={{ backgroundColor: color }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
            <div className="absolute bottom-2 left-3 font-mono text-white font-bold tracking-wider text-lg">
              {color.toUpperCase()}
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 h-6 w-6 text-white/70 hover:text-white hover:bg-black/20"
              onClick={() => {
                navigator.clipboard.writeText(color);
                toast.success("Copied Hex");
              }}
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>

          <Tabs defaultValue="hsl" className="w-full">
            <div className="flex items-center justify-between px-3 py-2 border-b border-border/50 bg-muted/20">
              <TabsList className="h-7 bg-muted/50 p-0.5">
                <TabsTrigger value="hsl" className="text-[10px] h-6 px-2">
                  HSL
                </TabsTrigger>
                <TabsTrigger value="rgb" className="text-[10px] h-6 px-2">
                  RGB
                </TabsTrigger>
                <TabsTrigger value="hex" className="text-[10px] h-6 px-2">
                  HEX
                </TabsTrigger>
              </TabsList>
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                Editor
              </span>
            </div>

            <div className="p-4 space-y-4">
              <TabsContent value="hsl" className="mt-0 space-y-4">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <Label className="text-muted-foreground">Hue</Label>
                      <span className="font-mono text-xs">{hsl.h}°</span>
                    </div>
                    <div className="relative h-4 rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 opacity-50" />
                      <Slider
                        value={[hsl.h]}
                        max={360}
                        step={1}
                        onValueChange={([v]) => handleHslChange("h", v)}
                        className="absolute inset-0 [&>span]:bg-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <Label className="text-muted-foreground">
                        Saturation
                      </Label>
                      <span className="font-mono text-xs">{hsl.s}%</span>
                    </div>
                    <Slider
                      value={[hsl.s]}
                      max={100}
                      step={1}
                      onValueChange={([v]) => handleHslChange("s", v)}
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <Label className="text-muted-foreground">Lightness</Label>
                      <span className="font-mono text-xs">{hsl.l}%</span>
                    </div>
                    <Slider
                      value={[hsl.l]}
                      max={100}
                      step={1}
                      onValueChange={([v]) => handleHslChange("l", v)}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="rgb" className="mt-0 text-center py-4">
                <p className="text-xs text-muted-foreground mb-2">
                  RGB Sliders (Simplified)
                </p>
                {/* RGB implementation omitted for brevity, shares logic with HSL */}
                <Input
                  value={`rgb(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)})`}
                  readOnly
                  className="text-center font-mono text-xs"
                />
              </TabsContent>

              <TabsContent value="hex" className="mt-0 space-y-3">
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-muted-foreground" />
                  <Input
                    value={color}
                    onChange={(e) => onUpdate(index, e.target.value)}
                    className="font-mono uppercase"
                    maxLength={7}
                  />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </PopoverContent>
      </Popover>

      <div className="flex-1 flex flex-col justify-center gap-0.5">
        <Input
          value={color}
          onChange={(e) => onUpdate(index, e.target.value)}
          className="h-7 text-xs font-mono bg-transparent border-none p-0 focus-visible:ring-0 shadow-none hover:underline decoration-muted-foreground/30 underline-offset-4"
        />
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground">
            H:{hsl.h} S:{hsl.s} L:{hsl.l}
          </span>
        </div>
      </div>

      <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
        >
          <Trash2Icon className="w-3.5 h-3.5" />
        </Button>
      </div>
    </motion.div>
  );
};
