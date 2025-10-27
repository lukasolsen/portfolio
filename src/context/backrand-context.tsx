import React, { createContext, useContext, useState, useCallback } from "react";
import { toast } from "sonner";
import { generateBackrandImage } from "@/common/backrand/http";
import {
  BackrandModels,
  BackrandModelType,
  type BackrandModel,
} from "@/common/backrand/models";
import { colorPresets } from "@/common/backrand/colors";
import { WarpType } from "@/common/backrand/warps";
import { BackrandQuality } from "@/common/backrand/quality";
import { BackrandAspectRatio } from "@/common/backrand/aspect-ratio";
import type { BackrandParams } from "@/common/backrand/backrand";

type BackrandContextType = {
  params: BackrandParams;
  image: string | null;
  loading: boolean;
  models: BackrandModel[];

  currentModel: BackrandModel;
  setModel: (model_id: string) => void;

  handleGenerate: () => Promise<void>;
  updateSetting: <K extends keyof BackrandParams>(
    key: K,
    value: BackrandParams[K]
  ) => void;
  updateModelOption: (key: string, value: string | number) => void;
};

const BackrandContext = createContext<BackrandContextType | undefined>(
  undefined
);

export const BackrandProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const defaultModel = BackrandModels[BackrandModelType.Mesh];

  const [settings, setParams] = useState<BackrandParams>({
    size: "512x512",
    model: defaultModel,
    aspect_ratio: BackrandAspectRatio.Wide,
    quality: BackrandQuality.ULTRA,
    colors: colorPresets[0].colors.join(","),
    num_points: 4,
    blur_radius: 10,
    border_colors: "",
    warp_octaves: 1,
    warp: WarpType.None,
    warp_amplitude: 15,
    warp_frequency: 0.05,
    grain: 0.02,
    model_options: {
      ...defaultModel.options.reduce((acc, option) => {
        acc[option.key] = option.default;
        return acc;
      }, {} as Record<string, string | number>),
    },
  });

  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const models = Object.values(BackrandModels);
  const [currentModel, setCurrentModel] = useState(models[0]);

  const setModel = (model_id: string) => {
    const model = BackrandModels[model_id as BackrandModelType];

    setCurrentModel(model);
    setParams((prev) => ({
      ...prev,
      model: model,
      model_options: {
        ...model.options?.reduce((acc, option) => {
          acc[option.key] = option.default;
          return acc;
        }, {} as Record<string, string | number>),
      },
    }));
  };

  const updateSetting = useCallback(
    <K extends keyof BackrandParams>(key: K, value: BackrandParams[K]) => {
      setParams((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const updateModelOption = (key: string, value: string | number) => {
    setParams((prev) => ({
      ...prev,
      model_options: { ...prev.model_options, [key]: value },
    }));
  };

  const handleGenerate = useCallback(async () => {
    setLoading(true);
    toast.dismiss();

    try {
      const result = await generateBackrandImage(settings);
      setImage(result);
    } catch (e) {
      console.error(e);
      toast.error("Kunne ikke generere bildet, prøv igjen senere.");
    } finally {
      setLoading(false);
    }
  }, [settings]);

  const value: BackrandContextType = {
    params: settings,
    image,
    loading,
    models,
    currentModel,
    setModel,
    updateModelOption,
    handleGenerate,
    updateSetting,
  };

  return (
    <BackrandContext.Provider value={value}>
      {children}
    </BackrandContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBackrand = () => {
  const ctx = useContext(BackrandContext);
  if (!ctx) {
    throw new Error("useBackrand must be used within a BackrandProvider");
  }
  return ctx;
};
