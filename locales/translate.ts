import sv from "./sv.json";
import en from "./en.json";

type TranslationDict = { [key: string]: string };

const translations: Record<string, TranslationDict> = { sv, en };

export type Locale = keyof typeof translations;

export function t(key: string, locale: Locale = "sv"): string {
  return translations[locale][key] || translations["sv"][key] || key;
}
