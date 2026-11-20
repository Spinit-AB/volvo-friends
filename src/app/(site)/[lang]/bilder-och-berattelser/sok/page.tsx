import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { StoryPageSize } from "@/components/stories/StoryPageSize";
import { StoryPagination, storyPageUrl } from "@/components/stories/StoryPagination";
import { getStoryPageSize } from "@/utils/storyPagination";
import { formatDate } from "@/utils/functions";
import { stegaClean } from "next-sanity";
import { StoriesHeader, StoriesContent } from "@/components/stories/StoriesLayout";
import { StoryImage } from "@/components/stories/StoryImage";
import { StoryNavigation } from "@/components/stories/StoryNavigation";
import styles from "@/components/stories/StoryList.module.css";
import { getPathsByLang } from "@/locales/pageSlugUtils";
import { getLang } from "@/locales/utils/useLang";
import { t } from "@/locales/translate";
import { searchStories } from "@/sanity/lib/stories";

type Props = {
  params: Promise<{ lang?: string | string[] }>;
  searchParams: Promise<{ q?: string | string[]; page?: string | string[]; pageSize?: string | string[] }>;
};

function searchTerm(value?: string | string[]) {
  return (Array.isArray(value) ? value[0] : value)?.trim() || "";
}

export default async function StorySearchPage({ params, searchParams }: Props) {
  const lang = getLang((await params).lang);
  const filters = await searchParams;
  const query = searchTerm(filters.q);
  const requestedPage = Number(filters.page);
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0 && requestedPage <= 1_000_000 ? requestedPage : 1;
  const pageSize = getStoryPageSize(filters.pageSize);
  const { stories, storyCount } = query ? await searchStories(query, lang, page, pageSize) : { stories: [], storyCount: 0 };
  const overview = `/${lang}/${getPathsByLang(lang).stories}`;
  const searchUrl = `${overview}/${lang === "sv" ? "sok" : "search"}`;
  const resultsUrl = `${searchUrl}?${new URLSearchParams({ q: query })}`;
  const totalPages = Math.max(1, Math.ceil(storyCount / pageSize));
  if (query && page > totalPages) redirect(storyPageUrl(resultsUrl, totalPages, pageSize));

  return (
    <>
      <StoriesHeader title={t("stories.page_title", lang)} lang={lang} query={query} />
      <StoriesContent>
        <StoryNavigation lang={lang} items={[
          { title: t("stories.page_title", lang), href: overview },
          { title: t("stories.search_title", lang) },
        ]} />
        <h2>{query ? t("stories.search_results", lang, { query }) : t("stories.search_title", lang)}</h2>
        {!query ? <p>{t("stories.search_prompt", lang)}</p> : storyCount ? (
          <>
            <div id="stories-list" className={styles.listToolbar}>
              <p>{t("stories.showing_range", lang, {
                start: (page - 1) * pageSize + 1,
                end: Math.min(page * pageSize, storyCount),
                total: storyCount,
              })}</p>
              <StoryPageSize lang={lang} pageSize={pageSize} categoryUrl={searchUrl} />
            </div>
            <ul className={styles.storyRows} aria-label={t("stories.search_title", lang)}>
              {stories.map((story) => (
                <li key={story._id}>
                  <Link className={styles.storyRow} aria-labelledby={`story-${story._id}`}
                    href={`${overview}/${encodeURIComponent(stegaClean(story.category.slug))}/${encodeURIComponent(stegaClean(story.slug))}`}>
                  <StoryImage image={story.listImage} />
                  <div className={styles.resultText}>
                    <h3 id={`story-${story._id}`}>
                        {story.title}
                    </h3>
                    <p>{story.category.title}</p>
                  </div>
                  <time dateTime={stegaClean(story.publishedAt)}>{formatDate(lang, stegaClean(story.publishedAt))}</time>
                  </Link>
                </li>
              ))}
            </ul>
            {page === totalPages ? (
              <div className={styles.listEnd}>
                <p>{t("stories.end_of_search", lang)}</p>
                <Link href={overview}>{t("stories.explore_categories", lang)}</Link>
              </div>
            ) : null}
            <StoryPagination lang={lang} page={page} pageSize={pageSize} totalPages={totalPages} categoryUrl={resultsUrl} />
          </>
        ) : (
          <div className={styles.listEnd}>
            <p>{t("stories.search_empty", lang)}</p>
            <Link href={overview}>{t("stories.explore_categories", lang)}</Link>
          </div>
        )}
      </StoriesContent>
    </>
  );
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const lang = getLang((await params).lang);
  const query = searchTerm((await searchParams).q);
  return {
    title: query ? t("stories.search_results", lang, { query }) : t("stories.search_title", lang),
    robots: { index: false, follow: true },
  };
}
