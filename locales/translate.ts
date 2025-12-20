import sv from "./sv.json";
import en from "./en.json";

type TranslationDict = { [key: string]: string };

const translations: Record<string, TranslationDict> = { sv, en };

export type Locale = keyof typeof translations;

export function t(
  key: string,
  locale: string = "sv",
  values?: Record<string, string | number>
): string {
  const availableLocales = Object.keys(translations);
  const selectedLocale = availableLocales.includes(locale) ? locale : "sv";
  let translated =
    translations[selectedLocale][key] || translations["sv"][key] || key;
  if (values) {
    Object.keys(values).forEach((k) => {
      // Replace all occurrences of {key} with the value
      translated = translated.replace(
        new RegExp(`{${k}}`, "g"),
        String(values[k])
      );
    });
  }
  return translated;
}
