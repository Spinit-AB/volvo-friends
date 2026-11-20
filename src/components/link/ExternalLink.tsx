import React from "react";
import styles from "./Link.module.css";
import { NewTabIndicator } from "./NewTabIndicator";
import { LinkProps } from "./Link";

export const ExternalLink = ({
  className = "",
  size = "base",
  href,
  children,
  target,
  language = "sv",
  ...rest
}: LinkProps & { language?: string } &
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >) => {
  return (
    <a
      className={`text-${size}-bold ${styles.root} ${className}`}
      href={href}
      target={target}
      {...rest}
    >
      {children}
      {target === "_blank" ? <NewTabIndicator lang={language} /> : null}
    </a>
  );
};
