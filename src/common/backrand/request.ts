import axios from "axios";
import type { BackrandParams } from "./backrand";
import type { ModelOption } from "./models";

interface GenerateBackrandResponse {
  seed: string;
  image_content: string;
}

function buildBackrandRequest(params: BackrandParams) {
  const [width, height] = params.size.split("x").map(Number);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const model_options: Record<string, any>[] = [];
  params.model.options?.forEach((opt: ModelOption) => {
    if (params.model_options?.[opt.key] != null) {
      model_options.push({ ...opt, value: params.model_options[opt.key] });
    }
  });

  return {
    size: [width, height],
    model: params.model.id,
    colors: params.colors.split(","),
    num_points: params.num_points,
    blur_radius: params.blur_radius,
    grain: params.grain,
    seed: params.seed,
    border_colors:
      !params.border_colors || params.border_colors === "none"
        ? null
        : params.border_colors.split(","),
    response_type: "base64",
    warp: {
      type: params.warp,
      amplitude: params.warp_amplitude,
      frequency: params.warp_frequency,
      octaves: params.warp_octaves,
    },
    model_options,
  };
}

export async function generateBackrandImage(params: BackrandParams) {
  const body = buildBackrandRequest(params);

  try {
    const res = await axios.post<GenerateBackrandResponse>(
      "http://127.0.0.1:8000/generate/mesh_gradient",
      body
    );

    return `data:image/png;base64,${res.data.image_content}`;
  } catch (err) {
    console.error("Backrand generation failed", err);
    throw new Error("Kunne ikke generere bildet, prøv igjen senere.");
  }
}
