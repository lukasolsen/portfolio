import { ArrowRightIcon } from "lucide-react";
import type { FC } from "react";

export interface ExperienceItem {
  title: string;
  details: string;
  period: string;
  company: string;
  logo: string;
  description: string;
  seeMoreLink?: string; // optional link URL
  seeMoreLabel?: string; // optional text, e.g. "Les mer om min ..."
}

interface WorkExperienceProps {
  experience?: ExperienceItem[];
}

export const WorkExperience: FC<WorkExperienceProps> = ({
  experience = [],
}: WorkExperienceProps) => {
  return (
    <div className="space-y-8">
      {experience.map(
        (
          {
            title,
            details,
            period,
            company,
            logo,
            description,
            seeMoreLink,
            seeMoreLabel,
          },
          idx
        ) => (
          <div
            key={idx}
            className="border-border border-b pb-6 last:border-b-0"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
              <div className="md:w-2/3">
                <div className="flex items-center gap-3">
                  <img
                    src={logo}
                    alt={`${company} logo`}
                    className="h-5 object-contain"
                  />
                  <h3 className="text-lg m-0">{title}</h3>
                </div>
                <span className="text-muted-foreground">{details}</span>
                <p className="mt-4">{description}</p>

                {/* New "See more" section */}
                {seeMoreLink && (
                  <div className="mt-3">
                    <a
                      href={seeMoreLink}
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      {seeMoreLabel ?? "Les mer"}
                      <ArrowRightIcon className="inline-block h-4 w-4 ml-1" />
                    </a>
                  </div>
                )}
              </div>

              <div className="text-right md:w-1/3 md:text-right">
                <span className="text-md font-medium">{period}</span>
                <br />
                <span className="text-base text-muted-foreground">
                  {company}
                </span>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
