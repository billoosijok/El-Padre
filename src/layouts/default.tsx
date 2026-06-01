import { ReactNode, useState, useEffect, Fragment } from "react";
import { Button } from "@heroui/button";

import { AnimatePresence, motion } from "framer-motion";

import { useReservation } from "@/context/ReservationContext";

import { useI18n } from "@/hooks/useTranslations";
import { Logo } from "@/components/Logo";
import { MenuIcon, CloseIcon, ChevronDownIcon, InstagramIcon, FacebookIcon, TiktokIcon } from "@/components/icons";
import { LanguageSelectorDropdown } from "@/components/LanguageSelector";
import { MenuDropdown } from "@/components/MenuDropdown";

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
  const isLight = theme === "light";
  const isHeaderLight = isLight && (isScrolled || !homeTreatment || isMobileMenuOpen);

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
    <div className={`relative min-h-screen font-lato ${isLight ? "bg-[#faf7f2] text-zinc-800" : "bg-padre-background text-white"}`}>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${isScrolled || !homeTreatment || isMobileMenuOpen
          ? isLight
            ? "bg-white/95 shadow-md py-4 border-b border-black/5 text-zinc-800"
            : "bg-black/90 shadow-lg py-4 text-white"
          : "bg-transparent py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Left: Logo */}
          <div className={`flex-shrink-0 z-[61] transition-opacity duration-300 ${(!homeTreatment || isScrolled || isMobileMenuOpen) ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <a href={getLocalizedPath("/")}>
              <Logo animation="simple" size={50} color="#c59d5f" />
            </a>
          </div>

          {/* Center: Navigation (Hidden on mobile) */}
          <nav className={`hidden md:flex gap-10 items-center uppercase tracking-[0.2em] text-xs font-bold font-lato transition-colors duration-300 ${isHeaderLight ? "text-zinc-700" : "text-white"}`}>
            <a href={getLocalizedPath("/")} className="hover:text-padre-primary transition-colors">
              {goodLabel("home")}
            </a>

            <MenuDropdown theme={isHeaderLight ? "light" : "dark"} />

            <a href={getLocalizedPath("/brunch")} className="hover:text-padre-primary transition-colors flex items-center gap-1.5">
              <span>{goodLabel("brunch")}</span>
              <span className="bg-red-600 text-white text-[8px] font-sans px-1.5 py-0.5 rounded-sm font-black uppercase tracking-wider relative flex items-center justify-center shadow-sm">
                NEW
                <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-600"></span>
                </span>
              </span>
            </a>

            <a href={getLocalizedPath("/privatisation")} className="hover:text-padre-primary transition-colors">
              {goodLabel("privatisation")}
            </a>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-6 z-[61]">
            <div>
              <LanguageSelectorDropdown theme={isHeaderLight ? "light" : "dark"} />
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
              {isMobileMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
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
            <nav className={`flex flex-col items-center gap-6 uppercase tracking-[0.2em] text-lg font-bold font-lato w-full ${
              isLight ? "text-zinc-800" : "text-white"
            }`}>
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
                      <div className={`flex flex-col items-center gap-4 py-4 w-full mt-4 ${
                        isLight ? "bg-black/5" : "bg-white/5"
                      }`}>
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
      <main className="w-full">
        {children}
      </main>

      {/* Footer */}
      <footer data-nosnippet className={`w-full py-20 mt-0 border-t ${
        isLight ? "bg-[#f5f1e8] text-zinc-600 border-black/5" : "bg-[#111111] text-gray-400 border-white/10"
      }`}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {/* Column 1: Contact */}
          <div className="flex flex-col items-center gap-6">
            <h3 className="text-2xl text-padre-primary font-cormorant mb-2">{goodLabel("contact")}</h3>
            <p className="font-lato leading-relaxed">
              <a href="https://maps.app.goo.gl/upvp6fR7qbgHyYpP9" className="hover:text-padre-primary transition-colors">
                {goodLabel("address_line_1")}<br />{goodLabel("address_line_2")}
              </a>
            </p>
            <p className={`text-xl font-cormorant mt-2 ${isLight ? "text-zinc-800" : "text-white"}`}>
              <a href="tel:+33468324011">04 68 32 40 11</a>
            </p>
            <p className="font-lato">elpadre.aude@gmail.com</p>
          </div>

          {/* Column 2: Logo & Socials */}
          <div className="flex flex-col items-center justify-center gap-8">
            <Logo size={120} color="#c59d5f" />
            <div className="flex items-center justify-center gap-6 mt-4">
              <a
                href="https://www.instagram.com/el_padre.11/"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-300 ${isLight ? "text-zinc-800 hover:text-padre-primary" : "text-white hover:text-padre-primary"}`}
                aria-label="Instagram"
              >
                <InstagramIcon size={24} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61568366311415"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-300 ${isLight ? "text-zinc-800 hover:text-padre-primary" : "text-white hover:text-padre-primary"}`}
                aria-label="Facebook"
              >
                <FacebookIcon size={24} />
              </a>
              <a
                href="https://www.tiktok.com/@el_padre.11"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-300 ${isLight ? "text-zinc-800 hover:text-padre-primary" : "text-white hover:text-padre-primary"}`}
                aria-label="TikTok"
              >
                <TiktokIcon size={24} />
              </a>
            </div>
            <div className={`max-w-xs text-sm font-lato tracking-wide uppercase ${isLight ? "text-zinc-600" : "text-white"}`}>
              {goodLabel("premium_authentic")}
            </div>
          </div>

          {/* Column 3: Hours */}
          <div className="flex flex-col items-center gap-4 w-full">
            <h3 className="text-2xl text-padre-primary font-cormorant mb-2">{goodLabel("nos_horaires")}</h3>
            <div className={`flex flex-col gap-3 font-lato text-sm items-center w-full ${isLight ? "text-zinc-800" : "text-white"}`}>
              <p className="uppercase tracking-wider font-bold mb-1">{goodLabel("ouvert j7/7")}</p>
              
              <div className="grid grid-cols-[1fr_auto_1fr] gap-x-3 gap-y-1.5 w-full">
                {[
                  "footer_hours_lundi_jeudi",
                  "footer_hours_vendredi",
                  "footer_hours_weekend",
                  "footer_hours_brunch"
                ].map((key) => {
                  const label = goodLabel(key as Parameters<typeof goodLabel>[0]);
                  const splitIndex = label.indexOf(":");
                  const hasColon = splitIndex !== -1;
                  const left = hasColon ? label.substring(0, splitIndex).trim() : label;
                  const right = hasColon ? label.substring(splitIndex + 1).trim() : "";
                  const isBrunch = key === "footer_hours_brunch";
                  const textClass = isBrunch ? "text-xs opacity-75 mt-1" : "tracking-wide";
                  
                  return (
                    <Fragment key={key}>
                      <span className={`text-right font-medium ${textClass}`}>{left}</span>
                      <span className={`text-center opacity-50 ${textClass}`}>{hasColon ? ":" : ""}</span>
                      <span className={`text-left ${textClass}`}>{right}</span>
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className={`text-center mt-16 text-sm ${isLight ? "text-zinc-400" : "text-gray-600"}`}>
          <p>© {new Date().getFullYear()} El Padre. {goodLabel("all_rights_reserved")}</p>
        </div>
      </footer>
    </div>
  );
}
