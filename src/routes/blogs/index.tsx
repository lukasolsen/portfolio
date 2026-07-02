import {
  Header1,
  Header6,
  SmallText,
} from "@/components/typography/typography";
import { blogs, projects } from "@/data";
import { getBlogUrl, getReadingTime } from "@/lib/blogs";
import { seo } from "@/utils/seo";
import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Rss } from "lucide-react";

export const Route = createFileRoute("/blogs/")({
  head: () => ({
    meta: [
      ...seo({
        title: "Blog | Lukas Olsen",
        description:
          "Technical notes about projects, AI workflows, design systems, and engineering decisions from Lukas Olsen.",
        keywords: "Lukas Olsen blog, Backgrad, Dyplink AI, AI engineering",
        path: "/blogs",
      }),
    ],
    links: [
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: "Lukas Olsen blog feed",
        href: "/blogs.xml",
      },
    ],
  }),
  component: RouteComponent,
});

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

const fadeIn = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: "easeOut" },
  viewport: { once: true, margin: "-80px" },
} as const;

function RouteComponent() {
  const readingTimes = blogs.map((blog) => getReadingTime(blog));
  const readingRange = `${Math.min(...readingTimes)}-${Math.max(
    ...readingTimes,
  )}`;

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <section className="w-full px-4 md:px-8 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            {...fadeIn}
            className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end"
          >
            <div className="max-w-2xl space-y-5">
              <h2
                className="text-muted-foreground/50 font-medium tracking-wide uppercase mb-8"
                style={{ fontSize: "0.75rem", letterSpacing: "0.15em" }}
              >
                Blog
              </h2>
              <Header1>Technical notes</Header1>
              <SmallText className="max-w-2xl">
                Short project notes on AI workflows, design tools, and the
                engineering choices behind them.
              </SmallText>
            </div>

            <div className="flex gap-6 border-t border-border/30 pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <MetaValue value={blogs.length.toString()} label="posts" />
              <MetaValue value={readingRange} label="min read" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="w-full px-4 md:px-8 py-16 border-t border-border/30">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2
            className="text-muted-foreground/50 font-medium tracking-wide uppercase"
            style={{ fontSize: "0.75rem", letterSpacing: "0.15em" }}
          >
            Latest notes
          </h2>

          <div className="grid gap-3">
            {blogs.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-4 md:px-8 py-12 border-t border-border/30 bg-muted/3">
        <div className="max-w-4xl mx-auto">
          <a
            href="/blogs.xml"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            <Rss className="h-4 w-4" aria-hidden="true" />
            XML feed
            <ArrowUpRight
              className="h-3.5 w-3.5 text-muted-foreground/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground/50"
              aria-hidden="true"
            />
          </a>
        </div>
      </section>
    </div>
  );
}

function MetaValue({ value, label }: { value: string; label: string }) {
  return (
    <div className="space-y-1">
      <div className="text-xl font-semibold tracking-tight text-foreground">
        {value}
      </div>
      <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/60">
        {label}
      </div>
    </div>
  );
}

function BlogCard({
  blog,
  index,
}: {
  blog: (typeof blogs)[number];
  index: number;
}) {
  const project = projects.find((candidate) => candidate.id === blog.projectId);

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      viewport={{ once: true }}
    >
      <Link
        to={getBlogUrl(blog)}
        className="group grid gap-4 rounded-lg border border-border/20 bg-background p-4 transition-colors hover:border-border/40 hover:bg-muted/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 sm:grid-cols-[112px_1fr] md:grid-cols-[136px_1fr_auto] md:items-center"
      >
        <figure className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border/15 bg-muted/30">
          {blog.heroImage ? (
            <img
              src={blog.heroImage.src}
              alt={blog.heroImage.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-muted/50" />
          )}
        </figure>

        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground/60">
            <time dateTime={blog.created_at}>{formatDate(blog.created_at)}</time>
            <span aria-hidden="true">/</span>
            <span>{blog.category}</span>
            {project && (
              <>
                <span aria-hidden="true">/</span>
                <span>{project.title}</span>
              </>
            )}
          </div>

          <Header6 className="line-clamp-1 transition-colors group-hover:text-foreground">
            {blog.title}
          </Header6>
          <SmallText className="line-clamp-2 max-w-2xl">
            {blog.summary}
          </SmallText>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded bg-muted/50 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <span className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors group-hover:text-foreground md:justify-end">
          <Clock className="h-4 w-4" aria-hidden="true" />
          {getReadingTime(blog)} min
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </Link>
    </motion.article>
  );
}
