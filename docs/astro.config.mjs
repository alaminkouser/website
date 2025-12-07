// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import mermaid from "astro-mermaid";

// https://astro.build/config
export default defineConfig({
  site: "https://alaminkouser.com",
  base: "/docs",
  trailingSlash: "always",
  compressHTML: true,
  integrations: [
    starlight({
      title: "aak",
      social: [
        {
          icon: "external",
          label: "Website",
          href: "https://alaminkouser.com",
        },
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/alaminkouser",
        },
        {
          icon: "linkedin",
          label: "LinkedIn",
          href: "https://linkedin.com/in/alaminkouser",
        },
      ],
      sidebar: [
        {
          label: "Guides",
          items: [{ label: "Example Guide", slug: "start" }],
        },
      ],
    }),
    mermaid({
      theme: "forest",
      autoTheme: true,
    }),
  ],
});
