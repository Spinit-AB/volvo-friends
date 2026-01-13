"use client";
import LinkNextJs from "next/link";
import React from "react";
import styles from "./Link.module.css";

export type LinkProps = {
  className?: string;
  size?: "lg" | "base" | "sm";
};

const Link: React.FC<React.ComponentProps<typeof LinkNextJs> & LinkProps> = ({
  href,
  className = "",
  size = "base",
  children,
  ...props
}) => {
  return (
    <LinkNextJs
      href={href}
      className={`text-${size}-bold ${styles.root} ${className}`}
      {...props}
    >
      {children}
    </LinkNextJs>
  );
};

export default Link;
