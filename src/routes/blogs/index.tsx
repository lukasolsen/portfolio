import {
  Header1,
  Header4,
  LeadText,
  SmallText,
} from "@/components/typography/typography";
import { blogs, projects } from "@/data";
import { getBlogUrl, getReadingTime } from "@/lib/blogs";
import { seo } from "@/utils/seo";
import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Rss } from "lucide-react";

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
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <section className="w-full px-4 md:px-8 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <motion.div
            {...fadeIn}
            className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-3xl space-y-6">
              <h2
                className="text-muted-foreground/50 font-medium tracking-wide uppercase"
                style={{ fontSize: "0.75rem", letterSpacing: "0.15em" }}
              >
                Blog
              </h2>
              <Header1 className="max-w-4xl">
                Notes on building AI systems and design tools
              </Header1>
              <LeadText className="text-muted-foreground">
                Technical writing about implementation choices, workflow design,
                and the constraints that shape useful projects.
              </LeadText>
            </div>

            <a
              href="/blogs.xml"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-border/30 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-border/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Rss className="h-4 w-4" aria-hidden="true" />
              XML feed
            </a>
          </motion.div>
        </div>
      </section>

      <section className="w-full px-4 md:px-8 py-20 border-t border-border/30">
        <div className="max-w-5xl mx-auto space-y-10">
          <h2
            className="text-muted-foreground/50 font-medium tracking-wide uppercase"
            style={{ fontSize: "0.75rem", letterSpacing: "0.15em" }}
          >
            Latest
          </h2>

          <div className="divide-y divide-border/30 border-y border-border/30">
            {blogs.map((blog, index) => (
              <BlogRow key={blog.id} blog={blog} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function BlogRow({
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
        className="group grid gap-6 py-8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:grid-cols-[160px_1fr_auto] md:items-start"
      >
        <SmallText className="font-mono pt-1">
          {formatDate(blog.created_at)}
        </SmallText>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <span>{blog.category}</span>
            {project && (
              <>
                <span aria-hidden="true">·</span>
                <span>{project.title}</span>
              </>
            )}
          </div>

          <div className="space-y-2">
            <Header4>{blog.title}</Header4>
            <SmallText className="max-w-2xl">{blog.summary}</SmallText>
          </div>
        </div>

        <span className="inline-flex items-center gap-2 pt-1 text-sm text-muted-foreground transition-colors group-hover:text-foreground md:justify-end">
          <BookOpen className="h-4 w-4" aria-hidden="true" />
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
