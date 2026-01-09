import { TColor } from "@/sanity/models/TPost";
import LinkNextJS from "next/link";
import styles from "./Hero.module.css";
import { HeroImageDesktop, HeroImageMobile, THeroImage } from "./HeroImage";

export const Hero = ({
  title,
  subtitle,
  callToAction,
  image,
  color,
}: {
  title: string;
  subtitle: string;
  callToAction?: { text: string; to: string }[];
  image: THeroImage;
  color: TColor;
}) => {
  return (
    <header className={`${styles.root} ${styles[color]}`}>
      <HeroImageMobile {...image} />
      <div className={styles.foreground}>
        <hgroup>
          <h1 className="text-display-2xl">{title}</h1>
          <p className="text-preamble-md">{subtitle}</p>
        </hgroup>

        {callToAction && callToAction.length ? (
          <ul>
            {callToAction.map((cta) => (
              <li key={cta.to}>
                <LinkNextJS href={cta.to}>{cta.text}</LinkNextJS>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <HeroImageDesktop {...image} />
    </header>
  );
};
