export function getLang(lang: string | string[] | undefined): string {
  if (Array.isArray(lang)) return lang[0] || "sv";
  return lang || "sv";
}

export function useLang(params: { lang?: string | string[] }) {
  return getLang(params?.lang);
}
