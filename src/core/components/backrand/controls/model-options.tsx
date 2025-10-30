import { Header6, Paragraph } from "@/components/typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useBackrand } from "@/context/backrand-context";
import { InfoIcon } from "lucide-react";
import type { FC } from "react";

export const ModelOptions: FC = () => {
  const { currentModel, params, updateModelOption } = useBackrand();

  if (!currentModel.options) {
    return null;
  }

  return (
    <div className="space-y-5">
      <Header6>Modellspesifikke innstillinger</Header6>
      {currentModel.options.map((opt) => {
        if (!opt.type) return null;
        const modelOption = params.model.options?.[Number(opt.key)];
        const value =
          params.model_options?.[opt.key] ?? modelOption?.default ?? null;

        return (
          <div key={opt.key} className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>
                {opt.label}
                {typeof value === "number" && `: ${value ?? opt.default ?? ""}`}
              </Label>
              {opt.description && (
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <Paragraph className="text-xs dark:text-gray-700 text-gray-300">
                      {opt.description}
                    </Paragraph>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>

            {opt.type === "slider" && (
              <Slider
                value={[
                  typeof params.model_options?.[opt.key] === "number"
                    ? (params.model_options[opt.key] as number)
                    : typeof opt.default === "number"
                    ? (opt.default as number)
                    : 0,
                ]}
                min={opt.min ?? 0}
                max={opt.max ?? 1}
                step={opt.step ?? 0.01}
                onValueChange={([v]) => updateModelOption(opt.key, v)}
              />
            )}

            {opt.type === "number" && (
              <Input
                type="number"
                value={String(
                  params.model_options?.[opt.key] ?? opt.default ?? 0
                )}
                onChange={(e) =>
                  updateModelOption(opt.key, Number(e.target.value))
                }
              />
            )}

            {opt.type === "select" && (
              <Select
                onValueChange={(v) => updateModelOption(opt.key, v)}
                value={String(
                  params.model_options?.[opt.key] ?? opt.default ?? 0
                )}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Velg alternativ" />
                </SelectTrigger>
                <SelectContent>
                  {opt.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex flex-col">
                        <span>{option.label}</span>
                        {option.description && (
                          <span className="text-xs text-muted-foreground">
                            {option.description}
                          </span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {opt.type === "colorlist" && (
              <Input
                type="text"
                placeholder="F.eks. #ff0000,#00ff00,#0000ff"
                value={String(
                  params.model_options?.[opt.key] ?? opt.default ?? ""
                )}
              />
            )}

            {opt.type === "boolean" && (
              <Switch
                checked={Boolean(
                  params.model_options?.[opt.key] ?? opt.default
                )}
                onCheckedChange={(checked) =>
                  updateModelOption(opt.key, checked)
                }
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
