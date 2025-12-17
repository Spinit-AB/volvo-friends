import sv from "./sv.json";
import en from "./en.json";

type TranslationDict = { [key: string]: string };

const translations: Record<string, TranslationDict> = { sv, en };

export type Locale = keyof typeof translations;

export function t(key: string, locale: string = "sv"): string {
  const availableLocales = Object.keys(translations);
  const selectedLocale = availableLocales.includes(locale) ? locale : "sv";
  return translations[selectedLocale][key] || translations["sv"][key] || key;
}
