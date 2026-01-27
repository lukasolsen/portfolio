import { WarpType } from "./warps";

export enum BackrandEngineType {
  OrganicMesh = "mesh_gradient",
  GlassRefraction = "reflective_mesh",
  AtmosphericSky = "sky",
}

export type ModelOption = {
  key: string;
  label: string;
  type: "slider" | "number" | "select" | "colorlist" | "boolean";
  min?: number;
  max?: number;
  step?: number;
  default?: number | string | boolean;
  description?: string;
  options?: { label: string; value: string; description?: string }[];
  advanced?: boolean;
  category?: string;
  /**
   * Only show this option if another option has a specific value
   */
  condition?: {
    key: string;
    value: string | number | boolean;
  };
};

export type BackrandEngine = {
  id: BackrandEngineType;
  name: string;
  displayName: string;
  description: string;
  technical_description: string;
  tags?: string[];

  supportsWarp?: boolean;
  allowedWarps?: WarpType[];
  blacklistedOptions?: string[];

  options?: ModelOption[];
};

export const BackrandModels: Record<string, BackrandEngine> = {
  [BackrandEngineType.OrganicMesh]: {
    id: BackrandEngineType.OrganicMesh,
    name: "Organic Mesh",
    displayName: "✨ Organic Mesh Composer",
    description:
      "A fluid, high-fidelity mesh engine that generates seamless color transitions using advanced geometric layouts.",
    technical_description:
      "Synthesizes a dynamic vertex grid with real-time color interpolation. Supports topological relaxation and varying distribution patterns for natural-looking gradients.",
    tags: ["gradient", "fluid", "mesh"],
    supportsWarp: true,
    options: [
      {
        key: "algorithm",
        label: "Topology Engine",
        description:
          "The mathematical foundation used to generate the mesh structure.",
        type: "select",
        default: "delaunay",
        options: [
          {
            label: "Delaunay Triangulation",
            value: "delaunay",
            description:
              "Creates perfectly balanced triangles between points, ideal for structural and sharp gradients.",
          },
          {
            label: "Radial Basis Function",
            value: "rbf",
            description:
              "A smooth, non-linear interpolation method that creates dream-like, misty transitions.",
          },
          {
            label: "Voronoi Tessellation",
            value: "voronoi",
            description:
              "Divides space into distinct cells, creating a stained-glass or cell-like aesthetic.",
          },
        ],
      },
      {
        key: "distribution",
        label: "Vertex Distribution",
        description:
          "Governs how the initial points are scattered across the canvas.",
        type: "select",
        default: "random",
        options: [
          {
            label: "Natural Random",
            value: "random",
            description:
              "Standard random distribution for an organic, unpredictable look.",
          },
          {
            label: "Poisson Disk",
            value: "poisson",
            description:
              "Ensures points are evenly spaced, avoiding clusters for a cleaner mesh.",
          },
          {
            label: "Golden Spiral",
            value: "spiral",
            description:
              "Arranges points in a mathematical Fibonacci spiral from the center.",
          },
        ],
      },
      // Delaunay Specific Options
      {
        key: "mesh_complexity",
        label: "Mesh Complexity",
        type: "slider",
        min: 3,
        max: 50,
        step: 1,
        default: 12,
        description:
          "Controls the density of the Delaunay triangles. Higher values create more intricate patterns.",
        condition: { key: "algorithm", value: "delaunay" },
      },
      {
        key: "edge_tension",
        label: "Edge Tension",
        type: "slider",
        min: 0,
        max: 1,
        step: 0.01,
        default: 0.5,
        description:
          "Adjusts how tightly the colors cling to the triangle edges.",
        condition: { key: "algorithm", value: "delaunay" },
      },
      {
        key: "use_relaxation",
        label: "Iterative Relaxation",
        type: "boolean",
        default: true,
        description:
          "Applies Lloyd's algorithm to center points within their regions, creating a more uniform and 'relaxed' mesh structure.",
      },
      {
        key: "color_blending",
        label: "Blending Mode",
        type: "select",
        default: "smooth",
        options: [
          { label: "Ultra Smooth", value: "smooth" },
          { label: "Per-Vertex", value: "vertex" },
          { label: "Posterized", value: "hard" },
        ],
      },
    ],
    allowedWarps: [WarpType.None, WarpType.Turbulence],
  },

  [BackrandEngineType.GlassRefraction]: {
    id: BackrandEngineType.GlassRefraction,
    name: "Reflective Mesh",
    displayName: "💎 Glass Refraction",
    description:
      "A premium rendering engine that simulates light passing through textured glass and reflective surfaces.",
    technical_description:
      "Utilizes pseudo-3D normal mapping on a 2D mesh to calculate light refraction and specular highlights.",
    tags: ["glass", "reflective", "3d"],
    supportsWarp: true,
    allowedWarps: [WarpType.None, WarpType.Wave, WarpType.Turbulence],
    options: [
      {
        key: "refraction_index",
        label: "Refraction Index",
        type: "slider",
        min: 0,
        max: 2,
        step: 0.01,
        default: 1.2,
        description:
          "Simulates the density of the glass material. Higher values distort colors more intensely.",
      },
      {
        key: "reflection_intensity",
        label: "Specular Intensity",
        type: "slider",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0.5,
        description:
          "Controls how much light is reflected off the surface 'ridges'.",
      },
      {
        key: "roughness",
        label: "Surface Roughness",
        type: "slider",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0.2,
        description:
          "Adds micro-textures to the surface to simulate frosted glass.",
      },
    ],
  },

  [BackrandEngineType.AtmosphericSky]: {
    id: BackrandEngineType.AtmosphericSky,
    name: "Atmospheric Sky",
    displayName: "🌌 Atmospheric Void",
    description:
      "A vast celestial engine for creating hyper-realistic skies, deep space vistas, and nebula-like backgrounds.",
    technical_description:
      "Implements Rayleigh and Mie scattering models for atmosphere, combined with multi-layered noise for cloud and star field generation.",
    tags: ["sky", "nebula", "space"],
    supportsWarp: false,
    options: [
      {
        key: "mode",
        label: "Celestial Preset",
        type: "select",
        options: [
          { value: "night", label: "Midnight Void" },
          { value: "day", label: "High Noon" },
          { value: "dawn", label: "Golden Hour" },
          { value: "dusk", label: "Twilight" },
        ],
        default: "night",
      },
      {
        key: "cloud_density",
        label: "Vapor Density",
        type: "slider",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0.35,
        description: "Governs the thickness and opacity of cloud formations.",
      },
      {
        key: "star_field_density",
        label: "Star Cluster Density",
        type: "slider",
        min: 0,
        max: 0.01,
        step: 0.0005,
        default: 0.002,
        description:
          "Controls the amount of stars generated in the deep space layers.",
      },
      {
        key: "nebula_intensity",
        label: "Nebula Glow",
        type: "slider",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0.5,
        description: "Adds colorful gas clouds and nebulae to the background.",
      },
      {
        key: "horizon_glow",
        label: "Atmospheric Bloom",
        type: "slider",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0.6,
        description: "Adjusts the light scattering at the horizon line.",
      },
    ],
  },
};
