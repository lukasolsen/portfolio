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
  setParams: React.Dispatch<React.SetStateAction<BackrandParams>>;
  image: string | null;
  loading: boolean;
  models: BackrandModel[];
  currentModel: BackrandModel;
  setCurrentModel: (model: BackrandModel) => void;
  handleGenerate: () => Promise<void>;
  updateSetting: <K extends keyof BackrandParams>(
    key: K,
    value: BackrandParams[K]
  ) => void;
};

const BackrandContext = createContext<BackrandContextType | undefined>(
  undefined
);

export const BackrandProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [params, setParams] = useState<BackrandParams>({
    size: "512x512",
    model: BackrandModels[BackrandModelType.Mesh],
    aspect_ratio: BackrandAspectRatio.Wide,
    quality: BackrandQuality.MEDIUM,
    colors: colorPresets[0].colors.join(","),
    num_points: 4,
    blur_radius: 10,
    border_colors: "",
    warp_octaves: 1,
    warp: WarpType.None,
    warp_amplitude: 15,
    warp_frequency: 0.05,
    grain: 0.02,
  });

  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const models = Object.values(BackrandModels);
  const [currentModel, setCurrentModel] = useState(models[0]);

  const updateSetting = useCallback(
    <K extends keyof BackrandParams>(key: K, value: BackrandParams[K]) => {
      setParams((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleGenerate = useCallback(async () => {
    setLoading(true);
    toast.dismiss();

    try {
      const result = await generateBackrandImage(params);
      setImage(result);
    } catch (e) {
      console.error(e);
      toast.error("Kunne ikke generere bildet, prøv igjen senere.");
    } finally {
      setLoading(false);
    }
  }, [params]);

  const value: BackrandContextType = {
    params,
    setParams,
    image,
    loading,
    models,
    currentModel,
    setCurrentModel,
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
