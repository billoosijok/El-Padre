import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { viteStaticCopy } from "vite-plugin-static-copy";

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
  ],
  build: {
    outDir: "docs",
  },
  server: {
    allowedHosts: true,
  },
});
