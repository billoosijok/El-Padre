import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { llmsRoutingPlugin as Llms } from "./plugins/vite-plugin-llms";
import tsconfigPaths from "vite-tsconfig-paths";
import { viteStaticCopy } from "vite-plugin-static-copy";
import Sitemap from "vite-plugin-sitemap";

import { copyIndexTo404 } from "./plugins/copyIndexTo404";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Llms(),
    tsconfigPaths(),
    viteStaticCopy({
      targets: [
        {
          src: "CNAME",
          dest: "./",
        },
      ],
    }),
    copyIndexTo404(),
    Sitemap({
      hostname: "https://elpadre-narbonne.fr",
      dynamicRoutes: [
        "/menu",
        "/boissons",
        "/privatisation",
        "/brunch",
        // English
        "/en",
        "/en/menu",
        "/en/boissons",
        "/en/privatisation",
        "/en/brunch",
        // Spanish
        "/es",
        "/es/menu",
        "/es/boissons",
        "/es/privatisation",
        "/es/brunch",
      ],
      outDir: "docs",
      exclude: ["/404"],
      changefreq: {
        "/": "weekly",
        "/menu": "weekly",
        "/boissons": "weekly",
        "/privatisation": "monthly",
        "/brunch": "weekly",
        // English
        "/en": "weekly",
        "/en/menu": "weekly",
        "/en/boissons": "weekly",
        "/en/privatisation": "monthly",
        "/en/brunch": "weekly",
        // Spanish
        "/es": "weekly",
        "/es/menu": "weekly",
        "/es/boissons": "weekly",
        "/es/privatisation": "monthly",
        "/es/brunch": "weekly",
      },
      priority: {
        "/": 1.0,
        "/privatisation": 0.9,
        "/menu": 0.8,
        "/boissons": 0.8,
        "/brunch": 0.8,
        // English
        "/en": 1.0,
        "/en/privatisation": 0.9,
        "/en/menu": 0.8,
        "/en/boissons": 0.8,
        "/en/brunch": 0.8,
        // Spanish
        "/es": 1.0,
        "/es/privatisation": 0.9,
        "/es/menu": 0.8,
        "/es/boissons": 0.8,
        "/es/brunch": 0.8,
      },
    }),
  ],
  build: {
    outDir: "docs",
  },
  server: {
    allowedHosts: true,
  },
});
