export const seo = ({
  title,
  description,
  keywords,
  image,
  path = "/",
}: {
  title: string;
  description?: string;
  image?: string;
  keywords?: string;
  path?: string;
}) => {
  const siteUrl = "https://lukasolsen.no";
  const canonicalUrl = new URL(path, siteUrl).toString();
  const imageUrl = image ? new URL(image, siteUrl).toString() : undefined;

  return [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },

    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: canonicalUrl },
    { property: "og:site_name", content: "Lukas Olsen" },
    { property: "og:image", content: imageUrl },

    // Twitter
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: "@lukasolsen" },
    { name: "twitter:site", content: "@lukasolsen" },
    { name: "twitter:card", content: imageUrl ? "summary_large_image" : "summary" },
    { name: "twitter:image", content: imageUrl },

    // Schema.org
    { name: "schema:author", content: "Lukas Olsen" },
    { name: "schema:description", content: description },
    { name: "schema:image", content: imageUrl },
    { name: "schema:name", content: title },
    { name: "schema:url", content: canonicalUrl },
  ].filter((tag) => !("content" in tag) || Boolean(tag.content));
};

export const canonicalLink = (path = "/") => ({
  rel: "canonical",
  href: new URL(path, "https://lukasolsen.no").toString(),
});
