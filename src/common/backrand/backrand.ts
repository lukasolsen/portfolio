import type { BackrandAspectRatio } from "./aspect-ratio";
import type { BackrandModel } from "./models";
import type { BackrandQuality } from "./quality";
import type { WarpType } from "./warps";

/**
 * Main parameters for Backrand image generation
 */
export interface BackrandParams {
  size: `${number}x${number}`;
  aspect_ratio: BackrandAspectRatio;
  quality: BackrandQuality;

  // ** Selected Backrand model */
  model: BackrandModel;
  model_options?: Record<string, unknown>;

  /** Warp-related parameters */
  warp: WarpType;
  warp_options?: Record<string, unknown>;

  warp_amplitude: number;
  warp_frequency: number;
  warp_octaves: number;

  /** Color and generation settings */
  colors: string; // comma-separated hex
  num_points: number;
  blur_radius: number;
  border_colors: string; // optional comma-separated
  grain: number;

  /** Optional seed for deterministic generation */
  seed?: number;
}
