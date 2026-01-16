import { Breadcrumbs } from "@/components/breadcumbs/Breadcrumbs";
import Gallery from "@/components/gallery/Gallery";
import { PortableTextWrapper } from "@/components/PortableTextWrapper";
import { LocalePageRedirects } from "@/locales/LocalePageRedirects";
import { getPathsByLang } from "@/locales/pageSlugUtils";
import { urlFor } from "@/sanity/lib/image";
import { fetchPostBySlug } from "@/sanity/lib/queries";
import { TEvent, TPost } from "@/sanity/models/TPost";
import { TTranslate, useT } from "@/locales/utils/useT";
import { getLang, useLang } from "@/locales/utils/useLang";
import Image from "next/image";
import styles from "./page.module.css";
import { formatDate } from "@/utils/functions";
import { useFormattedTime } from "@/locales/utils/useFormattedTime";
import { ExternalLink } from "@/components/link/ExternalLink";
import { TColor } from "@/utils/types";

const Post = async (props: {
  params: Promise<{ slug: string; lang?: string | string[] }>;
}) => {
  const params = await props.params;

  const lang = getLang(params.lang);
  const canonicalSlug = getPathsByLang(lang).current;
  const post = await fetchPostBySlug(params.slug);

  return (
    <>
      <LocalePageRedirects
        lang={lang}
        canonicalSlug={canonicalSlug}
        segmentIndex={-2}
      />
      <PostArticle params={params} post={post} />
    </>
  );
};

export default Post;

export const PostArticle = ({
  params,
  post,
}: {
  params: { slug: string; lang?: string | string[] };
  post: TPost | null;
}) => {
  const t = useT(params);
  const lang = useLang(params);

  if (!post) {
    return (
      <section className="page-container">
        {/* TODO: Add a sad image or something here */}
        <p className="">{t("post.not_found")}</p>
      </section>
    );
  }

  const color = getBgColour(post.color);
  return (
    <>
      <div className={`footer-theme-${color}`} />
      <Breadcrumbs
        params={params}
        labelOverrides={[{ override: post.title, position: -1 }]}
        className={`page-container ${styles.breadcrumbs}`}
        olClassName="full-width"
      />
      <article className={`page-container text-base ${styles.root} ${color}`}>
        {post.heroImage && (
          <Image
            src={urlFor(post.heroImage).width(800).height(400).url()}
            alt={post.heroImage.alt}
            width={800}
            height={400}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
            priority
            className="breakout"
          />
        )}
        <div className={styles.inner}>
          <h1 className="text-display-lg">{post.title}</h1>
          <p className="text-base-italic">
            {t("common.created_at")}: {formatDate(lang, post._createdAt)}
          </p>
          <p
          //TODO: Should we even show summary on this page?
          //TODO: Show the date the post was created
          >
            {post.summary}
          </p>

          {post.event?.startTime && (
            <EventSection t={t} event={post.event} lang={lang} />
          )}
          {post.body && <PortableTextWrapper value={post.body} />}

          {post.gallery && post.gallery.length > 0 && (
            <Gallery images={post.gallery} postTitle={post.title} lang={lang} />
          )}
        </div>
      </article>
    </>
  );
};

const EventSection = ({
  t,
  event,
  lang,
}: {
  t: TTranslate;
  event: TEvent;
  lang: string;
}) => {
  const formatTime = useFormattedTime(lang);
  return (
    <table className={styles.eventTable}>
      <tbody>
        <tr>
          <th>{t("common.date")}</th>
          <td>{formatDate(lang, event.date ?? "")}</td>
        </tr>
        <tr>
          <th>{t("common.time")}</th>
          <td> {formatTime(event.startTime, event.endTime)}</td>
        </tr>
        <tr>
          <th>{t("common.place")}</th>
          <td>{event.place}</td>
        </tr>
        {event.signUpEmail && (
          <tr>
            <th>{t("post.sign_up_email")}</th>
            <td>
              <ExternalLink type="email" href={`@mailto:${event.signUpEmail}`}>
                {event.signUpEmail}
              </ExternalLink>
            </td>
          </tr>
        )}
        {event.signUpDeadline && (
          <tr>
            <th>{t("post.sign_up_deadline")}</th>
            <td>{formatDate(lang, event.signUpDeadline ?? "")}</td>
          </tr>
        )}
        {event.eventInfo?.map((row) => (
          <tr key={row._key}>
            <th>{row.key}</th>
            <td>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function getBgColour(colorOverrider?: TColor) {
  if (colorOverrider) return colorOverrider;

  switch (Math.floor(Math.random() * 5)) {
    case 0:
      return "blue";
    case 1:
      return "teal";
    case 2:
      return "green";
    case 3:
      return "orange";
    case 4:
    default:
      return "red";
  }
}
