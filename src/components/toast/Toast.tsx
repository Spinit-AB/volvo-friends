"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Toast.module.css";
import { TTranslate } from "@/locales/utils/useT";

export type TToast = {
  title: string;
  message: string;
  type: "success" | "error";
  fade: boolean;
};

export type TToastState = [
  TToast | null,
  React.Dispatch<React.SetStateAction<TToast | null>>,
];

export const useToast = () => {
  const [toast, setToast] = useState<TToast | null>(null);
  const fadeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const removeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The callback takes (title, message, type?) as arguments
  const showToast = useCallback(
    (
      title: TToast["title"],
      message: TToast["message"],
      type: TToast["type"],
      duration: number | null = 4000,
    ): void => {
      // Clear any existing timeouts
      if (fadeTimeout.current) {
        clearTimeout(fadeTimeout.current);
        fadeTimeout.current = null;
      }
      if (removeTimeout.current) {
        clearTimeout(removeTimeout.current);
        removeTimeout.current = null;
      }
      setToast({ title, message, type, fade: false });
      if (duration) {
        fadeTimeout.current = setTimeout(() => {
          setToast({ title, message, type, fade: true });
        }, duration);
      }
    },
    [],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
      if (removeTimeout.current) clearTimeout(removeTimeout.current);
    };
  }, []);

  // When fade is triggered, set up removal timeout and clear previous
  useEffect(() => {
    if (toast?.fade) {
      if (removeTimeout.current) clearTimeout(removeTimeout.current);
      removeTimeout.current = setTimeout(() => setToast(null), 800);
    }
  }, [toast?.fade]);

  return {
    toastState: [toast, setToast] as TToastState,
    showToast,
  };
};

export const Toast = ({
  toastState: [toast, setToast],
  t,
}: {
  toastState: TToastState;
  t: TTranslate;
}) => {
  if (!toast) return null;
  return (
    <aside
      role="status"
      aria-live="polite"
      tabIndex={0}
      className={styles.root}
      data-type={toast.type}
      data-fade={toast.fade}
    >
      <header className={styles.header}>
        <h2 className={`text-cardheader-sm-novum ${styles.title}`}>
          {toast.title}
        </h2>
        <button
          className={styles.close}
          onClick={() => setToast(null)}
          aria-label={t("common.close")}
        >
          ×
        </button>
      </header>
      <p className={styles.message}>{toast.message}</p>
    </aside>
  );
};
