// src/locales/useLang.ts
export function getLang(param: string | string[] | undefined): string {
  if (Array.isArray(param)) return param[0] || "sv";
  return param || "sv";
}

export function useLang(params: { lang?: string | string[] }) {
  return getLang(params?.lang);
}
