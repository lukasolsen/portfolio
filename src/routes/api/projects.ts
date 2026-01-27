import { projects } from "@/data";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/projects")({
  server: {
    handlers: {
      GET: async () => {
        return new Response(JSON.stringify(projects), {
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
    },
  },
});
