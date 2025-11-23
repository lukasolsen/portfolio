import {
  defaultLanguage,
  getNestedValue,
  interpolate,
  resources,
  type LanguageCode,
  type TranslationKey,
} from "@/lib/i18n";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface I18nContextProps {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextProps | null>(null);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LanguageCode>(defaultLanguage);

  const value = useMemo(() => {
    const t = (
      key: TranslationKey,
      params?: Record<string, string | number>
    ) => {
      const dict = resources[language];
      const text = getNestedValue(dict, key);
      return interpolate(text, params);
    };

    return { language, setLanguage, t };
  }, [language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
};
