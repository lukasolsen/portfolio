import type { FC } from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Github, Link2, Heart } from "lucide-react";
import clsx from "clsx";
import { Tag } from "./tag";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "@tanstack/react-router";
import { isLinkExternal } from "@/lib/utils";
import type { Project } from "@/data";

interface GithubData {
  stars: number;
  updated: string;
  description?: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  period: string;
  logo: string;
  type: "Work" | "Personal";
  tags: string[];
  github?: string;
  link?: string;
  highlight?: boolean;
  like?: boolean;
}

interface ProjectListProps {
  projects: Project[];
}

export const Projects: FC<ProjectListProps> = ({ projects }) => {
  const [githubInfo, setGithubInfo] = useState<Record<string, GithubData>>({});

  useEffect(() => {
    const fetchGithubData = async () => {
      const results: Record<string, GithubData> = {};

      for (const p of projects) {
        if (p.socials.github) {
          const localData = localStorage.getItem(`ghrepo:${p.socials.github}`);
          if (localData) {
            results[p.socials.github] = JSON.parse(localData);
            continue;
          }

          try {
            const repoPath = new URL(p.socials.github).pathname.replace(
              /^\/+/,
              ""
            );
            const res = await fetch(`https://api.github.com/repos/${repoPath}`);
            if (!res.ok) continue;

            const data = await res.json();
            localStorage.setItem(
              `ghrepo:${p.socials.github}`,
              JSON.stringify({
                stars: data.stargazers_count,
                updated: data.updated_at,
                description: data.description,
              })
            );

            results[p.socials.github] = {
              stars: data.stargazers_count,
              updated: data.updated_at,
              description: data.description,
            };
          } catch (err) {
            console.warn(`GitHub API error for ${p.title}`, err);
            localStorage.removeItem(`ghrepo:${p.socials.github}`);
          }
        }
      }

      setGithubInfo(results);
    };

    fetchGithubData();
  }, [projects]);

  return (
    <section className="mx-auto space-y-8 mt-4">
      {projects.map((project, idx) => {
        const gh = project.socials.github
          ? githubInfo[project.socials.github]
          : null;

        return (
          <motion.div
            key={idx}
            viewport={{ once: true }}
            className={clsx(
              "group flex flex-col md:flex-row gap-6 items-center rounded-2xl p-4 transition-all duration-300",
              project.highlighted
                ? "bg-primary/5 border border-primary/30 shadow-lg hover:shadow-primary/20"
                : "bg-muted/10 border border-border/40 hover:bg-muted/20",
              project.like && "relative"
            )}
          >
            {/* If liked, show heart */}
            {project.like && (
              <div className="absolute top-3 right-3 flex items-center text-rose-500">
                <Tooltip>
                  <TooltipTrigger>
                    <Heart className="h-5 w-5 fill-rose-500 animate-pulse" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Dette prosjektet liker jeg ekstra godt ❤️</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}

            {/* Media */}
            <div
              className={clsx(
                "overflow-hidden rounded-xl shrink-0",
                project.highlighted ? "w-36 h-36 md:w-48 md:h-48" : "w-28 h-28"
              )}
            >
              <img
                src={project.logo}
                alt={`${project.title} preview`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between w-full">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <Link
                      to={project.socials.website || project.socials.github}
                      target={
                        isLinkExternal(project.socials.website ?? "")
                          ? "_blank"
                          : undefined
                      }
                      rel="noopener noreferrer"
                      className="hover:underline underline-offset-2 decoration-primary/50"
                    >
                      <h3
                        className={clsx(
                          "font-semibold leading-tight",
                          project.highlighted ? "text-2xl" : "text-xl"
                        )}
                      >
                        {project.title}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground text-sm mt-1">
                      {project.description}
                    </p>
                  </div>

                  <Tooltip>
                    <TooltipTrigger>
                      <Badge
                        variant={
                          project.type === "work" ? "default" : "secondary"
                        }
                        className="text-xs uppercase tracking-wide"
                      >
                        {project.type === "work" ? "Arbeid" : "Personlig"}
                      </Badge>
                    </TooltipTrigger>

                    <TooltipContent>
                      {project.type === "work" ? (
                        <>
                          <p>
                            Profesjonelt prosjekt utviklet for arbeidsgiver
                            eller klient.
                          </p>
                          <p className="text-xs italic mt-1">
                            (Noe informasjon kan være konfidensiell)
                          </p>
                        </>
                      ) : (
                        <p>Personlig prosjekt for læring eller moro.</p>
                      )}
                    </TooltipContent>
                  </Tooltip>
                </div>

                {/* GitHub metadata */}
                {gh && (
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span>⭐ {gh.stars.toLocaleString()} stjerner</span>
                    <span>•</span>
                    <span>
                      Sist oppdatert{" "}
                      {new Date(gh.updated).toLocaleDateString("no-NO")}
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tags.map((tag, tagIdx) => (
                    <Tag label={tag} key={tagIdx} />
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {project.period}
                </span>

                <div className="flex gap-3">
                  {project.socials.github && (
                    <a
                      href={project.socials.github}
                      aria-label={`${project.title} GitHub repository`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {project.socials.website && (
                    <a
                      href={project.socials.website}
                      aria-label={`${project.title} external link`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Link2 className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
};
