"use client";
import { useMediaQuery } from "@/utils/useMediaQuery";
import Image from "next/image";
import styles from "./Hero.module.css";

export type THeroImage = { src: string; alt: string };

const BREAKPOINT = "(width > 84rem)";

export function HeroImageMobile({ src, alt }: THeroImage) {
  const isDesktop = useMediaQuery(BREAKPOINT);
  if (isDesktop) {
    return null;
  }
  return (
    <div className={styles.imgWrapper}>
      <Image
        style={{ color: "currentColor" }}
        src={src}
        alt={alt}
        width={1200}
        height={400}
      />
    </div>
  );
}

export function HeroImageDesktop({ src, alt }: THeroImage) {
  const isDesktop = useMediaQuery(BREAKPOINT);
  if (isDesktop) {
    return (
      <div className={styles.imgWrapper}>
        <Image
          style={{ color: "currentColor" }}
          src={src}
          alt={alt}
          width={1600}
          height={800}
        />
      </div>
    );
  }
  return null;
}
