import { getPostsPageSlug } from "@/locales/pageSlugUtils";
import { getLang } from "@/locales/utils/useLang";
import { useLinkWithLang } from "@/locales/utils/useLinkWithLang";
import { TTranslate } from "@/locales/utils/useT";
import { TUpcomingEvent } from "@/sanity/models/TPost";
import { useId } from "react";
import { EventCard } from "./EventCard";
import styles from "./EventCards.module.css";

export const EventsCards = ({
  t,
  events,
  params,
}: {
  t: TTranslate;
  events: TUpcomingEvent[];
  params: {
    lang?: string | string[] | undefined;
  };
}) => {
  const eventId = useId();

  const lang = getLang(params.lang);

  const to = useLinkWithLang(params);
  const postsPageSlug = getPostsPageSlug(lang);
  const postTo = (slug: string) => to(`/${postsPageSlug}/${slug}`);

  return (
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
  );
};
