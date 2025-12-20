"server-only";

import { TPost, TPostPreview } from "../models/TPost";
import { draftMode } from "next/headers";
import { type QueryOptions, type QueryParams } from "next-sanity";
import { ClientConfig, createClient, groq } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

const token = process.env.SANITY_API_READ_TOKEN;

const clientConfig: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === "preview",
    studioUrl: "/studio",
  },
};

export const client = createClient(clientConfig);

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}) {
  const isDraftMode = (await draftMode()).isEnabled;

  if (isDraftMode && !token) {
    throw new Error("Missing environment variable SANITY_API_READ_TOKEN");
  }

  let dynamicRevalidate = revalidate;
  if (isDraftMode) {
    // Do not cache in Draft Mode
    dynamicRevalidate = 0;
  } else if (tags.length) {
    // Cache indefinitely if tags supplied, purge with revalidateTag()
    dynamicRevalidate = false;
  }

  return client.fetch<QueryResponse>(query, params, {
    ...(isDraftMode &&
      ({
        token: token,
        perspective: "drafts",
        stega: true,
      } satisfies QueryOptions)),
    next: {
      revalidate: dynamicRevalidate,
      tags,
    },
  });
}

// GROQ query to fetch all posts (fields match schema)

export const postsQuery = groq`*[_type == "post" && language == $language] | order(_createdAt desc) {
  _id,
  _createdAt,
  _updatedAt,
  title,
  slug,
  heroImage,
  summary,
  language,
  event,
  prioritized,
  color
}`;

export async function fetchPosts(language?: string) {
  const lang = language || "sv";
  return await sanityFetch<TPostPreview[]>({
    query: postsQuery,
    params: { language: lang },
  });
}

// Fetch a single post by slug
export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  _createdAt,
  _updatedAt,
  title,
  slug,
  heroImage,
  summary,
  body,
  gallery,
  language,
  event,
  prioritized,
  color
}`;

export async function fetchPostBySlug(slug: string) {
  return await sanityFetch<TPost | null>({
    query: postBySlugQuery,
    params: { slug },
  });
}
