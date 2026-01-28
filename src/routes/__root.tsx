/// <reference types="vite/client" />
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/core/layout";
import { NotFound } from "@/core/pages/not-found";
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "@/styles/globals.css";
import { seo } from "@/utils/seo";
import { getLocale } from "@/paraglide/runtime";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "Lukas Olsen | Full-Stack Developer",
        description: `Lukas Olsen is a full-stack developer with a focus on creating high-quality, type-safe, and client-first applications.`,
      }),
    ],
    links: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
      {
        rel: "preload",
        href: "/fonts/Inter.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "",
      },
    ],
  }),
  errorComponent: () => <NotFound />,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
});

function RootDocument() {
  return (
    <html lang={getLocale()}>
      <head>
        <HeadContent />
      </head>
      <body>
        <TooltipProvider delayDuration={0}>
          <Layout />
        </TooltipProvider>
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
