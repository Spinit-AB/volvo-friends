import type { ReactNode } from "react";
import { StorySearch } from "./StorySearch";
import panel from "@/components/content/ContentPage.module.css";
import styles from "./StoriesLayout.module.css";
import headerStyles from "@/components/header/header.module.css";

export function StoriesHeader({ title, lang, query }: { title: string; lang: string; query?: string }) {
  return (
    <>
      <div className="footer-theme-teal" />
      <header className={`page-container ${headerStyles.frame} ${styles.header}`}>
        <div className={`breakout ${styles.headerInner}`}>
          <h1 className="text-display-lg">{title}</h1>
          <StorySearch lang={lang} query={query} />
        </div>
      </header>
    </>
  );
}

export function StoriesContent({ children, surface = "panel" }: {
  children: ReactNode;
  surface?: "panel" | "plain";
}) {
  return (
    <div className={`page-container teal ${surface === "panel" ? panel.root : styles.plain}`}>
      <div className={`breakout ${styles.content}`}>{children}</div>
    </div>
  );
}
