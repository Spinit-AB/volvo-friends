import { LocalePageRedirects } from "@/locales/LocalePageRedirects";
import { getPostsPageSlug } from "@/locales/pageSlugUtils";
import { getLang } from "@/locales/utils/useLang";
import { useLinkWithLang } from "@/locales/utils/useLinkWithLang";
import { TTranslate, useT } from "@/locales/utils/useT";
import { urlFor } from "@/sanity/lib/image";
import { fetchPosts, fetchUpcomingEvents } from "@/sanity/lib/queries";
import { TColor, TPostPreview, TUpcomingEvent } from "@/sanity/models/TPost";
import Image from "next/image";
import LinkNextJs from "next/link";
import styles from "./page.module.css";
import { useId } from "react";

const PAGE_SIZE = 2;

const Posts = async (props: {
  params: { lang?: string | string[]; postsPage?: string };
}) => {
  const params = await props.params;
  const lang = getLang(params.lang);
  const canonicalSlug = getPostsPageSlug(lang);

  const posts = await fetchPosts({
    language: lang,
    limit: PAGE_SIZE,
    offset: 0,
  });

  const events = await fetchUpcomingEvents({
    language: lang,
    now: new Date().toISOString(),
  });

  return (
    <>
      <LocalePageRedirects lang={lang} canonicalSlug={canonicalSlug} />
      <LoadedPosts params={params} posts={posts ?? []} events={events ?? []} />
    </>
  );
};

export default Posts;

/*
TODO: 
Vad ska vi göra med kommande evenemang? Hur ska de prioritera dem?  
Behöver de se annorlunda ut i studion? 
*/

const LoadedPosts = ({
  params,
  posts,
  events,
}: {
  params: { lang?: string | string[] };
  posts: TPostPreview[];
  events: TUpcomingEvent[];
}) => {
  const t = useT(params);
  const to = useLinkWithLang(params);
  const lang = getLang(params.lang);
  const postsPageSlug = getPostsPageSlug(lang);
  const eventId = useId();
  const postId = useId();

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
                />
              ))
            ) : (
              <p>{t("post.no_events_found")}</p>
            )}
          </div>
        </div>
      </section>
      <section aria-labelledby={postId}>
        <header className="page-container">
          <h2 className="text-display-sm" id={postId}>
            {t("post.posts_header")}
          </h2>
        </header>
        {posts.map((post, i) => (
          <article
            key={post._id}
            className={`page-container ${styles.article} ${getBlockColour(
              i,
              post.prioritized,
              post.color
            )}`}
          >
            <div className={styles.imgContainer}>
              <Image
                src={urlFor(post.heroImage).width(800).height(400).url()}
                alt={post.heroImage.alt || post.title}
                width={800}
                height={400}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
                priority
              />
            </div>
            <div className={` ${styles.articleTextWrapper}`}>
              <h3 className="text-display-sm">
                <LinkNextJs href={postTo(post.slug.current)}>
                  {post.title}
                </LinkNextJs>
              </h3>

              <p>{post.summary}</p>
            </div>
            {i !== posts.length - 1 ? (
              <hr className={`full-width ${styles.break}`} />
            ) : null}
          </article>
        ))}
        {posts.length === 0 ? <p>{t("post.no_posts_found")}</p> : null}
      </section>
    </>
  );
};

function getBlockColour(
  index: number,
  isPrio?: boolean,
  colorOverrider?: TColor
) {
  const i = index % 4;
  const ending = isPrio ? "" : "-nobg";

  if (colorOverrider) return colorOverrider + ending;

  if (i === 0) return "green" + ending;
  if (i === 1) return "orange" + ending;
  if (i === 2) return "red" + ending;

  return "";
}

const EventCard = ({
  event,
  t,
  index,
  to,
}: {
  event: TUpcomingEvent;
  t: TTranslate;
  index: number;
  to: (path: string) => string;
}) => {
  const img = event.heroImage;
  return (
    <article
      className={`${styles.eventCard} ${getBlockColour(
        index,
        event.prioritized,
        event.color
      )}`}
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
          <td>{event.date}</td>
        </tr>
        <tr>
          <th>{t("common.time")}</th>
          <td>{event.time}</td>
        </tr>
        <tr>
          <th>{t("common.place")}</th>
          <td>{event.place}</td>
        </tr>
      </table>
    </article>
  );
};
