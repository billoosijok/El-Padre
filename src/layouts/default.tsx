import { ReactNode, useState, useEffect, Fragment } from "react";
import { Button } from "@heroui/button";

import { AnimatePresence, motion } from "framer-motion";

import { useReservation } from "@/context/ReservationContext";

import { useI18n } from "@/hooks/useTranslations";
import { Logo } from "@/components/Logo";
import {
  MenuIcon,
  CloseIcon,
  ChevronDownIcon,
  InstagramIcon,
  FacebookIcon,
  TiktokIcon,
} from "@/components/icons";
import { LanguageSelectorDropdown } from "@/components/LanguageSelector";
import { MenuDropdown } from "@/components/MenuDropdown";
import { EventBanner } from "@/components/EventBanner";

export default function DefaultLayout({
  children,
  homeTreatment,
  theme = "dark",
}: {
  children: React.ReactNode;
  title?: ReactNode; // Kept for compatibility but might not be used in new design
  contentOffset?: string; // Kept for compatibility
  homeTreatment?: boolean;
  theme?: "light" | "dark";
}) {
  const { goodLabel, getLocalizedPath } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSubMenuOpen, setIsMobileSubMenuOpen] = useState(false);
  const { openReservation } = useReservation();
  const [bannerHeight, setBannerHeight] = useState(0);
  const isLight = theme === "light";
  const isHeaderLight =
    isLight && (isScrolled || !homeTreatment || isMobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <div
      className={`relative min-h-screen font-lato ${isLight ? "bg-[#faf7f2] text-zinc-800" : "bg-padre-background text-white"}`}
    >
      <EventBanner onHeightChange={setBannerHeight} />

      {/* Header */}
      <header
        style={{ top: `${bannerHeight}px` }}
        className={`fixed left-0 right-0 z-[60] transition-all duration-300 ${
          isScrolled || !homeTreatment || isMobileMenuOpen
            ? isLight
              ? "bg-white/95 shadow-md py-4 border-b border-black/5 text-zinc-800"
              : "bg-black/90 shadow-lg py-4 text-white"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Left: Logo */}
          <div
            className={`flex-shrink-0 z-[61] transition-opacity duration-300 ${!homeTreatment || isScrolled || isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <a href={getLocalizedPath("/")}>
              <Logo animation="simple" size={50} color="#c59d5f" />
            </a>
          </div>

          {/* Center: Navigation (Hidden on mobile) */}
          <nav
            className={`hidden md:flex gap-10 items-center uppercase tracking-[0.2em] text-xs font-bold font-lato transition-colors duration-300 ${isHeaderLight ? "text-zinc-700" : "text-white"}`}
          >
            <a
              href={getLocalizedPath("/")}
              className="hover:text-padre-primary transition-colors"
            >
              {goodLabel("home")}
            </a>

            <MenuDropdown theme={isHeaderLight ? "light" : "dark"} />

            <a
              href={getLocalizedPath("/brunch")}
              className="hover:text-padre-primary transition-colors flex items-center gap-1.5"
            >
              <span>{goodLabel("brunch")}</span>
              <span className="bg-red-600 text-white text-[8px] font-sans px-1.5 py-0.5 rounded-sm font-black uppercase tracking-wider relative flex items-center justify-center shadow-sm">
                NEW
                <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-600"></span>
                </span>
              </span>
            </a>

            <a
              href={getLocalizedPath("/privatisation")}
              className="hover:text-padre-primary transition-colors"
            >
              {goodLabel("privatisation")}
            </a>

            <a
              href={getLocalizedPath("/contact")}
              className="hover:text-padre-primary transition-colors"
            >
              {goodLabel("breadcrumbs_contact")}
            </a>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-6 z-[61]">
            <div data-nosnippet>
              <LanguageSelectorDropdown
                theme={isHeaderLight ? "light" : "dark"}
              />
            </div>
            <Button
              className={`hidden md:flex rounded-none bg-transparent border font-bold px-6 py-2 uppercase tracking-widest transition-colors text-xs ${
                isHeaderLight
                  ? "border-zinc-800 text-zinc-800 hover:bg-zinc-800 hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-black"
              }`}
              onPress={openReservation}
              variant="solid"
            >
              {goodLabel("reserve")}
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              className={`md:hidden focus:outline-none transition-colors ${isHeaderLight ? "text-zinc-800" : "text-white"}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <CloseIcon size={24} />
              ) : (
                <MenuIcon size={24} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-[55] flex flex-col items-center justify-center space-y-8 md:hidden overflow-y-auto py-20 ${
              isLight ? "bg-[#faf7f2]" : "bg-black"
            }`}
          >
            <nav
              className={`flex flex-col items-center gap-6 uppercase tracking-[0.2em] text-lg font-bold font-lato w-full ${
                isLight ? "text-zinc-800" : "text-white"
              }`}
            >
              <a
                href={getLocalizedPath("/")}
                className="hover:text-padre-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {goodLabel("home")}
              </a>

              {/* Mobile Menu Group */}
              <div className="flex flex-col items-center w-full">
                <button
                  onClick={() => setIsMobileSubMenuOpen(!isMobileSubMenuOpen)}
                  className="flex items-center gap-2 hover:text-padre-primary transition-colors uppercase tracking-[0.2em] font-bold"
                >
                  {goodLabel("menu")}
                  <ChevronDownIcon
                    className={`transition-transform duration-300 ${isMobileSubMenuOpen ? "rotate-180" : ""}`}
                    size={20}
                  />
                </button>

                <AnimatePresence>
                  {isMobileSubMenuOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden w-full"
                    >
                      <div
                        className={`flex flex-col items-center gap-4 py-4 w-full mt-4 ${
                          isLight ? "bg-black/5" : "bg-white/5"
                        }`}
                      >
                        <a
                          href={getLocalizedPath("/menu")}
                          className="hover:text-padre-primary transition-colors text-base"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {goodLabel("menu_tapas")}
                        </a>
                        <a
                          href={getLocalizedPath("/brunch")}
                          className="hover:text-padre-primary transition-colors text-base"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {goodLabel("brunch")}
                        </a>
                        <a
                          href={getLocalizedPath("/boissons#alcool")}
                          className="hover:text-padre-primary transition-colors text-base"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {goodLabel("signature_cocktails")}
                        </a>
                        <a
                          href={getLocalizedPath("/boissons#vin")}
                          className="hover:text-padre-primary transition-colors text-base"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {goodLabel("vin")}
                        </a>
                        <a
                          href={getLocalizedPath("/boissons")}
                          className="hover:text-padre-primary transition-colors text-base"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {goodLabel("boissons")}
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href={getLocalizedPath("/brunch")}
                className="hover:text-padre-primary transition-colors flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>{goodLabel("brunch")}</span>
                <span className="bg-red-600 text-white text-[10px] font-sans px-2 py-0.5 rounded-sm font-black uppercase tracking-wider relative flex items-center justify-center shadow-sm">
                  NEW
                  <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-600"></span>
                  </span>
                </span>
              </a>

              <a
                href={getLocalizedPath("/privatisation")}
                className="hover:text-padre-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {goodLabel("privatisation")}
              </a>

              <a
                href={getLocalizedPath("/contact")}
                className="hover:text-padre-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {goodLabel("breadcrumbs_contact")}
              </a>
            </nav>

            <div className="flex flex-col items-center gap-6 mt-8">
              <Button
                className={`rounded-none bg-transparent border font-bold px-8 py-3 uppercase tracking-widest transition-colors text-sm ${
                  isLight
                    ? "border-zinc-800 text-zinc-800 hover:bg-zinc-800 hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-black"
                }`}
                onPress={() => {
                  setIsMobileMenuOpen(false);
                  openReservation();
                }}
                variant="solid"
              >
                {goodLabel("reserve")}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main
        style={{ paddingTop: `${bannerHeight}px` }}
        className="w-full transition-all duration-300"
      >
        {children}
      </main>

      {/* Footer */}
      <footer
        data-nosnippet
        className={`w-full py-20 mt-0 border-t ${
          isLight
            ? "bg-[#f5f1e8] text-zinc-600 border-black/5"
            : "bg-[#111111] text-gray-400 border-white/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center sm:text-left">
          {/* Column 1: Brand & SEO */}
          <div className="flex flex-col items-center sm:items-start gap-6">
            <Logo size={80} color="#c59d5f" />
            <div className="flex flex-col gap-2">
              <p className="text-xs text-padre-primary font-lato font-bold tracking-widest uppercase">
                {goodLabel("footer_brand_desc")}
              </p>
              <p
                className={`text-sm font-lato mt-2 leading-relaxed ${isLight ? "text-zinc-500" : "text-gray-400"}`}
              >
                {goodLabel("footer_seo_text")}
              </p>
            </div>

            <div className="flex items-center gap-6 mt-2">
              <a
                href="https://www.instagram.com/el_padre.11/"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-300 ${isLight ? "text-zinc-800 hover:text-padre-primary" : "text-white hover:text-padre-primary"}`}
                aria-label="Instagram"
              >
                <InstagramIcon size={22} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61568366311415"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-300 ${isLight ? "text-zinc-800 hover:text-padre-primary" : "text-white hover:text-padre-primary"}`}
                aria-label="Facebook"
              >
                <FacebookIcon size={22} />
              </a>
              <a
                href="https://www.tiktok.com/@el_padre.11"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-300 ${isLight ? "text-zinc-800 hover:text-padre-primary" : "text-white hover:text-padre-primary"}`}
                aria-label="TikTok"
              >
                <TiktokIcon size={22} />
              </a>
            </div>
          </div>

          {/* Column 2: Discover / Découvrir */}
          <div className="flex flex-col items-center sm:items-start gap-6">
            <h3 className="text-xl text-padre-primary font-cormorant font-bold uppercase tracking-wider">
              {goodLabel("footer_decouvrir_title")}
            </h3>
            <ul
              className={`flex flex-col gap-3 font-lato text-sm ${isLight ? "text-zinc-600" : "text-gray-400"}`}
            >
              <li>
                <a
                  href={getLocalizedPath("/")}
                  className="hover:text-padre-primary transition-colors"
                >
                  {goodLabel("home")}
                </a>
              </li>
              <li>
                <a
                  href={getLocalizedPath("/brunch")}
                  className="hover:text-padre-primary transition-colors"
                >
                  {goodLabel("brunch")}
                </a>
              </li>
              <li>
                <a
                  href={getLocalizedPath("/menu")}
                  className="hover:text-padre-primary transition-colors"
                >
                  {goodLabel("menu_tapas")}
                </a>
              </li>
              <li>
                <a
                  href={getLocalizedPath("/boissons#alcool")}
                  className="hover:text-padre-primary transition-colors"
                >
                  {goodLabel("signature_cocktails")}
                </a>
              </li>
              <li>
                <a
                  href={getLocalizedPath("/privatisation")}
                  className="hover:text-padre-primary transition-colors"
                >
                  {goodLabel("privatisation")}
                </a>
              </li>
              <li>
                <a
                  href={getLocalizedPath("/contact")}
                  className="hover:text-padre-primary transition-colors"
                >
                  {goodLabel("breadcrumbs_contact")}
                </a>
              </li>
              <li>
                <a
                  href={getLocalizedPath("/reservation")}
                  className="hover:text-padre-primary transition-colors"
                >
                  {goodLabel("reserve")}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Univers / Nos Univers */}
          <div className="flex flex-col items-center sm:items-start gap-6">
            <h3 className="text-xl text-padre-primary font-cormorant font-bold uppercase tracking-wider">
              {goodLabel("footer_univers_title")}
            </h3>
            <ul
              className={`flex flex-col gap-3 font-lato text-sm ${isLight ? "text-zinc-600" : "text-gray-400"}`}
            >
              <li>
                <a href={getLocalizedPath("/brunch")} className="hover:text-padre-primary transition-colors">
                  {goodLabel("univers_brunch")}
                </a>
              </li>
              <li>
                <a href={getLocalizedPath("/menu")} className="hover:text-padre-primary transition-colors">
                  {goodLabel("univers_planches")}
                </a>
              </li>
              <li>
                <a href={getLocalizedPath("/boissons#alcool")} className="hover:text-padre-primary transition-colors">
                  {goodLabel("univers_cocktails")}
                </a>
              </li>
              <li>
                <a href={getLocalizedPath("/boissons#vin")} className="hover:text-padre-primary transition-colors">
                  {goodLabel("univers_vins")}
                </a>
              </li>
              <li>
                <a href={getLocalizedPath("/privatisation")} className="hover:text-padre-primary transition-colors">
                  {goodLabel("univers_repas_affaires")}
                </a>
              </li>
              <li>
                <a href={getLocalizedPath("/privatisation")} className="hover:text-padre-primary transition-colors">
                  {goodLabel("univers_afterwork")}
                </a>
              </li>
              <li>
                <a href={getLocalizedPath("/privatisation")} className="hover:text-padre-primary transition-colors">
                  {goodLabel("univers_evenements")}
                </a>
              </li>
              <li>
                <a href={getLocalizedPath("/privatisation")} className="hover:text-padre-primary transition-colors">
                  {goodLabel("univers_privatisation")}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Horaires */}
          <div className="flex flex-col items-center sm:items-start gap-8 w-full">
            {/* Contact details */}
            <div className="flex flex-col items-center sm:items-start gap-2 w-full">
              <h3 className="text-xl text-padre-primary font-cormorant font-bold uppercase tracking-wider">
                {goodLabel("contact")}
              </h3>
              <p
                className={`font-lato text-sm leading-relaxed text-center sm:text-left ${isLight ? "text-zinc-600" : "text-gray-400"}`}
              >
                <a
                  href="https://maps.app.goo.gl/upvp6fR7qbgHyYpP9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-padre-primary transition-colors"
                >
                  {goodLabel("address_line_1")}
                  <br />
                  {goodLabel("address_line_2")}
                </a>
              </p>
              <p
                className={`text-lg font-cormorant mt-1 ${isLight ? "text-zinc-800" : "text-white"}`}
              >
                <a
                  href="tel:+33468324011"
                  className="hover:text-padre-primary transition-colors"
                >
                  04 68 32 40 11
                </a>
              </p>
              <p
                className={`font-lato text-sm ${isLight ? "text-zinc-600" : "text-gray-400"}`}
              >
                <a
                  href="mailto:elpadre.aude@gmail.com"
                  className="hover:text-padre-primary transition-colors"
                >
                  elpadre.aude@gmail.com
                </a>
              </p>
            </div>

            {/* Hours list */}
            <div
              className={`flex flex-col items-center sm:items-start gap-2 w-full border-t pt-6 ${isLight ? "border-black/5" : "border-white/5"}`}
            >
              <h3 className="text-xl text-padre-primary font-cormorant font-bold uppercase tracking-wider mb-1">
                {goodLabel("nos_horaires")}
              </h3>
              <p
                className={`uppercase tracking-wider font-bold text-xs ${isLight ? "text-zinc-800" : "text-white"}`}
              >
                {goodLabel("ouvert j7/7")}
              </p>

              <div
                className={`grid grid-cols-[auto_auto_auto] gap-x-3 gap-y-1.5 text-xs w-fit ${isLight ? "text-zinc-700" : "text-gray-400"}`}
              >
                {[
                  "footer_hours_lundi_jeudi",
                  "footer_hours_vendredi",
                  "footer_hours_weekend",
                  "footer_hours_brunch",
                ].map((key) => {
                  const label = goodLabel(
                    key as Parameters<typeof goodLabel>[0],
                  );
                  const splitIndex = label.indexOf(":");
                  const hasColon = splitIndex !== -1;
                  const left = hasColon
                    ? label.substring(0, splitIndex).trim()
                    : label;
                  const right = hasColon
                    ? label.substring(splitIndex + 1).trim()
                    : "";
                  const isBrunch = key === "footer_hours_brunch";
                  const textClass = isBrunch ? "opacity-70 mt-0.5" : "";

                  return (
                    <Fragment key={key}>
                      <span className={`text-right font-medium ${textClass}`}>
                        {left}
                      </span>
                      <span className={`text-center opacity-50 ${textClass}`}>
                        {hasColon ? ":" : ""}
                      </span>
                      <span className={`text-left ${textClass}`}>{right}</span>
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Sub-footer Links */}
        <div
          className={`max-w-7xl mx-auto px-6 mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6 text-sm ${
            isLight
              ? "border-black/5 text-zinc-500"
              : "border-white/5 text-gray-500"
          }`}
        >
          <p>
            © {new Date().getFullYear()} El Padre Bistró Bar — Tous droits
            réservés.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs uppercase tracking-wider font-semibold">
            <a
              href={getLocalizedPath("/mentions-legales")}
              className="hover:text-padre-primary transition-colors"
            >
              {goodLabel("mentions_legales")}
            </a>
            <span className="opacity-40">•</span>
            <a
              href={getLocalizedPath("/politique-de-confidentialite")}
              className="hover:text-padre-primary transition-colors"
            >
              {goodLabel("politique_confidentialite")}
            </a>
            <span className="opacity-40">•</span>
            <a
              href={getLocalizedPath("/politique-de-cookies")}
              className="hover:text-padre-primary transition-colors"
            >
              {goodLabel("politique_cookies")}
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Reservation Button */}
      <div className="fixed bottom-6 right-6 z-[60] md:hidden">
        <Button
          onClick={openReservation}
          className="rounded-full bg-[#c59d5f] text-black font-bold uppercase tracking-widest text-[10px] sm:text-xs py-5 px-6 shadow-2xl flex items-center gap-2 hover:bg-white hover:scale-105 transition-all duration-300 border border-black/10"
        >
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          {goodLabel("reserve")}
        </Button>
      </div>
    </div>
  );
}
