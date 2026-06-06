import DefaultLayout from "@/layouts/default";
import { SEO } from "@/components/SEO";
import { useI18n } from "@/hooks/useTranslations";
import { Button } from "@heroui/button";

export default function PolitiqueCookiesPage() {
  const { goodLabel } = useI18n();

  const handleOpenCookieSettings = () => {
    // Dispatch a custom event to open the cookie settings from the banner
    window.dispatchEvent(new CustomEvent("open-cookie-settings"));
  };

  return (
    <DefaultLayout>
      <SEO
        breadcrumbs={[
          { name: goodLabel("breadcrumbs_home"), item: "/" },
          { name: goodLabel("politique_cookies"), item: "/politique-de-cookies" },
        ]}
        description="Politique de cookies du site El Padre Bistró Bar à Narbonne."
        title={goodLabel("politique_cookies")}
      />

      {/* Header Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 text-center px-4 flex flex-col items-center gap-6">
          <h1 className="text-4xl md:text-6xl font-cormorant text-white">
            {goodLabel("politique_cookies")}
          </h1>
          <div className="h-[1px] w-24 bg-padre-primary" />
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-padre-background px-6">
        <div className="max-w-4xl mx-auto bg-black/30 border border-white/5 backdrop-blur-md rounded-sm p-8 md:p-12 text-gray-300 font-lato leading-relaxed">
          
          <div className="space-y-12">
            
            {/* Section 1 */}
            <div>
              <h2 className="text-2xl font-cormorant text-white border-b border-white/10 pb-3 mb-6">
                1. Qu'est-ce qu'un cookie ?
              </h2>
              <p className="mb-4">
                Un cookie est un petit fichier texte enregistré sur votre appareil (ordinateur, tablette, smartphone) lors de votre visite sur notre site internet.
              </p>
              <p>
                Les cookies permettent notamment d'améliorer votre expérience utilisateur, de mesurer l'audience du site, de se souvenir de vos préférences et d'évaluer l'efficacité de nos actions marketing.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-cormorant text-white border-b border-white/10 pb-3 mb-6">
                2. Types de cookies utilisés
              </h2>
              
              <div className="space-y-6">
                <div className="bg-white/5 border border-white/5 p-6 rounded-sm">
                  <h3 className="text-lg font-semibold text-white mb-2">Cookies strictement nécessaires</h3>
                  <p className="mb-3">
                    Ces cookies sont indispensables au bon fonctionnement du site. Ils permettent notamment :
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-400 mb-2">
                    <li>La navigation fluide sur le site</li>
                    <li>La sécurisation des formulaires de contact et réservation</li>
                    <li>Le bon affichage des polices et des styles de pages</li>
                  </ul>
                  <p className="text-xs italic text-padre-primary">Ces cookies ne nécessitent pas de consentement préalable.</p>
                </div>

                <div className="bg-white/5 border border-white/5 p-6 rounded-sm">
                  <h3 className="text-lg font-semibold text-white mb-2">Cookies de mesure d'audience</h3>
                  <p className="mb-3">
                    Avec votre consentement, nous pouvons utiliser des outils d'analyse afin de comprendre comment les visiteurs naviguent sur le site, ce qui nous aide à améliorer nos contenus et performances.
                  </p>
                  <p className="text-sm text-gray-400 mb-2">
                    <span className="font-semibold text-white">Exemples :</span> Google Analytics 4 (GA4), Google Tag Manager.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/5 p-6 rounded-sm">
                  <h3 className="text-lg font-semibold text-white mb-2">Cookies publicitaires</h3>
                  <p className="mb-3">
                    Sous réserve de votre consentement, ces cookies sont utilisés pour évaluer l'efficacité de nos campagnes de publicité (Google Ads) et permettre un ciblage publicitaire pertinent (Remarketing).
                  </p>
                  <p className="text-sm text-gray-400">
                    <span className="font-semibold text-white">Exemples :</span> Google Ads, Google Remarketing, Meta Pixel (si activé).
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-cormorant text-white border-b border-white/10 pb-3 mb-6">
                3. Gestion du consentement
              </h2>
              <p className="mb-4">
                Lors de votre première visite, un bandeau en bas de page vous permet d'accepter tous les cookies, de les refuser, ou de personnaliser vos préférences de manière granulaire.
              </p>
              <p className="mb-6">
                Vous pouvez modifier votre choix ou retirer votre consentement à tout moment en cliquant sur le bouton ci-dessous :
              </p>
              <div className="flex justify-start">
                <Button
                  onClick={handleOpenCookieSettings}
                  className="rounded-none bg-padre-primary/20 border border-padre-primary text-padre-primary font-bold px-6 py-2 uppercase tracking-widest hover:bg-padre-primary hover:text-black transition-colors text-xs"
                >
                  Gérer mes préférences cookies
                </Button>
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-cormorant text-white border-b border-white/10 pb-3 mb-6">
                4. Durée de conservation
              </h2>
              <p>
                La durée de conservation des cookies varie selon leur nature. Les cookies de session expirent dès la fermeture du navigateur, tandis que les cookies persistants ont des durées définies selon les directives de la CNIL (13 mois maximum pour le consentement).
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-cormorant text-white border-b border-white/10 pb-3 mb-6">
                5. Désactivation via le navigateur
              </h2>
              <p className="mb-4">
                Vous pouvez également configurer votre navigateur internet pour refuser l'installation de cookies ou pour être averti avant toute installation.
              </p>
              <p className="text-sm text-gray-400">
                Chaque navigateur dispose d'un menu d'aide décrivant la procédure : Chrome, Firefox, Safari, Edge, etc. Sachez que le blocage complet des cookies peut empêcher l'utilisation optimale de certains formulaires ou fonctionnalités du site.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-2xl font-cormorant text-white border-b border-white/10 pb-3 mb-6">
                6. Contact
              </h2>
              <p className="mb-4">Pour toute question relative à cette politique de cookies, vous pouvez nous contacter :</p>
              <div className="bg-white/5 border border-white/5 p-6 rounded-sm space-y-1">
                <p className="font-bold text-white">EL PADRE BISTRÓ BAR</p>
                <p>29 Cours de la République</p>
                <p>11100 Narbonne</p>
                <p>Téléphone : 04 68 32 40 11</p>
                <p>Email : elpadre.aude@gmail.com</p>
              </div>
            </div>

          </div>

          <div className="mt-16 pt-6 border-t border-white/5 text-xs text-gray-500 text-right">
            Dernière mise à jour : Juin 2026.
          </div>

        </div>
      </section>
    </DefaultLayout>
  );
}
