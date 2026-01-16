import { Button } from "@heroui/button";
import { useEffect, useState } from "react";
import { useI18n, SupportedLanguages, supported_languages } from "@/hooks/useTranslations";
import { CloseIcon } from "./icons";

export const LanguageSwitchNotification = () => {
    const { language, setLanguage } = useI18n();
    const [isVisible, setIsVisible] = useState(false);
    const [suggestedLang, setSuggestedLang] = useState<SupportedLanguages | null>(null);

    useEffect(() => {
        // Check if we've already shown/dismissed the notification for this session
        const hasDismissed = sessionStorage.getItem("language_notification_dismissed");
        if (hasDismissed) return;

        const browserLang = navigator.language.split("-")[0] as SupportedLanguages;

        // logic: if browser language is supported AND different from current language
        if (
            browserLang in supported_languages &&
            browserLang !== language
        ) {
            setSuggestedLang(browserLang);
            setIsVisible(true);
        }
    }, [language]);

    const handleDismiss = () => {
        setIsVisible(false);
        sessionStorage.setItem("language_notification_dismissed", "true");
    };

    const handleSwitch = () => {
        if (suggestedLang) {
            setLanguage(suggestedLang);
            handleDismiss();
        }
    };

    if (!isVisible || !suggestedLang) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-full md:max-w-sm z-[100] bg-[#1a1a1a] border border-[#c59d5f] text-white p-4 rounded-lg shadow-2xl flex flex-col gap-3 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-start">
                <p className="text-sm font-medium pr-8">
                    {suggestedLang === 'fr' && "Voulez-vous passer en Français ?"}
                    {suggestedLang === 'en' && "Do you want to switch to English?"}
                    {suggestedLang === 'es' && "¿Quieres cambiar a Español?"}
                </p>
                <button
                    onClick={handleDismiss}
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    <CloseIcon size={16} />
                </button>
            </div>

            <div className="flex gap-2 justify-end">
                <Button
                    size="sm"
                    variant="light"
                    className="text-white hover:text-[#c59d5f]"
                    onPress={handleDismiss}
                >
                    {language === 'fr' ? 'Non' : language === 'es' ? 'No' : 'No'}
                </Button>
                <Button
                    size="sm"
                    className="bg-[#c59d5f] text-black font-bold"
                    onPress={handleSwitch}
                >
                    {language === 'fr' ? 'Oui, changer' : language === 'es' ? 'Sí, cambiar' : 'Yes, switch'}
                </Button>
            </div>
        </div>
    );
};
