// Utility to get the correct posts page slug for a given language
export function getPathsByLang(lang: string) {
  return lang === "sv" ? paths.sv : paths.en;
}

const paths = {
  sv: {
    current: "aktuellt",
    contact: "kontakt",
    about: "om-oss",
    member: "bli-medlem",
  },
  en: {
    current: "current",
    contact: "contact",
    about: "about",
    member: "become-a-member",
  },
};
