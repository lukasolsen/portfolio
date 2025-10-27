export enum BackrandQuality {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  ULTRA = "ultra",
  ENTERPRISE = "enterprise",
}

export const BackrandQualityLabels: Record<BackrandQuality, string> = {
  [BackrandQuality.LOW]: "Lav",
  [BackrandQuality.MEDIUM]: "Middels",
  [BackrandQuality.HIGH]: "Høy",
  [BackrandQuality.ULTRA]: "Ultra",
  [BackrandQuality.ENTERPRISE]: "Enterprise",
};

export const BackrandQualityDescriptions: Record<BackrandQuality, string> = {
  [BackrandQuality.LOW]:
    "Rask generering med lav detaljrikdom. Passer for raske forhåndsvisninger.",
  [BackrandQuality.MEDIUM]:
    "Balansert kvalitet og hastighet. Egnet for de fleste formål.",
  [BackrandQuality.HIGH]:
    "Høy kvalitet med god detaljrikdom. Krever mer tid og ressurser.",
  [BackrandQuality.ULTRA]:
    "Beste kvalitet med maksimal detaljrikdom. Anbefales for sluttprodukter.",
  [BackrandQuality.ENTERPRISE]:
    "Topp kvalitet med avanserte funksjoner for bedriftsbrukere.",
};

export const sortedBackrandQualities: BackrandQuality[] = [
  BackrandQuality.ENTERPRISE,
  BackrandQuality.ULTRA,
  BackrandQuality.HIGH,
  BackrandQuality.MEDIUM,
  BackrandQuality.LOW,
];
