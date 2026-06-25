import { WarpType } from "./warps";

export enum BackrandEngineType {
  MeshGradient = "mesh_gradient",
  MeshCSS = "mesh_css",
  ReflectiveMesh = "reflective_mesh",
  Sky = "sky",
}

export type ModelOption = {
  key: string;
  label: string;
  type: "slider" | "number" | "select" | "boolean";
  min?: number;
  max?: number;
  step?: number;
  default?: number | string | boolean;
  description?: string;
  options?: { label: string; value: string }[];
  condition?: {
    key: string;
    value: string | number | boolean;
  };
};

export type BackrandEngine = {
  id: BackrandEngineType;
  name: string;
  description: string;
  tags: string[];
  supportsWarp: boolean;
  allowedWarps: WarpType[];
  options: ModelOption[];
};

export const BackrandModels: Record<string, BackrandEngine> = {
  [BackrandEngineType.MeshGradient]: {
    id: BackrandEngineType.MeshGradient,
    name: "Mesh Gradient",
    description: "Smooth organic gradients via control points and interpolation",
    tags: ["gradient", "mesh", "organic"],
    supportsWarp: true,
    allowedWarps: [WarpType.None, WarpType.Wave, WarpType.Turbulence, WarpType.Curl],
    options: [
      {
        key: "algorithm",
        label: "Interpolation",
        type: "select",
        default: "delaunay",
        options: [
          { label: "Delaunay", value: "delaunay" },
          { label: "Fluid", value: "fluid" },
          { label: "RBF", value: "rbf" },
          { label: "Voronoi", value: "voronoi" },
        ],
      },
      {
        key: "blend_mode",
        label: "Blend Mode",
        type: "select",
        default: "smooth",
        options: [
          { label: "Smooth", value: "smooth" },
          { label: "Vertex", value: "vertex" },
          { label: "Hard", value: "hard" },
        ],
      },
      {
        key: "distribution",
        label: "Point Distribution",
        type: "select",
        default: "random",
        options: [
          { label: "Random", value: "random" },
          { label: "Poisson Disk", value: "poisson" },
          { label: "Golden Spiral", value: "spiral" },
        ],
      },
      {
        key: "mesh_complexity",
        label: "Complexity",
        type: "slider",
        min: 3,
        max: 50,
        step: 1,
        default: 12,
      },
      {
        key: "edge_tension",
        label: "Edge Tension",
        type: "slider",
        min: 0,
        max: 1,
        step: 0.01,
        default: 0.5,
      },
      {
        key: "bloom_intensity",
        label: "Bloom",
        type: "slider",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0,
      },
      {
        key: "saturation",
        label: "Saturation",
        type: "slider",
        min: 0,
        max: 2,
        step: 0.05,
        default: 1,
      },
      {
        key: "contrast",
        label: "Contrast",
        type: "slider",
        min: 0,
        max: 2,
        step: 0.05,
        default: 1,
      },
    ],
  },

  [BackrandEngineType.MeshCSS]: {
    id: BackrandEngineType.MeshCSS,
    name: "CSS Mesh",
    description: "Flowing CSS/Figma-style gradients with Perlin noise flow",
    tags: ["gradient", "css", "flow"],
    supportsWarp: true,
    allowedWarps: [WarpType.None, WarpType.CSSFlow],
    options: [
      {
        key: "preset",
        label: "Palette",
        type: "select",
        default: "aurora",
        options: [
          { label: "Aurora", value: "aurora" },
          { label: "Stripe", value: "stripe" },
          { label: "Sunset Silk", value: "sunset_silk" },
          { label: "OpenAI Warm", value: "openai_warm" },
          { label: "Ocean", value: "ocean" },
        ],
      },
      {
        key: "style",
        label: "Style",
        type: "select",
        default: "balanced",
        options: [
          { label: "Balanced", value: "balanced" },
          { label: "Silk", value: "silk" },
          { label: "Hero", value: "hero" },
          { label: "Ambient", value: "ambient" },
          { label: "Vibrant", value: "vibrant" },
        ],
      },
      {
        key: "interpolation",
        label: "Interpolation",
        type: "select",
        default: "bicubic",
        options: [
          { label: "Monotone Bicubic", value: "bicubic" },
          { label: "Freeform RBF", value: "freeform" },
        ],
      },
      {
        key: "jitter",
        label: "Jitter",
        type: "slider",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0.3,
      },
      {
        key: "flow_octaves",
        label: "Flow Octaves",
        type: "slider",
        min: 1,
        max: 6,
        step: 1,
        default: 3,
      },
      {
        key: "domain_warp",
        label: "Domain Warp",
        type: "slider",
        min: 0,
        max: 2,
        step: 0.1,
        default: 0.5,
      },
      {
        key: "glow",
        label: "Glow",
        type: "slider",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0,
      },
      {
        key: "vignette",
        label: "Vignette",
        type: "slider",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0,
      },
    ],
  },

  [BackrandEngineType.ReflectiveMesh]: {
    id: BackrandEngineType.ReflectiveMesh,
    name: "Reflective Mesh",
    description: "Multicolor mesh with light reflections, optimized for speed",
    tags: ["reflective", "light", "fast"],
    supportsWarp: true,
    allowedWarps: [WarpType.None, WarpType.Wave, WarpType.Turbulence],
    options: [
      {
        key: "reflection_count",
        label: "Light Orbs",
        type: "slider",
        min: 1,
        max: 20,
        step: 1,
        default: 5,
      },
      {
        key: "reflection_intensity",
        label: "Reflection Intensity",
        type: "slider",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0.5,
      },
    ],
  },

  [BackrandEngineType.Sky]: {
    id: BackrandEngineType.Sky,
    name: "Sky",
    description: "Atmospheric scenes with clouds, stars, aurora, moon",
    tags: ["sky", "atmosphere", "space"],
    supportsWarp: false,
    allowedWarps: [],
    options: [
      {
        key: "mode",
        label: "Time of Day",
        type: "select",
        default: "night",
        options: [
          { label: "Day", value: "day" },
          { label: "Night", value: "night" },
          { label: "Dawn", value: "dawn" },
          { label: "Dusk", value: "dusk" },
        ],
      },
      {
        key: "cloud_layers",
        label: "Cloud Layers",
        type: "slider",
        min: 0,
        max: 5,
        step: 1,
        default: 3,
      },
      {
        key: "cloud_density",
        label: "Cloud Density",
        type: "slider",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0.35,
      },
      {
        key: "cloud_coverage",
        label: "Cloud Coverage",
        type: "slider",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0.5,
      },
      {
        key: "star_density",
        label: "Star Density",
        type: "slider",
        min: 0,
        max: 0.01,
        step: 0.0005,
        default: 0.002,
      },
      {
        key: "aurora_enabled",
        label: "Aurora",
        type: "boolean",
        default: false,
      },
      {
        key: "moon_enabled",
        label: "Moon",
        type: "boolean",
        default: false,
      },
      {
        key: "moon_phase",
        label: "Moon Phase",
        type: "select",
        default: "full",
        options: [
          { label: "New", value: "new" },
          { label: "Crescent", value: "crescent" },
          { label: "Quarter", value: "quarter" },
          { label: "Gibbous", value: "gibbous" },
          { label: "Full", value: "full" },
        ],
        condition: { key: "moon_enabled", value: true },
      },
      {
        key: "planet_count",
        label: "Planets",
        type: "slider",
        min: 0,
        max: 5,
        step: 1,
        default: 0,
      },
    ],
  },
};
