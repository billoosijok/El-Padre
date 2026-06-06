import DefaultLayout from "@/layouts/default";
import { SEO } from "@/components/SEO";
import { useI18n } from "@/hooks/useTranslations";

export default function PolitiqueConfidentialitePage() {
  const { goodLabel } = useI18n();

  return (
    <DefaultLayout>
      <SEO
        breadcrumbs={[
          { name: goodLabel("breadcrumbs_home"), item: "/" },
          {
            name: goodLabel("politique_confidentialite"),
            item: "/politique-de-confidentialite",
          },
        ]}
        description="Politique de confidentialité du site El Padre Bistró Bar à Narbonne."
        title={goodLabel("politique_confidentialite")}
      />

      {/* Header Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 text-center px-4 flex flex-col items-center gap-6">
          <h1 className="text-4xl md:text-6xl font-cormorant text-white">
            {goodLabel("politique_confidentialite")}
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
                1. Introduction
              </h2>
              <p className="mb-4">
                EL PADRE BISTRÓ BAR attache une grande importance à la
                protection de la vie privée de ses visiteurs et clients.
              </p>
              <p>
                La présente politique explique quelles données personnelles
                peuvent être collectées lors de votre navigation sur notre site
                et comment elles sont utilisées conformément au Règlement
                Général sur la Protection des Données (RGPD).
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-cormorant text-white border-b border-white/10 pb-3 mb-6">
                2. Responsable du traitement
              </h2>
              <p className="mb-4">
                Le responsable du traitement des données est :
              </p>
              <div className="bg-white/5 border border-white/5 p-6 rounded-sm space-y-1">
                <p className="font-bold text-white">EA 11</p>
                <p>29 Cours de la République</p>
                <p>11100 Narbonne</p>
                <p>
                  Email :{" "}
                  <a
                    href="mailto:elpadre.aude@gmail.com"
                    className="text-padre-primary hover:underline"
                  >
                    elpadre.aude@gmail.com
                  </a>
                </p>
                <p>Téléphone : 04 68 32 40 11</p>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-cormorant text-white border-b border-white/10 pb-3 mb-6">
                3. Données collectées
              </h2>
              <p className="mb-4">
                Selon votre utilisation du site, nous pouvons collecter :
              </p>
              <ul className="list-disc list-inside space-y-4 ml-2">
                <li>
                  <span className="font-semibold text-white">
                    Données d'identification :
                  </span>{" "}
                  Nom, prénom, adresse e-mail, numéro de téléphone.
                </li>
                <li>
                  <span className="font-semibold text-white">
                    Données de navigation :
                  </span>{" "}
                  Adresse IP, type d'appareil, navigateur utilisé, pages
                  consultées, durée de visite, données statistiques anonymisées.
                </li>
                <li>
                  <span className="font-semibold text-white">
                    Données de contact :
                  </span>{" "}
                  Lorsque vous utilisez un formulaire de contact, de réservation
                  ou de privatisation.
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-cormorant text-white border-b border-white/10 pb-3 mb-6">
                4. Finalités de traitement
              </h2>
              <p className="mb-4">
                Les données collectées peuvent être utilisées pour :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Répondre aux demandes de contact</li>
                <li>Gérer les réservations</li>
                <li>Organiser les demandes de privatisation</li>
                <li>Assurer le suivi client</li>
                <li>Améliorer l'expérience utilisateur</li>
                <li>Produire des statistiques de fréquentation</li>
                <li>Mesurer les performances publicitaires</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-cormorant text-white border-b border-white/10 pb-3 mb-6">
                5. Base légale
              </h2>
              <p className="mb-4">Les traitements reposent sur :</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Votre consentement</li>
                <li>L'exécution d'un service demandé</li>
                <li>Le respect d'obligations légales</li>
                <li>L'intérêt légitime de l'établissement</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-2xl font-cormorant text-white border-b border-white/10 pb-3 mb-6">
                6. Destinataires des données
              </h2>
              <p className="mb-4">Les données sont destinées exclusivement :</p>
              <ul className="list-disc list-inside space-y-2 ml-2 mb-4">
                <li>À EL PADRE BISTRÓ BAR</li>
                <li>
                  Aux prestataires techniques nécessaires au fonctionnement du
                  site
                </li>
                <li>
                  Aux outils d'analyse et de mesure d'audience utilisés avec
                  votre consentement
                </li>
              </ul>
              <p className="italic text-white">
                Aucune donnée personnelle n'est vendue à des tiers.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-2xl font-cormorant text-white border-b border-white/10 pb-3 mb-6">
                7. Durée de conservation
              </h2>
              <p className="mb-4">
                Les données sont conservées uniquement pendant la durée
                nécessaire à leur traitement.
              </p>
              <p className="mb-2">À titre indicatif :</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>
                  <span className="font-semibold text-white">
                    Demandes de contact :
                  </span>{" "}
                  jusqu'à 3 ans
                </li>
                <li>
                  <span className="font-semibold text-white">
                    Données statistiques :
                  </span>{" "}
                  selon les durées légales applicables
                </li>
                <li>
                  <span className="font-semibold text-white">
                    Données liées aux obligations comptables :
                  </span>{" "}
                  selon les obligations réglementaires
                </li>
              </ul>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-2xl font-cormorant text-white border-b border-white/10 pb-3 mb-6">
                8. Vos droits
              </h2>
              <p className="mb-4">
                Conformément à la réglementation en vigueur, vous disposez des
                droits suivants :
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-padre-primary" />
                  Droit d'accès
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-padre-primary" />
                  Droit de rectification
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-padre-primary" />
                  Droit d'effacement
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-padre-primary" />
                  Droit d'opposition
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-padre-primary" />
                  Droit à la limitation du traitement
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-padre-primary" />
                  Droit à la portabilité des données
                </li>
              </ul>
              <p>
                Vous pouvez exercer vos droits à tout moment en écrivant à :{" "}
                <a
                  href="mailto:elpadre.aude@gmail.com"
                  className="text-padre-primary hover:underline"
                >
                  elpadre.aude@gmail.com
                </a>
              </p>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-2xl font-cormorant text-white border-b border-white/10 pb-3 mb-6">
                9. Sécurité
              </h2>
              <p>
                EL PADRE BISTRÓ BAR met en œuvre des mesures techniques et
                organisationnelles adaptées afin de protéger les données
                personnelles contre toute perte, accès non autorisé ou
                divulgation.
              </p>
            </div>

            {/* Section 10 */}
            <div>
              <h2 className="text-2xl font-cormorant text-white border-b border-white/10 pb-3 mb-6">
                10. Réclamation
              </h2>
              <p>
                Si vous estimez que vos droits ne sont pas respectés, vous
                pouvez introduire une réclamation auprès de la{" "}
                <span className="font-semibold text-white">CNIL</span>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
