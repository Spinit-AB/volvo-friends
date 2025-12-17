// src/locales/useT.ts
import { t } from "@/locales/translate";
import { useLang } from "./useLang";

export function useT(params: { lang?: string | string[] }) {
  const lang = useLang(params);
  return (key: string) => t(key, lang);
}
