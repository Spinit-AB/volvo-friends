"use client";

import { useMediaQuery } from "@/utils/useMediaQuery";
import React, { useId } from "react";
import styles from "./Navbar.module.css";
import { TTranslate } from "@/locales/utils/useT";

export const BurgerWrapper = ({
  children,
  isOpen,
  setIsOpen,
  t,
  wideMenu = false,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
  t: TTranslate;
  wideMenu?: boolean;
}) => {
  const burgerId = useId();
  const menuId = useId();
  const isMobile = useMediaQuery(`(max-width: ${wideMenu ? 1400 : 1100}px)`);
  if (!isMobile) return children;
  return (
    <>
      <button
        id={burgerId}
        aria-controls={menuId}
        aria-expanded={isOpen}
        className={`text-lg-bold ${styles.burger}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <i className={styles.burgerIcon}></i>
        <span>{t("common.menu")}</span>
      </button>
      <div className={styles.mobileMenu} hidden={!isOpen} id={menuId}>
        {children}
      </div>
      <div
        hidden={!isOpen}
        aria-hidden
        onClick={() => setIsOpen(false)}
        className={styles.backdrop}
      ></div>
    </>
  );
};
