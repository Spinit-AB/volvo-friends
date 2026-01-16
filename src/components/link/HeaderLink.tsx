import Link from "next/link";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Link.module.css";

type THeaderLink = {
  component: "h2" | "h3" | "h4";
  headingProps?: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >;
};

export const HeaderLink: React.FC<
  THeaderLink & React.ComponentProps<typeof Link>
> = ({ component, headingProps, children, className, ...rest }) => {
  const link = (
    <Link className={`${styles.root} ${className}`} {...rest}>
      {children}
    </Link>
  );
  switch (component) {
    case "h2":
      return <h2 {...headingProps}>{link}</h2>;
    case "h3":
      return <h3 {...headingProps}>{link}</h3>;
    case "h4":
      return <h4 {...headingProps}>{link}</h4>;
    default:
      return link;
  }
};

//
