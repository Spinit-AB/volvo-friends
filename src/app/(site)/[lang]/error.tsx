"use client";

import styles from "./error.module.css";
import { Button } from "@/components/button/Button";
import { LinkButton } from "@/components/button/LinkButton";
import { locales } from "@/locales";
import { useT } from "@/locales/utils/useT";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Error({ reset }: { reset: () => void }) {
  const pathname = usePathname();
  const lang = locales.find((l) => pathname.startsWith(`/${l.id}`))?.id || "sv";
  const t = useT({ lang });

  useEffect(() => {
    document.documentElement.classList.add("not-found-bg");
    return () => document.documentElement.classList.remove("not-found-bg");
  }, []);

  return (
    <>
      <div className="footer-theme-orange" />
      <div className={`page-container ${styles.root}`}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1 className="text-display-xl">500</h1>
            <p className="text-lg-bold">{t("error.subtitle")}</p>
          </div>
          <p className="text-base">{t("error.description")}</p>
          <div className={styles.actions}>
            <Button onClick={reset} size="small" color="base-orange">
              {t("error.try_again")}
            </Button>
            <LinkButton
              href="/"
              size="small"
              variant="outlined"
              color="base-orange"
            >
              {t("not_found.back_to_home")}
            </LinkButton>
          </div>
        </div>
      </div>
    </>
  );
}
