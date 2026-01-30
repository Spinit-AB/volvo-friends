import { TBaseColor, TColor } from "@/utils/types";
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import styles from "./Button.module.css";

export type TButton = {
  variant?: "filled" | "outlined" | "ghost";
  size?: "large" | "base" | "small";
} & (
  | {
      color?: TColor | TBaseColor;
      forcePalette?: "light" | "dark";
    }
  | {
      color: "white";
      forcePalette?: "light";
    }
  | {
      color: "black";
      forcePalette?: "dark";
    }
);

export const Button = ({
  size = "base",
  variant = "filled",
  color = "teal",
  forcePalette,
  className,
  children,
  ...rest
}: TButton &
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >) => {
  return (
    <button
      {...rest}
      className={[
        styles.root,
        styles[variant],
        styles[color],
        styles[size],
        forcePalette ? styles[forcePalette] : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
};
