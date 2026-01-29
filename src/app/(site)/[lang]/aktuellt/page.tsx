import { CalendarEventCardGrid } from "@/components/cards/eventscards/CalendarEventCard";
import { Header } from "@/components/header/Header";
import InfinitePostsList from "@/components/infinitePostsList/InfinitePostsList";
import { LocalePageRedirects } from "@/locales/LocalePageRedirects";
import { getPathsByLang } from "@/locales/pageSlugUtils";
import { getLang, useLang } from "@/locales/utils/useLang";
import { useLinkWithLang } from "@/locales/utils/useLinkWithLang";
import { useT } from "@/locales/utils/useT";
import { fetchPosts, fetchUpcomingEvents } from "@/sanity/lib/queries";
import { TUpcomingEvent } from "@/sanity/models/TPost";
import { POSTS_PER_FETCH } from "@/utils/constants";
import styles from "./current.module.css";

const Posts = async (props: {
  params: { lang?: string | string[]; postsPage?: string };
  searchParams?: { offset?: string };
}) => {
  const params = await props.params;
  const lang = getLang(params.lang);
  const canonicalSlug = getPathsByLang(lang).current;
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
  const lang = useLang(params);
  const to = useLinkWithLang(params);
  return (
    <>
      <Header title={t("post.page_title")} color={"teal"} />
      <section className={`page-container ${styles.calenderSection}`}>
        <h2 className="text-display-md">{t("post.upcoming_events")}</h2>
        <CalendarEventCardGrid
          events={events}
          t={t}
          lang={lang}
          to={to}
          color="teal"
        />
      </section>
    </>
  );
};
