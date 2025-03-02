import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { useLocalStorage } from "./useLocalStorage";

import supported_languages from "@/config/supported_languages.json";
import labels from "@/config/labels.json";

export type SupportedLanguages = keyof typeof supported_languages;

const DEFAULT_LANGUAGE: SupportedLanguages = "fr";

interface I18nContextValue {
  language: SupportedLanguages;
  setLanguage: (lang: I18nContextValue["language"]) => void;
}

export const I18nContext = createContext<I18nContextValue>({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
});

export const I18nProvider = ({ children }: PropsWithChildren) => {
  const { set: saveToStorage, get: getFromStorage } = useLocalStorage();
  const savedLanguage = getFromStorage("lang") as SupportedLanguages;
  const [lang, setLang] = useState<SupportedLanguages>(
    savedLanguage || DEFAULT_LANGUAGE,
  );

  const onSetLanguage = useCallback((newLang: SupportedLanguages) => {
    saveToStorage("lang", newLang);
    setLang(newLang);
  }, []);

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
        // console.warn(
        //   `label '${label}' needs to be translated into '${i18nContext.language}'`,
        // );

        return `{${label}}`;
      }

      return labels?.[normalizedLabel]?.[i18nContext.language];
    },
  };
};
