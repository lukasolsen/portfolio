import { blogs } from "@/data";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/blogs")({
  server: {
    handlers: {
      GET: async () => {
        return new Response(JSON.stringify(blogs), {
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
    },
  },
});
