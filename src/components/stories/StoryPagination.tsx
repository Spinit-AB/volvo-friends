import Link from "next/link";
import { t } from "@/locales/translate";
import styles from "./StoryList.module.css";

export function storyPageUrl(categoryUrl: string, page: number, pageSize: number) {
  const [pathname, search] = categoryUrl.split("?");
  const query = new URLSearchParams(search);
  query.set("page", String(page));
  query.set("pageSize", String(pageSize));
  return `${pathname}?${query}#stories-list`;
}

export function StoryPagination({ lang, page, pageSize, totalPages, categoryUrl }: {
  lang: string;
  page: number;
  pageSize: number;
  totalPages: number;
  categoryUrl: string;
}) {
  if (totalPages <= 1) return null;
  const pages = [...new Set([1, page - 1, page, page + 1, totalPages])]
    .filter((value) => value >= 1 && value <= totalPages).sort((a, b) => a - b);
  return (
    <nav className={styles.pagination} aria-label={t("stories.pagination", lang)}>
      {page > 1 ? <Link href={storyPageUrl(categoryUrl, page - 1, pageSize)} rel="prev">{t("stories.previous", lang)}</Link> : <span aria-disabled="true">{t("stories.previous", lang)}</span>}
      <ol>
        {pages.map((value, index) => (
          <li key={value}>
            {index > 0 && value - pages[index - 1] > 1 ? <span aria-hidden="true">…</span> : null}
            {value === page ? <span aria-current="page" aria-label={t("stories.page_number", lang, { page: value })}>{value}</span>
              : <Link href={storyPageUrl(categoryUrl, value, pageSize)} aria-label={t("stories.page_number", lang, { page: value })}>{value}</Link>}
          </li>
        ))}
      </ol>
      {page < totalPages ? <Link href={storyPageUrl(categoryUrl, page + 1, pageSize)} rel="next">{t("stories.next", lang)}</Link> : <span aria-disabled="true">{t("stories.next", lang)}</span>}
    </nav>
  );
}
