import axios from "axios";
import type { BackrandParams } from "./backrand";

export interface GenerateBackrandResponse {
  seed: string;
  image_content: string; // base64
}

export const generateBackrandImage = async (params: BackrandParams) => {
  const [width, height] = params.size.split("x").map(Number);

  const body = {
    size: [width, height],
    quality: params.quality,
    aspect_ratio: params.aspect_ratio,

    model: params.model.id,
    model_options: params.model_options ?? {},

    colors: params.colors.split(","),

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
    response_type: "base64",
  };

  try {
    const res = await axios.post<GenerateBackrandResponse>(
      "http://127.0.0.1:8000/generate/mesh_gradient",
      body
    );

    return `data:image/png;base64,${res.data.image_content}`;
  } catch (err) {
    console.error("Failed to generate Backrand image", err);
    throw new Error("Kunne ikke generere bildet, prøv igjen senere.");
  }
};
