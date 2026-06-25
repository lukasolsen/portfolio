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

export const PlaygroundCanvas: FC = () => {
  const { image, loading, params } = useBackrand();
  const [isHoveringHistory, setIsHoveringHistory] = useState(false);
  const [prevImage, setPrevImage] = useState<BackrandImage | null>(null);
  const [isInternalLoading, setIsInternalLoading] = useState(false);

  useEffect(() => {
    if (!image) return;
    setIsInternalLoading(true);

    const imgBuffer = new Image();
    imgBuffer.crossOrigin = "Anonymous";
    imgBuffer.src = image.imageUrl;

    imgBuffer.onload = () => {
      if (image) setPrevImage(image);
      setIsInternalLoading(false);
    };

    imgBuffer.onerror = () => {
      setIsInternalLoading(false);
    };
  }, [image]);

  const handleDownload = () => {
    if (!image) return;
    const link = document.createElement("a");
    link.href = image.imageUrl;
    link.download = `backrand-${params.model.id}-${Date.now()}.png`;
    link.click();
    toast.success("Downloaded");
  };

  const handleCopyCode = () => {
    const code = JSON.stringify(params, null, 2);
    navigator.clipboard.writeText(code);
    toast.success("Config copied");
  };

  const isLoading = loading || isInternalLoading;

  return (
    <div className="relative w-full h-max flex flex-col items-center justify-center bg-muted/10 overflow-hidden">
      {/* Toolbar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 p-1 rounded-xl border border-border/30 bg-background/70 backdrop-blur-xl shadow-lg z-30">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg h-8 w-8"
                onClick={handleCopyCode}
              >
                <Code2 className="w-3.5 h-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy config</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg h-8 w-8"
                onClick={handleDownload}
                disabled={!image?.imageUrl}
              >
                <Download className="w-3.5 h-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Download PNG</TooltipContent>
          </Tooltip>

          <div className="w-px h-4 bg-border/40 mx-0.5" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={isHoveringHistory ? "secondary" : "ghost"}
                size="icon"
                className="rounded-lg h-8 w-8"
                onMouseDown={() => setIsHoveringHistory(true)}
                onMouseUp={() => setIsHoveringHistory(false)}
                onMouseLeave={() => setIsHoveringHistory(false)}
                disabled={!prevImage}
              >
                {isHoveringHistory ? (
                  <Eye className="w-3.5 h-3.5" />
                ) : (
                  <History className="w-3.5 h-3.5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Hold to compare</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Main Image Area */}
      <div className="relative flex items-center justify-center w-full flex-1 p-12 overflow-hidden">
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-background/20 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-muted border-t-primary animate-spin" />
                <span className="text-xs text-muted-foreground font-medium">
                  Generating...
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {image?.imageUrl ? (
          <motion.div
            layout
            className="relative max-w-full max-h-full rounded-lg overflow-hidden shadow-2xl border border-border/20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              key={image.imageUrl}
              src={
                isHoveringHistory && prevImage?.imageUrl
                  ? prevImage.imageUrl
                  : image.imageUrl
              }
              alt="Generated Background"
              className="max-h-[80vh] max-w-[80vw] object-contain block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* History indicator */}
            {isHoveringHistory && (
              <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm text-[10px] font-medium text-muted-foreground">
                Previous
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-border/30 flex items-center justify-center">
              <Maximize className="w-8 h-8 text-muted-foreground/40" />
            </div>
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-muted-foreground">
                No image yet
              </p>
              <p className="text-xs text-muted-foreground/60">
                Press{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono">
                  Space
                </kbd>{" "}
                to generate
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
