import { Warps, WarpType } from "@/common/backrand/warps";
import { Paragraph } from "@/components/typography";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useBackrand } from "@/context/backrand-context";
import { InfoIcon } from "lucide-react";

export const WarpSelector = () => {
  const { currentModel: model, params, updateSetting } = useBackrand();

  if (!model.supportsWarp) return null;

  const availableWarps = model.allowedWarps ?? [];

  return (
    <div className="space-y-2">
      <div className="flex flex-row items-center justify-between w-full">
        <Label className="text-sm font-medium">Warp-type</Label>
        <Tooltip>
          <TooltipTrigger>
            <InfoIcon className="w-4 h-4 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>
            <Paragraph className="text-xs dark:text-gray-700 text-gray-300">
              Warp endrer måten fargene distribueres på, og kan skape mer
              dynamiske og forskjellige gradienter.
            </Paragraph>
          </TooltipContent>
        </Tooltip>
      </div>
      <Select
        value={params.warp ?? "none"}
        onValueChange={(warp) => updateSetting("warp", warp as WarpType)}
      >
        <SelectTrigger className="w-full">
          {Warps[(params.warp || "none") as keyof typeof Warps]?.icon}{" "}
          {Warps[(params.warp || "none") as keyof typeof Warps]?.name}
        </SelectTrigger>
        <SelectContent>
          {availableWarps.map((warpId) => {
            const warp = Warps[warpId];
            return (
              <SelectItem key={warp.id} value={warp.id}>
                <div className="flex items-center gap-2">
                  <span>{warp.icon}</span>
                  <div className="flex flex-col">
                    <span className="font-medium">{warp.name}</span>
                    <span className="text-muted-foreground text-xs">
                      {warp.description}
                    </span>
                  </div>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      <Paragraph className="text-sm text-muted-foreground mt-1">
        Velg en warp-type for å endre hvordan fargene i gradienten blir
        distribuert.
      </Paragraph>
    </div>
  );
};
