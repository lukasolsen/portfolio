import React, { createContext, useContext, useState, useCallback } from "react";
import { toast } from "sonner";
import {
  generateBackrandImage,
  type BackrandImage,
} from "@/common/backrand/http";
import {
  BackrandModels,
  BackrandEngineType,
  type BackrandEngine,
} from "@/common/backrand/models";
import { WarpType } from "@/common/backrand/warps";
import { BackrandQuality } from "@/common/backrand/quality";
import { BackrandAspectRatio } from "@/common/backrand/aspect-ratio";
import type { BackrandParams } from "@/common/backrand/backrand";

export type RequestLog = {
  id: number;
  timestamp: string;
  endpoint: string;
  method: string;
  body: Record<string, unknown>;
  responseHeaders: Record<string, string>;
  status: number;
  duration: number;
  error?: string;
};

type BackrandContextType = {
  params: BackrandParams;
  image: BackrandImage | null;
  loading: boolean;
  models: BackrandEngine[];
  requestLog: RequestLog[];

  currentModel: BackrandEngine;
  setModel: (model_id: string) => void;

  handleGenerate: () => Promise<void>;
  updateSetting: <K extends keyof BackrandParams>(
    key: K,
    value: BackrandParams[K],
  ) => void;
  updateModelOption: (key: string, value: string | number | boolean) => void;
};

const BackrandContext = createContext<BackrandContextType | undefined>(
  undefined,
);

export const BackrandProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const defaultModel = BackrandModels[BackrandEngineType.MeshGradient];

  const [settings, setParams] = useState<BackrandParams>({
    size: "512x512",
    model: defaultModel,
    aspect_ratio: BackrandAspectRatio.Wide,
    quality: BackrandQuality.ULTRA,
    colors: null,
    num_points: 6,
    blur_radius: 10,
    border_colors: "",
    warp_octaves: 1,
    warp: WarpType.None,
    warp_amplitude: 15,
    warp_frequency: 0.05,
    grain: 0.02,
    model_options: {
      ...defaultModel.options?.reduce(
        (acc, option) => {
          if (option.default !== undefined) {
            acc[option.key] = option.default;
          }
          return acc;
        },
        {} as Record<string, string | number | boolean>,
      ),
    },
  });

  const [image, setImage] = useState<BackrandImage | null>(null);
  const [loading, setLoading] = useState(false);
  const [requestLog, setRequestLog] = useState<RequestLog[]>([]);

  const models = Object.values(BackrandModels);
  const [currentModel, setCurrentModel] = useState(models[0]);

  const setModel = (model_id: string) => {
    const model = BackrandModels[model_id];

    setCurrentModel(model);
    setParams((prev) => ({
      ...prev,
      model: model,
      model_options: {
        ...model.options?.reduce(
          (acc, option) => {
            if (option.default !== undefined) {
              acc[option.key] = option.default;
            }
            return acc;
          },
          {} as Record<string, string | number | boolean>,
        ),
      },
    }));
  };

  const updateSetting = useCallback(
    <K extends keyof BackrandParams>(key: K, value: BackrandParams[K]) => {
      setParams((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const updateModelOption = (key: string, value: string | number | boolean) => {
    setParams((prev) => ({
      ...prev,
      model_options: { ...prev.model_options, [key]: value },
    }));
  };

  const handleGenerate = useCallback(async () => {
    setLoading(true);
    toast.dismiss();

    const startTime = performance.now();
    const [width, height] = settings.size.split("x").map(Number);

    const requestBody = {
      size: [width, height],
      quality: settings.quality,
      model: settings.model.id,
      model_options: settings.model_options ?? {},
      colors: settings.colors ? settings.colors.split(",") : null,
      warp: {
        type: settings.warp,
        amplitude: settings.warp_amplitude,
        frequency: settings.warp_frequency,
        octaves: settings.warp_octaves,
      },
      num_points: settings.num_points,
      blur_radius: settings.blur_radius,
      grain: settings.grain,
      seed: settings.seed,
      output_format: "webp",
    };

    try {
      image?.revoke();

      const result = await generateBackrandImage(settings);
      setImage(result);

      const duration = Math.round(performance.now() - startTime);

      setRequestLog((prev) => [
        {
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString(),
          endpoint: "/generate/" + settings.model.id,
          method: "POST",
          body: requestBody,
          responseHeaders: result.meta as Record<string, string>,
          status: 200,
          duration,
        },
        ...prev.slice(0, 19),
      ]);
    } catch (e) {
      const duration = Math.round(performance.now() - startTime);

      setRequestLog((prev) => [
        {
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString(),
          endpoint: "/generate/" + settings.model.id,
          method: "POST",
          body: requestBody,
          responseHeaders: {},
          status: 500,
          duration,
          error: e instanceof Error ? e.message : "Unknown error",
        },
        ...prev.slice(0, 19),
      ]);

      console.error(e);
      toast.error("Generation failed");
    } finally {
      setLoading(false);
    }
  }, [settings, image]);

  const value: BackrandContextType = {
    params: settings,
    image,
    loading,
    models,
    requestLog,
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
