import { useEffect, useState } from "react";
import { useI18n, SupportedLanguages, supported_languages } from "@/hooks/useTranslations";
import { CloseIcon } from "./icons";
import { Button } from "@heroui/button";
import { motion, AnimatePresence } from "framer-motion";
import { isEntryOnMenu, getMenuOptionSelected } from "@/config/landing";
import { useLocation } from "react-router-dom";

const GA_MEASUREMENT_ID = "G-VH1QHTSLEM";

interface CookiePreferences {
  analytics: boolean;
  marketing: boolean;
}

type BannerStep = "cookies" | "language";

export const LanguageSwitchNotification = () => {
  const location = useLocation();
  const { language, setLanguage, goodLabel, getLocalizedPath } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState<BannerStep>("cookies");
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [suggestedLang, setSuggestedLang] = useState<SupportedLanguages | null>(null);
  
  const [menuOptionSelected, setMenuOptionSelectedState] = useState(getMenuOptionSelected());
  
  const [preferences, setPreferences] = useState<CookiePreferences>({
    analytics: false,
    marketing: false,
  });

  // Apply tracking based on preferences
  const applyTrackingSettings = (prefs: CookiePreferences) => {
    (window as any)[`ga-disable-${GA_MEASUREMENT_ID}`] = !prefs.analytics;

    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("consent", "update", {
        analytics_storage: prefs.analytics ? "granted" : "denied",
        ad_storage: prefs.marketing ? "granted" : "denied",
        ad_user_data: prefs.marketing ? "granted" : "denied",
        ad_personalization: prefs.marketing ? "granted" : "denied",
      });
    }
  };

  useEffect(() => {
    // Determine browser language suggestion
    const browserLang = navigator.language.split("-")[0] as SupportedLanguages;
    const hasDifferentLang = browserLang in supported_languages && browserLang !== language;
    
    if (hasDifferentLang) {
      setSuggestedLang(browserLang);
    }

    // Check cookie consent state
    const savedConsent = localStorage.getItem("elpadre-cookie-consent");
    const hasLanguageDismissed = sessionStorage.getItem("language_notification_dismissed");
    const shouldHideForMenuSelector = isEntryOnMenu && !menuOptionSelected;
    const isReviewsRoute = location.pathname.includes('/reviews');
    const shouldHide = shouldHideForMenuSelector || isReviewsRoute;

    if (savedConsent) {
      const parsedPrefs = JSON.parse(savedConsent) as CookiePreferences;
      setPreferences(parsedPrefs);
      applyTrackingSettings(parsedPrefs);

      // If cookies already accepted, but language differs and is not dismissed, show language switch
      if (hasDifferentLang && !hasLanguageDismissed) {
        setStep("language");
        if (shouldHide) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(false);
      }
    } else {
      // No cookie consent yet: disable GA by default and show cookie step
      (window as any)[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
      setStep("cookies");
      if (shouldHide) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    }

    // Custom event listener to reopen cookie settings from policy pages
    const handleOpenSettings = () => {
      setStep("cookies");
      setIsCustomizing(true);
      setIsVisible(true);
    };

    // Listen to menu selection changes
    const handleMenuSelectionChange = (e: Event) => {
      const selected = (e as CustomEvent).detail;
      setMenuOptionSelectedState(selected);
    };

    window.addEventListener("open-cookie-settings", handleOpenSettings);
    window.addEventListener("menu-option-selected-change", handleMenuSelectionChange);
    return () => {
      window.removeEventListener("open-cookie-settings", handleOpenSettings);
      window.removeEventListener("menu-option-selected-change", handleMenuSelectionChange);
    };
  }, [language, menuOptionSelected, location.pathname]);

  // Transitions after cookie choice is made
  const checkLanguageTransitionOrClose = () => {
    const hasLanguageDismissed = sessionStorage.getItem("language_notification_dismissed");
    
    if (suggestedLang && !hasLanguageDismissed) {
      setStep("language");
      setIsCustomizing(false);
    } else {
      setIsVisible(false);
      setIsCustomizing(false);
    }
  };

  const handleAcceptAll = () => {
    const newPrefs = { analytics: true, marketing: true };
    setPreferences(newPrefs);
    localStorage.setItem("elpadre-cookie-consent", JSON.stringify(newPrefs));
    applyTrackingSettings(newPrefs);
    checkLanguageTransitionOrClose();
  };

  const handleDeclineAll = () => {
    const newPrefs = { analytics: false, marketing: false };
    setPreferences(newPrefs);
    localStorage.setItem("elpadre-cookie-consent", JSON.stringify(newPrefs));
    applyTrackingSettings(newPrefs);
    checkLanguageTransitionOrClose();
  };

  const handleSavePreferences = () => {
    localStorage.setItem("elpadre-cookie-consent", JSON.stringify(preferences));
    applyTrackingSettings(preferences);
    checkLanguageTransitionOrClose();
  };

  const handleDismissLanguage = () => {
    setIsVisible(false);
    sessionStorage.setItem("language_notification_dismissed", "true");
  };

  const handleSwitchLanguage = () => {
    if (suggestedLang) {
      setLanguage(suggestedLang);
      setIsVisible(false);
      sessionStorage.setItem("language_notification_dismissed", "true");
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:w-full md:max-w-lg z-[100] bg-[#1a1a1a]/85 backdrop-blur-md border border-[#c59d5f] text-white p-5 rounded-lg shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom-4 duration-500"
      >
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-bold text-[#c59d5f] uppercase tracking-wider">
            {step === "cookies" ? goodLabel("cookie_title") : (
              suggestedLang === 'fr' ? "Langue / Language" :
              suggestedLang === 'es' ? "Idioma / Language" : "Language"
            )}
          </h3>
          <button
            onClick={() => {
              if (step === "cookies") {
                handleDeclineAll(); // Default to decline on close
              } else {
                handleDismissLanguage();
              }
            }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <CloseIcon size={16} />
          </button>
        </div>

        {step === "cookies" ? (
          // STEP 1: COOKIE CONSENT
          !isCustomizing ? (
            // Default Cookie View
            <div className="flex flex-col gap-4 font-lato">
              <p className="text-xs text-gray-300 leading-relaxed">
                {goodLabel("cookie_desc")}{" "}
                <a
                  href={getLocalizedPath("/politique-de-cookies")}
                  className="text-[#c59d5f] hover:underline font-semibold"
                >
                  {goodLabel("politique_cookies")}
                </a>.
              </p>
              <div className="flex flex-wrap gap-2 justify-end mt-1">
                <Button
                  size="sm"
                  onClick={() => setIsCustomizing(true)}
                  className="rounded-lg bg-transparent border border-white/20 text-white font-bold text-[10px] uppercase tracking-wider py-1 px-3"
                >
                  {goodLabel("cookie_customize")}
                </Button>
                <Button
                  size="sm"
                  onClick={handleDeclineAll}
                  className="rounded-lg bg-transparent border border-[#c59d5f]/40 text-[#c59d5f] font-bold text-[10px] uppercase tracking-wider py-1 px-3 hover:bg-[#c59d5f]/10"
                >
                  {goodLabel("cookie_decline")}
                </Button>
                <Button
                  size="sm"
                  onClick={handleAcceptAll}
                  className="rounded-lg bg-[#c59d5f] text-black font-bold text-[10px] uppercase tracking-wider py-1 px-4 hover:bg-white"
                >
                  {goodLabel("cookie_accept_all")}
                </Button>
              </div>
            </div>
          ) : (
            // Customized Cookie View
            <div className="flex flex-col gap-4 font-lato">
              <div className="flex flex-col gap-3 max-h-[180px] overflow-y-auto pr-1">
                {/* Essential */}
                <div className="flex justify-between items-center gap-2">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-white uppercase">{goodLabel("cookie_essential_title")}</span>
                    <span className="text-[9px] text-gray-400">{goodLabel("cookie_essential_desc")}</span>
                  </div>
                  <input type="checkbox" disabled checked className="w-3.5 h-3.5 accent-[#c59d5f] opacity-50 cursor-not-allowed" />
                </div>
                {/* Analytics */}
                <div className="flex justify-between items-center gap-2 pt-2 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-white uppercase">{goodLabel("cookie_analytics_title")}</span>
                    <span className="text-[9px] text-gray-400">{goodLabel("cookie_analytics_desc")}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="w-3.5 h-3.5 accent-[#c59d5f] cursor-pointer"
                  />
                </div>
                {/* Marketing */}
                <div className="flex justify-between items-center gap-2 pt-2 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-white uppercase">{goodLabel("cookie_marketing_title")}</span>
                    <span className="text-[9px] text-gray-400">{goodLabel("cookie_marketing_desc")}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                    className="w-3.5 h-3.5 accent-[#c59d5f] cursor-pointer"
                  />
                </div>
              </div>
              
              <div className="flex justify-between items-center gap-2 mt-1 pt-2 border-t border-white/5">
                <button
                  onClick={() => setIsCustomizing(false)}
                  className="text-[10px] text-gray-400 hover:text-white underline uppercase tracking-wider font-bold"
                >
                  Retour
                </button>
                <div className="flex gap-1.5">
                  <Button
                    size="sm"
                    onClick={handleDeclineAll}
                    className="rounded-lg bg-transparent border border-white/20 text-white font-bold text-[9px] uppercase tracking-wider py-1 px-2.5"
                  >
                    {goodLabel("cookie_essential_only")}
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSavePreferences}
                    className="rounded-lg bg-[#c59d5f] text-black font-bold text-[9px] uppercase tracking-wider py-1 px-3 hover:bg-white"
                  >
                    {goodLabel("cookie_save")}
                  </Button>
                </div>
              </div>
            </div>
          )
        ) : (
          // STEP 2: LANGUAGE SELECTION
          <div className="flex flex-col gap-4 font-lato">
            <p className="text-xs text-gray-300 leading-relaxed">
              {suggestedLang === 'fr' && "Voulez-vous passer le site en Français ?"}
              {suggestedLang === 'en' && "Would you like to view the site in English?"}
              {suggestedLang === 'es' && "¿Deseas cambiar el idioma a Español?"}
            </p>
            <div className="flex gap-2 justify-end mt-1">
              <Button
                size="sm"
                variant="light"
                className="text-white hover:text-[#c59d5f] rounded-lg uppercase tracking-wider text-[10px] font-bold py-1 px-3"
                onPress={handleDismissLanguage}
              >
                {suggestedLang === 'fr' ? 'Non' : suggestedLang === 'es' ? 'No' : 'No'}
              </Button>
              <Button
                size="sm"
                className="bg-[#c59d5f] text-black font-bold rounded-lg uppercase tracking-wider text-[10px] hover:bg-white py-1 px-4"
                onPress={handleSwitchLanguage}
              >
                {suggestedLang === 'fr' ? 'Oui, passer en Français' : suggestedLang === 'es' ? 'Sí, cambiar a Español' : 'Yes, switch to English'}
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
