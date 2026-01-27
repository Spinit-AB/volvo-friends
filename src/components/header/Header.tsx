import React from "react";
import styles from "./header.module.css";
import { TColor } from "@/utils/types";

export const Header = ({ title, color }: { title: string; color: TColor }) => {
  return (
    <header className={`page-container ${styles.header} ${styles[color]}`}>
      <h1 className="text-display-lg breakout">{title}</h1>
    </header>
  );
};
