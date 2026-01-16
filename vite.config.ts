import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Llms from "vite-plugin-llms";
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
      dynamicRoutes: ["/menu", "/boissons", "/privatisation"],
      outDir: "docs",
      exclude: ["/404"],
      changefreq: {
        "/": "weekly",
        "/menu": "weekly",
        "/boissons": "weekly",
        "/privatisation": "monthly",
      },
      priority: {
        "/": 1.0,
        "/privatisation": 0.9,
        "/menu": 0.8,
        "/boissons": 0.8,
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
