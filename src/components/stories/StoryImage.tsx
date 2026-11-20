import styles from "./StoryList.module.css";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { TSanityImageWithAlt } from "@/sanity/models/SanityImageWithAlt";

export function StoryImage({ image }: {
  image?: TSanityImageWithAlt;
}) {
  return (
    <span className={styles.thumbnail}>
      {image && typeof image === "object" && "asset" in image && image.asset ? (
        <Image src={urlFor(image).width(192).height(144).fit("crop").auto("format").url()}
          alt={image.alt || ""} width={96} height={72} />
      ) : (
        <span aria-hidden="true">Volvo Friends</span>
      )}
    </span>
  );
}
