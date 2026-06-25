import { useState, type FC } from "react";
import { useBackrand } from "@/context/backrand-context";
import { backrandPresets, type BackrandPreset } from "@/common/backrand/presets";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

const categoryColors: Record<string, string> = {
  mesh_css: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  mesh_gradient: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  reflective_mesh: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  sky: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
};

const categoryLabels: Record<string, string> = {
  mesh_css: "CSS",
  mesh_gradient: "Mesh",
  reflective_mesh: "Reflective",
  sky: "Sky",
};

export const PresetSelector: FC = () => {
  const { params, setModel, updateSetting } = useBackrand();
  const [showAll, setShowAll] = useState(false);

  const currentModelId = params.model.id;
  const filtered = showAll
    ? backrandPresets
    : backrandPresets.filter((p) => p.config.model === currentModelId);

  const applyPreset = (preset: BackrandPreset) => {
    if (preset.config.model !== params.model.id) {
      setModel(preset.config.model);
    }

    if (preset.config.model_options) {
      for (const [key, value] of Object.entries(preset.config.model_options)) {
        updateSetting("model_options" as never, {
          ...(params.model_options as Record<string, string | number | boolean>),
          [key]: value,
        } as never);
      }
    }

    if (preset.config.warp !== undefined) {
      updateSetting("warp", preset.config.warp);
    }
    if (preset.config.num_points !== undefined) {
      updateSetting("num_points", preset.config.num_points);
    }
    if (preset.config.blur_radius !== undefined) {
      updateSetting("blur_radius", preset.config.blur_radius);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowAll(!showAll)}
          className={cn(
            "text-[10px] font-medium transition-colors",
            showAll
              ? "text-foreground"
              : "text-muted-foreground/50 hover:text-muted-foreground"
          )}
        >
          {showAll ? "All presets" : `Current: ${categoryLabels[currentModelId] ?? currentModelId}`}
        </button>
        {showAll && (
          <span className="text-[9px] text-muted-foreground/40">
            {filtered.length} presets
          </span>
        )}
      </div>

      <div className="space-y-1 max-h-48 overflow-y-auto scrollbar-thin">
        {filtered.length === 0 ? (
          <p className="text-[10px] text-muted-foreground/40 py-2 text-center">
            No presets for this engine yet
          </p>
        ) : (
          filtered.map((preset) => (
            <PresetCard key={preset.id} preset={preset} onApply={applyPreset} />
          ))
        )}
      </div>
    </div>
  );
};

const PresetCard: FC<{
  preset: BackrandPreset;
  onApply: (preset: BackrandPreset) => void;
}> = ({ preset, onApply }) => {
  return (
    <button
      onClick={() => onApply(preset)}
      className="w-full text-left px-2.5 py-2 rounded-lg transition-all hover:bg-muted/40 group"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[11px] font-medium text-foreground/80 group-hover:text-foreground transition-colors">
          {preset.name}
        </span>
        <span
          className={cn(
            "px-1 py-0.5 rounded text-[8px] font-medium",
            categoryColors[preset.category]
          )}
        >
          {categoryLabels[preset.category]}
        </span>
      </div>
      <p className="text-[9px] text-muted-foreground/50 line-clamp-1">
        {preset.description}
      </p>
      <div className="flex gap-1 mt-1.5 flex-wrap">
        {preset.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-1.5 py-0.5 rounded-full bg-muted/50 text-[8px] text-muted-foreground/50"
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
};
