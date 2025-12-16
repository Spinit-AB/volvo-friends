import { PortableTextWrapper } from "@/components/PortableTextWrapper";
import { t } from "@/locales/translate";
import { urlFor } from "@/sanity/lib/image";
import { fetchPostBySlug } from "@/sanity/lib/queries";
import Image from "next/image";

const Post = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post) {
    return <div>{t("post.not_found")}</div>;
  }

  return (
    <article>
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
      <h1>{post.title}</h1>
      <p>{post.summary}</p>
      {post.body && <PortableTextWrapper value={post.body} />}
    </article>
  );
};

export default Post;
