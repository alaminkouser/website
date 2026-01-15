// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";
import catppuccin from "@catppuccin/starlight";
import starlightBlog from "starlight-blog";
import mermaid from "astro-mermaid";

import authorList from "./src/authorConfig/authorList.ts";

// https://astro.build/config
export default defineConfig({
  site: "https://alaminkouser.com",
  base: "/docs",
  outDir: "dist/docs",
  trailingSlash: "always",
  compressHTML: true,
  integrations: [
    sitemap({
      customPages: [
        "https://alaminkouser.com/",
        "https://alaminkouser.com/status/",
        "https://alaminkouser.com/privacy/",
      ],
    }),
    mermaid(),
    starlight({
      components: {
        SiteTitle: "./src/components/starlight/SiteTitle.astro",
      },
      plugins: [
        catppuccin({
          dark: { flavor: "mocha", accent: "red" },
          light: { flavor: "latte", accent: "red" },
        }),
        starlightBlog({
          title: "POSTS",
          prefix: "posts",
          navigation: "none",
          metrics: {
            readingTime: true,
            words: "total",
          },
          authors: authorList,
        }),
      ],
      title: "AL AMIN KOUSER",
      favicon: "./favicon.ico",
      disable404Route: true,
      customCss: ["./src/fonts/font-face.css", "./src/custom-styles.css"],
      social: [
        {
          icon: "email",
          label: "Email",
          href: "mailto:contact@alaminkouser.com",
        },
        {
          icon: "discord",
          label: "Discord",
          href: "https://discord.com/users/alaminkouser",
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
