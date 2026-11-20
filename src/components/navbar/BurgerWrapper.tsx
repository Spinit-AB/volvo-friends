"use client";

import { useMediaQuery } from "@/utils/useMediaQuery";
import React, { useEffect, useId, useRef } from "react";
import styles from "./Navbar.module.css";
import { TTranslate } from "@/locales/utils/useT";

export const BurgerWrapper = ({ children, isOpen, setIsOpen, t, wideMenu = false }: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
  t: TTranslate;
  wideMenu?: boolean;
}) => {
  const menuId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const isMobile = useMediaQuery(`(max-width: ${wideMenu ? 1400 : 1100}px)`);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isMobile || !isOpen || !dialog) return;
    // Native modality keeps focus inside and restores it to the opener on close.
    const positionCloseButton = () => {
      const bounds = openerRef.current?.getBoundingClientRect();
      if (!bounds) return;
      dialog.style.setProperty("--menu-toggle-top", `${bounds.top}px`);
      dialog.style.setProperty("--menu-toggle-left", `${bounds.left}px`);
      dialog.style.setProperty("--menu-toggle-width", `${bounds.width}px`);
      dialog.style.setProperty("--menu-toggle-height", `${bounds.height}px`);
    };
    positionCloseButton();
    dialog.showModal();
    const resizeObserver = new ResizeObserver(positionCloseButton);
    if (openerRef.current) {
      resizeObserver.observe(openerRef.current);
      if (openerRef.current.parentElement) resizeObserver.observe(openerRef.current.parentElement);
    }
    window.addEventListener("resize", positionCloseButton);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", positionCloseButton);
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobile, isOpen]);

  if (!isMobile) return children;
  return (
    <>
      <button ref={openerRef} aria-controls={menuId} aria-expanded={isOpen} aria-haspopup="dialog"
        className={`text-lg-bold ${styles.burger}`} onClick={() => setIsOpen(true)}>
        <i className={styles.burgerIcon} aria-hidden="true" />
        <span>{t("common.menu")}</span>
      </button>
      <dialog ref={dialogRef} className={styles.mobileMenu} id={menuId}
        aria-label={t("common.menu")}
        onCancel={(event) => { event.preventDefault(); setIsOpen(false); }}
        onKeyDown={(event) => {
          if (event.key === "Escape") { event.preventDefault(); setIsOpen(false); }
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setIsOpen(false);
        }}>
        <button className={`text-lg-bold ${styles.burger} ${styles.menuClose}`}
          aria-label={t("common.close_menu")} aria-expanded="true" aria-controls={menuId}
          onClick={() => setIsOpen(false)}>
          <i className={styles.burgerIcon} aria-hidden="true" />
          <span>{t("common.close")}</span>
        </button>
        {children}
      </dialog>
    </>
  );
};
