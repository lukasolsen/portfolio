import { en } from "@/data/i18n/en";
import { no } from "@/data/i18n/no";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

export const defaultLanguage = "no";
export const supportedLanguages = ["en", "no"] as const;
export type LanguageCode = (typeof supportedLanguages)[number];

export const resources = {
  en: { translation: en },
  no: { translation: no },
} as const;

// Root translation structure for type safety
export type TranslationStructure = typeof en;

// Initialize i18next
i18next
  .use(initReactI18next)
  .use(new LanguageDetector())
  .init({
    resources,
    fallbackLng: defaultLanguage,
    supportedLngs: supportedLanguages,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["cookie", "localStorage"],
      lookupCookie: "locale",
    },
  });

export default i18next;

// Type safety for i18next
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: (typeof resources)["en"];
  }
}
