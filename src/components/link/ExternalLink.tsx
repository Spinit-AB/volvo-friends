import React from "react";
import styles from "./Link.module.css";
import { LinkProps } from "./Link";

export const ExternalLink = ({
  className = "",
  size = "base",
  href,
  ...rest
}: LinkProps &
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >) => {
  return (
    <a
      className={`text-${size}-bold ${styles.root} ${className}`}
      href={href}
      {...rest}
    ></a>
  );
};
