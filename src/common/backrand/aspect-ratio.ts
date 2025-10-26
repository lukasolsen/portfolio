export enum BackrandAspectRatio {
  Square = "1:1",
  Standard = "4:3",
  Wide = "16:9",
  Cinema = "21:9",
  Mobile = "9:16",
  Photo = "3:2",
}

export const BackrandAspectRatios = [
  { label: "1:1 (Kvadrat)", value: BackrandAspectRatio.Square },
  { label: "4:3 (Standard)", value: BackrandAspectRatio.Standard },
  { label: "16:9 (Bred)", value: BackrandAspectRatio.Wide },
  { label: "21:9 (Kino)", value: BackrandAspectRatio.Cinema },
  { label: "9:16 (Mobil)", value: BackrandAspectRatio.Mobile },
  { label: "3:2 (Foto)", value: BackrandAspectRatio.Photo },
];
