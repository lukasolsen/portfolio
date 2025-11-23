import { WarpType } from "./warps";

export enum BackrandModelType {
  MeshGradient = "mesh_gradient",
  ReflectiveMesh = "reflective_mesh",
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
      "A advanced mesh-based gradient model that creates smooth color transitions using a network of points.",
    technical_description:
      "This model generates a mesh of interconnected points and interpolates colors across the mesh to create complex gradient effects.",
    tags: ["mesh", "anchored"],
    supportsWarp: false,
    options: [
      {
        key: "distribution",
        label: "Color Distribution",
        description: "Choose how colors are distributed across the mesh points",
        type: "select",
        default: "random",
        options: [
          {
            label: "Linear",
            value: "linear",
            description: "Colors are evenly distributed between points",
          },
          {
            label: "Random",
            value: "random",
            description:
              "Colors are randomly distributed between points for a more organic look",
          },
          {
            label: "Radial",
            value: "radial",
            description:
              "Colors are distributed in a circular pattern from the center to the edges",
          },
        ],
      },
      {
        key: "algorithm",
        label: "Algorithm",
        description: "Choose which mesh generation algorithm to use",
        type: "select",
        default: "delaunay",
        options: [
          {
            label: "Delaunay Triangulation",
            value: "delaunay",
            description:
              "A classic algorithm that creates a network of triangles based on the points",
          },
          {
            label: "Radial Basis Function",
            value: "rbf",
            description:
              "A more advanced method that uses mathematical functions to interpolate colors between points",
          },
          {
            label: "Voronoi Diagram",
            value: "voronoi",
            description:
              "Divides the space into regions based on the distance to points, creating a unique pattern",
          },
        ],
      },
      {
        key: "use_relaxation",
        label: "Use Relaxation",
        type: "boolean",
        description:
          "Enables a process that smooths the mesh structure to reduce sharp edges and improve visual quality.",
      },
    ],
  },

  [BackrandModelType.ReflectiveMesh]: {
    id: BackrandModelType.ReflectiveMesh,
    name: "Reflective Mesh",
    description:
      "A mesh-based model that simulates reflective surfaces by manipulating light interactions on a 3D mesh.",
    technical_description:
      "This model creates a 3D mesh and applies reflection algorithms to simulate how light interacts with the surface, producing realistic reflections.",
    tags: ["mesh", "reflective"],
    supportsWarp: true,
    allowedWarps: [WarpType.None, WarpType.Wave, WarpType.Turbulence],
    options: [
      {
        key: "reflection_amount",
        label: "Reflection Amount",
        type: "slider",
        min: 0,
        max: 1,
        step: 0.05,
        default: 0.5,
        description:
          "Controls the intensity of reflections on the mesh surface.",
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
