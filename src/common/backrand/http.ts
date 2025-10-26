import axios from "axios";
import type { BackrandParams } from "./backrand";

type GenerateBackrandResponse = {
  seed: string;
  image_content: string;
};

export const generateBackrandImage = async (params: BackrandParams) => {
  const [w, h] = params.size.split("x").map(Number);

  const body = {
    size: [w, h],
    model: params.model.id,

    grain: params.grain,
    colors: params.colors.split(","),
    num_points: params.num_points,
    blur_radius: params.blur_radius,
    seed: params.seed,
    response_type: "base64",

    border_colors:
      params.border_colors && params.border_colors.length > 0
        ? params.border_colors.split(",")
        : null,

    warp: {
      type: params.warp,
      amplitude: params.warp_amplitude,
      frequency: params.warp_frequency,
      octaves: params.warp_octaves,
    },

    // ["amplitude": params.warp_amplitude, "frequency": params.warp_frequency, "octaves": params.warp_octaves],
    model_options: params.model.options || {},
  };

  //http://127.0.0.1:8000/generate/mesh_gradient
  const res = await axios.post<GenerateBackrandResponse>(
    "http://127.0.0.1:8000/generate/mesh_gradient",
    body
  );

  if (res.status !== 200) {
    throw new Error(
      `Feil ved generering av bilde: ${res.status} ${res.statusText}`
    );
  }

  const imageDataUrl = `data:image/png;base64,${res.data.image_content}`;
  return imageDataUrl;
};
