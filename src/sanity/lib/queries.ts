"server-only";

import {
  ClientConfig,
  createClient,
  groq,
  type QueryOptions,
  type QueryParams,
} from "next-sanity";
import { draftMode } from "next/headers";
import { apiVersion, dataset, projectId } from "../env";
import { TPost, TPostPreview, TUpcomingEvent } from "../models/TPost";

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

// GROQ query for upcoming events
export const upcomingEventsQuery = groq`
  *[
    _type == "post"
    && isEvent == true
    && defined(event.date)
    && event.date >= $now
    && language == $language
  ]
    | order(event.date asc, event.time asc) {
      _id,
      title,
      slug,
      heroImage,
      prioritized,
      color,
      "date": event.date,
      "time": event.time,
      "place": event.place,
    }
`;

export async function fetchUpcomingEvents({
  language = "sv",
  now,
}: {
  language?: string;
  now: string;
}) {
  return await sanityFetch<TUpcomingEvent[]>({
    query: upcomingEventsQuery,
    params: {
      language,
      now,
    },
  });
}

// GROQ query to fetch all posts (fields match schema)
export const postsQuery = groq`
  *[
    _type == "post"
    && language == $language
  ]
    | order(coalesce(prioritized, false) desc, _createdAt desc)
    [$offset...($offset + $limit)] {
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
    }
`;

export async function fetchPosts({
  language = "sv",
  limit = 20,
  offset = 0,
}: {
  language?: string;
  limit?: number;
  offset?: number;
} = {}) {
  return await sanityFetch<TPostPreview[]>({
    query: postsQuery,
    params: {
      language,
      limit,
      offset,
    },
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
