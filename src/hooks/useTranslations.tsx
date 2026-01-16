import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import supported_languages from "@/config/supported_languages.json";
import labels from "@/config/labels.json";

export { supported_languages };

export type SupportedLanguages = keyof typeof supported_languages;

export const DEFAULT_LANGUAGE: SupportedLanguages = "fr";

interface I18nContextValue {
  language: SupportedLanguages;
  setLanguage: (lang: I18nContextValue["language"]) => void;
}

export const I18nContext = createContext<I18nContextValue>({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => { },
});

export const I18nProvider = ({
  children,
  initialLanguage = DEFAULT_LANGUAGE
}: PropsWithChildren & { initialLanguage?: SupportedLanguages }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [lang, setLang] = useState<SupportedLanguages>(initialLanguage);

  // Sync state with prop if it changes (e.g. navigation)
  useEffect(() => {
    setLang(initialLanguage);
  }, [initialLanguage]);

  const onSetLanguage = useCallback((newLang: SupportedLanguages) => {
    const currentPath = location.pathname;
    let newPath = currentPath;

    // Remove existing language prefix if present
    const segments = currentPath.split('/').filter(Boolean);
    const firstSegment = segments[0] as SupportedLanguages;

    if (firstSegment && firstSegment in supported_languages) {
      if (firstSegment === newLang) return; // Already on this language
      // Remove the language prefix
      segments.shift();
    }

    // Prepare the clean path (without language prefix)
    const cleanPath = '/' + segments.join('/');

    // Construct new path
    if (newLang === DEFAULT_LANGUAGE) {
      newPath = cleanPath;
    } else {
      newPath = `/${newLang}${cleanPath === '/' ? '' : cleanPath}`;
    }

    // If newPath is empty string (e.g. switching from /en back to /), make it /
    if (newPath === '') newPath = '/';

    navigate(newPath);
  }, [navigate, location]);

  const value = useMemo(
    () => ({
      language: lang,
      setLanguage: onSetLanguage,
    }),
    [lang, onSetLanguage],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const i18nContext = useContext(I18nContext);

  return {
    ...i18nContext,
    goodLabel: (label: keyof typeof labels): string => {
      const normalizedLabel = label.toLowerCase() as keyof typeof labels;

      if (!labels?.[normalizedLabel]?.[i18nContext.language]) {
        return `{${label}}`;
      }

      return labels?.[normalizedLabel]?.[i18nContext.language];
    },
    getLocalizedPath: (path: string): string => {
      if (i18nContext.language === DEFAULT_LANGUAGE) {
        return path;
      }
      // Ensure path starts with /
      const normalizedPath = path.startsWith('/') ? path : `/${path}`;
      // If path is just /, return /lang
      if (normalizedPath === '/') {
        return `/${i18nContext.language}`;
      }
      return `/${i18nContext.language}${normalizedPath}`;
    }
  };
};
