import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { NotFound } from "./core/pages/not-found";
import { deLocalizeUrl, localizeUrl } from "./paraglide/runtime";

export function getRouter() {
  const router = createRouter({
    routeTree,
    defaultPreload: "intent",
    defaultErrorComponent: () => <NotFound />,
    defaultNotFoundComponent: () => <NotFound />,
    scrollRestoration: true,
    rewrite: {
      input: ({ url }) => deLocalizeUrl(url),
      output: ({ url }) => localizeUrl(url),
    },
  });
  return router;
}
