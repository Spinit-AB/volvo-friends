import { Params } from "next/dist/server/request/params";
import { useLang } from "./useLang";

export function useLinkWithLang(params: Params) {
  const lang = useLang(params);

  return (path: string) => {
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return `/${lang}/${cleanPath}`;
  };
}
