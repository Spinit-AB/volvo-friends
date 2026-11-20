import { t } from "@/locales/translate";
import styles from "./Link.module.css";

export function NewTabIndicator({ lang = "sv" }: { lang?: string }) {
  const description = t("common.opens_new_tab", lang);
  return (
    <>
      <svg className={styles.newTabIcon} viewBox="0 0 20 20" aria-hidden="true" focusable="false">
        <title>{description}</title>
        <path d="M11 3h6v6M17 3l-8 8M8 4H3v13h13v-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={styles.screenReaderOnly}> ({description})</span>
    </>
  );
}
