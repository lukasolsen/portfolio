import { blogs, projects } from "@/data";

type GetRequest = {
  query: URLSearchParams;
};

export async function GET({ query }: GetRequest) {
  const url = query.get("url");

  if (!url) {
    return new Response(JSON.stringify({ error: "Missing url" }), {
      status: 400,
    });
  }

  // Example: /blogs/123
  if (url.startsWith("/blogs/")) {
    const id = url.split("/blogs/")[1];
    const blog = blogs.find((b) => b.id === id);

    if (blog) {
      return Response.json({
        type: "blog",
        title: blog.title,
        description: blog.subtitle,
        domain: globalThis.location?.host ?? "",
        favicon: "/favicon.ico",
      });
    }
  }

  // Example: /projects/abc
  if (url.startsWith("/projects/")) {
    const id = url.split("/projects/")[1];
    const project = projects.find((p) => p.id === id);

    if (project) {
      return Response.json({
        type: "project",
        title: project.title,
        description: project.description,
        domain: globalThis.location?.host ?? "",
        favicon: project.logo ?? "/favicon.ico",
      });
    }
  }

  return Response.json({ error: "Not found" }, { status: 404 });
}
