import type { FC, MouseEvent } from "react";
import { useEffect, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Github, Link2, Heart, Star, Calendar } from "lucide-react";
import clsx from "clsx";
import { Tag } from "./tag";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(14, 165, 233, 0.15), transparent 80%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true }}
      className={clsx(
        "group relative border border-border/50 bg-background/50 overflow-hidden rounded-xl",
        project.highlighted ? "md:col-span-2" : "md:col-span-1",
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background: background }}
      />

      <div className="relative h-full flex flex-col p-6 z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-border/60 bg-background/50 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
            <img
              src={project.logo}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="flex gap-2">
            {project.like && (
              <Tooltip>
                <TooltipTrigger>
                  <div className="p-2 bg-rose-500/10 rounded-full">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>Liker dette ekstra godt!</TooltipContent>
              </Tooltip>
            )}
            <Badge variant={project.type === "work" ? "default" : "secondary"}>
              {project.type}
            </Badge>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <Link
            to={"/projects/" + project.id}
            className="block group-hover:underline decoration-primary underline-offset-4 decoration-2"
          >
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              {project.title}
            </h3>
          </Link>

          <p className="text-muted-foreground text-sm line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag, i) => (
              <Tag key={i} label={tag} />
            ))}
            {project.tags.length > 4 && (
              <span className="text-xs text-muted-foreground self-center">
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/40">
            <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
              {ghData ? (
                <div className="flex items-center gap-1 text-yellow-600/90 dark:text-yellow-500/90">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{ghData.stars}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{project.period}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              {project.socials.github && (
                <a
                  href={project.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="View Source"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {project.socials.website && (
                <a
                  href={project.socials.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="View Website"
                >
                  <Link2 className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
