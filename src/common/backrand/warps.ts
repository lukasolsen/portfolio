export enum WarpType {
  None = "none",
  Sinusoidal = "sinusoidal",
  Wave = "wave",
  Turbulence = "turbulence",
  Curl = "curl",
  CSSFlow = "css_flow",
}

export const Warps: Record<WarpType, { name: string; description: string }> = {
  [WarpType.None]: {
    name: "None",
    description: "No distortion",
  },
  [WarpType.Sinusoidal]: {
    name: "Sinusoidal",
    description: "Sine/cosine displacement fields",
  },
  [WarpType.Wave]: {
    name: "Wave",
    description: "OpenSimplex noise with bilinear interpolation",
  },
  [WarpType.Turbulence]: {
    name: "Turbulence",
    description: "Multi-octave OpenSimplex noise",
  },
  [WarpType.Curl]: {
    name: "Curl Noise",
    description: "Divergence-free flow via curl of fractal noise",
  },
  [WarpType.CSSFlow]: {
    name: "CSS Flow",
    description: "Multi-octave Perlin with domain warping and curl",
  },
};
