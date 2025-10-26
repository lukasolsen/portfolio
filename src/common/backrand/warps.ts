export enum WarpType {
  None = "none",
  Wave = "wave",
  Turbulence = "turbulence",
}

export type Warp = {
  id: WarpType;
  name: string;
  icon: string;
  description: string;
};

export const Warps: Record<WarpType, Warp> = {
  [WarpType.None]: {
    id: WarpType.None,
    name: "Ingen warp",
    icon: "⚪️",
    description:
      "Ingen forvrengning. Perfekt for glatte og rene gradienter uten bevegelse.",
  },
  [WarpType.Wave]: {
    id: WarpType.Wave,
    name: "Bølge",
    icon: "🌊",
    description: "Skaper en bølgeeffekt som gir dybde og bevegelse til bildet.",
  },
  [WarpType.Turbulence]: {
    id: WarpType.Turbulence,
    name: "Turbulens",
    icon: "🌪️",
    description:
      "Skaper en uregelmessig, turbulent bevegelse som gir liv til bildet.",
  },
};
