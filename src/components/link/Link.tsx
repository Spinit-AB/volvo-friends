"use client";
import NextJsLink from "next/link";
import React from "react";
import styles from "./Link.module.css";

interface LinkProps extends React.ComponentProps<typeof NextJsLink> {
  className?: string;
  size?: "lg" | "base" | "sm";
}

const Link: React.FC<LinkProps> = ({
  href,
  className = "",
  size = "base",
  children,
  ...props
}) => {
  return (
    <NextJsLink
      href={href}
      className={`text-${size}-bold ${styles.root} ${className}`}
      {...props}
    >
      {children}
    </NextJsLink>
  );
};

export default Link;
