import { StoriesHeader, StoriesContent } from "@/components/stories/StoriesLayout";
import styles from "@/components/stories/StoryList.module.css";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { stegaClean } from "next-sanity";
import { StoryImage } from "@/components/stories/StoryImage";
import { StoryNavigation } from "@/components/stories/StoryNavigation";
import { LocalePageRedirects } from "@/locales/LocalePageRedirects";
import { getPathsByLang } from "@/locales/pageSlugUtils";
import { t } from "@/locales/translate";
import { getLang } from "@/locales/utils/useLang";
import { fetchStoryCategory } from "@/sanity/lib/stories";
import { formatDate } from "@/utils/functions";
import { StoryPageSize } from "@/components/stories/StoryPageSize";
import { StoryPagination, storyPageUrl } from "@/components/stories/StoryPagination";
import { getStoryPageSize } from "@/utils/storyPagination";

export default async function CategoryPage({ params, searchParams }: {
  params: Promise<{ lang?: string | string[]; category: string }>;
  searchParams: Promise<{ page?: string | string[]; pageSize?: string | string[] }>;
}) {
  const route = await params;
  const lang = getLang(route.lang);
  const query = await searchParams;
  const requestedPage = Number(query.page);
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0 && requestedPage <= 1_000_000 ? requestedPage : 1;
  const pageSize = getStoryPageSize(query.pageSize);
  const { category, preview } = await fetchStoryCategory(route.category, lang, page, pageSize);
  if (!category) notFound();
  const slug = getPathsByLang(lang).stories;
  const overview = `/${lang}/${slug}`;
  const categoryUrl = `${overview}/${encodeURIComponent(stegaClean(category.slug))}`;
  const totalPages = Math.max(1, Math.ceil(category.storyCount / pageSize));
  if (page > totalPages) redirect(storyPageUrl(categoryUrl, totalPages, pageSize));

  return (
    <>
      <LocalePageRedirects lang={lang} canonicalSlug={slug} segmentIndex={1} />
      <StoriesHeader title={category.title} lang={lang} showSearch={false} image={category.image} />
      <StoriesContent>
          <StoryNavigation lang={lang} items={[{ title: t("stories.page_title", lang), href: overview }, { title: category.title }]} />
          {preview && !category.isActive ? <p>{t("stories.hidden_category", lang)}</p> : null}
          {category.description ? <p>{category.description}</p> : null}
          <div id="stories-list" className={styles.listToolbar}>
            <p>{t("stories.showing_range", lang, {
              start: category.storyCount ? (page - 1) * pageSize + 1 : 0,
              end: Math.min(page * pageSize, category.storyCount),
              total: category.storyCount,
            })}</p>
            <StoryPageSize lang={lang} pageSize={pageSize} categoryUrl={categoryUrl} />
          </div>
          {category.stories.length ? (
            <ul className={styles.storyRows} aria-label={t("stories.stories", lang)}>
              {category.stories.map((story) => (
                <li key={story._id}>
                  <Link className={styles.storyRow} aria-labelledby={`story-${story._id}`}
                    href={`${categoryUrl}/${encodeURIComponent(stegaClean(story.slug))}`}>
                    <StoryImage image={story.listImage} />
                    <h2 id={`story-${story._id}`}>
                      {story.title}
                    </h2>
                    <time dateTime={stegaClean(story.publishedAt)}>{formatDate(lang, stegaClean(story.publishedAt))}</time>
                  </Link>
                </li>
              ))}
            </ul>
          ) : <p>{t("stories.no_stories", lang)}</p>}
          {page === totalPages && category.storyCount > 0 ? (
            <div className={styles.listEnd}>
              <p>{t("stories.end_of_list", lang)}</p>
              <Link href={overview}>{t("stories.explore_another_category", lang)}</Link>
            </div>
          ) : null}
          <StoryPagination lang={lang} page={page} pageSize={pageSize} totalPages={totalPages} categoryUrl={categoryUrl} />
      </StoriesContent>
    </>
  );
}

export async function generateMetadata({ params }: {
  params: Promise<{ lang?: string | string[]; category: string }>;
}): Promise<Metadata> {
  const route = await params;
  const lang = getLang(route.lang);
  const { category } = await fetchStoryCategory(route.category, lang);
  return { title: stegaClean(category?.title) || t("stories.page_title", lang) };
}
