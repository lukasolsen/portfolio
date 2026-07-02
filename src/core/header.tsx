import { ChevronRight, Github, Globe, Menu, X } from "lucide-react";
import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouterState } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";
import { setLocale, getLocale } from "@/paraglide/runtime";

interface MenuItem {
  title: string;
  url: string;
}

export const InstanceHeader: FC = () => {
  const { location } = useRouterState();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isPlayground = useMemo(() => {
    return location.pathname.includes("/playground");
  }, [location.pathname]);

  const menu: MenuItem[] = [
    { title: m["common.blog"](), url: "/blogs" },
    { title: m["pages.contact.title"](), url: "/contact" },
  ];

  return (
    <header
      className={cn(
        "flex items-center justify-between w-full py-2 bg-background/60 backdrop-blur-sm sticky top-0 z-50",
        isPlayground ? "px-8" : "",
      )}
    >
      <motion.div
        className="absolute inset-x-0 bottom-0 h-px bg-border"
        initial={false}
        animate={{
          opacity: isScrolled ? 1 : 0,
          scaleX: isScrolled ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        style={{ originX: 0.5 }}
      />

      <a
        className="flex max-h-8 items-center gap-2 text-lg font-semibold tracking-tighter"
        href="/"
        style={{ textDecoration: "none" }}
      >
        <img
          src="/images/lukasolsen.png"
          alt="Lukas Olsen"
          width={32}
          height={32}
          decoding="async"
          className="inline-block size-8 rounded-full"
        />
        <span className="text-foreground hidden sm:inline-block -tracking-wide">
          @lukasolsen
        </span>
      </a>

      <nav
        aria-label="Primary navigation"
        className="hidden lg:flex flex-1 items-center justify-center"
      >
        <div className="inline-flex items-center gap-1 rounded-full border border-border/30 bg-background/70 p-1 backdrop-blur-sm">
          {menu.map((item) => (
            <NavLink
              key={item.title}
              item={item}
              active={
                item.url === "/"
                  ? location.pathname === item.url
                  : location.pathname.startsWith(item.url)
              }
            />
          ))}
        </div>
      </nav>

      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-md border border-border/40 p-0.5">
          <Globe className="h-3.5 w-3.5 text-muted-foreground/50 mx-1.5 shrink-0" />
          {(["en", "no"] as const).map((loc) => (
            <button
              key={loc}
              onClick={() => setLocale(loc)}
              aria-label={`Switch language to ${loc}`}
              className={cn(
                "px-2 py-0.5 text-xs font-mono font-medium uppercase rounded transition-colors",
                getLocale() === loc
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {loc}
            </button>
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="hidden sm:inline-flex text-muted-foreground hover:bg-muted/60 hover:text-foreground focus-visible:ring-ring/40"
          asChild
        >
          <a
            href="https://github.com/lukasolsen"
            target="_blank"
            rel="noreferrer"
            aria-label="Open Lukas Olsen on GitHub"
          >
            <Github className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>GitHub</span>
          </a>
        </Button>

        {/* Mobile menu toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-muted-foreground hover:bg-muted/60 hover:text-foreground focus-visible:ring-ring/40"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full border-y border-border/30 bg-background/95 backdrop-blur-lg lg:hidden"
          >
            <ul className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-3 md:px-8">
              {menu.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.url}
                    className={cn(
                      "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                      location.pathname.startsWith(item.url) &&
                        "bg-muted/40 text-foreground",
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.title}
                    <ChevronRight
                      className="h-4 w-4 text-muted-foreground/40"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

/* ---------------------------------- Helpers ---------------------------------- */

const NavLink = ({
  item,
  active,
}: {
  item: MenuItem;
  active: boolean;
}) => (
  <a
    href={item.url}
    className={cn(
      "inline-flex h-8 items-center rounded-full px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/55 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
      active && "bg-muted/45 text-foreground",
    )}
  >
    {item.title}
  </a>
);
