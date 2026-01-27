import {
  defaultLanguage,
  supportedLanguages,
  type LanguageCode,
} from "@/lib/i18n";

export async function getLocale(): Promise<LanguageCode> {
  if (typeof window !== "undefined") {
    return getLocaleFromCookie();
  }

  try {
    const { getCookie, getRequestHeaders } =
      await import("@tanstack/react-start/server");

    // 1. Check cookies
    const localeCookie = getCookie("locale");
    if (
      localeCookie &&
      supportedLanguages.includes(localeCookie as LanguageCode)
    ) {
      return localeCookie as LanguageCode;
    }

    // 2. Check Accept-Language header
    const headers = getRequestHeaders();
    const acceptLanguage = headers["accept-language"];
    if (acceptLanguage) {
      const languages = acceptLanguage
        .split(",")
        .map((lang: string) => lang.split(";")[0].trim().split("-")[0]);

      for (const lang of languages) {
        if (supportedLanguages.includes(lang as LanguageCode)) {
          return lang as LanguageCode;
        }
      }
    }
  } catch (e) {
    // In some environments (like dev) getRequestHeaders might fail if not in a request context
    // console.error("Error detecting locale on server:", e);
  }

  return defaultLanguage;
}

export function getLocaleFromCookie(): LanguageCode {
  if (typeof document === "undefined") return defaultLanguage;

  const cookies = Object.fromEntries(
    document.cookie.split("; ").map((c) => {
      const parts = c.split("=");
      return [parts[0].trim(), parts[1]];
    }),
  );

  if (
    cookies.locale &&
    supportedLanguages.includes(cookies.locale as LanguageCode)
  ) {
    return cookies.locale as LanguageCode;
  }

  // Fallback to navigator
  const navLang = navigator.language.split("-")[0];
  if (supportedLanguages.includes(navLang as LanguageCode)) {
    return navLang as LanguageCode;
  }

  return defaultLanguage;
}
