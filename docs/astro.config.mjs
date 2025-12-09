// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import mermaid from "astro-mermaid";
import starlightUiTweaks from "starlight-ui-tweaks";
import starlightGitHubAlerts from "starlight-github-alerts";

// https://astro.build/config
export default defineConfig({
  site: "https://alaminkouser.com",
  base: "/docs",
  trailingSlash: "always",
  compressHTML: true,
  integrations: [
    mermaid(),
    starlight({
      plugins: [
        starlightUiTweaks({
          navbarLinks: [{ label: "aak", href: "/" }],
        }),
        starlightGitHubAlerts(),
      ],
      title: "Docs",
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
