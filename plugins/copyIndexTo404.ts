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

      // Read labels.json
      let labels: Record<string, Record<string, string>> = {};
      try {
        const labelsPath = path.join(process.cwd(), "src/config/labels.json");
        labels = JSON.parse(await fs.promises.readFile(labelsPath, "utf-8"));
      } catch (error) {
        console.error("Error reading labels.json:", error);
      }

      const getLabelText = (key: string, lang: string): string => {
        const label = labels[key];
        if (!label) return `{${key}}`;
        return label[lang] || label["fr"] || `{${key}}`;
      };

      const routeMetadataKeys: Record<string, { title: string; desc?: string }> = {
        "/": { title: "seo_home_title", desc: "seo_home_description" },
        "/menu": { title: "menu", desc: "seo_menu_description" },
        "/boissons": { title: "boissons", desc: "seo_menu_description" },
        "/privatisation": { title: "seo_privatisation_title", desc: "seo_privatisation_description" },
        "/reservation": { title: "seo_reservation_title", desc: "seo_reservation_description" },
        "/brunch": { title: "seo_brunch_title", desc: "seo_brunch_description" },
        "/contact": { title: "seo_contact_title", desc: "seo_contact_description" },
        "/mentions-legales": { title: "mentions_legales", desc: "seo_default_description" },
        "/politique-de-confidentialite": { title: "politique_confidentialite", desc: "seo_default_description" },
        "/politique-de-cookies": { title: "politique_cookies", desc: "seo_default_description" },
        "/reviews": { title: "seo_reviews_title", desc: "seo_reviews_description" },
      };

      const getRouteInfo = (route: string) => {
        let lang = "fr";
        let basePath = route;

        if (route.startsWith("/en/")) {
          lang = "en";
          basePath = route.substring(3);
        } else if (route === "/en") {
          lang = "en";
          basePath = "/";
        } else if (route.startsWith("/es/")) {
          lang = "es";
          basePath = route.substring(3);
        } else if (route === "/es") {
          lang = "es";
          basePath = "/";
        }

        if (!basePath.startsWith("/")) {
          basePath = "/" + basePath;
        }

        return { lang, basePath };
      };

      const customizeHtml = (rawHtml: string, route: string): string => {
        const { lang, basePath } = getRouteInfo(route);
        
        // 1. Get Title and Description
        const defaultTitle = getLabelText("seo_default_title", lang);
        const defaultDesc = getLabelText("seo_default_description", lang);
        
        let title = defaultTitle;
        let description = defaultDesc;
        
        const meta = routeMetadataKeys[basePath];
        if (meta) {
          const pageTitle = getLabelText(meta.title, lang);
          title = pageTitle.includes("El Padre") ? pageTitle : `${pageTitle} | ${defaultTitle}`;
          
          if (meta.desc) {
            description = getLabelText(meta.desc, lang);
          }
        }
        
        const isNoIndex = basePath === "/reviews";
        
        // 2. Build canonical and alternate links
        const siteUrl = "https://elpadre-narbonne.fr";
        const canonicalUrl = lang === "fr"
          ? `${siteUrl}${basePath === "/" ? "" : basePath}`
          : `${siteUrl}/${lang}${basePath === "/" ? "" : basePath}`;
          
        const alternateFr = `${siteUrl}${basePath === "/" ? "" : basePath}`;
        const alternateEn = basePath === "/" ? `${siteUrl}/en` : `${siteUrl}/en${basePath}`;
        const alternateEs = basePath === "/" ? `${siteUrl}/es` : `${siteUrl}/es${basePath}`;
        const alternateDefault = alternateFr;
        
        const headTags = [
          ...(isNoIndex ? ['<meta name="robots" content="noindex, nofollow" />'] : []),
          `<link rel="canonical" href="${canonicalUrl}" />`,
          `<link rel="alternate" hrefLang="fr" href="${alternateFr}" />`,
          `<link rel="alternate" hrefLang="en" href="${alternateEn}" />`,
          `<link rel="alternate" hrefLang="es" href="${alternateEs}" />`,
          `<link rel="alternate" hrefLang="x-default" href="${alternateDefault}" />`
        ].join("\n  ");
        
        // 3. Perform HTML replacements
        let customized = rawHtml;
        
        // Replace language
        customized = customized.replace(/<html\s+lang="[^"]*"/i, `<html lang="${lang}"`);
        
        // Replace title
        customized = customized.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);
        
        // Replace description meta
        customized = customized.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${description}" />`);
        
        // Inject head tags before </head>
        customized = customized.replace("</head>", `  ${headTags}\n</head>`);
        
        return customized;
      };

      // Read build template
      let rawIndexHtml = "";
      try {
        rawIndexHtml = await fs.promises.readFile(indexPath, "utf-8");
      } catch (error) {
        console.error("Error reading index.html from docs:", error);
        return;
      }

      // 1. Customize and overwrite the main docs/index.html (default / French)
      try {
        const rootHtml = customizeHtml(rawIndexHtml, "/");
        await fs.promises.writeFile(indexPath, rootHtml, "utf-8");
        console.log("Successfully updated docs/index.html with localized metadata");
      } catch (error) {
        console.error("Error updating docs/index.html:", error);
      }

      // 2. Copy index.html to 404.html (using the customized root html or raw is fine, let's use the customized root HTML)
      try {
        await fs.promises.copyFile(indexPath, errorPath);
        console.log("Successfully copied index.html to 404.html");
      } catch (error) {
        console.error("Error copying index.html to 404.html:", error);
      }

      // 3. Generate flat HTML files for each route to leverage GitHub Pages' clean URLs
      if (options?.routes && Array.isArray(options.routes)) {
        for (const route of options.routes) {
          // Normalize the route path to avoid leading/trailing slashes
          const cleanRoute = route.replace(/^\/+/, "").replace(/\/+$/, "");
          if (!cleanRoute) continue; // Skip root page since index.html already exists there

          const targetPath = path.join(outDir, `${cleanRoute}.html`);
          const targetDir = path.dirname(targetPath);

          try {
            await fs.promises.mkdir(targetDir, { recursive: true });
            
            // Customize for this route
            const customizedRouteHtml = customizeHtml(rawIndexHtml, route);
            await fs.promises.writeFile(targetPath, customizedRouteHtml, "utf-8");
            console.log(`Successfully generated static route file: ${targetPath}`);
          } catch (error) {
            console.error(`Error copying index.html to static route file for ${route}:`, error);
          }
        }
      }

      // 4. Create .nojekyll to ensure GitHub Pages serves files directly and bypasses Jekyll
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
