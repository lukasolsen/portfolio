import { useState, useEffect, type FC } from "react";
import { useBackrand } from "@/context/backrand-context";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Code2, Maximize, History, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import type { BackrandImage } from "@/common/backrand/http";

type ColorPoint = {
  x: number;
  y: number;
  color: string;
  label: "Darkest" | "Brightest" | "Accent" | "Base";
};

const analyzeImageColors = (img: HTMLImageElement): ColorPoint[] => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return [];

  const width = 50;
  const height = 50;
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);

  const imageData = ctx.getImageData(0, 0, width, height).data;
  const points: ColorPoint[] = [];

  let maxLum = -1,
    minLum = 256,
    maxSat = -1;
  let brightPt = { x: 0, y: 0, c: "" },
    darkPt = { x: 0, y: 0, c: "" },
    satPt = { x: 0, y: 0, c: "" };

  // Scan pixels
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = imageData[i],
        g = imageData[i + 1],
        b = imageData[i + 2];

      // Calculate Luminance
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;

      // Calculate Saturation (Simplified)
      const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      const sat = (max - min) / (max || 1);

      const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

      // Find Brightest
      if (lum > maxLum) {
        maxLum = lum;
        brightPt = { x, y, c: hex };
      }
      // Find Darkest
      if (lum < minLum) {
        minLum = lum;
        darkPt = { x, y, c: hex };
      }
      // Find Most Saturated (Colorful)
      if (sat > maxSat) {
        maxSat = sat;
        satPt = { x, y, c: hex };
      }
    }
  }

  // Helper to map 50x50 coord to percentage
  const toPct = (val: number, max: number) => Math.round((val / max) * 100);

  // Push points (filtering duplicates roughly)
  points.push({
    x: toPct(brightPt.x, width),
    y: toPct(brightPt.y, height),
    color: brightPt.c,
    label: "Brightest",
  });
  points.push({
    x: toPct(darkPt.x, width),
    y: toPct(darkPt.y, height),
    color: darkPt.c,
    label: "Darkest",
  });

  if (satPt.c !== brightPt.c && satPt.c !== darkPt.c) {
    points.push({
      x: toPct(satPt.x, width),
      y: toPct(satPt.y, height),
      color: satPt.c,
      label: "Accent",
    });
  }

  // Add a random mid-point for good measure (compositional balance)
  const midX = Math.floor(width / 2);
  const midY = Math.floor(height / 2);
  const i = (midY * width + midX) * 4;
  const r = imageData[i],
    g = imageData[i + 1],
    b = imageData[i + 2];
  const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  points.push({ x: 50, y: 50, color: hex, label: "Base" });

  return points;
};

export const PlaygroundCanvas: FC = () => {
  const { image, loading, params } = useBackrand();
  const [isHoveringHistory, setIsHoveringHistory] = useState(false);

  const [prevImage, setPrevImage] = useState<BackrandImage | null>(null);
  const [isInternalLoading, setIsInternalLoading] = useState(false);
  const [smartPoints, setSmartPoints] = useState<ColorPoint[]>([]);

  useEffect(() => {
    if (!image) return;
    setIsInternalLoading(true);

    const imgBuffer = new Image();
    imgBuffer.crossOrigin = "Anonymous";

    imgBuffer.src = image.imageUrl;
    imgBuffer.onload = () => {
      const points = analyzeImageColors(imgBuffer);
      setSmartPoints(points);

      if (image) setPrevImage(image);
      setIsInternalLoading(false);
    };

    imgBuffer.onerror = () => {
      console.error("Failed to load image buffer");
      setIsInternalLoading(false);
    };
  }, [image]);

  const handleDownload = () => {
    if (!image) return;

    const link = document.createElement("a");
    link.href = image.imageUrl;
    link.download = `backrand-${params.model.id}-${Date.now()}.png`;
    link.click();
    toast.success("Lastet ned bilde");
  };

  const handleCopyCode = () => {
    const code = JSON.stringify(params, null, 2);
    navigator.clipboard.writeText(code);
    toast.success("Konfigurasjon kopiert til utklippstavlen");
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast.success(`Copied ${color}`);
  };

  const isLoading = loading || isInternalLoading;

  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 rounded-full border border-border/40 bg-background/60 backdrop-blur-md shadow-xl z-30 transition-all hover:bg-background/80">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-9 w-9"
                onClick={handleCopyCode}
              >
                <Code2 className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Kopier konfigurasjon</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-9 w-9"
                onClick={handleDownload}
                disabled={!image?.imageUrl}
              >
                <Download className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Last ned PNG</TooltipContent>
          </Tooltip>

          <div className="w-px h-4 bg-border mx-1" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={isHoveringHistory ? "default" : "ghost"}
                size="icon"
                className="rounded-full h-9 w-9"
                onMouseDown={() => setIsHoveringHistory(true)}
                onMouseUp={() => setIsHoveringHistory(false)}
                onMouseLeave={() => setIsHoveringHistory(false)}
                disabled={!prevImage}
              >
                {isHoveringHistory ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <History className="w-4 h-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Hold for å sammenligne</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <motion.div
        layout
        className="relative z-10 max-w-full max-h-full shadow-2xl rounded-lg overflow-hidden border border-border/50 group select-none"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 bg-background/40 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="bg-background/80 p-4 rounded-2xl shadow-2xl flex flex-col items-center gap-3 border border-border/50">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Genererer...
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full h-full absolute inset-0 -z-10 opacity-20" />

        {image?.imageUrl ? (
          <div className="relative">
            <motion.img
              key={image?.imageUrl}
              src={
                isHoveringHistory && prevImage?.imageUrl
                  ? prevImage.imageUrl
                  : image?.imageUrl
              }
              alt="Generated Background"
              className="max-h-[80vh] max-w-[80vw] object-contain block"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />

            {!isLoading && !isHoveringHistory && (
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {smartPoints.map((point, i) => (
                  <motion.div
                    key={`${i}-${point.color}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.1, type: "spring" }}
                    className="absolute z-30"
                    style={{ left: `${point.x}%`, top: `${point.y}%` }}
                  >
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => copyColor(point.color)}
                            className="relative group/dot -translate-x-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center"
                          >
                            <span className="absolute inset-0 rounded-full bg-white/30 animate-ping opacity-75" />
                            <span className="absolute inset-0 rounded-full border-2 border-white/80 shadow-sm bg-black/20 backdrop-blur-sm transition-transform group-hover/dot:scale-125" />
                            <span
                              className="w-2.5 h-2.5 rounded-full shadow-inner"
                              style={{ backgroundColor: point.color }}
                            />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="flex flex-col items-center gap-1 py-2 backdrop-blur-xl bg-background/80 border-white/10"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full border border-white/20"
                              style={{ backgroundColor: point.color }}
                            />
                            <span className="font-mono font-bold">
                              {point.color}
                            </span>
                          </div>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                            {point.label}
                          </span>
                          <span className="text-[10px] text-primary mt-1 flex items-center gap-1">
                            Click to copy
                          </span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="w-[512px] h-[512px] flex flex-col items-center justify-center text-muted-foreground bg-card/30">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <Maximize className="w-8 h-8 opacity-50" />
            </div>
            <p>Ingen bilde generert</p>
            <p className="text-xs opacity-50">Trykk Space for å starte</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
