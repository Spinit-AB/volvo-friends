import InfinitePostsList from "@/components/infinitePostsList/InfinitePostsList";
import { LocalePageRedirects } from "@/locales/LocalePageRedirects";
import { getPostsPageSlug } from "@/locales/pageSlugUtils";
import { getLang } from "@/locales/utils/useLang";
import { useLinkWithLang } from "@/locales/utils/useLinkWithLang";
import { TTranslate, useT } from "@/locales/utils/useT";
import { urlFor } from "@/sanity/lib/image";
import { fetchPosts, fetchUpcomingEvents } from "@/sanity/lib/queries";
import { TColor, TUpcomingEvent } from "@/sanity/models/TPost";
import { POSTS_PER_FETCH } from "@/utils/constants";
import Image from "next/image";
import LinkNextJs from "next/link";
import { useId } from "react";
import styles from "./page.module.css";
import { useFormattedTime } from "@/locales/utils/useFormattedTime";
import { formatDate } from "@/utils/functions";

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

  console.log({ searchParams: props.searchParams });

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
  const to = useLinkWithLang(params);
  const lang = getLang(params.lang);
  const postsPageSlug = getPostsPageSlug(lang);
  const eventId = useId();

  const postTo = (slug: string) => to(`/${postsPageSlug}/${slug}`);
  return (
    <>
      <header className={`page-container ${styles.header}`}>
        <h1 className="text-display-lg breakout">{t("post.page_title")}</h1>
      </header>
      <section className="page-container" aria-labelledby={eventId}>
        <h2 className="text-display-sm" id={eventId}>
          {t("post.upcoming_events")}
        </h2>

        <div
          className={
            events.length > 1
              ? `breakout ${styles.eventsContainer}`
              : styles.singleEventContainer
          }
        >
          <div className={styles.eventsInnerGrid}>
            {events.length ? (
              events.map((event, i) => (
                <EventCard
                  index={i}
                  key={event._id}
                  event={event}
                  t={t}
                  to={postTo}
                  lang={lang}
                />
              ))
            ) : (
              <p>{t("post.no_events_found")}</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

function getBlockColour(index: number, colorOverrider?: TColor) {
  const i = index % 4;

  if (colorOverrider) return colorOverrider;

  if (i === 0) return "green";
  if (i === 1) return "orange";
  if (i === 2) return "red";

  return "";
}

const EventCard = ({
  event,
  t,
  index,
  to,
  lang,
}: {
  event: TUpcomingEvent;
  t: TTranslate;
  index: number;
  to: (path: string) => string;
  lang: string;
}) => {
  const img = event.heroImage;
  const formatTime = useFormattedTime(lang);
  return (
    <article
      className={`${styles.eventCard} ${getBlockColour(index, event.color)}`}
    >
      <Image
        src={urlFor(img).width(300).height(300).url()}
        alt={img.alt}
        width={300}
        height={300}
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
        loading="lazy"
      />
      <h3>
        <LinkNextJs href={to(event.slug.current)}>{event.title}</LinkNextJs>
      </h3>
      <table>
        <tr>
          <th>{t("common.date")}</th>
          <td>{formatDate(lang, event.date)}</td>
        </tr>
        <tr>
          <th>{t("common.time")}</th>
          <td>{formatTime(event.startTime, event.endTime)}</td>
        </tr>
        <tr>
          <th>{t("common.place")}</th>
          <td>{event.place}</td>
        </tr>
      </table>
    </article>
  );
};
