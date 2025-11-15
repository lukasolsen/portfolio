import { Link } from "@tanstack/react-router";
import {
  ExternalLink,
  Github,
  FileText,
  Video,
  BookOpen,
  Code,
  Link as LinkIcon,
} from "lucide-react";
import type { Relation } from "@/common/blog/blog";
import { Header3 } from "./typography/typography";

interface ResourcesProps {
  resources: Relation[];
  title?: string;
}

const getResourceIcon = (type: Relation["type"]) => {
  switch (type) {
    case "project":
      return <Code className="h-4 w-4" />;
    case "blog":
      return <BookOpen className="h-4 w-4" />;
    case "paper":
    case "article":
      return <FileText className="h-4 w-4" />;
    case "video":
      return <Video className="h-4 w-4" />;
    case "github":
      return <Github className="h-4 w-4" />;
    case "external":
    default:
      return <ExternalLink className="h-4 w-4" />;
  }
};

const getResourceColor = (type: Relation["type"]) => {
  switch (type) {
    case "project":
      return "bg-slate-500/5 text-slate-600 border-slate-200/60 hover:bg-slate-500/10 hover:border-slate-300/60 dark:bg-slate-400/5 dark:text-slate-300 dark:border-slate-600/40 dark:hover:bg-slate-400/10 dark:hover:border-slate-500/50";
    case "blog":
      return "bg-emerald-500/5 text-emerald-600 border-emerald-200/60 hover:bg-emerald-500/10 hover:border-emerald-300/60 dark:bg-emerald-400/5 dark:text-emerald-300 dark:border-emerald-600/40 dark:hover:bg-emerald-400/10 dark:hover:border-emerald-500/50";
    case "paper":
    case "article":
      return "bg-blue-500/5 text-blue-600 border-blue-200/60 hover:bg-blue-500/10 hover:border-blue-300/60 dark:bg-blue-400/5 dark:text-blue-300 dark:border-blue-600/40 dark:hover:bg-blue-400/10 dark:hover:border-blue-500/50";
    case "video":
      return "bg-orange-500/5 text-orange-600 border-orange-200/60 hover:bg-orange-500/10 hover:border-orange-300/60 dark:bg-orange-400/5 dark:text-orange-300 dark:border-orange-600/40 dark:hover:bg-orange-400/10 dark:hover:border-orange-500/50";
    case "github":
      return "bg-neutral-500/5 text-neutral-600 border-neutral-200/60 hover:bg-neutral-500/10 hover:border-neutral-300/60 dark:bg-neutral-400/5 dark:text-neutral-300 dark:border-neutral-600/40 dark:hover:bg-neutral-400/10 dark:hover:border-neutral-500/50";
    case "external":
    default:
      return "bg-purple-500/5 text-purple-600 border-purple-200/60 hover:bg-purple-500/10 hover:border-purple-300/60 dark:bg-purple-400/5 dark:text-purple-300 dark:border-purple-600/40 dark:hover:bg-purple-400/10 dark:hover:border-purple-500/50";
  }
};

export function Resources({ resources, title = "Ressurser" }: ResourcesProps) {
  if (!resources || resources.length === 0) return null;

  return (
    <section className="w-full py-8 md:py-12 border-t border-border/60">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <Header3 className="text-foreground mb-4 md:mb-6 flex items-center gap-2">
          <LinkIcon className="h-4 w-4 md:h-5 md:w-5" />
          {title}
        </Header3>

        <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2">
          {resources.map((resource) => {
            const isInternal =
              resource.type === "project" || resource.type === "blog";
            const href = isInternal
              ? resource.type === "project"
                ? `/projects/${resource.id}`
                : `/blogs/${resource.id}`
              : resource.url || "#";

            const content = (
              <div
                className={`
                group relative p-3 md:p-4 rounded-xl border transition-all duration-200 hover:shadow-lg
                ${getResourceColor(resource.type)}
                ${isInternal ? "hover:scale-[1.02]" : ""}
              `}
              >
                <div className="flex items-start gap-3">
                  {resource.thumbnail ? (
                    <img
                      src={resource.thumbnail}
                      alt={resource.title}
                      className="h-8 w-8 rounded-md object-cover shrink-0"
                    />
                  ) : (
                    <div className="shrink-0 p-2 rounded-lg bg-current/5 border border-current/10">
                      {getResourceIcon(resource.type)}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground group-hover:text-current transition-colors line-clamp-2 text-sm md:text-base">
                      {resource.title}
                    </h3>

                    {resource.description && (
                      <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-2">
                        {resource.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-2 md:mt-3">
                      <div className="flex flex-wrap gap-1">
                        {resource.tags?.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-xs rounded-md bg-current/8 text-current/70 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                        {resource.tags && resource.tags.length > 2 && (
                          <span className="px-2 py-0.5 text-xs rounded-md bg-current/8 text-current/50 font-medium">
                            +{resource.tags.length - 2}
                          </span>
                        )}
                      </div>

                      {!isInternal && (
                        <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );

            return isInternal ? (
              <Link key={resource.id} to={href}>
                {content}
              </Link>
            ) : (
              <a
                key={resource.id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
