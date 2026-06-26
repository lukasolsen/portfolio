import type { FC } from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Link2, Star, ArrowUpRight } from "lucide-react";
import { Tag } from "./tag";
import { Link } from "@tanstack/react-router";
import { projects } from "@/data";
import type { Project } from "@/common/project/project";

interface GithubData {
  stars: number;
  updated: string;
  description?: string;
}

export const Projects: FC = () => {
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
              "",
            );
            const res = await fetch(`https://api.github.com/repos/${repoPath}`);
            if (!res.ok) continue;

            const data = await res.json();
            const info = {
              stars: data.stargazers_count,
              updated: data.updated_at,
              description: data.description,
            };

            localStorage.setItem(
              `ghrepo:${p.socials.github}`,
              JSON.stringify(info),
            );
            results[p.socials.github] = info;
          } catch (err) {
            console.warn(`GitHub API error for ${p.title}`, err);
          }
        }
      }
      setGithubInfo(results);
    };

    fetchGithubData();
  }, []);

  return (
    <div className="space-y-3">
      {projects.map((project, idx) => (
        <ProjectCard
          key={idx}
          project={project}
          ghData={
            project.socials.github
              ? githubInfo[project.socials.github]
              : undefined
          }
          index={idx}
        />
      ))}
    </div>
  );
};

const ProjectCard: FC<{
  project: Project;
  ghData?: GithubData;
  index: number;
}> = ({ project, ghData, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      <Link
        to={"/projects/" + project.id}
        className="group flex items-start gap-4 p-4 rounded-lg border border-border/20 bg-background hover:border-border/40 transition-all duration-200"
      >
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-border/30 bg-muted/30">
          <img
            src={project.logo}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-medium text-foreground tracking-tight truncate">
              {project.title}
            </h3>
            <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0" />
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-2">
            {project.description}
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((tag, i) => (
                <Tag key={i} label={tag} />
              ))}
              {project.tags.length > 3 && (
                <span className="text-[11px] text-muted-foreground/50">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2.5 ml-auto">
              {ghData && (
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground/60">
                  <Star className="w-3 h-3" />
                  <span>{ghData.stars}</span>
                </div>
              )}

              {project.socials.github && (
                <a
                  href={project.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground/40 hover:text-foreground transition-colors"
                  aria-label="View Source"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {project.socials.website && (
                <a
                  href={project.socials.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground/40 hover:text-foreground transition-colors"
                  aria-label="View Website"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Link2 className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
