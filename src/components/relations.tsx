import { Link } from "@tanstack/react-router";
import {
  ExternalLink,
  Github,
  FileText,
  Video,
  BookOpen,
  Link as LinkIcon,
  Code,
} from "lucide-react";
import type { Relation } from "@/common/blog/blog";

interface RelationsProps {
  relations: Relation[];
}

const getRelationIcon = (type: Relation["type"]) => {
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

export function Relations({ relations }: RelationsProps) {
  if (!relations || relations.length === 0) return null;

  return (
    <section className="w-full py-8 md:py-12 border-t border-border/60">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6 flex items-center gap-2">
          <LinkIcon className="h-4 w-4 md:h-5 md:w-5" />
          Relaterte ressurser
        </h2>

        <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2">
          {relations.map((relation) => {
            const isInternal =
              relation.type === "project" || relation.type === "blog";
            const href = isInternal
              ? relation.type === "project"
                ? `/projects/${relation.id}`
                : `/blogs/${relation.id}`
              : relation.url || "#";

            const content = (
              <div
                className={`
                group relative p-3 md:p-4 rounded-xl border transition-all duration-200 hover:shadow-lg
                ${isInternal ? "hover:scale-[1.02]" : ""}
              `}
              >
                <div className="flex items-start gap-3">
                  {relation.thumbnail ? (
                    <img
                      src={relation.thumbnail}
                      alt={relation.title}
                      className="h-8 w-8 rounded-md object-cover shrink-0"
                    />
                  ) : (
                    <div className="shrink-0 p-2 rounded-lg bg-background/50 border border-current/20">
                      {getRelationIcon(relation.type)}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground group-hover:text-current transition-colors line-clamp-2 text-sm md:text-base">
                      {relation.title}
                    </h3>

                    {relation.description && (
                      <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-2">
                        {relation.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-2 md:mt-3">
                      <div className="flex flex-wrap gap-1">
                        {relation.tags?.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-1.5 md:px-2 py-0.5 text-xs rounded-md bg-current/10 text-current/80"
                          >
                            {tag}
                          </span>
                        ))}
                        {relation.tags && relation.tags.length > 2 && (
                          <span className="px-1.5 md:px-2 py-0.5 text-xs rounded-md bg-current/10 text-current/60">
                            +{relation.tags.length - 2}
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
              <Link key={relation.id} to={href}>
                {content}
              </Link>
            ) : (
              <a
                key={relation.id}
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
