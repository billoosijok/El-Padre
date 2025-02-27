import type { Plugin } from "vite";

import fs from "fs";
import path from "path";

export function copyIndexTo404(): Plugin {
  return {
    name: "copy-index-to-error",
    closeBundle: async () => {
      const outDir = "docs"; // Using your configured output directory
      const indexPath = path.join(outDir, "index.html");
      const errorPath = path.join(outDir, "404.html");

      try {
        await fs.promises.copyFile(indexPath, errorPath);
        console.log("Successfully copied index.html to 404.html");
      } catch (error) {
        console.error("Error copying index.html to 404.html:", error);
      }
    },
  };
}
