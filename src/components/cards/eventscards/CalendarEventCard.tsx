import Clock from "@/components/graphics/Clock";
import { HeaderLink } from "@/components/link/HeaderLink";
import { getPathsByLang } from "@/locales/pageSlugUtils";
import { TTranslate } from "@/locales/utils/useT";
import { TUpcomingEvent } from "@/sanity/models/TPost";
import { formatDateObject } from "@/utils/functions";
import { TColor } from "@/utils/types";
import styles from "./CalendarCards.module.css";
import { urlFor } from "@/sanity/lib/image";

export const CalendarEventCard = ({
  event,
  t,
  to,
  lang,
  color = "blue",
}: {
  event: TUpcomingEvent;
  t: TTranslate;
  to: (path: string) => string;
  lang: string;
  color?: TColor;
}) => {
  const date = formatDateObject(lang, event.date);
  const getSignupDeadline = () => {
    if (event.signUpDeadline) {
      const deadlineDate = new Date(event.signUpDeadline);
      const now = new Date();
      if (deadlineDate >= now) {
        // Format deadline date for display, e.g. "12:e februari"
        const day = deadlineDate.getDate();
        const month = deadlineDate.toLocaleString(lang, {
          month: "long",
        });
        return t("Sista anmälan {date}", { date: `${day}:e ${month}` });
      } else {
        return t("Anmälningsdatum har passerat");
      }
    }
    return null;
  };

  const signUpDeadline = getSignupDeadline();

  const postPageSlug = getPathsByLang(lang);
  return (
    <article className={styles.root}>
      <header
        className={[styles.header, styles[color]].filter(Boolean).join(" ")}
        style={{
          backgroundImage: `url(${urlFor(event.heroImage).width(800).height(300).url()})`,
        }}
      >
        <time className={styles.dateRow} dateTime={event.date}>
          <span className={`text-display-md ${styles.day}`}>{date.day}</span>
          <span className={`text-base-bold ${styles.month}`}>
            {date.monthShort}
          </span>
          <span className={`text-base-bold  ${styles.year}`}>{date.year}</span>
          <span className={`${styles.time}`}>
            <Clock className={`${styles.clock}`} />
            {event.startTime} {event.endTime && ` - ${event.endTime}`}
          </span>
        </time>
      </header>
      <section className={styles.content}>
        <HeaderLink
          component="h3"
          href={to(`/${postPageSlug.current}/${event.slug.current}`)}
          headingProps={{ className: styles.heading }}
          className={[styles.title, color ? styles[color] : ""]
            .filter(Boolean)
            .join(" ")}
        >
          {event.title}
        </HeaderLink>

        {signUpDeadline ? (
          <p className={`text-base-italic ${styles.statusRow}`}>
            {signUpDeadline}
          </p>
        ) : null}
      </section>
    </article>
  );
};

export const CalendarEventCardGrid = ({
  events,
  ...rest
}: {
  events: TUpcomingEvent[];
  t: TTranslate;
  to: (path: string) => string;
  lang: string;
  color?: TColor;
}) => {
  return (
    <div className={`${events.length > 1 ? "breakout" : ""} ${styles.grid}`}>
      {events.map((event) => (
        <CalendarEventCard key={event._id} event={event} {...rest} />
      ))}
      {events.length < 1 ? (
        <p className="text-base-italic">{rest.t("post.no_events_found")}</p>
      ) : null}
    </div>
  );
};
