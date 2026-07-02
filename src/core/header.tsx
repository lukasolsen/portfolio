import { BookIcon, Github, Globe, Menu, X } from "lucide-react";
import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouterState } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";
import { setLocale, getLocale } from "@/paraglide/runtime";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
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

  const menu = useMemo(
    () => [
      {
        title: m["common.resources"](),
        url: "#",
        items: [
          {
            title: m["common.blog"](),
            url: "/blogs",
            description: m["common.blogDescription"](),
            icon: <BookIcon />,
          },
          {
            title: m["common.docs"](),
            url: "/docs",
            description: m["common.docsDescription"](),
            icon: <BookIcon />,
          },
        ],
      },
      { title: m["pages.contact.title"](), url: "/contact" },
    ],
    [],
  );

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

      <NavigationMenu className="hidden lg:flex flex-1 items-center justify-center relative">
        <NavigationMenuList>
          {menu.map((item) => renderMenuItem(item))}
        </NavigationMenuList>
      </NavigationMenu>

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

        <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
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
          className="lg:hidden"
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
            className="absolute top-full left-0 w-full bg-background/90 backdrop-blur-lg border-b border-border shadow-sm lg:hidden"
          >
            <ul className="flex flex-col space-y-2 p-4">
              {menu.map((item) =>
                item.items ? (
                  <li key={item.title}>
                    <p className="font-medium text-foreground">{item.title}</p>
                    <ul className="pl-4 mt-2 space-y-1">
                      {item.items.map((sub) => (
                        <li key={sub.title}>
                          <a
                            href={sub.url}
                            className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setMobileOpen(false)}
                          >
                            {sub.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={item.title}>
                    <a
                      href={item.url}
                      className="text-foreground hover:underline"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.title}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

/* ---------------------------------- Helpers ---------------------------------- */

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="bg-background hover:bg-muted hover:text-accent-foreground inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => (
  <a
    className="hover:bg-muted hover:text-accent-foreground flex min-w-80 select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors"
    href={item.url}
  >
    <div className="text-foreground">{item.icon}</div>
    <div>
      <div className="text-sm font-semibold">{item.title}</div>
      {item.description && (
        <p className="text-muted-foreground text-sm leading-snug">
          {item.description}
        </p>
      )}
    </div>
  </a>
);
