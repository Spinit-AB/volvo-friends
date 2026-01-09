import { useFormattedTime } from "@/locales/utils/useFormattedTime";
import { TTranslate } from "@/locales/utils/useT";
import { urlFor } from "@/sanity/lib/image";
import { TColor, TUpcomingEvent } from "@/sanity/models/TPost";
import { formatDate } from "@/utils/functions";
import Image from "next/image";
import LinkNextJs from "next/link";
import styles from "./EventCards.module.css";

export const EventCard = ({
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
        <tbody>
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
        </tbody>
      </table>
    </article>
  );
};

function getBlockColour(index: number, colorOverrider?: TColor) {
  const i = index % 3;

  if (colorOverrider) return colorOverrider;

  if (i === 0) return "green";
  if (i === 1) return "teal";
  if (i === 2) return "blue";

  return "";
}
