import { StoriesHeader, StoriesContent } from "@/components/stories/StoriesLayout";
import styles from "@/components/stories/StoryList.module.css";
import type { Metadata } from "next";
import Link from "next/link";
import { StoryImage } from "@/components/stories/StoryImage";
import { LocalePageRedirects } from "@/locales/LocalePageRedirects";
import { getPathsByLang } from "@/locales/pageSlugUtils";
import { t } from "@/locales/translate";
import { getLang } from "@/locales/utils/useLang";
import { fetchStoriesOverview } from "@/sanity/lib/stories";
import { stegaClean } from "next-sanity";

export default async function StoriesOverview({ params }: {
  params: Promise<{ lang?: string | string[] }>;
}) {
  const lang = getLang((await params).lang);
  const { page, categories, preview } = await fetchStoriesOverview(lang);
  const slug = getPathsByLang(lang).stories;

  return (
    <>
      <LocalePageRedirects lang={lang} canonicalSlug={slug} segmentIndex={1} />
      <StoriesHeader title={page?.title || t("stories.page_title", lang)} lang={lang} />
      <StoriesContent>
          {page?.introduction ? (
            <div role="region" aria-label={t("stories.introduction", lang)}>
              <p>{page.introduction}</p>
            </div>
          ) : null}
          {categories.length ? (
            <ul className={styles.list} aria-label={t("stories.choose_category", lang)}>
              {categories.map((category) => (
                <li key={category._id}>
                  <Link className={styles.card}
                    href={`/${lang}/${slug}/${encodeURIComponent(stegaClean(category.slug))}`}
                    aria-labelledby={`category-${category._id}`}>
                    <StoryImage image={category.image} />
                    <div className={styles.text}>
                      <h2 id={`category-${category._id}`}>{category.title}</h2>
                      {category.description ? <p>{category.description}</p> : null}
                      {preview && !category.isActive ? <p>{t("stories.hidden_category", lang)}</p> : null}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : <p>{t("stories.no_categories", lang)}</p>}
      </StoriesContent>
    </>
  );
}

export async function generateMetadata({ params }: {
  params: Promise<{ lang?: string | string[];  }>;
}): Promise<Metadata> {
  const route = await params;
  const lang = getLang(route.lang);
  const { page } = await fetchStoriesOverview(lang);
  return { title: stegaClean(page?.title) || t("stories.page_title", lang) };
}
