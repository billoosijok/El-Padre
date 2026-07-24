# Workspace Agent Rules

## Reviews Page & Sitemap Exclusion

- **NEVER** include the reviews page (`/reviews`, `/en/reviews`, `/es/reviews`) in `sitemap.xml` or in the sitemap generator configuration (`vite.config.ts`).
- The reviews page is a private review-gating & feedback page configured with `<meta name="robots" content="noindex, nofollow" />`. It MUST remain excluded from search engine indexing and sitemaps at all times.
