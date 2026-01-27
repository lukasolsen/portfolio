import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { NotFound } from "./core/pages/not-found";

export function getRouter() {
  const router = createRouter({
    routeTree,
    defaultPreload: "intent",
    defaultErrorComponent: () => <NotFound />,
    defaultNotFoundComponent: () => <NotFound />,
    scrollRestoration: true,
    ssr: {
      nonce: "",
    },
  });
  return router;
}
