// import styles from "./page.module.css";

import { fetchPosts } from "@/sanity/lib/queries";
import Link from "next/link";

const Posts = async () => {
  const posts = await fetchPosts();

  return (
    <div
    //   className={styles.page}
    >
      <h1>Aktuellt</h1>
      {posts.map((post) => (
        <article key={post._id}>
          <h2>
            <Link href={`/aktuellt/${post.slug.current}`}>{post.title}</Link>
          </h2>
          <p>{post.summary}</p>
          <p>{post.language}</p>
        </article>
      ))}
    </div>
  );
};

export default Posts;
