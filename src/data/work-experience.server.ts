import type { ExperienceItem } from "@/core/components/work-experience";
import { createServerFn } from "@tanstack/react-start";
import { getLocale } from "@/utils/i18n.server";
import i18next from "@/lib/i18n";

export const getWorkExperience = createServerFn().handler(
  async (): Promise<ExperienceItem[]> => {
    const locale = await getLocale();
    const t = i18next.getFixedT(locale);

    return [
      {
        title: t("pages.experience.items.dyplink.position"),
        details:
          t("pages.experience.items.dyplink.time") +
          " • " +
          t("pages.experience.items.dyplink.location"),
        period: t("pages.experience.items.dyplink.duration"),
        company: t("pages.experience.items.dyplink.company"),
        logo: "https://dyplink.no/wp-content/uploads/2022/06/dyplink-top-white-text-outlined.svg",
        description: t("pages.experience.items.dyplink.description"),
        seeMoreLabel: t("pages.experience.readMore"),
        seeMoreLink: "https://dyplink.no",
      },
    ];
  },
);
