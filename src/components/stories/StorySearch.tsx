"use client";

import { t } from "@/locales/translate";
import { getPathsByLang } from "@/locales/pageSlugUtils";
import styles from "./StoriesLayout.module.css";

export function StorySearch({ lang, query = "" }: { lang: string; query?: string }) {
  const searchPath = lang === "sv" ? "sok" : "search";
  return (
    <form role="search" aria-label={t("stories.search_label", lang)}
      action={`/${lang}/${getPathsByLang(lang).stories}/${searchPath}`}
      className={styles.search} onSubmit={(event) => {
        const input = event.currentTarget.elements.namedItem("q") as HTMLInputElement;
        input.value = input.value.trim();
        if (!input.value) event.preventDefault();
      }}>
      <label htmlFor="story-search">{t("stories.search_label", lang)}</label>
      <div>
        <input key={query} id="story-search" type="search" name="q" defaultValue={query}
          placeholder={t("stories.search_placeholder", lang)} required />
        <button type="submit">{t("stories.search_button", lang)}</button>
      </div>
    </form>
  );
}
