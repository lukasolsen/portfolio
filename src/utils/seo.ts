export const seo = ({
  title,
  description,
  keywords,
  image,
}: {
  title: string;
  description?: string;
  image?: string;
  keywords?: string;
}) => {
  const tags = [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "og:type", content: "website" },
    { name: "og:title", content: title },
    { name: "og:description", content: description },
    ...(image
      ? [
          { name: "twitter:image", content: image },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "og:image", content: image },
        ]
      : []),

    // Open Graph
    { name: "og:url", content: "https://lukasolsen.com" },
    { name: "og:site_name", content: "Lukas Olsen" },
    { name: "og:description", content: description },
    { name: "og:type", content: "website" },
    { name: "og:image", content: image },

    // Twitter
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: "@lukasolsen" },
    { name: "twitter:site", content: "@lukasolsen" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: image },

    // Schema.org
    { name: "schema:author", content: "Lukas Olsen" },
    { name: "schema:description", content: description },
    { name: "schema:image", content: image },
    { name: "schema:name", content: title },
    { name: "schema:url", content: "https://lukasolsen.com" },
  ];

  return tags;
};
