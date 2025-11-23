import { en } from "@/data/i18n/en";
import { no } from "@/data/i18n/no";

export const defaultLanguage = "no";
export const resources = {
  en,
  no,
} as const;

export type LanguageCode = keyof typeof resources;
export type TranslationStructure = typeof en;

type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: TObj[TKey] extends object
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`;
}[keyof TObj & (string | number)];

export type TranslationKey = RecursiveKeyOf<TranslationStructure>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getNestedValue = (obj: any, path: string): string => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj) || path;
};

export const interpolate = (
  template: string,
  params?: Record<string, string | number>
) => {
  if (!params) return template;
  return template.replace(/{(\w+)}/g, (_, key) => {
    return params[key] !== undefined ? String(params[key]) : `{${key}}`;
  });
};

export const getT = (
  key: TranslationKey,
  lang: LanguageCode,
  params?: Record<string, string | number>
): string => {
  const dict = resources[lang];
  const text = getNestedValue(dict, key);
  return interpolate(text, params);
};
