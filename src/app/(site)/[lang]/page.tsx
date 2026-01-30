import { PostCards } from "@/components/cards/PostCard";
import { StaticCard } from "@/components/cards/StaticCard";
import { Hero } from "@/components/hero/Hero";
import { HeaderLink } from "@/components/link/HeaderLink";
import { getPathsByLang } from "@/locales/pageSlugUtils";
import { getLang, useLang } from "@/locales/utils/useLang";
import { useLinkWithLang } from "@/locales/utils/useLinkWithLang";
import { useT } from "@/locales/utils/useT";
import { fetchPosts, fetchUpcomingEvents } from "@/sanity/lib/queries";
import { TPostPreview, TUpcomingEvent } from "@/sanity/models/TPost";
import styles from "./page.module.css";
import { CalendarEventCardGrid } from "@/components/cards/eventscards/CalendarEventCard";

export default async function HomePreload(props: {
  params: { lang?: string | string[]; postsPage?: string };
}) {
  const params = await props.params;
  const lang = getLang(params.lang);

  const { posts } = await fetchPosts({
    language: lang,
    limit: 3,
    offset: 0,
    filterOutEvents: true,
  });

  const events = await fetchUpcomingEvents({
    language: lang,
    now: new Date().toISOString(),
  });

  return <Home params={params} posts={posts} events={events} />;
}

function Home({
  params,
  posts,
  events,
}: {
  params: { lang?: string | string[] };
  posts: TPostPreview[];

  events: TUpcomingEvent[];
}) {
  const t = useT(params);
  const to = useLinkWithLang(params);
  const lang = useLang(params);
  const paths = getPathsByLang(lang);
  return (
    <>
      <div className="footer-theme-teal" />
      <Hero
        title={t("landing.title")}
        subtitle={t("landing.subtitle")}
        callToAction={[
          {
            href: to(paths.current),
            text: t("post.page_title"),
            forcePalette: "light",
          },
          {
            href: to(paths.about),
            text: t("about.page_title"),
            variant: "ghost",
            forcePalette: "light",
          },
        ]}
        color={"blue"}
      />
      <section className={`page-container ${styles.calenderSection}`}>
        <h2 className="text-display-lg">{t("post.upcoming_events")}</h2>
        <CalendarEventCardGrid events={events} t={t} lang={lang} to={to} />
      </section>
      <section
        className={`page-container ${styles.current}`}
        aria-labelledby="currentSectionTitle"
      >
        <HeaderLink
          component="h2"
          className="text-display-lg"
          headingProps={{ id: "currentSectionTitle", className: "breakout" }}
          href={to(paths.current)}
        >
          {t("post.page_title")}
        </HeaderLink>
        <PostCards className="breakout" posts={posts} params={params} />
        <button
        //TODO
        >
          Se tidigare inlägg
        </button>
      </section>
      <section className={`page-container ${styles.about}`}>
        <h2 className="text-display-xl">{t("about.title")}</h2>
        <div className={`breakout-lg ${styles.aboutCards}`}>
          <StaticCard
            color="red"
            image={{
              src: "/images/hero4.avif",
              position: "before",
              alt: "",
              height: 600,
              width: 400,
            }}
            title={t("cardAbout.title")}
            text={t("cardAbout.text")}
            link={{
              text: t("cardAbout.link_text"),
              href: to(`/${paths.about}`),
            }}
          />
          <StaticCard
            color="orange"
            image={{
              src: "/images/founders.jpeg",
              position: "after",
              alt: "",
              height: 600,
              width: 400,
            }}
            title={t("cardMember.title")}
            text={t("cardMember.text")}
            link={{
              text: t("cardMember.link_text"),
              href: to(`/${paths.member}`),
            }}
          />
        </div>
      </section>
    </>
  );
}
