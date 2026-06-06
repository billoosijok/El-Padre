import DefaultLayout from "@/layouts/default";
import { SEO } from "@/components/SEO";
import { useI18n } from "@/hooks/useTranslations";

export default function MentionsLegalesPage() {
  const { goodLabel } = useI18n();

  return (
    <DefaultLayout>
      <SEO
        breadcrumbs={[
          { name: goodLabel("breadcrumbs_home"), item: "/" },
          { name: goodLabel("mentions_legales"), item: "/mentions-legales" },
        ]}
        description="Mentions légales du site El Padre Bistró Bar à Narbonne."
        title={goodLabel("mentions_legales")}
      />

      {/* Header Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 text-center px-4 flex flex-col items-center gap-6">
          <h1 className="text-4xl md:text-6xl font-cormorant text-white">
            {goodLabel("mentions_legales")}
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
                1. Éditeur du site
              </h2>
              <p className="mb-4">Le présent site est édité par :</p>
              <div className="bg-white/5 border border-white/5 p-6 rounded-sm space-y-2 mb-6">
                <p className="font-bold text-white text-lg">
                  EL PADRE BISTRÓ BAR
                </p>
                <p className="text-sm text-gray-400">
                  Établissement exploité par :
                </p>
                <p className="font-semibold text-white">EA 11</p>
                <p>Société par Actions Simplifiée (SAS)</p>
                <p>
                  Adresse de l'établissement : 29 Cours de la République, 11100
                  Narbonne – France
                </p>
                <p>
                  Téléphone :{" "}
                  <a
                    href="tel:+33468324011"
                    className="text-padre-primary hover:underline"
                  >
                    04 68 32 40 11
                  </a>
                </p>
                <p>
                  Adresse e-mail :{" "}
                  <a
                    href="mailto:elpadre.aude@gmail.com"
                    className="text-padre-primary hover:underline"
                  >
                    elpadre.aude@gmail.com
                  </a>
                </p>
                <p>SIRET : 949 668 586 00025</p>
                <p>Code APE : 56.10A – Restauration traditionnelle</p>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-cormorant text-white border-b border-white/10 pb-3 mb-6">
                2. Directeur de publication
              </h2>
              <p className="font-semibold text-white">
                Monsieur Abderezak MENAOUM
              </p>
              <p>Président de la société EA 11</p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-cormorant text-white border-b border-white/10 pb-3 mb-6">
                3. Hébergement
              </h2>
              <p className="mb-2">Le site est hébergé par :</p>
              <p className="font-bold text-white">
                HOSTINGER INTERNATIONAL LTD
              </p>
              <p>61 Lordou Vironos Street</p>
              <p>6023 Larnaca</p>
              <p>Chypre</p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-cormorant text-white border-b border-white/10 pb-3 mb-6">
                4. Propriété intellectuelle
              </h2>
              <p className="mb-4">
                L'ensemble des contenus présents sur ce site, notamment les
                textes, photographies, vidéos, logos, éléments graphiques,
                menus, illustrations et contenus rédactionnels, est protégé par
                les lois françaises et internationales relatives à la propriété
                intellectuelle.
              </p>
              <p>
                Toute reproduction, représentation, diffusion, adaptation ou
                exploitation, totale ou partielle, du contenu du site sans
                autorisation écrite préalable est interdite.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-cormorant text-white border-b border-white/10 pb-3 mb-6">
                5. Responsabilité
              </h2>
              <p className="mb-4">
                EL PADRE BISTRÓ BAR met tout en œuvre pour fournir des
                informations fiables et régulièrement mises à jour.
              </p>
              <p className="mb-4">
                Toutefois, les informations diffusées sur le site sont fournies
                à titre indicatif et peuvent être modifiées sans préavis.
              </p>
              <p>
                L'établissement ne saurait être tenu responsable des erreurs,
                omissions ou indisponibilités temporaires du site.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-2xl font-cormorant text-white border-b border-white/10 pb-3 mb-6">
                6. Liens externes
              </h2>
              <p className="mb-4">
                Le site peut contenir des liens vers des sites tiers.
              </p>
              <p>
                EL PADRE BISTRÓ BAR ne peut être tenu responsable du contenu, de
                la disponibilité ou des pratiques de confidentialité de ces
                sites externes.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-2xl font-cormorant text-white border-b border-white/10 pb-3 mb-6">
                7. Droit applicable
              </h2>
              <p className="mb-4">
                Le présent site est régi par le droit français.
              </p>
              <p>
                Tout litige relatif à son utilisation relève de la compétence
                des juridictions françaises.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-2xl font-cormorant text-white border-b border-white/10 pb-3 mb-6">
                8. Contact
              </h2>
              <p className="mb-4">Pour toute question concernant le site :</p>
              <div className="bg-white/5 border border-white/5 p-6 rounded-sm space-y-1">
                <p className="font-bold text-white">EL PADRE BISTRÓ BAR</p>
                <p>29 Cours de la République</p>
                <p>11100 Narbonne</p>
                <p>Téléphone : 04 68 32 40 11</p>
                <p>Email : elpadre.aude@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
