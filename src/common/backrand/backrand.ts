import type { BackrandAspectRatio } from "./aspect-ratio";
import type { BackrandModel } from "./models";
import type { BackrandQuality } from "./quality";
import type { WarpType } from "./warps";

export type BackrandParams = {
  size: string;
  aspect_ratio: BackrandAspectRatio;
  quality: BackrandQuality;

  model: BackrandModel;

  /**
   * Warps is a model specific parameter, that changes the way the colors are distributed.
   * Different models may support different warp types.
   */
  warp: WarpType;
  warp_amplitude: number;
  warp_frequency: number;
  warp_octaves: number;

  colors: string;
  num_points: number;
  blur_radius: number;

  grain: number;
  border_colors: string;
  seed?: number;
};
