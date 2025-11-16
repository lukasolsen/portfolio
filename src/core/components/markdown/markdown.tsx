import type { FC } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");

const SCROLL_OFFSET = 84;

type MarkdownProps = {
  content: string;
};

export const Markdown: FC<MarkdownProps> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[]}
      components={{
        h1: ({ ...props }) => {
          const text = String(props?.children ?? "");
          const id = slugify(text);
          return (
            <h1
              id={id}
              style={{ scrollMarginTop: `${SCROLL_OFFSET + 8}px` }}
              {...props}
            >
              {props?.children}
            </h1>
          );
        },
        h2: ({ ...props }) => {
          const text = String(props?.children ?? "");
          const id = slugify(text);
          return (
            <h2
              id={id}
              style={{ scrollMarginTop: `${SCROLL_OFFSET + 8}px` }}
              {...props}
            >
              {props?.children}
            </h2>
          );
        },
        h3: ({ ...props }) => {
          const text = String(props?.children ?? "");
          const id = slugify(text);
          return (
            <h3
              id={id}
              style={{ scrollMarginTop: `${SCROLL_OFFSET + 8}px` }}
              {...props}
            >
              {props?.children}
            </h3>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
