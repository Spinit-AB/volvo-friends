export const STORY_PAGE_SIZES = [10, 20, 50, 100];
export const STORY_PAGE_SIZE_STORAGE_KEY = "storiesPageSize";

export function getStoryPageSize(requested: unknown, saved?: string) {
  const explicit = typeof requested === "string" ? Number(requested) : NaN;
  const preference = Number(saved);
  if (STORY_PAGE_SIZES.includes(explicit)) return explicit;
  return STORY_PAGE_SIZES.includes(preference) ? preference : 20;
}
