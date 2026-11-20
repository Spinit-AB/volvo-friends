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
      <h1>{page?.title || t("stories.page_title", lang)}</h1>
      <div>
        <div>
          {page?.introduction ? (
            <div role="region" aria-label={t("stories.introduction", lang)}>
              <p>{page.introduction}</p>
            </div>
          ) : null}
          {categories.length ? (
            <ul aria-label={t("stories.choose_category", lang)}>
              {categories.map((category) => (
                <li key={category._id}>
                  <Link
                    href={`/${lang}/${slug}/${encodeURIComponent(stegaClean(category.slug))}`}
                    aria-labelledby={`category-${category._id}`}>
                    <StoryImage image={category.image} />
                    <div>
                      <h2 id={`category-${category._id}`}>{category.title}</h2>
                      {category.description ? <p>{category.description}</p> : null}
                      {preview && !category.isActive ? <p>{t("stories.hidden_category", lang)}</p> : null}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : <p>{t("stories.no_categories", lang)}</p>}
        </div>
      </div>
    </>
  );
}
