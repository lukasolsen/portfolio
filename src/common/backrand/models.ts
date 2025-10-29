import { WarpType } from "./warps";

export enum BackrandModelType {
  MeshGradient = "mesh_gradient",
  Ocean = "ocean",
}

export type ModelOption = {
  key: string;
  label: string;
  type: "slider" | "number" | "select";
  min?: number;
  max?: number;
  step?: number;
  default?: number | string;
  description?: string;
  options?: { label: string; value: string; description: string }[];
  advanced?: boolean;
  category?: string;
};

export type BackrandModel = {
  id: BackrandModelType;
  name: string;
  description: string;
  technical_description: string;
  supportsWarp?: boolean;
  allowedWarps?: WarpType[];
  options?: ModelOption[];
  blacklistedOptions?: string[];
  tags?: string[];
};

export const BackrandModels: Record<BackrandModelType, BackrandModel> = {
  [BackrandModelType.MeshGradient]: {
    id: BackrandModelType.MeshGradient,
    name: "🪶 Mesh Gradient - Myke overganger",
    description:
      "Et avansert gradientmesh som holder fargeankere i kantene for stabilitet og struktur.",
    technical_description:
      "Denne modellen kombinerer Delaunay-triangulering med forankringspunkter for å forhindre ekstreme deformasjoner.",
    tags: ["mesh", "anchored"],
    supportsWarp: true,
    allowedWarps: [WarpType.None, WarpType.Wave, WarpType.Turbulence],
    options: [
      {
        key: "warp_amplitude",
        label: "Warp amplitude",
        type: "slider",
        min: 0,
        max: 100,
        step: 1,
        default: 20,
        description:
          "Hvor sterkt mesh'et bøyes og deformeres. Høyere verdier gir mer intens effekt.",
      },
      {
        key: "warp_frequency",
        label: "Warp frekvens",
        type: "slider",
        min: 0.01,
        max: 0.2,
        step: 0.01,
        default: 0.05,
        description:
          "Antall bølger per bilde. Lavere verdier gir bredere, roligere bølger.",
      },
      {
        key: "border_colors",
        label: "Kantfarger",
        type: "select",
        options: [
          {
            label: "Ingen",
            value: "none",
            description: "Ingen spesielle kantfarger.",
          },
          {
            label: "Matchende farger",
            value: "match",
            description: "Bruk farger fra hovedpaletten for kantene.",
          },
          {
            label: "Kontrastfarger",
            value: "contrast",
            description: "Bruk kontrastfarger for kantene.",
          },
        ],
        default: "none",
        description:
          "Velg hvordan kantfargene skal behandles for å påvirke mesh-strukturen.",
      },
    ],
  },

  [BackrandModelType.Ocean]: {
    id: BackrandModelType.Ocean,
    name: "🌊 Ocean – Bølgeeffekt",
    description:
      "Simulerer flytende, realistiske bølgebevegelser med refleksjon og lysrefleksjon.",
    technical_description: `
Ocean-modellen bruker fraktal støy og harmonisk bølgesimulering for realistiske væskelignende effekter.`,
    tags: ["fluid", "wave"],
    supportsWarp: true,
    options: [
      {
        key: "wave_amplitude",
        label: "Bølgehøyde",
        type: "slider",
        min: 0,
        max: 2,
        step: 0.1,
        default: 1,
        description: "Kontrollerer hvor kraftige bølgene er.",
      },
      {
        key: "wave_frequency",
        label: "Frekvens",
        type: "slider",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0.3,
        description: "Hvor mange bølger som vises over bildet.",
      },
      {
        key: "reflection_intensity",
        label: "Refleksjon",
        type: "slider",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0.2,
        description: "Styrken på glans og lysrefleksjoner.",
      },
    ],
  },
};
