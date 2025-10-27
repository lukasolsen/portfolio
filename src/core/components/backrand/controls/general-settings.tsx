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
import { Header6, Paragraph } from "@/components/typography";
import {
  CpuIcon,
  ImageIcon,
  SlidersIcon,
  ProportionsIcon,
  LockIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  BackrandAspectRatio,
  BackrandAspectRatios,
} from "@/common/backrand/aspect-ratio";
import {
  BackrandQuality,
  BackrandQualityLabels,
  BackrandQualityDescriptions,
} from "@/common/backrand/quality";
import { BackrandModels, BackrandModelType } from "@/common/backrand/models";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useBackrand } from "@/context/backrand-context";

type Props = { showOption: (key: string) => boolean };

export const GeneralSettings: FC<Props> = ({ showOption }) => {
  const { params, updateSetting, setModel } = useBackrand();

  return (
    <div className="space-y-6">
      <Header6>Generelle innstillinger</Header6>

      {/* Model Selector */}
      <div className="space-y-1.5">
        <Label className="flex items-center gap-2">
          <SlidersIcon className="w-4 h-4 text-muted-foreground" />
          Genereringsmodell
        </Label>
        <Select
          value={params.model.id}
          onValueChange={(v) => {
            const model = BackrandModels[v as BackrandModelType];
            setModel(model.id);
          }}
        >
          <SelectTrigger>
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
        <Paragraph className="text-xs text-muted-foreground">
          Velg hvilken modell som skal brukes for å generere bakgrunnen.
        </Paragraph>
      </div>

      {/* Image Size */}
      {showOption("size") && (
        <div className="space-y-1.5">
          <Label className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-muted-foreground" />
            Bildeoppløsning
          </Label>
          <Input
            value={params.size}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d+x\d+$/.test(value)) {
                updateSetting("size", value as `${number}x${number}`);
              } else {
                updateSetting("size", "" as `${number}x${number}`);
              }
            }}
            placeholder="512x512"
          />
          <Paragraph className="text-xs text-muted-foreground">
            Angi oppløsning i formatet bredde × høyde (f.eks. 1024x768).
          </Paragraph>
        </div>
      )}

      {/* Aspect Ratio */}
      {showOption("aspect_ratio") && (
        <div className="space-y-1.5">
          <Label className="flex items-center gap-2">
            <ProportionsIcon className="w-4 h-4 text-muted-foreground" />
            Bildets sideforhold
          </Label>
          <Select
            value={params.aspect_ratio}
            onValueChange={(v) =>
              updateSetting("aspect_ratio", v as BackrandAspectRatio)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Velg sideforhold" />
            </SelectTrigger>
            <SelectContent>
              {BackrandAspectRatios.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Paragraph className="text-xs text-muted-foreground">
            Velg et vanlig sideforhold for raskere oppsett.
          </Paragraph>
        </div>
      )}

      {/* Quality */}
      {showOption("quality") && (
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <CpuIcon className="w-4 h-4 text-muted-foreground" />
            Kvalitet og detaljnivå
          </Label>
          <div className="flex flex-wrap gap-2">
            {Object.values(BackrandQuality).map((q) => {
              const isLocked = [].includes(q);
              const isSelected = params.quality === q;

              return (
                <Tooltip key={q}>
                  <TooltipTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        disabled={isLocked}
                        onClick={() => updateSetting("quality", q)}
                        className={cn(
                          "flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all",
                          isLocked &&
                            "opacity-60 cursor-not-allowed border-dashed",
                          isSelected && "ring-2 ring-primary"
                        )}
                      >
                        {isLocked && (
                          <LockIcon className="w-3 h-3 text-red-500" />
                        )}
                        {BackrandQualityLabels[q]}
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs text-sm">
                    {BackrandQualityDescriptions[q]}
                    {isLocked && (
                      <p className="mt-1 flex items-center gap-1 text-red-800 font-medium dark:text-red-600">
                        <LockIcon className="w-4 h-4" />
                        Lukket grunnet ressurskrav og ytelse.
                      </p>
                    )}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
