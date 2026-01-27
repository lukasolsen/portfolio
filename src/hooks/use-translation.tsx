import {
  useTranslation as useI18nTranslation,
  I18nextProvider,
} from "react-i18next";
import { useCallback, useEffect } from "react";
import type { LanguageCode } from "@/lib/i18n";
import i18n from "@/lib/i18n";

export const useTranslation = () => {
  const { t, i18n: i18nInstance } = useI18nTranslation();

  const setLanguage = useCallback(
    (lang: LanguageCode) => {
      i18nInstance.changeLanguage(lang);
      // Also set the cookie for SSR persistence
      if (typeof document !== "undefined") {
        document.cookie = `locale=${lang}; path=/; max-age=31536000`;
        document.documentElement.lang = lang;
      }
    },
    [i18nInstance],
  );

  return {
    language: i18nInstance.language as LanguageCode,
    setLanguage,
    t,
  };
};

export const I18nProvider = ({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale?: LanguageCode;
}) => {
  // Sync the language on the first render if locale is provided
  if (locale && i18n.language !== locale) {
    i18n.changeLanguage(locale);
  }

  useEffect(() => {
    if (locale) {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
