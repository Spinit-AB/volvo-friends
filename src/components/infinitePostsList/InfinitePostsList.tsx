"use client";
import { urlFor } from "@/sanity/lib/image";
import { TColor, TPostPreview } from "@/sanity/models/TPost";
import { POSTS_PER_FETCH } from "@/utils/constants";
import Image from "next/image";
import LinkNextJs from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import styles from "./InfinitePostsList.module.css";
import { t } from "@/locales/translate";

export default function InfinitePostsList({
  initialPosts,
  total,
  lang,
  postsPageSlug,
}: {
  initialPosts: TPostPreview[];
  total: number;
  lang: string;
  postsPageSlug: string;
}) {
  const [posts, setPosts] = useState<TPostPreview[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const postsId = useId();

  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchMore = useCallback(async () => {
    if (loading || posts.length >= total) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/posts?language=${lang}&limit=${POSTS_PER_FETCH}&offset=${posts.length}`
      );
      const data = await res.json();
      const newPosts: TPostPreview[] = data.posts || [];
      const newPostLength = posts.length + newPosts.length;
      console.log(newPostLength, data.total);
      // Stop loading when all posts are loaded

      setPosts((prev) => {
        const existingIds = new Set(prev.map((p) => p._id));
        const filtered = newPosts.filter((p) => !existingIds.has(p._id));
        return [...prev, ...filtered];
      });
    } catch (e) {
      // Optionally handle error
    } finally {
      setLoading(false);
    }
  }, [loading, posts.length, total, lang]);

  useEffect(() => {
    // Only set up observer if there are more posts to load
    if (posts.length >= total) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMore();
        }
      },
      { threshold: 1 }
    );
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
      observer.disconnect();
    };
  }, [fetchMore, posts.length, total]);

  const showSkeleton = posts.length < total || loading;

  return (
    <section aria-labelledby={postsId}>
      <header className="page-container">
        <h2 className="text-display-sm" id={postsId}>
          {t("post.posts_header", lang)}
        </h2>
      </header>
      {posts.map((post, i) => (
        <article
          key={post._id}
          className={`page-container ${styles.article} ${getBlockColour(
            i,
            post.prioritized,
            post.color
          )}`}
        >
          <div className={styles.imgContainer}>
            <Image
              src={urlFor(post.heroImage).width(800).height(400).url()}
              alt={post.heroImage?.alt || post.title}
              width={800}
              height={400}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
              priority={i === 0}
            />
          </div>
          <div className={styles.articleTextWrapper}>
            <h3 className="text-display-sm">
              <LinkNextJs href={`/${postsPageSlug}/${post.slug.current}`}>
                {post.title}
              </LinkNextJs>
            </h3>
            <p>{post.summary}</p>
            <p>
              {t("common.created_at", lang)} {post._createdAt.split("T")[0]}
            </p>
          </div>
          <hr className={`full-width ${styles.break}`} />
        </article>
      ))}
      <div ref={observerRef} style={{ height: 1 }} />

      {showSkeleton ? (
        <div
          className={`page-container ${styles.skeletonLoader} `}
          aria-hidden="true"
        >
          <div className={styles.imgContainer}>
            <div className={styles.skeletonImage} />
          </div>
          <div className={styles.articleTextWrapper}>
            <div className={`${styles.skeletonHeader} text-display-sm`} />
            <div className={styles.skeletonParagraphWrapper}>
              <div className={styles.skeletonText} />
              <div className={styles.skeletonText} />
            </div>
            <div className={styles.skeletonTextShort} />
          </div>
        </div>
      ) : (
        <div className="page-container">
          <p>{t("posts.no_more_posts_to_load", lang)}</p>
        </div>
      )}
    </section>
  );
}

function getBlockColour(
  index: number,
  isPrio?: boolean,
  colorOverrider?: TColor
) {
  const i = index % 4;
  const ending = isPrio ? "" : "-nobg";

  if (colorOverrider) return colorOverrider + ending;

  if (i === 0) return "green" + ending;
  if (i === 1) return "orange" + ending;
  if (i === 2) return "red" + ending;

  return "";
}
