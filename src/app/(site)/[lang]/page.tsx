import { PostCards } from "@/components/cards/PostCard";
import { EventsFrontPage } from "@/components/cards/eventscards/EventsCards";
import { Hero } from "@/components/hero/Hero";
import { HeaderLink } from "@/components/link/HeaderLink";
import { getLang, useLang } from "@/locales/utils/useLang";
import { useLinkWithLang } from "@/locales/utils/useLinkWithLang";
import { useT } from "@/locales/utils/useT";
import { fetchPosts, fetchUpcomingEvents } from "@/sanity/lib/queries";
import { TPostPreview, TUpcomingEvent } from "@/sanity/models/TPost";
import styles from "./page.module.css";
import { getPathsByLang } from "@/locales/pageSlugUtils";
import { ContactForm } from "@/components/forms/ContactForm";
import { Truck } from "@/components/graphics/Truck";

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
  const postPagePath = paths.current;
  return (
    <>
      <div className="footer-theme-teal" />
      <Hero
        title={t("landing.title")}
        subtitle={t("landing.subtitle")}
        image={{ src: "", alt: "Temp alt to just show the image" }}
        callToAction={[
          {
            href: to(postPagePath),
            text: t("post.page_title"),
            forcePalette: "light",
            color: "teal",
          },
          {
            href: to(postPagePath),
            text: t("post.page_title"),
            variant: "outlined",
            color: "white",
            forcePalette: "light",
          },
          {
            href: to(postPagePath),
            text: t("post.page_title"),
            variant: "ghost",
            color: "teal",
            forcePalette: "light",
          },
        ]}
        color={"blue"}
      />
      <section
        className={`page-container ${styles.current}`}
        aria-labelledby="currentSectionTitle"
      >
        <HeaderLink
          component="h2"
          className="text-display-lg"
          headingProps={{ id: "currentSectionTitle", className: "breakout" }}
          href={to(postPagePath)}
        >
          {t("post.page_title")}
        </HeaderLink>
        <EventsFrontPage t={t} events={events} params={params} />
        <PostCards className="breakout" posts={posts} params={params} />
      </section>
      <section className={`page-container green ${styles.contact}`}>
        <header className={`full-width ${styles.contactHeader}`}>
          <h2 className={`text-display-xl ${styles.resizingHeading}`}>
            {t("contact.title")}
          </h2>
        </header>
        <ContactForm
          lang={lang}
          subjects={["dessa", "borde", "komma", "från", "sanity"]}
          color={"green"}
          className={`${styles.contactForm}`}
        />
        <Truck className={styles.truck} />
      </section>
    </>
  );
}
