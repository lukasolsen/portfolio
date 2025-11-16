import { SmallText } from "@/components/typography/typography";
import { ChevronRight, List } from "lucide-react";
import type { FC } from "react";

export type HeadingItem = {
  id: string;
  text: string;
  level: number;
};

type Props = {
  headings: HeadingItem[];
  activeHeading: string;
};

export const TableOfContents: FC<Props> = ({ headings, activeHeading }) => {
  const handleTOCClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    // Use scrollIntoView with block: "start" - scroll-margin-top CSS will handle the offset
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    // Focus for accessibility (without scrolling)
    try {
      (el as HTMLElement).focus({ preventScroll: true });
    } catch {
      // ignore
    }
  };

  return (
    <aside className="hidden md:flex flex-col gap-6 sticky top-28 h-fit p-6 border border-border/60 rounded-2xl bg-background/60 backdrop-blur-xl shadow-lg">
      <div className="flex items-center gap-3 pb-3 border-b border-border/40">
        <List className="h-4 w-4 text-primary" />
        <SmallText className="uppercase tracking-wider font-medium">
          Innhold
        </SmallText>
      </div>

      <nav className="flex flex-col gap-2" aria-label="Innholdsfortegnelse">
        {headings.map((heading, i) => {
          const isActive = activeHeading === heading.id;
          const indent =
            heading.level === 1 ? "" : heading.level === 2 ? "ml-5" : "ml-10";

          return (
            <a
              key={heading.id + "-" + i}
              href={`#${heading.id}`}
              onClick={(e) => handleTOCClick(e, heading.id)}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ease-out
                    ${
                      isActive
                        ? "bg-primary/15 text-primary border border-primary/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    }
                    ${indent}`}
              aria-current={isActive ? "true" : undefined}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 transform
                      ${
                        isActive
                          ? "bg-primary scale-125"
                          : "bg-muted-foreground/60 group-hover:bg-primary/60"
                      }`}
              />
              <span
                className={`text-sm transition-all duration-200 ${
                  heading.level === 1
                    ? "font-semibold"
                    : heading.level === 2
                    ? "font-medium"
                    : "font-normal opacity-80"
                } ${isActive ? "text-primary" : ""}`}
              >
                {heading.text}
              </span>

              {isActive && (
                <ChevronRight className="ml-auto h-3 w-3 text-primary animate-pulse" />
              )}
            </a>
          );
        })}

        {headings.length === 0 && (
          <div className="text-center py-6">
            <SmallText className="text-muted-foreground">
              Ingen overskrifter funnet
            </SmallText>
          </div>
        )}
      </nav>
    </aside>
  );
};
