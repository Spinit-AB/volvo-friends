import { TColor } from "@/utils/types";
import { LinkButton } from "../button/LinkButton";
import styles from "./Hero.module.css";
import { TButton } from "../button/Button";
import Image from "next/image";

export type THeroImage = { src: string; alt: string; className?: string };

export const Hero = ({
  title,
  subtitle,
  callToAction,
  image,
  color,
}: {
  title: string;
  subtitle: string;
  callToAction?: ({ text: string; href: string } & TButton)[];
  image: THeroImage;
  color: TColor;
}) => {
  return (
    <header className={`page-container ${styles.root} ${styles[color]}`}>
      <div className={`full-width ${styles.imgWrapper} ${styles.mobile}`}>
        <Image
          className={styles.heroImage}
          src={image.src}
          alt={image.alt}
          width={1200}
          height={400}
        />
      </div>

      <div className={`breakout-lg ${styles.anchor}`}>
        <div className={styles.foreground}>
          <hgroup>
            <h1 className="text-display-2xl">{title}</h1>
            <p className="text-preamble-md">{subtitle}</p>
          </hgroup>

          {callToAction && callToAction.length ? (
            <ul>
              {callToAction.map((cta) => (
                <li key={cta.href}>
                  <LinkButton {...cta}>{cta.text}</LinkButton>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className={`${styles.imgWrapper} ${styles.desktop}`}>
          <Image
            style={{ color: "currentColor", lineHeight: "600px" }}
            src={image.src}
            alt={image.alt}
            width={1200}
            height={800}
          />
        </div>
      </div>
    </header>
  );
};
