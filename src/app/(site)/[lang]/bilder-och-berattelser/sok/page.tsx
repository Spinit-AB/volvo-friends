import type { Metadata } from "next";
import Link from "next/link";
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
  searchParams: Promise<{ q?: string | string[] }>;
};

function searchTerm(value?: string | string[]) {
  return (Array.isArray(value) ? value[0] : value)?.trim() || "";
}

export default async function StorySearchPage({ params, searchParams }: Props) {
  const lang = getLang((await params).lang);
  const query = searchTerm((await searchParams).q);
  const stories = query ? await searchStories(query, lang) : [];
  const overview = `/${lang}/${getPathsByLang(lang).stories}`;

  return (
    <>
      <StoriesHeader title={t("stories.page_title", lang)} lang={lang} query={query} />
      <StoriesContent>
        <StoryNavigation lang={lang} items={[
          { title: t("stories.page_title", lang), href: overview },
          { title: t("stories.search_title", lang) },
        ]} />
        <h2>{query ? t("stories.search_results", lang, { query }) : t("stories.search_title", lang)}</h2>
        {!query ? <p>{t("stories.search_prompt", lang)}</p> : stories.length ? (
          <>
            <p>{t("stories.search_count", lang, { count: stories.length })}</p>
            <ul className={styles.list}>
              {stories.map((story) => (
                <li key={story._id}>
                  <Link className={styles.card}
                    href={`${overview}/${encodeURIComponent(stegaClean(story.category.slug))}/${encodeURIComponent(stegaClean(story.slug))}`}
                    aria-labelledby={`result-${story._id}`}>
                    <StoryImage image={story.listImage} />
                    <div className={styles.text}>
                      <h3 id={`result-${story._id}`}>{story.title}</h3>
                      <p>{story.category.title}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : <p>{t("stories.search_empty", lang)}</p>}
        <Link href={overview}>← {t("stories.back_categories", lang)}</Link>
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
