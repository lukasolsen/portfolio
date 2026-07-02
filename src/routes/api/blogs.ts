import { blogs } from "@/data";
import { serializeBlogs } from "@/lib/blogs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/blogs")({
  server: {
    handlers: {
      GET: async () => {
        return new Response(JSON.stringify(serializeBlogs(blogs)), {
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
    },
  },
});
