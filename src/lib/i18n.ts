import { en } from "@/data/i18n/en";
import { no } from "@/data/i18n/no";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

export const defaultLanguage = "no";
export const supportedLanguages = ["en", "no"] as const;
export type LanguageCode = (typeof supportedLanguages)[number];

export const resources = {
  en: { translation: en },
  no: { translation: no },
} as const;

export type TranslationStructure = typeof en;

i18next.use(initReactI18next).init({
  resources,
  fallbackLng: defaultLanguage,
  supportedLngs: supportedLanguages,
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: (typeof resources)["en"];
  }
}
