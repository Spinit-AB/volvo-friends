import { TColor } from "@/utils/types";
import { LinkButton } from "../button/LinkButton";
import styles from "./Hero.module.css";
import { HeroImageDesktop, HeroImageMobile, THeroImage } from "./HeroImage";
import { TButton } from "../button/Button";

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
              <li key={cta.href}>
                <LinkButton {...cta}>{cta.text}</LinkButton>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <HeroImageDesktop {...image} />
    </header>
  );
};
