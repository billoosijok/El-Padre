import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { llmsRoutingPlugin as Llms } from "./plugins/vite-plugin-llms";
import tsconfigPaths from "vite-tsconfig-paths";
import { viteStaticCopy } from "vite-plugin-static-copy";
import Sitemap from "vite-plugin-sitemap";

import { copyIndexTo404 } from "./plugins/copyIndexTo404";

const routes = [
  "/menu",
  "/boissons",
  "/privatisation",
  "/brunch",
  "/contact",
  // English
  "/en",
  "/en/menu",
  "/en/boissons",
  "/en/privatisation",
  "/en/brunch",
  "/en/contact",
  // Spanish
  "/es",
  "/es/menu",
  "/es/boissons",
  "/es/privatisation",
  "/es/brunch",
  "/es/contact",
];

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
    copyIndexTo404({ routes }),
    Sitemap({
      hostname: "https://elpadre-narbonne.fr",
      dynamicRoutes: routes,
      outDir: "docs",
      exclude: ["/404"],
      changefreq: {
        "/": "weekly",
        "/menu": "weekly",
        "/boissons": "weekly",
        "/privatisation": "monthly",
        "/brunch": "weekly",
        "/contact": "monthly",
        // English
        "/en": "weekly",
        "/en/menu": "weekly",
        "/en/boissons": "weekly",
        "/en/privatisation": "monthly",
        "/en/brunch": "weekly",
        "/en/contact": "monthly",
        // Spanish
        "/es": "weekly",
        "/es/menu": "weekly",
        "/es/boissons": "weekly",
        "/es/privatisation": "monthly",
        "/es/brunch": "weekly",
        "/es/contact": "monthly",
      },
      priority: {
        "/": 1.0,
        "/privatisation": 0.9,
        "/menu": 0.8,
        "/boissons": 0.8,
        "/brunch": 0.8,
        "/contact": 0.7,
        // English
        "/en": 1.0,
        "/en/privatisation": 0.9,
        "/en/menu": 0.8,
        "/en/boissons": 0.8,
        "/en/brunch": 0.8,
        "/en/contact": 0.7,
        // Spanish
        "/es": 1.0,
        "/es/privatisation": 0.9,
        "/es/menu": 0.8,
        "/es/boissons": 0.8,
        "/es/brunch": 0.8,
        "/es/contact": 0.7,
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
