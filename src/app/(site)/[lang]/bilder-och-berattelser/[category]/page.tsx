import { StoriesHeader, StoriesContent } from "@/components/stories/StoriesLayout";
import styles from "@/components/stories/StoryList.module.css";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { stegaClean } from "next-sanity";
import { StoryImage } from "@/components/stories/StoryImage";
import { StoryNavigation } from "@/components/stories/StoryNavigation";
import { LocalePageRedirects } from "@/locales/LocalePageRedirects";
import { getPathsByLang } from "@/locales/pageSlugUtils";
import { t } from "@/locales/translate";
import { getLang } from "@/locales/utils/useLang";
import { fetchStoryCategory } from "@/sanity/lib/stories";
import { formatDate } from "@/utils/functions";

export default async function CategoryPage({ params }: {
  params: Promise<{ lang?: string | string[]; category: string }>;
}) {
  const route = await params;
  const lang = getLang(route.lang);
  const { category, preview } = await fetchStoryCategory(route.category, lang);
  if (!category) notFound();
  const slug = getPathsByLang(lang).stories;
  const overview = `/${lang}/${slug}`;
  const categoryUrl = `${overview}/${encodeURIComponent(stegaClean(category.slug))}`;

  return (
    <>
      <LocalePageRedirects lang={lang} canonicalSlug={slug} segmentIndex={1} />
      <StoriesHeader title={category.title} lang={lang} />
      <StoriesContent>
          <StoryNavigation lang={lang} items={[{ title: t("stories.page_title", lang), href: overview }, { title: category.title }]} />
          {preview && !category.isActive ? <p>{t("stories.hidden_category", lang)}</p> : null}
          {category.description ? <p>{category.description}</p> : null}
          {category.stories.length ? (
            <ul className={styles.list} aria-label={t("stories.stories", lang)}>
              {category.stories.map((story) => (
                <li key={story._id}>
                  <Link className={styles.card}
                    href={`${categoryUrl}/${encodeURIComponent(stegaClean(story.slug))}`}
                    aria-labelledby={`story-${story._id}`}>
                    <StoryImage image={story.listImage} />
                    <div className={styles.text}>
                      <h2 id={`story-${story._id}`}>{story.title}</h2>
                      <time dateTime={stegaClean(story.publishedAt)}>{formatDate(lang, stegaClean(story.publishedAt))}</time>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : <p>{t("stories.no_stories", lang)}</p>}
          <Link href={overview}>← {t("stories.back_categories", lang)}</Link>
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
