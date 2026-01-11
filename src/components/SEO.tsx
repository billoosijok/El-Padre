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
    const { language } = useI18n();

    const siteUrl = "https://el-padre.com"; // Replace with actual domain
    const fullUrl = `${siteUrl}${pathname}`;

    const defaultTitle = "El Padre | Bistro & Bar | Narbonne";
    const defaultDescription = "Restaurant authentique à Narbonne. Tapas, vins, cocktails et cuisine raffinée dans une ambiance conviviale. Réservez votre table !";

    const currentTitle = title ? `${title} | El Padre` : defaultTitle;
    const currentDescription = description || defaultDescription;

    // Base Schema for LocalBusiness
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": "El Padre",
        "image": [
            `${siteUrl}/assets/team.jpg`,
            `${siteUrl}/DSC06390_Original.jpg`
        ],
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "29 Cours de la République",
            "addressLocality": "Narbonne",
            "postalCode": "11100",
            "addressCountry": "FR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 43.1833, // Approximate, should be exact
            "longitude": 3.0000 // Approximate, should be exact
        },
        "url": siteUrl,
        "telephone": "+33468324011",
        "servesCuisine": "Authentic, Tapas, French, Spanish",
        "priceRange": "$$",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                ],
                "opens": "11:00",
                "closes": "23:00"
            }
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
