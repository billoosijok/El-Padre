import { ReactNode, useState, useEffect } from "react";
import { Button } from "@heroui/button";

import { AnimatePresence, motion } from "framer-motion";

import { useReservation } from "@/context/ReservationContext";

import { useI18n } from "@/hooks/useTranslations";
import { Logo } from "@/components/Logo";
import { MenuIcon, CloseIcon, ChevronDownIcon } from "@/components/icons";
import { LanguageSelectorDropdown } from "@/components/LanguageSelector";
import { MenuDropdown } from "@/components/MenuDropdown";

export default function DefaultLayout({
  children,
  homeTreatment,
}: {
  children: React.ReactNode;
  title?: ReactNode; // Kept for compatibility but might not be used in new design
  contentOffset?: string; // Kept for compatibility
  homeTreatment?: boolean;
}) {
  const { goodLabel } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSubMenuOpen, setIsMobileSubMenuOpen] = useState(false);
  const { openReservation } = useReservation();

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
    <div className="relative min-h-screen bg-padre-background text-white font-lato">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${isScrolled || !homeTreatment || isMobileMenuOpen
          ? "bg-black/90 shadow-lg py-4"
          : "bg-transparent py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Left: Logo */}
          <div className={`flex-shrink-0 z-[61] transition-opacity duration-300 ${(!homeTreatment || isScrolled || isMobileMenuOpen) ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <a href="/">
              <Logo animation="simple" size={50} color="#c59d5f" />
            </a>
          </div>

          {/* Center: Navigation (Hidden on mobile) */}
          <nav className="hidden md:flex gap-10 items-center uppercase tracking-[0.2em] text-xs font-bold font-lato text-white">
            <a href="/" className="hover:text-padre-primary transition-colors">
              {goodLabel("home")}
            </a>

            <MenuDropdown />

            <a href="/privatisation" className="hover:text-padre-primary transition-colors">
              {goodLabel("privatisation")}
            </a>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-6 z-[61]">
            <div>
              <LanguageSelectorDropdown />
            </div>
            <Button
              className="hidden md:flex rounded-none bg-transparent border border-white text-white font-bold px-6 py-2 uppercase tracking-widest hover:bg-white hover:text-black transition-colors text-xs"
              onPress={openReservation}
              variant="solid"
            >
              {goodLabel("reserve")}
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white focus:outline-none"
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
            className="fixed inset-0 z-[55] bg-black flex flex-col items-center justify-center space-y-8 md:hidden overflow-y-auto py-20"
          >
            <nav className="flex flex-col items-center gap-6 uppercase tracking-[0.2em] text-lg font-bold font-lato text-white w-full">
              <a
                href="/"
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
                      <div className="flex flex-col items-center gap-4 py-4 bg-white/5 w-full mt-4">
                        <a
                          href="/menu"
                          className="hover:text-padre-primary transition-colors text-base"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {goodLabel("menu_tapas")}
                        </a>
                        <a
                          href="/boissons#alcool"
                          className="hover:text-padre-primary transition-colors text-base"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {goodLabel("signature_cocktails")}
                        </a>
                        <a
                          href="/boissons#vin"
                          className="hover:text-padre-primary transition-colors text-base"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {goodLabel("vin")}
                        </a>
                        <a
                          href="/boissons"
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
                href="/privatisation"
                className="hover:text-padre-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {goodLabel("privatisation")}
              </a>
            </nav>

            <div className="flex flex-col items-center gap-6 mt-8">

              <Button
                className="rounded-none bg-transparent border border-white text-white font-bold px-8 py-3 uppercase tracking-widest hover:bg-white hover:text-black transition-colors text-sm"
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
      <footer className="w-full bg-[#111111] text-gray-400 py-20 mt-0 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">

          {/* Column 1: Contact */}
          <div className="flex flex-col items-center gap-6">
            <h3 className="text-2xl text-padre-primary font-cormorant mb-2">{goodLabel("contact")}</h3>
            <p className="font-lato leading-relaxed">
              <a href="https://maps.app.goo.gl/upvp6fR7qbgHyYpP9" className="hover:text-padre-primary transition-colors">
                29 Cours de la République,<br />11100 Narbonne
              </a>
            </p>
            <p className="text-xl text-white font-cormorant mt-2">
              <a href="tel:+33468324011">04 68 32 40 11</a>
            </p>
            <p className="font-lato">elpadre.aude@gmail.com</p>
          </div>

          {/* Column 2: Logo & Socials */}
          <div className="flex flex-col items-center justify-center gap-8">
            <Logo size={120} color="#c59d5f" />
            <div className="max-w-xs text-sm font-lato tracking-wide uppercase">
              {goodLabel("authentic_cuisine")}
            </div>
          </div>

          {/* Column 3: Hours */}
          <div className="flex flex-col items-center gap-6">
            <h3 className="text-2xl text-padre-primary font-cormorant mb-2">{goodLabel("nos horaires")}</h3>
            <p className="font-lato uppercase tracking-wider text-sm text-white">{goodLabel("ouvert j7/7")}</p>
          </div>
        </div>

        <div className="text-center mt-16 text-sm text-gray-600">
          <p>© {new Date().getFullYear()} El Padre. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
