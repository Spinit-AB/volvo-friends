import "server-only";
import { draftMode } from "next/headers";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "./queries";
import type { TStory, TStoryCategory, TStoryPreview } from "../models/TStory";

export const storiesOverviewQuery = defineQuery(`{
  "page": coalesce(
    *[_type == "storiesPage" && _id == $pageId][0],
    *[_type == "storiesPage" && _id == "storiesPage_sv"][0]
  ){title, introduction},
  "categories": *[_type == "storyCategory" && defined(slug.current) && ($preview || isActive == true)]
    | order(title asc) {_id, title, "slug": slug.current, description, image, isActive}
}`);

export const storyCategoryQuery = defineQuery(`
  *[_type == "storyCategory" && slug.current == $slug && ($preview || isActive == true)][0]{
    _id, title, "slug": slug.current, description, image, isActive,
    "stories": *[_type == "story" && category._ref == ^._id && defined(slug.current)]
      | order(coalesce(publishedAt, _createdAt) desc, title asc) {
        _id, title, "slug": slug.current, listImage, "publishedAt": coalesce(publishedAt, _createdAt)
      }
  }
`);

export const storyQuery = defineQuery(`
  *[_type == "story" && slug.current == $slug && category->slug.current == $categorySlug
    && ($preview || category->isActive == true)][0]{
    _id, title, "slug": slug.current, "publishedAt": coalesce(publishedAt, _createdAt), content,
    "category": category->{_id, title, "slug": slug.current, description, image, isActive}
  }
`);

export async function fetchStoriesOverview(language: string) {
  const preview = (await draftMode()).isEnabled;
  const data = await sanityFetch<{
    page: { title?: string; introduction?: string } | null;
    categories: TStoryCategory[];
  }>({ query: storiesOverviewQuery, params: { pageId: `storiesPage_${language}`, preview } });
  return { ...data, preview };
}

export async function fetchStoryCategory(slug: string) {
  const preview = (await draftMode()).isEnabled;
  const category = await sanityFetch<(TStoryCategory & { stories: TStoryPreview[] }) | null>({
    query: storyCategoryQuery, params: { slug, preview },
  });
  return { category, preview };
}

export async function fetchStory(categorySlug: string, slug: string) {
  const preview = (await draftMode()).isEnabled;
  const story = await sanityFetch<TStory | null>({ query: storyQuery, params: { categorySlug, slug, preview } });
  return { story, preview };
}
