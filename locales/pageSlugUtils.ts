// Utility to get the correct posts page slug for a given language
export function getPostsPageSlug(lang: string) {
  return lang === "sv" ? "aktuellt" : "current";
}
