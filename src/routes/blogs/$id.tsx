import { LeadText, SmallText, Title } from "@/components/typography/typography";
import { Button } from "@/components/ui/button";
import { blogs } from "@/data";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { Share, BookOpen, List, ChevronRight, Briefcase } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { useEffect, useState, useMemo } from "react";
import { Relations } from "@/components/relations";
import { WorkDisclaimer } from "@/components/work-disclaimer";

export const Route = createFileRoute("/blogs/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const params = useParams({ from: "/blogs/$id" });
  const blog = blogs.find((b) => b.id === params.id);
  const [activeHeading, setActiveHeading] = useState<string>("");

  const headings = useMemo(() => {
    if (!blog) return [];

    // For MDX content, we can't extract headings from the component
    // Headings will be handled by rehype-slug in the MDX processing
    if (typeof blog.content !== "string") return [];

    return Array.from(blog.content.matchAll(/^(#{1,3})\s+(.+)/gm)).map((m) => ({
      level: m[1].length,
      text: m[2],
      id: m[2].toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    }));
  }, [blog]);

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings
        .map((h) => document.getElementById(h.id))
        .filter(Boolean);

      if (headingElements.length === 0) return;

      let bestHeading = "";
      let bestScore = -Infinity;

      headingElements.forEach((element, index) => {
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const visibleTop = Math.max(0, -rect.top);
        const visibleBottom = Math.max(0, rect.bottom - viewportHeight);
        const visibleHeight = rect.height - visibleTop - visibleBottom;
        const visibilityRatio = visibleHeight / rect.height;

        const positionScore = 1 - rect.top / viewportHeight;
        const score = visibilityRatio * 0.7 + positionScore * 0.3;

        if (score > bestScore && score > 0.1) {
          bestScore = score;
          bestHeading = headings[index].id;
        }
      });

      setActiveHeading(bestHeading);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  if (!blog) {
    return (
      <div className="min-h-screen w-full bg-background text-foreground flex items-center justify-center">
        <SmallText>Blogg ikke funnet.</SmallText>
      </div>
    );
  }

  const words =
    typeof blog.content === "string" ? blog.content.split(/\s+/).length : 0;
  const calculatedReadingTime = words > 0 ? Math.ceil(words / 200) : 5; // Default 5 min for MDX content

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      {/* Header */}
      <section className="w-full pt-12 md:pt-16 pb-6 md:pb-10 border-b border-border/60 bg-linear-to-b from-background to-background/60">
        <div className="max-w-5xl mx-auto px-4 md:px-8 flex flex-col items-start md:items-center gap-4 md:gap-6">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 w-full">
            <SmallText className="text-gray-50!">
              {new Date(blog.created_at).toLocaleDateString("no-NB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </SmallText>

            {blog.type === "work" && (
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                <Briefcase className="h-3 w-3 text-amber-600" />
                <SmallText className="text-amber-700 text-xs font-medium">
                  Arbeid
                </SmallText>
              </div>
            )}

            {blog.tags.map((tag, index) => (
              <SmallText key={index} className="text-gray-500">
                {tag}
              </SmallText>
            ))}
          </div>

          <Title className="text-center w-full text-2xl md:text-4xl lg:text-5xl">
            {blog.title}
          </Title>
          <LeadText className="text-center w-full max-w-3xl text-base md:text-lg">
            {blog.subtitle}
          </LeadText>
        </div>
      </section>

      {/* Actions */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-4 md:py-6 flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between">
        <SmallText className="flex items-center gap-2 text-gray-50">
          <BookOpen className="h-4 w-4 shrink-0" />
          <span className="text-sm md:text-base">
            Estimer lesetid: {calculatedReadingTime} minutter
          </span>
        </SmallText>

        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-gray-50 shrink-0"
          onClick={() => navigator.clipboard.writeText(window.location.href)}
        >
          <Share className="h-4 w-4" /> Del
        </Button>
      </section>

      {/* Work Disclaimer */}
      {blog.type === "work" && (
        <section className="max-w-6xl mx-auto px-4 md:px-8 py-4">
          <WorkDisclaimer />
        </section>
      )}

      {/* Content layout */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-14 grid grid-cols-1 md:grid-cols-[1fr_260px] gap-8 md:gap-14">
        {/* Main content */}
        <div className="markdown-content max-w-none">
          {typeof blog.content === "string" ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug]}
            >
              {blog.content}
            </ReactMarkdown>
          ) : (
            blog.content
          )}
        </div>

        {/* Table of contents */}
        <aside className="hidden md:flex flex-col gap-6 sticky top-28 h-fit p-6 border border-border/60 rounded-2xl bg-background/60 backdrop-blur-xl shadow-lg">
          <div className="flex items-center gap-3 pb-3 border-b border-border/40">
            <List className="h-4 w-4 text-primary" />
            <SmallText className="uppercase tracking-wider font-medium">
              Innhold
            </SmallText>
          </div>

          <nav className="flex flex-col gap-1">
            {headings.map((heading, i) => {
              const isActive = activeHeading === heading.id;
              const indent =
                heading.level === 1
                  ? ""
                  : heading.level === 2
                  ? "ml-5"
                  : "ml-10";

              return (
                <a
                  key={i}
                  href={`#${heading.id}`}
                  className={`
                    group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                    ${
                      isActive
                        ? "bg-primary/15 text-primary border border-primary/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    }
                    ${indent}
                  `}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(heading.id);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      isActive
                        ? "bg-primary scale-125"
                        : "bg-muted-foreground/60 group-hover:bg-primary/60"
                    }`}
                  />
                  <span
                    className={`
                      text-sm transition-all
                      ${
                        heading.level === 1
                          ? "font-semibold"
                          : heading.level === 2
                          ? "font-medium"
                          : "font-normal opacity-80"
                      }
                      ${isActive ? "text-primary" : ""}
                    `}
                  >
                    {heading.text}
                  </span>

                  {isActive && (
                    <ChevronRight className="ml-auto h-3 w-3 text-primary" />
                  )}
                </a>
              );
            })}
          </nav>

          {headings.length === 0 && (
            <div className="text-center py-6">
              <SmallText className="text-muted-foreground">
                Ingen overskrifter funnet
              </SmallText>
            </div>
          )}
        </aside>
      </section>

      {/* Relations */}
      {blog.relations && blog.relations.length > 0 && (
        <Relations relations={blog.relations} />
      )}
    </div>
  );
}
