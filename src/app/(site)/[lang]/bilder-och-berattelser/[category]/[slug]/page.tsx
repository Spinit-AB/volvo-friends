import Link from "next/link";
import { notFound } from "next/navigation";
import { stegaClean } from "next-sanity";
import { PortableTextWrapper } from "@/components/PortableTextWrapper";
import { StoryNavigation } from "@/components/stories/StoryNavigation";
import { LocalePageRedirects } from "@/locales/LocalePageRedirects";
import { getPathsByLang } from "@/locales/pageSlugUtils";
import { t } from "@/locales/translate";
import { getLang } from "@/locales/utils/useLang";
import { fetchStory } from "@/sanity/lib/stories";
import { formatDate } from "@/utils/functions";

export default async function StoryPage({ params }: {
  params: Promise<{ lang?: string | string[]; category: string; slug: string }>;
}) {
  const route = await params;
  const lang = getLang(route.lang);
  const { story, preview } = await fetchStory(route.category, route.slug);
  if (!story) notFound();
  const slug = getPathsByLang(lang).stories;
  const overview = `/${lang}/${slug}`;
  const categoryUrl = `${overview}/${encodeURIComponent(stegaClean(story.category.slug))}`;

  return (
    <>
      <LocalePageRedirects lang={lang} canonicalSlug={slug} segmentIndex={1} />
      <h1>{story.title}</h1>
      <div>
        <article>
          <StoryNavigation lang={lang} items={[
            { title: t("stories.page_title", lang), href: overview },
            { title: story.category.title, href: categoryUrl },
            { title: story.title },
          ]} />
          {preview && !story.category.isActive ? <p>{t("stories.hidden_category", lang)}</p> : null}
          <p><time dateTime={stegaClean(story.publishedAt)}>{formatDate(lang, stegaClean(story.publishedAt))}</time></p>
          <div>
            {story.content?.length ? <PortableTextWrapper value={story.content} /> : <p>{t("stories.no_content", lang)}</p>}
          </div>
          <Link href={categoryUrl}>← {t("stories.back_stories", lang)}</Link>
        </article>
      </div>
    </>
  );
}
