import { LocalePageRedirects } from "@/locales/LocalePageRedirects";
import { getPostsPageSlug } from "@/locales/pageSlugUtils";
import { urlFor } from "@/sanity/lib/image";
import { fetchPosts } from "@/sanity/lib/queries";
import { TPost } from "@/sanity/models/TPost";
import { getLang } from "@/locales/utils/useLang";
import { useLinkWithLang } from "@/locales/utils/useLinkWithLang";
import { useT } from "@/locales/utils/useT";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

const Posts = async (props: {
  params: { lang?: string | string[]; postsPage?: string };
}) => {
  const params = await props.params;
  const lang = getLang(params.lang);
  const canonicalSlug = getPostsPageSlug(lang);

  const posts = await fetchPosts(lang);
  return (
    <>
      <LocalePageRedirects lang={lang} canonicalSlug={canonicalSlug} />
      <LoadedPosts params={params} posts={posts ?? []} />
    </>
  );
};

export default Posts;

const LoadedPosts = ({
  params,
  posts,
}: {
  params: { lang?: string | string[] };
  posts: TPost[];
}) => {
  const t = useT(params);
  const to = useLinkWithLang(params);
  const lang = getLang(params.lang);
  const postsPageSlug = getPostsPageSlug(lang);
  return (
    <>
      <header className={`page-container ${styles.header}`}>
        <h1 className="text-display-lg breakout">{t("post.page_title")}</h1>
      </header>
      {posts.map((post, i) => (
        <article
          key={post._id}
          className={`page-container ${styles.article} ${getArticleColour(i)}`}
        >
          <Image
            src={urlFor(post.heroImage).width(800).height(400).url()}
            alt={post.heroImage.alt || post.title}
            width={800}
            height={400}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
            priority
            className="breakout"
          />
          <h2 className="text-display-sm">
            <Link href={to(`/${postsPageSlug}/${post.slug.current}`)}>
              {post.title}
            </Link>
          </h2>
          <p className="text-base">{post.summary}</p>
          {i !== posts.length - 1 ? (
            <hr className={`full-width ${styles.break}`} />
          ) : null}
        </article>
      ))}
      {posts.length === 0 ? <p>{t("post.no_posts_found")}</p> : null}
    </>
  );
};

function getArticleColour(index: number) {
  const i = index % 4;
  let ending = "";

  if (index !== 2) {
    ending = "-nobg";
  }
  if (i === 0) return styles["green" + ending];
  if (i === 1) return styles["orange" + ending];
  if (i === 2) return styles["red" + ending];

  return "";
}
