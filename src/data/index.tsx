export enum Sosial {
  GitHub = "github",
  LinkedIn = "linkedin",
  Twitter = "twitter",
  Website = "website",
  Facebook = "facebook",
  Instagram = "instagram",
  YouTube = "youtube",
  TikTok = "tiktok",
}

export type Socials = Partial<Record<Sosial, string>>;

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  license?: string;
};

export type Project = {
  title: string;
  description: string;

  period: string;
  tags: string[];

  socials: Socials;
  stats: Record<string, number>;

  logo: string;

  highlights: string[];

  highlighted: boolean;
  type: "personal" | "work";

  /**
   * Indicates if I like this project
   */
  like: boolean;

  /**
   * Gallery information for the project
   */
  gallery?: {
    images: Array<GalleryImage>;
  };

  /**
   * About section for the project
   */
  overview: string;
};
