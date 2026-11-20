import type { ReactNode } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { TSanityImageWithAlt } from "@/sanity/models/SanityImageWithAlt";
import { StorySearch } from "./StorySearch";
import panel from "@/components/content/ContentPage.module.css";
import styles from "./StoriesLayout.module.css";
import headerStyles from "@/components/header/header.module.css";

export function StoriesHeader({ title, lang, query, showSearch = true, image }: {
  title: string;
  lang: string;
  query?: string;
  showSearch?: boolean;
  image?: TSanityImageWithAlt;
}) {
  const imageUrl = image && typeof image === "object" && "asset" in image && image.asset
    ? urlFor(image).width(1800).height(1350).fit("crop").auto("format").url()
    : undefined;
  const thumbnailUrl = imageUrl && image
    ? urlFor(image).width(192).height(144).fit("crop").auto("format").url()
    : undefined;
  return (
    <>
      <div className="footer-theme-teal" />
      <header className={`page-container ${headerStyles.frame} ${styles.header} ${imageUrl ? styles.categoryImage : ""}`}>
        {imageUrl && thumbnailUrl ? (
          <div className={`full-width ${styles.categoryPhoto}`} aria-hidden="true">
            <Image className={styles.headerThumbnail} src={thumbnailUrl} alt="" width={96} height={72} loading="eager" />
            <Image src={imageUrl} alt="" fill sizes="(min-width: 1800px) 1800px, 100vw" loading="eager" />
          </div>
        ) : null}
        <div className={`breakout ${styles.headerInner}`}>
          <h1 className="text-display-lg">{title}</h1>
          {showSearch ? <StorySearch lang={lang} query={query} /> : null}
        </div>
      </header>
    </>
  );
}

export function StoriesContent({ children, surface = "panel" }: {
  children: ReactNode;
  surface?: "panel" | "plain";
}) {
  return (
    <div className={`page-container teal ${surface === "panel" ? panel.root : styles.plain}`}>
      <div className={`breakout ${styles.content}`}>{children}</div>
    </div>
  );
}
