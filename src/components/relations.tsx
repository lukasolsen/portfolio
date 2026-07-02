import { Link } from "@tanstack/react-router";
import {
  ExternalLink,
  Github,
  FileText,
  Video,
  BookOpen,
  Link as LinkIcon,
  Code,
  ArrowUpRight,
} from "lucide-react";
import type { Relation } from "@/common/blog/blog";

interface RelationsProps {
  relations: Relation[];
}

const getRelationIcon = (type: Relation["type"]) => {
  switch (type) {
    case "project":
      return <Code className="h-5 w-5" />;
    case "blog":
      return <BookOpen className="h-5 w-5" />;
    case "paper":
    case "article":
      return <FileText className="h-5 w-5" />;
    case "video":
      return <Video className="h-5 w-5" />;
    case "github":
      return <Github className="h-5 w-5" />;
    case "external":
    default:
      return <ExternalLink className="h-5 w-5" />;
  }
};

export function Relations({ relations }: RelationsProps) {
  if (!relations || relations.length === 0) return null;

  return (
    <section className="w-full">
      <h2
        className="text-muted-foreground/60 font-medium tracking-wide uppercase mb-6"
        style={{ fontSize: "0.75rem", letterSpacing: "0.15em" }}
      >
        Related content
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {relations.map((relation) => {
          const isInternal =
            relation.type === "project" || relation.type === "blog";
          const href = isInternal
            ? relation.type === "project"
              ? `/projects/${relation.id}`
              : `/blogs/${relation.id}`
            : relation.url || "#";

          const content = (
            <article className="group flex h-full flex-col gap-4 rounded-lg border border-border/20 bg-background p-4 transition-colors hover:border-border/40">
              {relation.thumbnail ? (
                <figure className="relative aspect-[16/10] overflow-hidden rounded-md border border-border/10 bg-muted/30">
                  <img
                    src={relation.thumbnail}
                    alt={relation.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </figure>
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center rounded-md border border-border/10 bg-muted/30 text-muted-foreground">
                  {getRelationIcon(relation.type)}
                </div>
              )}

              <div className="flex-1 space-y-2">
                <h3 className="text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                  {relation.title}
                </h3>
                {relation.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {relation.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                {isInternal ? "Read more" : "Open"}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </div>
            </article>
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
    </section>
  );
}
