export enum BackrandQuality {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  ULTRA = "ultra",
}

export const BackrandQualityLabels: Record<BackrandQuality, string> = {
  [BackrandQuality.LOW]: "Lav",
  [BackrandQuality.MEDIUM]: "Middels",
  [BackrandQuality.HIGH]: "Høy",
  [BackrandQuality.ULTRA]: "Ultra",
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
};

export const sortedBackrandQualities: BackrandQuality[] = [
  BackrandQuality.ULTRA,
  BackrandQuality.HIGH,
  BackrandQuality.MEDIUM,
  BackrandQuality.LOW,
];
