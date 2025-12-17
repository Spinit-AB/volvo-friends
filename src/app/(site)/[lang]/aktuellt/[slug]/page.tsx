import { PortableTextWrapper } from "@/components/PortableTextWrapper";
import { urlFor } from "@/sanity/lib/image";
import { fetchPostBySlug } from "@/sanity/lib/queries";
import { TPost } from "@/sanity/models/TPost";
import { useT } from "@/src/utils/useT";
import Image from "next/image";

const Post = async ({
  params,
}: {
  params: Promise<{ slug: string; lang?: string | string[] }>;
}) => {
  const awaitedParams = await params;
  const post = await fetchPostBySlug(awaitedParams.slug);

  return <PostArticle awaitedParams={awaitedParams} post={post} />;
};

export default Post;

const PostArticle = ({
  awaitedParams,
  post,
}: {
  awaitedParams: { slug: string; lang?: string | string[] };
  post: TPost | null;
}) => {
  const t = useT(awaitedParams);
  if (!post) {
    return <div>{t("post.not_found")}</div>;
  }

  return (
    <article className="page-container text-base">
      {post.heroImage && (
        <Image
          src={urlFor(post.heroImage).width(800).height(400).url()}
          alt={post.heroImage.alt || post.title}
          width={800}
          height={400}
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
          priority
        />
      )}
      <h1 className="text-display-lg">{post.title}</h1>
      <p>{post.summary}</p>
      {post.body && <PortableTextWrapper value={post.body} />}
    </article>
  );
};
