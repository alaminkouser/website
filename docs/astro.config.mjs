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
    mermaid(),
    starlight({
      title: "aak",
      disable404Route: true,
      customCss: ["./src/fonts/font-face.css", "./src/custom-styles.css"],
      social: [
        {
          icon: "email",
          label: "Email",
          href: "mailto:contact@alaminkouser.com",
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
          label: "Maritime",
          autogenerate: {
            directory: "maritime",
          },
        },
      ],
    }),
  ],
});
