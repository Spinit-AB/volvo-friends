"use client";
import { t } from "@/locales/translate";
import { useLinkWithLang } from "@/locales/utils/useLinkWithLang";
import { urlFor } from "@/sanity/lib/image";
import { TPostPreview } from "@/sanity/models/TPost";
import { POSTS_PER_FETCH } from "@/utils/constants";
import { formatDate } from "@/utils/functions";
import { TColor } from "@/utils/types";
import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { HeaderLink } from "../link/HeaderLink";
import styles from "./InfinitePostsList.module.css";

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
  const to = useLinkWithLang({ lang });
  const [posts, setPosts] = useState<TPostPreview[]>(initialPosts);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchMore = useCallback(async () => {
    if (loading || posts.length >= total) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/posts?language=${lang}&limit=${POSTS_PER_FETCH}&offset=${posts.length}`,
      );
      const data = await res.json();
      const newPosts: TPostPreview[] = data.posts || [];

      // Stop loading when all posts are loaded

      setPosts((prev) => {
        const existingIds = new Set(prev.map((p) => p._id));
        const filtered = newPosts.filter((p) => !existingIds.has(p._id));
        return [...prev, ...filtered];
      });
    } catch (e) {
      console.error(e);
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
      { threshold: 1 },
    );
    const node = observerRef.current;
    if (node) {
      observer.observe(node);
    }
    return () => {
      if (node) {
        observer.unobserve(node);
      }
      observer.disconnect();
    };
  }, [fetchMore, posts.length, total]);

  const showSkeleton = posts.length < total || loading;

  return (
    <section aria-labelledby={t("post.posts_section_id")}>
      <header className={`page-container ${styles.sectionHeader}`}>
        <h2 className="text-display-md" id={t("post.posts_section_id")}>
          {t("post.posts_header")}
        </h2>
      </header>
      {posts.map((post, i) => (
        <article
          key={post._id}
          className={`page-container ${styles.article} ${getBlockColour(
            i,
            post.prioritized,
            post.color,
          )}`}
        >
          <div className={styles.linkClickWrapper}>
            <Image
              src={urlFor(post.heroImage).width(800).height(400).url()}
              alt={post.heroImage?.alt || post.title}
              width={800}
              height={400}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
              priority={i === 0}
            />
            <div className={styles.articleTextWrapper}>
              <HeaderLink
                className="text-display-sm"
                href={to(`${postsPageSlug}/${post.slug.current}`)}
                component={"h3"}
              >
                {post.title}
              </HeaderLink>
              <p>{post.summary}</p>
              <p className="text-base-italic">
                {t("common.created_at")}: {formatDate(lang, post._createdAt)}
              </p>
            </div>
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
          <p className={`text-base-italic ${styles.noMorePosts}`}>
            {t("posts.no_more_posts_to_load")}
          </p>
        </div>
      )}
    </section>
  );
}

function getBlockColour(
  index: number,
  isPrio?: boolean,
  colorOverrider?: TColor,
) {
  const i = index % 4;
  const ending = isPrio ? "" : "-nobg";

  if (colorOverrider) return colorOverrider + ending;

  if (i === 0) return "green" + ending;
  if (i === 1) return "orange" + ending;
  if (i === 2) return "red" + ending;

  return "";
}
