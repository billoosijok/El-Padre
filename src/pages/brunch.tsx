import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";

import DefaultLayout from "@/layouts/default";
import { MenuSections } from "@/layouts/menu";
import { SEO } from "@/components/SEO";
import { CoffeeIcon, ChevronDownIcon } from "@/components/icons";
import { useI18n } from "@/hooks/useTranslations";
import { useReservation } from "@/context/ReservationContext";

const brunchSections = [
  {
    name: "Brunch",
    icon: <CoffeeIcon />,
    menu: "brunch",
    flatten: true,
  },
] as const;

const signatureDishes = [
  {
    key: "brunch_dish_full_english",
    image: "/assets/brunch/opt/gallery-full-english.jpg",
  },
  {
    key: "brunch_dish_avocado_toast",
    image: "/assets/brunch/opt/gallery-avocado.jpg",
  },
  {
    key: "brunch_dish_french_toast",
    image: "/assets/brunch/opt/gallery-french-toast.jpg",
  },
  {
    key: "brunch_dish_omelette",
    image: "/assets/brunch/opt/gallery-omelette.jpg",
  },
] as const;

const scrollToMenu = () => {
  const el = document.getElementById("menu");
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

export const BrunchLanding = () => {
  const { goodLabel, getLocalizedPath } = useI18n();
  const { openReservation } = useReservation();
  const menuRef = useRef<HTMLDivElement>(null);
  const [showJump, setShowJump] = useState(true);

  // Show the floating "jump to menu" pill only while the menu is still below
  // the viewport. Hide it once the menu is reached or scrolled past.
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) =>
        setShowJump(!entry.isIntersecting && entry.boundingClientRect.top > 0),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <DefaultLayout homeTreatment theme="light">
      <SEO
        breadcrumbs={[
          { name: goodLabel("breadcrumbs_home"), item: "/" },
          { name: goodLabel("breadcrumbs_brunch"), item: "/brunch" },
        ]}
        description={goodLabel("seo_brunch_description")}
        title={goodLabel("seo_brunch_title")}
      />

      {/* §1 — Hero */}
      <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
        <img
          src="/assets/brunch/opt/hero.jpg"
          alt={goodLabel("seo_brunch_title")}
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 text-center px-4 flex flex-col items-center gap-6">
          <span className="text-white font-bold text-xs md:text-sm uppercase tracking-[0.3em]">
            El Padre · Narbonne
          </span>
          <h1 className="text-6xl md:text-8xl font-cormorant text-white uppercase tracking-wider font-bold">
            {goodLabel("brunch")}
          </h1>
          <p className="text-xl md:text-2xl font-cormorant text-gray-200 italic max-w-xl">
            {goodLabel("brunch_hero_tagline")}
          </p>
          <span className="mt-1 inline-block text-white uppercase tracking-[0.2em] text-xs md:text-sm font-bold px-5 py-2">
            {goodLabel("brunch_hours_badge")}
          </span>
          <Button
            className="btn-ghost mt-4 px-10 py-6 text-lg hover:scale-105"
            onPress={openReservation}
            variant="bordered"
          >
            {goodLabel("reserve")}
          </Button>
        </div>

        {/* Scroll cue */}
        <button
          onClick={scrollToMenu}
          aria-label={goodLabel("brunch_scroll_cue")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/80 hover:text-padre-primary transition-colors"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">
            {goodLabel("brunch_scroll_cue")}
          </span>
          <ChevronDownIcon className="animate-bounce" size={22} />
        </button>
      </section>

      {/* §2 — Intro / positioning */}
      <section className="py-24 md:py-32 px-6 bg-[#faf7f2]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative order-2 md:order-1"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-2xl">
              <img
                src="/assets/brunch/opt/intro.jpg"
                alt={goodLabel("brunch_intro_title")}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 hidden md:block border-2 border-padre-primary px-6 py-4 bg-[#faf7f2]">
              <span className="font-cormorant text-2xl text-padre-primary uppercase tracking-widest">
                8h – 11h30
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="order-1 md:order-2 text-center md:text-left"
          >
            <h3 className="text-padre-primary text-sm uppercase tracking-[0.2em] mb-5 font-bold">
              {goodLabel("brunch_intro_kicker")}
            </h3>
            <h2 className="text-5xl md:text-6xl font-cormorant text-zinc-900 mb-8 leading-none">
              {goodLabel("brunch_intro_title")}
            </h2>
            <p className="text-zinc-600 text-lg leading-relaxed font-lato mb-10">
              {goodLabel("brunch_intro_text")}
            </p>
            <Button
              onPress={scrollToMenu}
              className="rounded-none bg-transparent border border-zinc-800 text-zinc-800 font-bold px-8 py-4 uppercase tracking-widest text-xs hover:bg-zinc-800 hover:text-white transition-colors"
              variant="bordered"
            >
              {goodLabel("brunch_jump_to_menu")}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* §3 — Signature dishes (decorative gallery) */}
      <section className="py-24 md:py-32 px-6 bg-[#f5f1e8]">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h3 className="text-padre-primary text-sm uppercase tracking-[0.2em] mb-4 font-bold">
            {goodLabel("brunch_signatures_kicker")}
          </h3>
          <h2 className="text-5xl md:text-6xl font-cormorant text-zinc-900">
            {goodLabel("brunch_signatures_title")}
          </h2>
          <div className="w-24 h-[1px] bg-padre-primary mx-auto mt-8" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {signatureDishes.map((dish) => (
            <div
              key={dish.key}
              className="group relative h-[320px] md:h-[440px] overflow-hidden rounded-sm"
            >
              <img
                src={dish.image}
                alt={goodLabel(dish.key)}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 bg-gradient-to-t from-black/85 to-transparent pt-24">
                <h3 className="text-xl md:text-2xl font-cormorant text-white leading-tight">
                  {goodLabel(dish.key)}
                </h3>
                <div className="h-[1px] w-0 group-hover:w-full bg-padre-primary transition-all duration-500 mt-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* §4 — The Brunch Menu */}
      <section id="menu" ref={menuRef} className="pt-20 md:pt-28 bg-[#faf7f2]">
        <div className="text-center px-6 mb-4">
          <h3 className="text-padre-primary text-sm uppercase tracking-[0.2em] mb-4 font-bold">
            {goodLabel("brunch_menu_kicker")}
          </h3>
          <h2 className="text-5xl md:text-6xl font-cormorant text-zinc-900">
            {goodLabel("brunch_menu_title")}
          </h2>
          <div className="w-24 h-[1px] bg-padre-primary mx-auto mt-8" />
        </div>
        <MenuSections menu={brunchSections as any} isLight />
      </section>

      {/* §5 — Practical + reservation CTA */}
      <section className="py-28 md:py-36 px-6 bg-[#f5f1e8] border-t border-black/5 text-center flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-cormorant text-zinc-900 mb-6 max-w-3xl leading-tight">
          {goodLabel("brunch_cta_title")}
        </h2>
        <p className="text-zinc-600 text-lg font-lato mb-10 max-w-xl">
          {goodLabel("brunch_cta_subtitle")}
        </p>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <Button
            className="rounded-none bg-zinc-900 text-white font-bold px-12 py-6 uppercase tracking-widest text-sm hover:bg-padre-primary hover:text-black transition-colors"
            onPress={openReservation}
          >
            {goodLabel("reserve")}
          </Button>
          <div className="text-lg text-zinc-500 font-lato">
            {goodLabel("or_call")}{" "}
            <Link
              to={getLocalizedPath("/contact")}
              className="text-padre-primary hover:text-zinc-900 transition-colors block md:inline text-xl mt-2 md:mt-0 font-cormorant"
            >
              04 68 32 40 11
            </Link>
          </div>
        </div>
      </section>

      {/* Floating "jump to menu" pill — always available, fades once in the menu */}
      <button
        onClick={scrollToMenu}
        aria-label={goodLabel("brunch_jump_to_menu")}
        className={`fixed bottom-6 left-6 z-[59] flex items-center gap-2 rounded-full bg-zinc-900/90 text-white font-bold uppercase tracking-widest text-[10px] sm:text-xs py-3.5 px-5 shadow-2xl backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-padre-primary hover:text-black ${
          showJump
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <CoffeeIcon size={16} />
        {goodLabel("brunch_jump_to_menu")}
        <ChevronDownIcon size={14} />
      </button>
    </DefaultLayout>
  );
};
