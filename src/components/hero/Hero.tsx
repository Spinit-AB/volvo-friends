import { TColor } from "@/utils/types";
import { LinkButton } from "../button/LinkButton";
import styles from "./Hero.module.css";
import { TButton } from "../button/Button";

export type THeroImage = { src: string; alt: string; className?: string };

export const Hero = ({
  title,
  subtitle,
  callToAction,
  color,
}: {
  title: string;
  subtitle: string;
  callToAction?: ({ text: string; href: string } & TButton)[];
  color: TColor;
}) => {
  return (
    <header className={`page-container ${styles.root} ${styles[color]}`}>
      {/* <div className={`full-width ${styles.imgWrapper} ${styles.mobile}`}>
        <Image
          className={styles.heroImage}
          src={image.src}
          alt={image.alt}
          width={1200}
          height={400}
        />
      </div> */}

      <div className={`breakout ${styles.anchor}`}>
        <div className={styles.foreground}>
          <hgroup>
            <h1 className="text-display-2xl">{title}</h1>
            <p className="text-preamble-md">{subtitle}</p>
          </hgroup>

          {callToAction && callToAction.length ? (
            <ul>
              {callToAction.map((cta) => (
                <li key={cta.href}>
                  <LinkButton {...getButtonProps(cta, color)}>
                    {cta.text}
                  </LinkButton>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {/* <div className={`${styles.imgWrapper} ${styles.desktop}`}>
          <Image
            style={{ color: "currentColor", lineHeight: "600px" }}
            src={image.src}
            alt={image.alt}
            width={1200}
            height={800}
          />
        </div> */}
      </div>
    </header>
  );
};

const getButtonProps = (cta: { href: string } & TButton, heroColor: TColor) => {
  const { color } = cta;
  if (color === "black" || color === "white" || color) {
    return cta;
  }
  return { ...cta, color: getHeroBtnColor(heroColor) };
};

function getHeroBtnColor(heroColor: TColor | undefined): TColor {
  switch (heroColor) {
    case "teal":
      return "red";
    case "green":
      return "orange";
    case "red":

    case "orange":
      return "red";
    case "blue":
      return "red";
    default:
      return "teal";
  }
}
