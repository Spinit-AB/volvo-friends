import { useLinkWithLang } from "@/locales/utils/useLinkWithLang";
import { urlFor } from "@/sanity/lib/image";
import { TPostPreview } from "@/sanity/models/TPost";
import { TColor } from "@/utils/types";
import Image from "next/image";
import { HeaderLink } from "../link/HeaderLink";
import styles from "./Card.module.css";
import { useLang } from "@/locales/utils/useLang";
import { getPathsByLang } from "@/locales/pageSlugUtils";

const IMG_HEIGHT = 330;
const IMG_WIDTH = IMG_HEIGHT * Math.round(330 / 256);
export const PostCard = ({
  post,
  params,
}: {
  post: TPostPreview;
  params: { lang?: string | string[] };
}) => {
  const to = useLinkWithLang(params);

  const lang = useLang(params);
  const postPageSlug = getPathsByLang(lang).current;
  if (!post) return null;

  return (
    <article
      className={[styles.card, styles[post.color ?? "teal"]]
        .filter(Boolean)
        .join(" ")}
    >
      {post.heroImage && (
        <Image
          src={urlFor(post.heroImage).width(IMG_WIDTH).height(IMG_HEIGHT).url()}
          alt={post.heroImage.alt}
          width={IMG_WIDTH}
          height={IMG_HEIGHT}
          style={{
            width: "100%",
            aspectRatio: `${IMG_HEIGHT} / ${IMG_WIDTH}`,
            objectFit: "cover",
          }}
          priority
          className="breakout"
        />
      )}
      <HeaderLink
        className="text-cardheader-novum-sm"
        href={to(`${postPageSlug}/${post.slug.current}`)}
        component={"h3"}
      >
        {post.title}
      </HeaderLink>

      <p className="text-base-italic"> {post.summary}</p>
    </article>
  );
};

export const PostCards = ({
  posts,
  params,
  className,
}: {
  posts: TPostPreview[];
  params: { lang?: string | string[] };
  className?: string;
}) => {
  return (
    <div className={`${styles.cardContainer} ${className}`}>
      {posts.map((post, i) => (
        <PostCard
          key={post._id}
          post={{ ...post, color: getCardsColor(i, post.color) }}
          params={params}
        />
      ))}
    </div>
  );
};

function getCardsColor(index: number, colorOverrider?: TColor) {
  const i = index % 3;

  // if (colorOverrider) return colorOverrider;

  if (i === 0) return "blue";
  if (i === 1) return "orange";
  if (i === 2) return "red";

  return "blue";
}
