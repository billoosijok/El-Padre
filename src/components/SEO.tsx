import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useI18n } from "@/hooks/useTranslations";

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
    schema?: Record<string, any>;
    breadcrumbs?: Array<{ name: string; item: string }>;
}

export const SEO = ({
    title,
    description,
    image = "/icon.svg",
    type = "website",
    schema,
    breadcrumbs,
}: SEOProps) => {
    const { pathname } = useLocation();
    const { language, goodLabel } = useI18n();

    const siteUrl = "https://elpadre-narbonne.fr"; // Replace with actual domain
    const fullUrl = `${siteUrl}${pathname}`;

    const defaultTitle = goodLabel("seo_default_title");
    const defaultDescription = goodLabel("seo_default_description");

    const currentTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
    const currentDescription = description || defaultDescription;

    // Base Schema for LocalBusiness
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": "El Padre - Restaurant & Bar",
        "image": [
            `${siteUrl}/assets/bar-photo.JPG`,
            `${siteUrl}/assets/team.jpg`,
            `${siteUrl}/tapas.jpg`
        ],
        "logo": `${siteUrl}/icon.png`,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "29 Cours de la République",
            "addressLocality": "Narbonne",
            "postalCode": "11100",
            "addressCountry": "FR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 43.1826179,
            "longitude": 3.0057687
        },
        "url": siteUrl,
        "telephone": "+33468324011",
        "servesCuisine": "Authentic, Tapas, French",
        "priceRange": "$$",
        "publicAccess": true,
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Friday"],
                "opens": "12:00",
                "closes": "15:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Friday"],
                "opens": "18:00",
                "closes": "02:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Tuesday", "Wednesday", "Thursday"],
                "opens": "12:00",
                "closes": "15:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Tuesday", "Wednesday", "Thursday"],
                "opens": "18:00",
                "closes": "23:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Saturday", "Sunday"],
                "opens": "12:00",
                "closes": "02:00"
            }
        ],
        "sameAs": [
            "https://www.instagram.com/el_padre.11/",
            "https://www.facebook.com/profile.php?id=61568366311415",
            "https://www.tiktok.com/@el_padre.11"
        ]
    };

    const breadcrumbSchema = breadcrumbs ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": `${siteUrl}${item.item}`
        }))
    } : null;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <html lang={language} />
            <title>{currentTitle}</title>
            <meta name="description" content={currentDescription} />
            <link rel="canonical" href={fullUrl} />

            {/* Hreflang Tags */}
            {(() => {
                const getPathWithoutLocale = (path: string) => {
                    if (path.startsWith("/en/")) return path.substring(3);
                    if (path === "/en") return "/";
                    if (path.startsWith("/es/")) return path.substring(3);
                    if (path === "/es") return "/";
                    return path;
                };

                const basePath = getPathWithoutLocale(pathname);

                // Helper to construct URL
                const getLocaleUrl = (locale: string) => {
                    if (locale === "fr") return `${siteUrl}${basePath === "/" ? "" : basePath}`;

                    if (basePath === "/") return `${siteUrl}/${locale}`;
                    return `${siteUrl}/${locale}${basePath}`;
                };

                return (
                    <>
                        <link rel="alternate" hrefLang="fr" href={getLocaleUrl("fr")} />
                        <link rel="alternate" hrefLang="en" href={getLocaleUrl("en")} />
                        <link rel="alternate" hrefLang="es" href={getLocaleUrl("es")} />
                        <link rel="alternate" hrefLang="x-default" href={getLocaleUrl("fr")} />
                    </>
                );
            })()}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={currentTitle} />
            <meta property="og:description" content={currentDescription} />
            <meta property="og:image" content={`${siteUrl}${image}`} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullUrl} />
            <meta property="twitter:title" content={currentTitle} />
            <meta property="twitter:description" content={currentDescription} />
            <meta property="twitter:image" content={`${siteUrl}${image}`} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(localBusinessSchema)}
            </script>

            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}

            {breadcrumbSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbSchema)}
                </script>
            )}
        </Helmet>
    );
};
