import { sanityFetch } from "@/sanity/lib/queries";
import { MetadataRoute } from "next";

const BASE_URL = "https://volvofriends.com";
const LANG = "sv";

async function getPosts() {
  const query = `*[_type == "post" && language == $lang && !(_id in path("drafts.**"))] | order(_publishedAt desc) {
    slug,
    _updatedAt
  }`;

  try {
    return await sanityFetch({ query, params: { lang: LANG } });
  } catch (error) {
    console.error("Failed to fetch posts for sitemap:", error);
    return [];
  }
}

// Type for posts returned from Sanity
interface SitemapPost {
  slug: { current: string };
  _updatedAt?: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = (await getPosts()) as SitemapPost[];

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/${LANG}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/${LANG}/aktuellt`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/${LANG}/om-oss`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/${LANG}/bli-medlem`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/${LANG}/kontakt`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  // Dynamic post pages
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/${LANG}/aktuellt/${post.slug.current}`,
    lastModified: post._updatedAt ? new Date(post._updatedAt) : new Date(),
    changeFrequency: "never" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...postPages];
}
