import { urlFor } from "@/sanity/lib/image";
import { fetchPosts } from "@/sanity/lib/queries";
import { TPost } from "@/sanity/models/TPost";
import { getLang } from "@/src/utils/useLang";
import { useLinkWithLang } from "@/src/utils/useLinkWithLang";
import { useT } from "@/src/utils/useT";
import Image from "next/image";
import Link from "next/link";

// import styles from "./page.module.css";
const Posts = async (props: { params: { lang?: string | string[] } }) => {
  const params = await props.params;
  const posts = await fetchPosts(getLang(params.lang));

  return <LoadedPosts params={params} posts={posts ?? []} />;
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
  return (
    <div className="page-container">
      <h1 className="text-display-lg">{t("post.page_title")}</h1>
      {posts.map((post) => (
        <article key={post._id}>
          <Image
            src={urlFor(post.heroImage).width(800).height(400).url()}
            alt={post.heroImage.alt || post.title}
            width={800}
            height={400}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
            priority
          />
          <h2 className="text-display-sm">
            <Link href={to(`/aktuellt/${post.slug.current}`)}>
              {post.title}
            </Link>
          </h2>
          <p className="text-base">{post.summary}</p>
        </article>
      ))}
      {posts.length === 0 ? <p>{t("post.no_posts_found")}</p> : null}
    </div>
  );
};
