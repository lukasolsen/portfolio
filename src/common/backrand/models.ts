import { WarpType } from "./warps";

export enum BackrandModelType {
  MeshGradient = "mesh_gradient",
  Ocean = "ocean",
  ConicGradient = "conic_gradient",
  SKY = "sky",
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
      {
        key: "border_softening_radius",
        label: "Kantmykning radius",
        type: "number",
        default: 8.0,
        description:
          "Radiusen for å myke opp kantfargene. Øker overgangen mellom kant og hovedfarger.",
      },
      {
        key: "border_smoothing_strength",
        label: "Kantmykning styrke",
        type: "slider",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0.5,
        description:
          "Styrken på kantmykningen. Høyere verdier gir en jevnere overgang.",
      },
      {
        key: "use_bilateral_smoothing",
        label: "Bruk bilateral utjevning",
        type: "select",
        options: [
          {
            label: "Ja",
            value: "true",
            description:
              "Aktiverer bilateral utjevning for å bevare kanter mens støy reduseres.",
          },
          {
            label: "Nei",
            value: "false",
            description: "Deaktiverer bilateral utjevning.",
          },
        ],
        default: "false",
        description:
          "Velg om du vil bruke bilateral utjevning for bedre kantbevaring.",
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

  [BackrandModelType.ConicGradient]: {
    id: BackrandModelType.ConicGradient,
    name: "🌀 Conic Gradient – Sirkulær overgang",
    description:
      "En sirkulær gradientmodell som skaper en jevn overgang mellom farger rundt et sentralt punkt.",
    technical_description:
      "Denne modellen bruker polarkoordinater for å generere en konisk gradient som roterer rundt et definert sentrum.",
    tags: ["gradient", "circular"],
    supportsWarp: false,
    options: [
      {
        key: "rotation_angle",
        label: "Rotasjonsvinkel",
        type: "slider",
        min: 0,
        max: 360,
        step: 1,
        default: 0,
        description: "Vinkelen for å rotere gradienten rundt sentrumspunktet.",
      },
      //swirl_factor, smoothness, center_bias
      {
        key: "swirl_factor",
        label: "Virvelfaktor",
        type: "slider",
        min: 0,
        max: 5,
        step: 0.1,
        default: 1,
        description:
          "Kontrollerer graden av virvling i gradienten for en mer dynamisk effekt.",
      },
      {
        key: "smoothness",
        label: "Mykhet",
        type: "slider",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0.5,
        description:
          "Justere hvor jevn overgangen mellom fargene i gradienten er.",
      },
      {
        key: "center_bias",
        label: "Senterbias",
        type: "slider",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0.5,
      },
    ],
  },

  [BackrandModelType.SKY]: {
    id: BackrandModelType.SKY,
    name: "☁️ Sky – Himmel og skyer",
    description:
      "Genererer realistiske himmellandskap med dynamiske skyer og atmosfæriske effekter.",
    technical_description:
      "SKY-modellen bruker volumetrisk sky-simulering og atmosfærisk spredning for å skape levende himmellandskap.",
    tags: ["sky", "clouds"],
    supportsWarp: false,
  },
};
