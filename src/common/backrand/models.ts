import { WarpType } from "./warps";

export enum BackrandModelType {
  MeshGradient = "mesh_gradient",
  ReflectiveMesh = "reflective_mesh",
  ConicGradient = "conic_gradient",
  SKY = "sky",
}

export type ModelOption = {
  key: string;
  label: string;
  type: "slider" | "number" | "select" | "colorlist" | "boolean";
  min?: number;
  max?: number;
  step?: number;
  default?: number | string;
  description?: string;
  options?: { label: string; value: string; description?: string }[];
  advanced?: boolean;
  category?: string;
};

export type BackrandModel = {
  id: BackrandModelType;
  name: string;
  description: string;
  technical_description: string;
  tags?: string[];

  supportsWarp?: boolean;
  allowedWarps?: WarpType[];
  blacklistedOptions?: string[];

  options?: ModelOption[];
};

export const BackrandModels: Record<BackrandModelType, BackrandModel> = {
  [BackrandModelType.MeshGradient]: {
    id: BackrandModelType.MeshGradient,
    name: "Mesh Gradient",
    description:
      "Et avansert gradientmesh som holder fargeankere i kantene for stabilitet og struktur.",
    technical_description:
      "Denne modellen kombinerer Delaunay-triangulering med forankringspunkter for å forhindre ekstreme deformasjoner.",
    tags: ["mesh", "anchored"],
    supportsWarp: false,
    options: [
      {
        key: "distribution",
        label: "Distribusjon",
        description: "Bestemmer hvilken algoritme som brukes",
        type: "select",
        default: "random",
        options: [
          {
            label: "Linear",
            value: "linear",
            description: "Fargene fordeles jevnt mellom punktene",
          },
          {
            label: "Random",
            value: "random",
            description:
              "Fargene fordeles tilfeldig mellom punktene for et mer organisk utseende",
          },
          {
            label: "Radial",
            value: "radial",
            description:
              "Fargene fordeles i en sirkulær mønster fra sentrum til kantene",
          },
        ],
      },
      {
        key: "algorithm",
        label: "Algoritme",
        description: "Velg hvilken mesh-genereringsalgoritme som skal brukes",
        type: "select",
        default: "delaunay",
        options: [
          {
            label: "Delaunay Triangulation",
            value: "delaunay",
            description:
              "En klassisk algoritme som skaper et nettverk av trekanter basert på punktene",
          },
          {
            label: "Radial Basis Function",
            value: "rbf",
            description:
              "En mer avansert metode som bruker matematiske funksjoner for å interpolere fargene mellom punktene",
          },
          {
            label: "Voronoi Diagram",
            value: "voronoi",
            description:
              "Deler rommet i regioner basert på avstanden til punktene, noe som skaper et unikt mønster",
          },
        ],
      },
      {
        key: "use_relaxation",
        label: "Bruk avslapning",
        type: "boolean",
        description:
          "Aktiverer en prosess som jevner ut mesh-strukturen for å redusere skarpe kanter og forbedre visuell kvalitet.",
      },
    ],
  },

  [BackrandModelType.ReflectiveMesh]: {
    id: BackrandModelType.ReflectiveMesh,
    name: "🪞 Reflective Mesh - Speilende overflater",
    description:
      "Et mesh-basert bakgrunnsmodell som simulerer speilende og reflekterende overflater.",
    technical_description:
      "Denne modellen bruker en kombinasjon av mesh-deformasjon og miljøkart for å skape realistiske refleksjonseffekter.",
    tags: ["mesh", "reflective"],
    supportsWarp: true,
    allowedWarps: [WarpType.None, WarpType.Wave, WarpType.Turbulence],
    options: [
      {
        key: "reflection_amount",
        label: "Refleksjonsmengde",
        type: "slider",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0.5,
        description:
          "Kontrollerer intensiteten av refleksjonene på overflaten. Høyere verdier gir sterkere refleksjoner.",
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
    options: [
      {
        key: "mode",
        label: "Modus",
        type: "select",
        options: [
          { value: "night", label: "Natt" },
          { value: "day", label: "Dag" },
          { value: "dawn", label: "Morgen" },
          { value: "dusk", label: "Kveld" },
        ],
        default: "night",
      },
      {
        key: "palette",
        label: "Egendefinert palett",
        type: "colorlist",
        description:
          "Velg en egendefinert fargepalett for himmelen (liste av hex-farger).",
      },
      {
        key: "cloud_density",
        label: "Sky tetthet",
        type: "slider",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0.35,
        description: "Kontrollerer hvor tette skyene er i himmelen.",
      },
      {
        key: "cloud_coverage",
        label: "Skydekke",
        type: "slider",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0.5,
        description: "Hvor mye av himmelen som er dekket av skyer.",
      },
      {
        key: "cloud_softness",
        label: "Sky mykhet",
        type: "slider",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0.6,
        description: "Justere hvor myke og diffuse skyene ser ut.",
      },
      {
        key: "star_density",
        label: "Stjernetetthet",
        type: "slider",
        min: 0,
        max: 0.01,
        step: 0.0005,
        default: 0.002,
        description:
          "Kontrollerer hvor mange stjerner som vises på nattehimmelen.",
      },
      {
        key: "moon_enabled",
        label: "Måne aktivert",
        type: "boolean",
        description: "Velg om månen skal vises på himmelen.",
      },
      {
        key: "moon_phase",
        label: "Månefase",
        type: "select",
        options: [
          { value: "new", label: "Nymåne" },
          { value: "crescent", label: "Halvmåne" },
          { value: "quarter", label: "Første kvartal" },
          { value: "gibbous", label: "Gibbous" },
          { value: "full", label: "Fullmåne" },
        ],
        default: "full",
        description:
          "Velg månefasen som skal vises. Mapper automatisk til riktig float verdi.",
      },
      {
        key: "planet_count",
        label: "Antall planeter",
        type: "number",
        min: 0,
        max: 5,
        step: 1,
        default: 0,
        description: "Antall synlige planeter på himmelen.",
      },
      {
        key: "horizon_brightness",
        label: "Horisont lysstyrke",
        type: "slider",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0.6,
        description:
          "Justere lysstyrken nær horisonten for soloppgang/solnedgangseffekter.",
      },
      {
        key: "star_twinkle",
        label: "Stjerneskinn",
        type: "slider",
        min: 0,
        max: 0.2,
        step: 0.01,
        default: 0.08,
        description: "Kontrollerer hvor mye stjernene skinner og blinker.",
      },
    ],
  },
};
