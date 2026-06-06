import type { Plugin } from "vite";

import fs from "fs";
import path from "path";

interface Options {
  routes?: string[];
}

export function copyIndexTo404(options?: Options): Plugin {
  return {
    name: "copy-index-to-error-and-routes",
    closeBundle: async () => {
      const outDir = "docs"; // Using your configured output directory
      const indexPath = path.join(outDir, "index.html");
      const errorPath = path.join(outDir, "404.html");

      // 1. Copy to 404.html
      try {
        await fs.promises.copyFile(indexPath, errorPath);
        console.log("Successfully copied index.html to 404.html");
      } catch (error) {
        console.error("Error copying index.html to 404.html:", error);
      }

      // 2. Generate flat HTML files for each route to leverage GitHub Pages' clean URLs
      if (options?.routes && Array.isArray(options.routes)) {
        for (const route of options.routes) {
          // Normalize the route path to avoid leading/trailing slashes
          const cleanRoute = route.replace(/^\/+/, "").replace(/\/+$/, "");
          if (!cleanRoute) continue; // Skip root page since index.html already exists there

          const targetPath = path.join(outDir, `${cleanRoute}.html`);
          const targetDir = path.dirname(targetPath);

          try {
            await fs.promises.mkdir(targetDir, { recursive: true });
            await fs.promises.copyFile(indexPath, targetPath);
            console.log(`Successfully generated static route file: ${targetPath}`);
          } catch (error) {
            console.error(`Error copying index.html to static route file for ${route}:`, error);
          }
        }
      }

      // 3. Create .nojekyll to ensure GitHub Pages serves files directly and bypasses Jekyll
      const noJekyllPath = path.join(outDir, ".nojekyll");
      try {
        await fs.promises.writeFile(noJekyllPath, "");
        console.log("Successfully generated .nojekyll in output directory");
      } catch (error) {
        console.error("Error generating .nojekyll:", error);
      }
    },
  };
}
