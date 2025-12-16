// import styles from "./page.module.css";

import { fetchPosts } from "@/sanity/lib/queries";
import { createClient } from "next-sanity";
const client = createClient({
  projectId: "ccye0bib",
  dataset: "production",
  apiVersion: "2025-12-15",
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN, // Add this line
});

const Post = async () => {
  const posts = await fetchPosts();

  client.fetch('*[_type == "post"]').then(console.log);
  console.log(posts);

  return (
    <div
    //   className={styles.page}
    >
      <h1>Aktuellt</h1>
      {posts.map((post) => (
        <article key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.summary}</p>
        </article>
      ))}
    </div>
  );
};

export default Post;
