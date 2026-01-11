import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { viteStaticCopy } from "vite-plugin-static-copy";
import Sitemap from "vite-plugin-sitemap";

import { copyIndexTo404 } from "./plugins/copyIndexTo404";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
      hostname: "https://el-padre.com",
      dynamicRoutes: ["/menu", "/boissons", "/privatisation"],
      outDir: "docs",
    }),
  ],
  build: {
    outDir: "docs",
  },
  server: {
    allowedHosts: true,
  },
});
