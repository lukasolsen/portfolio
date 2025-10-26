import type { BackrandParams } from "@/common/backrand/backrand";
import type { BackrandModel } from "@/common/backrand/models";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";
import type { FC } from "react";

type Props = {
  params: BackrandParams;
  setParams: (params: BackrandParams) => void;
  model: BackrandModel;
};

export const ModelOptions: FC<Props> = ({ params, setParams, model }) => {
  if (!model.options) {
    return null;
  }

  return (
    <div className="space-y-5">
      <Header6>Modellspesifikke innstillinger</Header6>
      {model.options.map((opt) => (
        <div key={opt.key} className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>
              {opt.label}
              {typeof params[opt.key] === "number" &&
                `: ${params[opt.key] ?? opt.default ?? ""}`}
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
              value={[params[opt.key] ?? opt.default ?? 0]}
              min={opt.min ?? 0}
              max={opt.max ?? 1}
              step={opt.step ?? 0.01}
              onValueChange={([v]) => setParams({ ...params, [opt.key]: v })}
            />
          )}

          {opt.type === "number" && (
            <Input
              type="number"
              value={params[opt.key] ?? opt.default ?? ""}
              onChange={(e) =>
                setParams({ ...params, [opt.key]: Number(e.target.value) })
              }
            />
          )}

          {opt.type === "select" && (
            <Select
              onValueChange={(v) => setParams({ ...params, [opt.key]: v })}
              value={params[opt.key] ?? opt.default ?? ""}
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

          {opt.type === "boolean" && (
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={!!params[opt.key]}
                onChange={(e) =>
                  setParams({ ...params, [opt.key]: e.target.checked })
                }
              />
              <span>Aktiver {opt.label}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
