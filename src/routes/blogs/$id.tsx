import type { ReactNode } from "react";
import { useState } from "react";
import {
  Header1,
  Header6,
  Paragraph,
  SmallText,
} from "@/components/typography/typography";
import { Button } from "@/components/ui/button";
import { Relations } from "@/components/relations";
import { WorkDisclaimer } from "@/components/work-disclaimer";
import { blogs } from "@/data";
import { getAbsoluteBlogUrl, getReadingTime } from "@/lib/blogs";
import { seo } from "@/utils/seo";
import { Link, createFileRoute, useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  BookOpen,
  Briefcase,
  Check,
  Link2,
  Linkedin,
  Share2,
} from "lucide-react";
import "@/styles/markdown.css";

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

export const Route = createFileRoute("/blogs/$id")({
  head: ({ params }) => {
    const blog = blogs.find((item) => item.id === params.id);

    if (!blog) return {};

    return {
      meta: [
        ...seo({
          title: `${blog.title} | Lukas Olsen`,
          description: blog.summary,
          image: blog.heroImage?.src,
          keywords: blog.tags.join(", "),
          path: `/blogs/${blog.id}`,
        }),
      ],
      links: [
        {
          rel: "canonical",
          href: getAbsoluteBlogUrl(blog),
        },
      ],
    };
  },
  component: RouteComponent,
});

export function RouteComponent() {
  const params = useParams({ from: "/blogs/$id" });
  const blog = blogs.find((b) => b.id === params.id);

  if (!blog) {
    return (
      <div className="min-h-screen w-full bg-background text-foreground flex items-center justify-center px-4">
        <div className="max-w-md space-y-4 text-center">
          <Header6>Blog post not found</Header6>
          <SmallText>The note may have moved or the URL is incorrect.</SmallText>
          <Button asChild variant="outline">
            <Link to="/blogs">Back to blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  const Content = blog.Content;
  const readingTime = getReadingTime(blog);
  const postUrl =
    typeof window !== "undefined"
      ? window.location.href
      : getAbsoluteBlogUrl(blog);

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <article className="w-full">
        <header className="w-full px-4 md:px-8 pt-20 md:pt-28 pb-12 md:pb-16">
          <div className="max-w-3xl mx-auto space-y-8 text-center">
            <motion.div {...fadeIn} className="space-y-5">
              <span className="inline-flex items-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {blog.category}
              </span>
              <Header1
                id="article-title"
                className="text-center mx-auto max-w-4xl"
              >
                {blog.title}
              </Header1>
            </motion.div>

            <motion.div
              {...fadeIn}
              transition={{ duration: 0.55, delay: 0.05, ease: "easeOut" }}
              className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-muted-foreground"
            >
              <time dateTime={blog.created_at}>
                {formatDate(blog.created_at)}
              </time>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                {readingTime} min read
              </span>
              {blog.updated_at && blog.updated_at !== blog.created_at && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Updated {formatDate(blog.updated_at)}</span>
                </>
              )}
              {blog.type === "work" && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                    Work
                  </span>
                </>
              )}
            </motion.div>
          </div>
        </header>

        {blog.heroImage && (
          <motion.figure
            {...fadeIn}
            transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
            className="w-full px-4 md:px-8"
          >
            <div className="max-w-5xl mx-auto overflow-hidden rounded-lg border border-border/15 bg-muted/30">
              <img
                src={blog.heroImage.src}
                alt={blog.heroImage.alt}
                loading="eager"
                decoding="async"
                className="w-full aspect-video object-cover"
              />
              {blog.heroImage.caption && (
                <figcaption className="border-t border-border/20 px-4 py-3 text-sm text-muted-foreground">
                  {blog.heroImage.caption}
                </figcaption>
              )}
            </div>
          </motion.figure>
        )}

        <section className="w-full px-4 md:px-8 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <motion.main
              {...fadeIn}
              className="markdown-content"
              aria-labelledby="article-title"
            >
              <Content />
            </motion.main>
          </div>
        </section>

        {blog.type === "work" && (
          <section className="w-full px-4 md:px-8 py-8 border-t border-border/30">
            <div className="max-w-3xl mx-auto">
              <WorkDisclaimer />
            </div>
          </section>
        )}

        <footer className="w-full px-4 md:px-8 py-16 md:py-24 border-t border-border/30">
          <div className="max-w-3xl mx-auto space-y-16">
            <ShareSection title={blog.title} url={postUrl} />
            {blog.relations && blog.relations.length > 0 && (
              <Relations relations={blog.relations} />
            )}
          </div>
        </footer>
      </article>
    </div>
  );
}

function ShareSection({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // User cancelled or share failed.
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
      <div className="space-y-1">
        <h2
          className="text-muted-foreground/60 font-medium tracking-wide uppercase"
          style={{ fontSize: "0.75rem", letterSpacing: "0.15em" }}
        >
          Share
        </h2>
        <Paragraph className="text-sm text-muted-foreground">
          Found this useful? Pass it along.
        </Paragraph>
      </div>

      <div className="flex items-center gap-2">
        <ShareButton
          label="Copy link"
          onClick={handleCopy}
          aria-label="Copy link to clipboard"
        >
          {copied ? (
            <Check className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Link2 className="h-4 w-4" aria-hidden="true" />
          )}
        </ShareButton>

        <ShareButton
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          label="Share on X"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
        >
          <XIcon className="h-4 w-4" />
        </ShareButton>

        <ShareButton
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
          label="Share on LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4" aria-hidden="true" />
        </ShareButton>

        {typeof navigator !== "undefined" && "share" in navigator && (
          <ShareButton
            label="More share options"
            onClick={handleNativeShare}
            aria-label="Open native share options"
          >
            <Share2 className="h-4 w-4" aria-hidden="true" />
          </ShareButton>
        )}
      </div>
    </div>
  );
}

function ShareButton({
  children,
  label,
  href,
  ...props
}: {
  children: ReactNode;
  label: string;
  href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const className =
    "inline-flex items-center justify-center h-10 w-10 rounded-full border border-border/40 bg-background text-muted-foreground transition-colors hover:border-border/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

  if (href) {
    return (
      <a
        href={href}
        className={className}
        title={label}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={className} title={label} {...props}>
      {children}
    </button>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
