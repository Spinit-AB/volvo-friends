import { t } from "@/locales/translate";
import { urlFor } from "@/sanity/lib/image";
import { fetchPosts } from "@/sanity/lib/queries";
import Link from "next/link";
import Image from "next/image";

// import styles from "./page.module.css";
const Posts = async () => {
  const posts = await fetchPosts();

  return (
    <div
    //   className={styles.page}
    >
      <h1>{t("post.page_title")}</h1>
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
          <h2>
            <Link href={`/aktuellt/${post.slug.current}`}>{post.title}</Link>
          </h2>
          <p>{post.summary}</p>
        </article>
      ))}
    </div>
  );
};

export default Posts;
