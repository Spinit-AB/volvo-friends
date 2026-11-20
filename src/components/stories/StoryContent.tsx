import { stegaClean } from "next-sanity";
import type { TypedObject } from "sanity";
import type { StoryContentBlock } from "@/sanity/models/TStory";
import { youtubeVideoId } from "@/utils/youtube";
import { PortableTextWrapper } from "../PortableTextWrapper";
import styles from "./StoryContent.module.css";

export function StoryContent({ blocks, legacyContent, lang }: {
  blocks?: StoryContentBlock[];
  legacyContent?: TypedObject[];
  lang: string;
}) {
  // Published stories keep rendering before their data is converted.
  if (!Array.isArray(blocks)) return <PortableTextWrapper lang={lang} value={legacyContent || []} />;
  return (
    <div className={styles.blocks}>
      {blocks.map((block) => {
        switch (block._type) {
          case "storyText":
            return <div className={styles.text} key={block._key}>
              <PortableTextWrapper lang={lang} value={block.text || []} />
            </div>;
          case "storyImage":
            return block.image?.asset ? <figure key={block._key}>
              <PortableTextWrapper lang={lang} value={[block.image]} />
              {block.caption ? <figcaption>{block.caption}</figcaption> : null}
            </figure> : null;
          case "storyYoutube": {
            const id = youtubeVideoId(stegaClean(block.url || ""));
            return id ? <div key={block._key} className={styles.video}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${id}`}
                title={stegaClean(block.title) || (lang === "en" ? "YouTube video" : "YouTube-video")}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div> : null;
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
