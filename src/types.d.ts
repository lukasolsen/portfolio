declare module "*.md" {
  const content: string;
  export default content;
}

declare module "*.mdx" {
  import * as React from "react";

  const MDXComponent: React.FC<React.ComponentProps<"div">>;
  export default MDXComponent;
}
