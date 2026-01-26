import Image, { type ImageProps } from "next/image";
import { LinkButton } from "../button/LinkButton";
import { TButton } from "../button/Button";
import { TColor } from "@/utils/types";
import styles from "./Card.module.css";

export const StaticCard = ({
  image,
  title,
  text,
  link,
  color,
}: {
  color: TColor;
  image: ImageProps & { position: "before" | "after" };
  title: string;
  text: string;
  link: {
    text: string;
    href: string;
  } & TButton;
}) => {
  return (
    <article className={`${styles.largeCard} ${styles[color]}`}>
      {image.position === "before" ? (
        <Image {...image} alt={image.alt ?? ""} />
      ) : null}

      <div className={styles.innerGrid}>
        <h3 className="text-display-sm">{title}</h3>
        <p className="text-base">{text}</p>
        <LinkButton size="small" {...link} color={color} forcePalette="light">
          {link.text}
        </LinkButton>
      </div>
      {image.position === "after" ? (
        <Image {...image} alt={image.alt ?? ""} />
      ) : null}
    </article>
  );
};
