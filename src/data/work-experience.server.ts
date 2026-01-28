import type { ExperienceItem } from "@/core/components/work-experience";
import { createServerFn } from "@tanstack/react-start";
import { m } from "@/paraglide/messages";

export const getWorkExperience = createServerFn().handler(
  async (): Promise<ExperienceItem[]> => {
    return [
      {
        title: m["pages.experience.items.dyplink.position"](),
        details:
          m["pages.experience.items.dyplink.time"]() +
          " • " +
          m["pages.experience.items.dyplink.location"](),
        period: m["pages.experience.items.dyplink.duration"](),
        company: m["pages.experience.items.dyplink.company"](),
        logo: "https://dyplink.no/wp-content/uploads/2022/06/dyplink-top-white-text-outlined.svg",
        description: m["pages.experience.items.dyplink.description"](),
        seeMoreLabel: m["pages.experience.readMore"](),
        seeMoreLink: "https://dyplink.no",
      },
    ];
  },
);
