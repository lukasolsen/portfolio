import { BookIcon, Menu, X } from "lucide-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
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

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

export const InstanceHeader: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menu = [
    {
      title: "Ressurser",
      url: "#",
      items: [
        {
          title: "Blogg",
          url: "/blog",
          description: "Les mine siste tanker og oppdateringer.",
          icon: <BookIcon />,
        },
        {
          title: "Dokumentasjon",
          url: "/docs",
          description: "Finn ut mer om hvordan du bruker produktene mine.",
          icon: <BookIcon />,
        },
      ],
    },
    { title: "Kontakt", url: "/contact" },
  ];

  return (
    <header
      className={cn(
        "flex items-center justify-between w-full py-2 bg-background/60 backdrop-blur-sm sticky top-0 z-50 transition-colors",
        isScrolled ? "border-b border-border" : ""
      )}
    >
      {/* Logo */}
      <a
        className="flex max-h-8 items-center gap-2 text-lg font-semibold tracking-tighter"
        href="/"
        style={{ textDecoration: "none" }}
      >
        <img
          src="/images/lukasolsen.png"
          alt="logo"
          className="inline-block size-8 rounded-full"
        />
        <span className="text-foreground hidden sm:inline-block -tracking-wide">
          @lukasolsen
        </span>
      </a>

      {/* Desktop navigation */}
      <NavigationMenu className="hidden lg:flex flex-1 items-center justify-center relative">
        <NavigationMenuList>
          {menu.map((item) => renderMenuItem(item))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Right side buttons */}
      <div className="flex items-center gap-2">
        <a href="https://github.com/lukasolsen">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-5 w-5 fill-current"
            >
              <title>GitHub</title>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            <span>98k</span>
          </Button>
        </a>

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
                )
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
