"use client";

import { LinkButton } from "@/components/button/LinkButton";
import { useT } from "@/locales/utils/useT";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { locales } from "@/locales";
import styles from "./not-found.module.css";

export default function NotFound() {
  const pathname = usePathname();
  const lang = locales.find((l) => pathname.startsWith(`/${l.id}`))?.id || "sv";
  const t = useT({ lang });

  useEffect(() => {
    document.documentElement.classList.add("not-found-bg");
    return () => document.documentElement.classList.remove("not-found-bg");
  }, []);

  return (
    <div className={`page-container ${styles.container}`}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className="text-display-xl">{t("not_found.title")}</h1>
          <p className="text-lg-bold">{t("not_found.subtitle")}</p>
        </div>
        <p className="text-base">{t("not_found.description")}</p>
        <div className={styles.actions}>
          <LinkButton href="/" size="small" color="base-blue">
            {t("not_found.back_to_home")}
          </LinkButton>
          <LinkButton
            href="/contact"
            size="small"
            variant="outlined"
            color="neutral"
          >
            {t("not_found.contact_us")}
          </LinkButton>
        </div>
      </div>
      <div className={styles.circle1}></div>
      <div className={styles.circle2}></div>
    </div>
  );
}
