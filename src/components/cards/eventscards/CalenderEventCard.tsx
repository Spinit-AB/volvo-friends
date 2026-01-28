import Clock from "@/components/graphics/Clock";
import { HeaderLink } from "@/components/link/HeaderLink";
import { TTranslate } from "@/locales/utils/useT";
import { TUpcomingEvent } from "@/sanity/models/TPost";
import { formatDateObject } from "@/utils/functions";
import styles from "./CalenderCards.module.css";
import { getPathsByLang } from "@/locales/pageSlugUtils";
import { TColor } from "@/utils/types";

export const CalenderEventCard = ({
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
          className={styles.title}
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

export const CalenderEventCardGrid = ({
  events,
  ...rest
}: {
  events: TUpcomingEvent[];
  t: TTranslate;
  to: (path: string) => string;
  lang: string;
}) => {
  return (
    <div className={`breakout ${styles.grid}`}>
      {events.map((event) => (
        <CalenderEventCard key={event._id} event={event} {...rest} />
      ))}
    </div>
  );
};
