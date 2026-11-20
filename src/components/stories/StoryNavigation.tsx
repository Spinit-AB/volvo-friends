import Link from "next/link";
import { t } from "@/locales/translate";

export function StoryNavigation({ lang, items }: {
  lang: string;
  items: { title: string; href?: string }[];
}) {
  return (
    <nav aria-label={t("common.breadcrumbs", lang)}>
      <ol>
        <li><Link href={`/${lang}`}>{t("home.page_title", lang)}</Link></li>
        {items.map((item, index) => (
          <li key={item.href || index}>
            {item.href ? <Link href={item.href}>{item.title}</Link> : <span aria-current="page">{item.title}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
