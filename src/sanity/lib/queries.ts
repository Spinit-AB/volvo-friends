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
import { TFooter } from "../models/TFooter";
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
    && defined(date)
    && date >= $now
    && language == $language
  ]
    | order(date asc, startTime asc) {
      _id,
      title,
      slug,
      heroImage,
      prioritized,
      color,
      date,
      startTime,
      endTime,
      place,
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
// Helper to build posts query with or without event filtering
function buildPostsQuery(filterOutEvents: boolean) {
  const eventFilter = filterOutEvents
    ? "&& (!defined(isEvent) || isEvent != true)"
    : "";
  return groq`
    {
      "posts": *[
        _type == "post"
        && language == $language
        ${eventFilter}
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
          "event":  {
            "date": date,
            "startTime": startTime,
            "endTime": endTime,
            "place": place,
            "signUpEmail": signUpEmail,
            "signUpDeadline": signUpDeadline,
            "eventInfo": eventInfo
          },
          prioritized,
          color
        },
      "total": count(*[
        _type == "post"
        && language == $language
        ${eventFilter}
      ])
    }
  `;
}

export async function fetchPosts({
  language = "sv",
  limit = 20,
  offset = 0,
  filterOutEvents = false,
}: {
  language?: string;
  limit?: number;
  offset?: number;
  filterOutEvents?: boolean;
} = {}) {
  const query = buildPostsQuery(!!filterOutEvents);
  return await sanityFetch<{
    posts: TPostPreview[];
    total: number;
  }>({
    query,
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
  "event": {
    "date": date,
    "startTime": startTime,
    "endTime": endTime,
    "place": place,
    "signUpEmail": signUpEmail,
    "signUpDeadline": signUpDeadline,
    "eventInfo": eventInfo
  },
  prioritized,
  color
}`;

export async function fetchPostBySlug(slug: string) {
  return await sanityFetch<TPost | null>({
    query: postBySlugQuery,
    params: { slug },
  });
}

const footerQuery = `*[_type == "footer"][0]{
  documents[]{
    _key,
    asset->{_id, url},
    title,
    _type
  },
  address,
  links[]{
    _key,
    title,
    url,
    _type
  }
}`;

export async function fetchFooter() {
  return await sanityFetch<TFooter | null>({
    query: footerQuery,
    revalidate: 60,
  });
}
