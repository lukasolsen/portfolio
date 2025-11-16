import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { LeadText, SmallText, Title } from "@/components/typography/typography";
import { Button } from "@/components/ui/button";
import { blogs } from "@/data";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { Share, BookOpen, Briefcase } from "lucide-react";
import { Relations } from "@/components/relations";
import { WorkDisclaimer } from "@/components/work-disclaimer";
import { Markdown } from "@/core/components/markdown/markdown";
import {
  TableOfContents,
  type HeadingItem,
} from "@/core/components/markdown/table-of-contents";
import { markdownToText } from "@/lib/markdown";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");

/* Slight offset (in pixels) to account for sticky headers */
const SCROLL_OFFSET = 84; // adjust to match header height

/* --- Route definition --- */
export const Route = createFileRoute("/blogs/$id")({
  component: RouteComponent,
});

export function RouteComponent() {
  const params = useParams({ from: "/blogs/$id" });
  const blog = blogs.find((b) => b.id === params.id);

  const articleRef = useRef<HTMLElement | null>(null);
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeHeading, setActiveHeading] = useState<string>("");
  const [contentMounted, setContentMounted] = useState(false);

  const words =
    typeof blog?.content === "string" ? blog.content.split(/\s+/).length : 0;
  const calculatedReadingTime = words > 0 ? Math.ceil(words / 200) : 5;

  console.log(markdownToText(blog?.rawContent));

  useLayoutEffect(() => {
    setHeadings([]);
    setActiveHeading("");
    setContentMounted(false);

    let rafId: number | null = null;
    rafId = requestAnimationFrame(() => {
      const container = articleRef.current;
      if (!container) {
        setContentMounted(true);
        return;
      }

      const headingNodes = Array.from(
        container.querySelectorAll<HTMLElement>("h1, h2, h3")
      );

      const built: HeadingItem[] = headingNodes.map((node) => {
        const text = node.textContent?.trim() || "heading";
        let id = node.id || slugify(text);
        let suffix = 1;

        while (document.getElementById(id)) {
          const existing = document.getElementById(id);
          if (existing === node) break;
          id = `${slugify(text)}-${suffix++}`;
        }

        if (!node.id) node.id = id;

        node.style.scrollMarginTop = `${SCROLL_OFFSET + 8}px`;

        return {
          id,
          text,
          level: parseInt(node.tagName.replace("H", ""), 10) || 2,
        };
      });

      setHeadings(built);
      setContentMounted(true);
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [blog?.id, blog?.content]);

  useEffect(() => {
    if (!contentMounted || headings.length === 0) return;

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-40% 0px -50% 0px",
      threshold: [0, 0.25, 0.6, 1],
    };

    let activeId = "";

    const observer = new IntersectionObserver((entries) => {
      let best: IntersectionObserverEntry | null = null;
      entries.forEach((entry) => {
        if (!best) {
          best = entry;
        } else {
          if ((entry.intersectionRatio || 0) > (best.intersectionRatio || 0)) {
            best = entry;
          }
        }
      });

      if (best && best.target && (best.target as HTMLElement).id) {
        const id = (best.target as HTMLElement).id;
        if (id !== activeId) {
          activeId = id;
          setActiveHeading(id);
        }
      }
    }, observerOptions);

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [contentMounted, headings]);

  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    if (contentMounted) {
      const t = setTimeout(() => setShowContent(true), 40);
      return () => clearTimeout(t);
    }
    setShowContent(false);
  }, [contentMounted, blog?.id]);

  if (!blog) {
    return (
      <div className="min-h-screen w-full bg-background text-foreground flex items-center justify-center">
        <SmallText>Blogg ikke funnet.</SmallText>
      </div>
    );
  }

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
          <span className="text-sm md:text-base text-gray-50">
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
        <main
          ref={articleRef}
          className={`markdown-content max-w-none prose prose-invert transition-all duration-300 ease-out
            ${
              showContent
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2"
            }`}
          aria-labelledby="article-title"
        >
          <Markdown
            content={
              blog.rawContent
                ? markdownToText(blog.rawContent)
                : (blog.content as string)
            }
          />
        </main>

        {/* Table of contents */}
        <TableOfContents headings={headings} activeHeading={activeHeading} />
      </section>

      {/* Relations */}
      {blog.relations && blog.relations.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 md:px-8 py-6">
          <Relations relations={blog.relations} />
        </section>
      )}
    </div>
  );
}
