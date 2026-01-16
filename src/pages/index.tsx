import { Link } from "react-router-dom";
import { Button } from "@heroui/button";
import DefaultLayout from "@/layouts/default";
import { useI18n } from "@/hooks/useTranslations";
import { Logo } from "@/components/Logo";
import { SEO } from "@/components/SEO";
import { useReservation } from "@/context/ReservationContext";
import { useEffect } from "react";

const showSplash = !sessionStorage.getItem('hasSeenSplash');

export default function IndexPage() {
  const { goodLabel, getLocalizedPath } = useI18n();
  const { openReservation } = useReservation();

  useEffect(() => {
    if (showSplash) {
      sessionStorage.setItem('hasSeenSplash', 'true');
    }
  }, [showSplash]);

  return (
    <>
      <div className={" duration-700"}>
        <DefaultLayout homeTreatment>
          <SEO
            title={goodLabel("seo_home_title")}
            description={goodLabel("seo_home_description")}
          />
          {/* Hero Section */}
          <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
            <img
              src="/assets/bar-photo.webp"
              alt={goodLabel("home_hero_alt")}
              className="absolute inset-0 w-full h-full object-cover -z-10"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-black/70" /> {/* Darker Overlay */}
            <div className="relative z-10 text-center px-4 flex flex-col items-center gap-8">
              <Logo animation={showSplash ? "full" : "simple"} size={140} color="#c59d5f" />

              <div className="flex items-center gap-4 w-full justify-center">
                <div className="h-[1px] w-12 md:w-24 bg-padre-primary" />
                <h2 className="text-white text-sm md:text-lg tracking-[0.3em] uppercase font-bold text-padre-primary">
                  {goodLabel("premium_authentic")}
                </h2>
                <div className="h-[1px] w-12 md:w-24 bg-padre-primary" />
              </div>



              <Button
                className="btn-ghost mt-8 px-10 py-6 text-lg hover:scale-105"
                onPress={openReservation}
                variant="bordered"
              >
                {goodLabel("reserve")}
              </Button>
            </div>
          </section>

          {/* Featured Menu Section */}
          <section className="py-32 bg-[#0a0a0a] px-6">
            <div className="max-w-7xl mx-auto text-center mb-20">
              <h3 className="text-padre-primary text-sm uppercase tracking-[0.2em] mb-4 font-bold">{goodLabel("discover")}</h3>
              <h2 className="text-5xl md:text-6xl font-cormorant text-white">{goodLabel("featured_delicacies")}</h2>
              <div className="w-24 h-[1px] bg-padre-primary mx-auto mt-8" />
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {/* Tapas */}
              <Link to={getLocalizedPath("/menu#tapas")} className="group relative h-[500px] overflow-hidden block">
                <img
                  src="/tapas.jpg"
                  alt="Tapas"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent pt-32">
                  <h3 className="text-4xl font-cormorant text-white mb-2 group-hover:text-padre-primary transition-colors">{goodLabel("tapas")}</h3>
                  <div className="h-[1px] w-0 group-hover:w-full bg-padre-primary transition-all duration-500" />
                </div>
              </Link>

              {/* Plats */}
              <Link to={getLocalizedPath("/menu#plats-main")} className="group relative h-[500px] overflow-hidden block">
                <img
                  src="/plats.jpg"
                  alt="Plats"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent pt-32">
                  <h3 className="text-4xl font-cormorant text-white mb-2 group-hover:text-padre-primary transition-colors">{goodLabel("plats")}</h3>
                  <div className="h-[1px] w-0 group-hover:w-full bg-padre-primary transition-all duration-500" />
                </div>
              </Link>

              {/* Cocktails Signatures (was Boissons) */}
              <Link to={getLocalizedPath("/boissons")} className="group relative h-[500px] overflow-hidden block">
                <img
                  src="/cocktails.jpg"
                  alt="Cocktails Signatures"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent pt-32">
                  <h3 className="text-4xl font-cormorant text-white mb-2 group-hover:text-padre-primary transition-colors">{goodLabel("signature_cocktails")}</h3>
                  <div className="h-[1px] w-0 group-hover:w-full bg-padre-primary transition-all duration-500" />
                </div>
              </Link>

              {/* Vin & Champagne */}
              <Link to={getLocalizedPath("/boissons#vin-les-rouges")} className="group relative h-[500px] overflow-hidden block">
                <img
                  src="/assets/champagne.JPG"
                  alt="Vin & Champagne"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent pt-32">
                  <h3 className="text-4xl font-cormorant text-white mb-2 group-hover:text-padre-primary transition-colors">{goodLabel("vin")}</h3>
                  <div className="h-[1px] w-0 group-hover:w-full bg-padre-primary transition-all duration-500" />
                </div>
              </Link>
            </div>
          </section>

          {/* About Section */}
          <section className="py-32 bg-padre-background px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div className="order-2 md:order-1 relative group">
                <div className="aspect-[4/5] relative rounded-sm shadow-2xl overflow-hidden group-hover:grayscale-0 grayscale transition-all duration-700">
                  <img
                    src="/assets/team.jpg"
                    alt={goodLabel("team_alt")}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 border-2 border-padre-primary p-2 hidden md:block">
                  <div className="w-48 h-48 bg-[#8B0000] flex flex-col items-center justify-center text-center p-4">
                    <img src="/assets/award.svg" alt={goodLabel("award_alt")} className="w-full h-full object-contain" width={192} height={192} loading="lazy" />
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2 text-center md:text-left pl-0 md:pl-10 border-l-0 md:border-l-[1px] border-padre-primary/30">
                <h3 className="text-padre-primary text-sm uppercase tracking-[0.2em] mb-6 font-bold flex items-center gap-4 justify-center md:justify-start">
                  <span className="w-8 h-[1px] bg-padre-primary inline-block md:hidden"></span>
                  {goodLabel("our_story")}
                  <span className="w-8 h-[1px] bg-padre-primary inline-block md:hidden"></span>
                </h3>
                <h2 className="text-5xl md:text-6xl font-cormorant text-white mb-8 leading-none">
                  {goodLabel("authentic_passionate_title")}
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-10 font-lato">
                  {goodLabel("story_text")}
                </p>
                <Button
                  as={Link}
                  to={getLocalizedPath("/menu")}
                  className="btn-ghost px-8 py-4 text-sm"
                  variant="bordered"
                >
                  {goodLabel("discover_more")}
                </Button>
              </div>
            </div>
          </section>


          {/* Reviews Section */}
          <section className="py-32 bg-padre-background px-6 relative">
            <img
              src="/bg.png"
              alt={goodLabel("background_pattern_alt")}
              className="absolute top-0 left-0 w-full h-full object-cover opacity-5"
              loading="lazy"
            />
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <h3 className="text-padre-primary text-sm uppercase tracking-[0.2em] mb-6 font-bold">{goodLabel("loved_by_many")}</h3>
              <h2 className="text-4xl md:text-5xl font-cormorant text-white mb-16 leading-tight italic">
                "{goodLabel("review_1")}"
              </h2>
              <div className="flex justify-center gap-2">
                <div className="w-3 h-3 rounded-full bg-padre-primary" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="py-32 bg-[#1a1a1a] relative overflow-hidden flex flex-col items-center justify-center text-center px-6 border-t border-white/5">
            <h2 className="text-5xl md:text-7xl font-cormorant text-white mb-10 max-w-4xl leading-tight">
              {goodLabel("waiting_to_serve")}
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <Button
                className="btn-ghost px-12 py-6 text-lg"
                onPress={openReservation}
                variant="bordered"
              >
                {goodLabel("reserve")}
              </Button>
              <div className="text-lg text-gray-400 font-lato">
                {goodLabel("or_call")} <span className="text-white block md:inline text-xl mt-2 md:mt-0 font-cormorant text-padre-primary">04 68 32 40 11</span>
              </div>
            </div>
          </section>
        </DefaultLayout>
      </div>
    </>
  );
}
