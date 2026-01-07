// src/locales/useT.ts
import { t } from "../translate";
import { useLang } from "./useLang";

export type TTranslate = (
  key: string,
  values?: Record<string, string | number>
) => string;

export function useT(params: { lang?: string | string[] }): TTranslate {
  const lang = useLang(params);
  return (key: string, values?: Record<string, string | number>) =>
    t(key, lang, values);
}
