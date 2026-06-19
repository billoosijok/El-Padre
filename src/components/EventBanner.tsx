import { useState, useEffect, useRef } from "react";
import { useI18n } from "@/hooks/useTranslations";
import { useReservation } from "@/context/ReservationContext";
import { Button } from "@heroui/button";
import { CloseIcon } from "./icons";
import { motion, AnimatePresence } from "framer-motion";
import { eventBannerConfig } from "@/config/eventBanner";

interface EventBannerProps {
  onHeightChange: (height: number) => void;
}

export const EventBanner = ({ onHeightChange }: EventBannerProps) => {
  const { goodLabel } = useI18n();
  const { openReservation } = useReservation();
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkVisibility = () => {
      const isDismissed = sessionStorage.getItem("fathers_day_banner_dismissed") === "true";
      const now = new Date();
      const expiry = new Date(eventBannerConfig.expiryDate);
      const isExpired = now > expiry;
      const active = eventBannerConfig.isActive && !isExpired && !isDismissed;
      
      setIsVisible(active);
      if (!active) {
        onHeightChange(0);
      }
    };

    checkVisibility();
    
    // Check every minute in case the event expires while the user is on the site
    const interval = setInterval(checkVisibility, 60000);
    return () => clearInterval(interval);
  }, [onHeightChange]);

  useEffect(() => {
    if (isVisible && containerRef.current) {
      // Use ResizeObserver to update height dynamically if screen sizes change (e.g. mobile wrapping text)
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const newHeight = entry.target.clientHeight;
          onHeightChange(newHeight);
        }
      });
      
      observer.observe(containerRef.current);
      
      // Set initial height
      onHeightChange(containerRef.current.clientHeight);
      
      return () => observer.disconnect();
    } else {
      onHeightChange(0);
    }
  }, [isVisible, onHeightChange]);

  const handleDismiss = () => {
    sessionStorage.setItem("fathers_day_banner_dismissed", "true");
    setIsVisible(false);
    onHeightChange(0);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-[70] bg-gradient-to-r from-zinc-950 via-[#1c1c1c] to-zinc-950 border-b border-[#c59d5f]/30 px-6 py-2.5 flex items-center justify-between text-white font-lato shadow-lg"
        >
          {/* Subtle radial glow under content */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,157,95,0.08),transparent_70%)] pointer-events-none" />

          {/* Left: decorative element to balance layout on desktop */}
          <div className="hidden md:flex items-center gap-2 text-[#c59d5f] text-[10px] font-bold uppercase tracking-[0.25em] pl-2 z-10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c59d5f] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c59d5f]"></span>
            </span>
            <span>Événement</span>
          </div>

          {/* Center: Main text & CTA Button */}
          <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center z-10">
            <p className="text-xs md:text-sm font-semibold tracking-wide text-gray-100 max-w-2xl leading-relaxed">
              {goodLabel(eventBannerConfig.textKey as any)}
            </p>
            <Button
              size="sm"
              onPress={openReservation}
              className="bg-[#c59d5f] hover:bg-white text-black font-extrabold rounded-none uppercase tracking-[0.15em] text-[10px] px-5 py-2 h-auto transition-all duration-300 hover:scale-105 shadow-md border border-transparent hover:border-black/10 shrink-0"
              variant="solid"
            >
              {goodLabel(eventBannerConfig.ctaKey as any)}
            </Button>
          </div>

          {/* Right: Dismiss icon */}
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-white transition-colors p-1.5 z-10 hover:bg-white/5 rounded-full"
            aria-label="Fermer la notification"
          >
            <CloseIcon size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
