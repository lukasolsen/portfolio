import { type FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ModelOptions } from "./model-options";
import { ColorSettings } from "./color-settings";
import { SlidersHorizontal, Palette } from "lucide-react";

export const DesignSettings: FC = () => {
  return (
    <div className="space-y-1">
      <Accordion
        type="multiple"
        defaultValue={["params", "colors"]}
        className="w-full space-y-4"
      >
        <AccordionItem
          value="params"
          className="border rounded-xl bg-card/20 px-3 border-border/60"
        >
          <AccordionTrigger className="hover:no-underline py-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Engine Configuration</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-4">
            <ModelOptions />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="colors"
          className="border rounded-xl bg-card/20 px-3 border-border/60"
        >
          <AccordionTrigger className="hover:no-underline py-3">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Color Palette</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-4">
            <ColorSettings />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
