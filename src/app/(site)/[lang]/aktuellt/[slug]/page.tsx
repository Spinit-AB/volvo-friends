import { Breadcrumbs } from "@/components/breadcumbs/Breadcrumbs";
import Gallery from "@/components/gallery/Gallery";
import { PortableTextWrapper } from "@/components/PortableTextWrapper";
import { LocalePageRedirects } from "@/locales/LocalePageRedirects";
import { getPostsPageSlug } from "@/locales/pageSlugUtils";
import { urlFor } from "@/sanity/lib/image";
import { fetchPostBySlug } from "@/sanity/lib/queries";
import { TPost } from "@/sanity/models/TPost";
import { useT } from "@/locales/utils/useT";
import { getLang, useLang } from "@/locales/utils/useLang";
import Image from "next/image";
import styles from "./page.module.css";

const Post = async (props: {
  params: Promise<{ slug: string; lang?: string | string[] }>;
}) => {
  const params = await props.params;

  const lang = getLang(params.lang);
  const canonicalSlug = getPostsPageSlug(lang);
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

  return (
    <>
      {post.color ? <div className={`footer-theme-${post.color}`} /> : null}
      <Breadcrumbs
        params={params}
        labelOverrides={[{ override: post.title, position: -1 }]}
        className={`page-container ${styles.breadcrumbs}`}
        olClassName="full-width"
      />
      <article className={`page-container text-base ${styles.root}`}>
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
        <h1 className="text-display-lg">{post.title}</h1>
        <p
        //TODO: Should we even show summary on this page?
        //TODO: Show the date the post was created
        >
          {post.summary}
        </p>
        {post.body && <PortableTextWrapper value={post.body} />}

        {post.gallery && post.gallery.length > 0 && (
          <Gallery images={post.gallery} postTitle={post.title} lang={lang} />
        )}

        <p>{post.event ? "Event present" : "no event"}</p>
        <p>{post.color}</p>
      </article>
    </>
  );
};
