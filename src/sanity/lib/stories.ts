import "server-only";
import { draftMode } from "next/headers";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "./queries";
import { cache } from "react";
import type { TStory, TStoryCategory, TStoryPreview } from "../models/TStory";

export const storiesVisibilityQuery = defineQuery(`
  defined(*[_type == "storyCategory" && coalesce(language, "sv") == $language && isActive == true && defined(slug.current)][0]._id)
`);

// Share the check while using the same draft/public perspective as the page content.
export const fetchStoriesVisibility = cache(async (language: string) => sanityFetch<boolean>({
  query: storiesVisibilityQuery, params: { language },
}));

export type LatestStory = Pick<TStoryPreview, "title" | "slug" | "publishedAt" | "listImage"> & {
  category: { title: string; slug: string };
};

export const latestStoriesQuery = defineQuery(`
  *[_type == "story" && coalesce(language, "sv") == $language && defined(slug.current)
    && category._ref in *[_type == "storyCategory" && coalesce(language, "sv") == $language
      && isActive == true && defined(slug.current)]._id]
    | order(coalesce(publishedAt, _createdAt) desc, _id asc)[0...2]{
      title, "slug": slug.current, listImage, "publishedAt": coalesce(publishedAt, _createdAt),
      "category": category->{title, "slug": slug.current}
    }
`);

export async function fetchLatestStories(language: string) {
  return sanityFetch<LatestStory[]>({ query: latestStoriesQuery, params: { language } });
}

export const storiesOverviewQuery = defineQuery(`{
  "page": *[_type == "storiesPage" && _id == $pageId][0]{title, introduction},
  "categories": *[_type == "storyCategory" && coalesce(language, "sv") == $language && defined(slug.current) && ($preview || isActive == true)]
    | order(title asc) {_id, title, "slug": slug.current, description, image, isActive}
}`);

export const storyCategoryQuery = defineQuery(`
  *[_type == "storyCategory" && coalesce(language, "sv") == $language && slug.current == $slug && ($preview || isActive == true)][0]{
    _id, title, "slug": slug.current, description, image, isActive,
    "storyCount": count(*[_type == "story" && coalesce(language, "sv") == $language && category._ref == ^._id && defined(slug.current)]),
    "stories": *[_type == "story" && coalesce(language, "sv") == $language && category._ref == ^._id && defined(slug.current)]
      | order(coalesce(publishedAt, _createdAt) desc, title asc, _id asc)[$offset...$end] {
        _id, title, "slug": slug.current, listImage, "publishedAt": coalesce(publishedAt, _createdAt)
      }
  }
`);

export const storyQuery = defineQuery(`
  *[_type == "story" && coalesce(language, "sv") == $language && slug.current == $slug && category->slug.current == $categorySlug
    && coalesce(category->language, "sv") == $language && ($preview || category->isActive == true)][0]{
    _id, title, "slug": slug.current, "publishedAt": coalesce(publishedAt, _createdAt), listImage, content, contentBlocks,
    "category": category->{_id, title, "slug": slug.current, description, image, isActive}
  }
`);

// Keep legacy content searchable until converted, then search the current blocks only.
const storySearchText = `title + " " + coalesce(
  array::join(contentBlocks[_type == "storyText"]{"plainText": pt::text(text)}.plainText, " "),
  pt::text(content), "") + " " + array::join(coalesce(keywords, []), " ")`;

export const storySearchQuery = defineQuery(`{
  "storyCount": count(*[_type == "story" && coalesce(language, "sv") == $language && defined(slug.current) && defined(category->slug.current)
    && coalesce(category->language, "sv") == $language && ($preview || category->isActive == true)
    && (${storySearchText}) match $terms]),
  "stories": *[_type == "story" && coalesce(language, "sv") == $language && defined(slug.current) && defined(category->slug.current)
    && coalesce(category->language, "sv") == $language && ($preview || category->isActive == true)
    && (${storySearchText}) match $terms]
    | order(coalesce(publishedAt, _createdAt) desc, title asc, _id asc)[$offset...$end] {
      _id, title, "slug": slug.current, listImage,
      "publishedAt": coalesce(publishedAt, _createdAt),
      "category": category->{title, "slug": slug.current}
    }
}`);

export async function searchStories(query: string, language: string, page = 1, pageSize = 20) {
  const terms = query.match(/[\p{L}\p{N}]+/gu)?.map((term) => `${term}*`) ?? [];
  if (!terms.length) return { stories: [], storyCount: 0 };
  const preview = (await draftMode()).isEnabled;
  const offset = (page - 1) * pageSize;
  return sanityFetch<{
    stories: (TStoryPreview & { category: { title: string; slug: string } })[];
    storyCount: number;
  }>({
    query: storySearchQuery, params: { terms, preview, language, offset, end: offset + pageSize },
  });
}

export async function fetchStoriesOverview(language: string) {
  const preview = (await draftMode()).isEnabled;
  const data = await sanityFetch<{
    page: { title?: string; introduction?: string } | null;
    categories: TStoryCategory[];
  }>({ query: storiesOverviewQuery, params: { pageId: `storiesPage_${language}`, preview, language } });
  return { ...data, preview };
}

export async function fetchStoryCategory(slug: string, language: string, page = 1, pageSize = 20) {
  const preview = (await draftMode()).isEnabled;
  const offset = (page - 1) * pageSize;
  const category = await sanityFetch<(TStoryCategory & { stories: TStoryPreview[]; storyCount: number }) | null>({
    query: storyCategoryQuery, params: { slug, preview, language, offset, end: offset + pageSize },
  });
  return { category, preview };
}

export async function fetchStory(categorySlug: string, slug: string, language: string) {
  const preview = (await draftMode()).isEnabled;
  const story = await sanityFetch<TStory | null>({ query: storyQuery, params: { categorySlug, slug, preview, language } });
  return { story, preview };
}
