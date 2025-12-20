// src/locales/useT.ts
import { t } from "../translate";
import { useLang } from "./useLang";

export function useT(params: { lang?: string | string[] }) {
  const lang = useLang(params);
  return (key: string, values?: Record<string, string | number>) =>
    t(key, lang, values);
}
