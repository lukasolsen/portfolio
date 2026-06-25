import { BackrandEngineType } from "./models";
import { WarpType } from "./warps";

export type BackrandPreset = {
  id: string;
  name: string;
  description: string;
  category: "mesh_gradient" | "mesh_css" | "reflective_mesh" | "sky";
  tags: string[];
  config: {
    model: BackrandEngineType;
    model_options?: Record<string, string | number | boolean>;
    warp?: WarpType;
    num_points?: number;
    blur_radius?: number;
    grain?: number;
    seed?: number;
  };
};

export const backrandPresets: BackrandPreset[] = [
  // ── Mesh CSS presets ──────────────────────────────────────────────
  {
    id: "mesh_css_organic_layout",
    name: "Organic Layout",
    description: "Flowing organic gradients with built-in color palette",
    category: "mesh_css",
    tags: ["organic", "flowing", "warm"],
    config: {
      model: BackrandEngineType.MeshCSS,
      model_options: {
        preset: "openai_warm",
        style: "silk",
        jitter: 0.44,
        flow_octaves: 7,
        domain_warp: 2.2,
        glow: 0.12,
        vignette: 0,
      },
      warp: WarpType.CSSFlow,
    },
  },
  {
    id: "mesh_css_wave_pattern",
    name: "Wave Pattern",
    description: "Anisotropic wave patterns with strong directional flow",
    category: "mesh_css",
    tags: ["wave", "directional", "anisotropic"],
    config: {
      model: BackrandEngineType.MeshCSS,
      model_options: {
        preset: "aurora",
        style: "hero",
        jitter: 0.35,
        flow_octaves: 5,
        domain_warp: 1.5,
        glow: 0.08,
        vignette: 0,
      },
      warp: WarpType.CSSFlow,
    },
  },
  {
    id: "mesh_css_sunset_silk",
    name: "Sunset Silk",
    description: "Smooth silk-like gradients with warm sunset tones",
    category: "mesh_css",
    tags: ["sunset", "silk", "warm"],
    config: {
      model: BackrandEngineType.MeshCSS,
      model_options: {
        preset: "sunset_silk",
        style: "silk",
        jitter: 0.3,
        flow_octaves: 4,
        domain_warp: 1.0,
        glow: 0.15,
        vignette: 0.1,
      },
      warp: WarpType.CSSFlow,
    },
  },
  {
    id: "mesh_css_aurora_ambient",
    name: "Aurora Ambient",
    description: "Soft ambient aurora with gentle flow",
    category: "mesh_css",
    tags: ["aurora", "ambient", "soft"],
    config: {
      model: BackrandEngineType.MeshCSS,
      model_options: {
        preset: "aurora",
        style: "ambient",
        jitter: 0.25,
        flow_octaves: 3,
        domain_warp: 0.8,
        glow: 0.2,
        vignette: 0.15,
      },
      warp: WarpType.None,
    },
  },
  {
    id: "mesh_css_hero_banner",
    name: "Hero Banner",
    description: "Bold high-contrast gradients for hero sections",
    category: "mesh_css",
    tags: ["hero", "bold", "high-contrast"],
    config: {
      model: BackrandEngineType.MeshCSS,
      model_options: {
        preset: "stripe",
        style: "hero",
        jitter: 0.4,
        flow_octaves: 6,
        domain_warp: 1.8,
        glow: 0.05,
        vignette: 0,
      },
      warp: WarpType.CSSFlow,
    },
  },
  {
    id: "mesh_css_ocean_deep",
    name: "Ocean Deep",
    description: "Deep ocean blues with subtle underwater flow",
    category: "mesh_css",
    tags: ["ocean", "deep", "blue"],
    config: {
      model: BackrandEngineType.MeshCSS,
      model_options: {
        preset: "ocean",
        style: "balanced",
        jitter: 0.3,
        flow_octaves: 4,
        domain_warp: 1.2,
        glow: 0.1,
        vignette: 0.2,
      },
      warp: WarpType.None,
    },
  },

  // ── Mesh Gradient presets ─────────────────────────────────────────
  {
    id: "mesh_gradient_smooth",
    name: "Smooth Blend",
    description: "Smooth organic gradients with Delaunay interpolation",
    category: "mesh_gradient",
    tags: ["smooth", "organic", "delicate"],
    config: {
      model: BackrandEngineType.MeshGradient,
      model_options: {
        algorithm: "delaunay",
        blend_mode: "smooth",
        distribution: "poisson",
        mesh_complexity: 12,
        edge_tension: 0.5,
        bloom_intensity: 0,
        saturation: 1,
        contrast: 1,
      },
      num_points: 8,
      blur_radius: 15,
    },
  },
  {
    id: "mesh_gradient_vertex",
    name: "Vertex Sharp",
    description: "Sharp geometric gradients with vertex blending",
    category: "mesh_gradient",
    tags: ["sharp", "geometric", "vertex"],
    config: {
      model: BackrandEngineType.MeshGradient,
      model_options: {
        algorithm: "delaunay",
        blend_mode: "vertex",
        distribution: "spiral",
        mesh_complexity: 20,
        edge_tension: 0.8,
        bloom_intensity: 0.1,
        saturation: 1.2,
        contrast: 1.1,
      },
      num_points: 6,
      blur_radius: 5,
    },
  },
  {
    id: "mesh_gradient_fluid",
    name: "Fluid Motion",
    description: "Fluid organic gradients with soft transitions",
    category: "mesh_gradient",
    tags: ["fluid", "soft", "motion"],
    config: {
      model: BackrandEngineType.MeshGradient,
      model_options: {
        algorithm: "fluid",
        blend_mode: "smooth",
        distribution: "random",
        mesh_complexity: 15,
        edge_tension: 0.3,
        bloom_intensity: 0.15,
        saturation: 0.9,
        contrast: 0.95,
      },
      num_points: 10,
      blur_radius: 20,
      warp: WarpType.Wave,
    },
  },
  {
    id: "mesh_gradient_voronoi",
    name: "Voronoi Cells",
    description: "Cell-like patterns with Voronoi interpolation",
    category: "mesh_gradient",
    tags: ["voronoi", "cells", "pattern"],
    config: {
      model: BackrandEngineType.MeshGradient,
      model_options: {
        algorithm: "voronoi",
        blend_mode: "hard",
        distribution: "poisson",
        mesh_complexity: 25,
        edge_tension: 1,
        bloom_intensity: 0,
        saturation: 1.3,
        contrast: 1.2,
      },
      num_points: 12,
      blur_radius: 2,
    },
  },

  // ── Reflective Mesh presets ───────────────────────────────────────
  {
    id: "reflective_subtle",
    name: "Subtle Reflection",
    description: "Gentle light reflections on colorful mesh",
    category: "reflective_mesh",
    tags: ["subtle", "light", "gentle"],
    config: {
      model: BackrandEngineType.ReflectiveMesh,
      model_options: {
        reflection_count: 3,
        reflection_intensity: 0.3,
      },
      num_points: 6,
      blur_radius: 10,
    },
  },
  {
    id: "reflective_dramatic",
    name: "Dramatic Light",
    description: "Strong dramatic light reflections",
    category: "reflective_mesh",
    tags: ["dramatic", "bright", "bold"],
    config: {
      model: BackrandEngineType.ReflectiveMesh,
      model_options: {
        reflection_count: 8,
        reflection_intensity: 0.8,
      },
      num_points: 8,
      blur_radius: 5,
      warp: WarpType.Turbulence,
    },
  },
  {
    id: "reflective_scattered",
    name: "Scattered Orbs",
    description: "Many small scattered light orbs",
    category: "reflective_mesh",
    tags: ["scattered", "orbs", "many"],
    config: {
      model: BackrandEngineType.ReflectiveMesh,
      model_options: {
        reflection_count: 15,
        reflection_intensity: 0.5,
      },
      num_points: 10,
      blur_radius: 8,
    },
  },

  // ── Sky presets ───────────────────────────────────────────────────
  {
    id: "sky_night_stars",
    name: "Starry Night",
    description: "Clear night sky with stars and moon",
    category: "sky",
    tags: ["night", "stars", "moon"],
    config: {
      model: BackrandEngineType.Sky,
      model_options: {
        mode: "night",
        cloud_layers: 1,
        cloud_density: 0.1,
        cloud_coverage: 0.2,
        star_density: 0.005,
        aurora_enabled: false,
        moon_enabled: true,
        moon_phase: "full",
        planet_count: 0,
      },
    },
  },
  {
    id: "sky_aurora_borealis",
    name: "Aurora Borealis",
    description: "Northern lights with aurora and stars",
    category: "sky",
    tags: ["aurora", "northern", "lights"],
    config: {
      model: BackrandEngineType.Sky,
      model_options: {
        mode: "night",
        cloud_layers: 2,
        cloud_density: 0.15,
        cloud_coverage: 0.3,
        star_density: 0.003,
        aurora_enabled: true,
        moon_enabled: true,
        moon_phase: "crescent",
        planet_count: 0,
      },
    },
  },
  {
    id: "sky_sunrise",
    name: "Golden Sunrise",
    description: "Warm sunrise with soft clouds",
    category: "sky",
    tags: ["sunrise", "warm", "golden"],
    config: {
      model: BackrandEngineType.Sky,
      model_options: {
        mode: "dawn",
        cloud_layers: 3,
        cloud_density: 0.4,
        cloud_coverage: 0.5,
        star_density: 0,
        aurora_enabled: false,
        moon_enabled: false,
        planet_count: 0,
      },
    },
  },
  {
    id: "sky_cosmic",
    name: "Cosmic View",
    description: "Deep space with planets and stars",
    category: "sky",
    tags: ["cosmic", "space", "planets"],
    config: {
      model: BackrandEngineType.Sky,
      model_options: {
        mode: "night",
        cloud_layers: 0,
        cloud_density: 0,
        cloud_coverage: 0,
        star_density: 0.008,
        aurora_enabled: false,
        moon_enabled: false,
        planet_count: 3,
      },
    },
  },
  {
    id: "sky_dusk",
    name: "Evening Dusk",
    description: "Soft evening sky with fading light",
    category: "sky",
    tags: ["dusk", "evening", "soft"],
    config: {
      model: BackrandEngineType.Sky,
      model_options: {
        mode: "dusk",
        cloud_layers: 4,
        cloud_density: 0.5,
        cloud_coverage: 0.6,
        star_density: 0.001,
        aurora_enabled: false,
        moon_enabled: true,
        moon_phase: "gibbous",
        planet_count: 0,
      },
    },
  },
];
