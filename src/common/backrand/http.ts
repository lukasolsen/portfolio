import axios from "axios";
import type { BackrandParams } from "./backrand";

export interface BackrandImage {
  /**
   * URL to the generated image.
   */
  imageUrl: string;

  /**
   * Revoke the image URL.
   */
  revoke: () => void;

  /**
   * Metadata about the generated image.
   */
  meta: {
    seed: string | null;
    width: number | null;
    height: number | null;
    generationTime: string | null;
  };
}

export const generateBackrandImage = async (
  params: BackrandParams,
): Promise<BackrandImage> => {
  const [width, height] = params.size.split("x").map(Number);

  const body = {
    size: [width, height],
    quality: params.quality,
    aspect_ratio: params.aspect_ratio,
    model: params.model.id,
    model_options: params.model_options ?? {},
    colors: params.colors ? params.colors.split(",") : null,
    warp: {
      type: params.warp,
      amplitude: params.warp_amplitude,
      frequency: params.warp_frequency,
      octaves: params.warp_octaves,
    },
    num_points: params.num_points,
    blur_radius: params.blur_radius,
    grain: params.grain,
    border_colors:
      params.border_colors?.length > 0 ? params.border_colors.split(",") : null,
    seed: params.seed,
    output_format: "webp",
  };

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/generate/mesh_gradient",
      body,
      {
        responseType: "blob",
        headers: {
          Accept: "image/webp,image/*",
        },
      },
    );

    const meta = {
      seed: response.headers["x-seed"] ?? null,
      width: response.headers["x-image-width"]
        ? Number(response.headers["x-image-width"])
        : null,
      height: response.headers["x-image-height"]
        ? Number(response.headers["x-image-height"])
        : null,
      generationTime: response.headers["x-generation-time"] ?? null,
    };

    const contentType = response.headers["content-type"] || "image/webp";

    const blob = new Blob([response.data], { type: contentType });

    if (!blob.size) {
      throw new Error("Received empty image blob");
    }

    const imageUrl = URL.createObjectURL(blob);

    return {
      imageUrl,
      revoke: () => URL.revokeObjectURL(imageUrl),
      meta,
    };
  } catch (err) {
    console.error("Failed to generate Backrand image", err);
    throw new Error("Kunne ikke generere bildet, prøv igjen senere.");
  }
};
