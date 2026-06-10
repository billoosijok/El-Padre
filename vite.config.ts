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
  "/reservation",
  "/brunch",
  "/contact",
  "/mentions-legales",
  "/politique-de-confidentialite",
  "/politique-de-cookies",
  // English
  "/en",
  "/en/menu",
  "/en/boissons",
  "/en/privatisation",
  "/en/reservation",
  "/en/brunch",
  "/en/contact",
  "/en/mentions-legales",
  "/en/politique-de-confidentialite",
  "/en/politique-de-cookies",
  // Spanish
  "/es",
  "/es/menu",
  "/es/boissons",
  "/es/privatisation",
  "/es/reservation",
  "/es/brunch",
  "/es/contact",
  "/es/mentions-legales",
  "/es/politique-de-confidentialite",
  "/es/politique-de-cookies",
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
        "/reservation": "monthly",
        "/brunch": "weekly",
        "/contact": "monthly",
        "/mentions-legales": "monthly",
        "/politique-de-confidentialite": "monthly",
        "/politique-de-cookies": "monthly",
        // English
        "/en": "weekly",
        "/en/menu": "weekly",
        "/en/boissons": "weekly",
        "/en/privatisation": "monthly",
        "/en/reservation": "monthly",
        "/en/brunch": "weekly",
        "/en/contact": "monthly",
        "/en/mentions-legales": "monthly",
        "/en/politique-de-confidentialite": "monthly",
        "/en/politique-de-cookies": "monthly",
        // Spanish
        "/es": "weekly",
        "/es/menu": "weekly",
        "/es/boissons": "weekly",
        "/es/privatisation": "monthly",
        "/es/reservation": "monthly",
        "/es/brunch": "weekly",
        "/es/contact": "monthly",
        "/es/mentions-legales": "monthly",
        "/es/politique-de-confidentialite": "monthly",
        "/es/politique-de-cookies": "monthly",
      },
      priority: {
        "/": 1.0,
        "/reservation": 0.9,
        "/privatisation": 0.9,
        "/menu": 0.8,
        "/boissons": 0.8,
        "/brunch": 0.8,
        "/contact": 0.7,
        "/mentions-legales": 0.5,
        "/politique-de-confidentialite": 0.5,
        "/politique-de-cookies": 0.5,
        // English
        "/en": 1.0,
        "/en/reservation": 0.9,
        "/en/privatisation": 0.9,
        "/en/menu": 0.8,
        "/en/boissons": 0.8,
        "/en/brunch": 0.8,
        "/en/contact": 0.7,
        "/en/mentions-legales": 0.5,
        "/en/politique-de-confidentialite": 0.5,
        "/en/politique-de-cookies": 0.5,
        // Spanish
        "/es": 1.0,
        "/es/reservation": 0.9,
        "/es/privatisation": 0.9,
        "/es/menu": 0.8,
        "/es/boissons": 0.8,
        "/es/brunch": 0.8,
        "/es/contact": 0.7,
        "/es/mentions-legales": 0.5,
        "/es/politique-de-confidentialite": 0.5,
        "/es/politique-de-cookies": 0.5,
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
