import { EventsCards } from "@/components/eventscards/EventsCards";
import InfinitePostsList from "@/components/infinitePostsList/InfinitePostsList";
import { LocalePageRedirects } from "@/locales/LocalePageRedirects";
import { getPostsPageSlug } from "@/locales/pageSlugUtils";
import { getLang } from "@/locales/utils/useLang";
import { useT } from "@/locales/utils/useT";
import { fetchPosts, fetchUpcomingEvents } from "@/sanity/lib/queries";
import { TUpcomingEvent } from "@/sanity/models/TPost";
import { POSTS_PER_FETCH } from "@/utils/constants";
import styles from "./page.module.css";

const Posts = async (props: {
  params: { lang?: string | string[]; postsPage?: string };
  searchParams?: { offset?: string };
}) => {
  const params = await props.params;
  const lang = getLang(params.lang);
  const canonicalSlug = getPostsPageSlug(lang);
  const searchParams = await props.searchParams;
  const offset = Number(searchParams?.offset ?? 0);

  const { posts, total } = await fetchPosts({
    language: lang,
    limit: POSTS_PER_FETCH,
    offset: offset,
  });

  const events = await fetchUpcomingEvents({
    language: lang,
    now: new Date().toISOString(),
  });

  return (
    <>
      <LocalePageRedirects lang={lang} canonicalSlug={canonicalSlug} />
      <HeaderAndLoadedEvents params={params} events={events ?? []} />
      <InfinitePostsList
        initialPosts={posts ?? []}
        total={total}
        lang={lang}
        postsPageSlug={canonicalSlug}
      />
    </>
  );
};

export default Posts;

/*
TODO: 
Vad ska vi göra med kommande evenemang? Hur ska de prioritera dem?  
Behöver de se annorlunda ut i studion? 
*/

const HeaderAndLoadedEvents = ({
  params,
  events,
}: {
  params: { lang?: string | string[] };
  events: TUpcomingEvent[];
}) => {
  const t = useT(params);
  return (
    <>
      <header className={`page-container ${styles.header}`}>
        <h1 className="text-display-lg breakout">{t("post.page_title")}</h1>
      </header>
      <EventsCards t={t} events={events} params={params} />
    </>
  );
};
