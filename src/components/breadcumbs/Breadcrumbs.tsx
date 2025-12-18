"use client";
import { useT } from "@/locales/utils/useT";
import { usePathname } from "next/navigation";
import styles from "./Breadcrumbs.module.css";
import Link from "../link/Link";

export const Breadcrumbs = ({
  params,
  labelOverrides,
  className,
  olClassName,
}: {
  params: { lang?: string | string[] };
  labelOverrides?: { override: string; position: number }[];
  className?: string;
  olClassName?: string;
}) => {
  const t = useT(params);
  const pathname = usePathname();
  // Split path and filter out empty segments
  let segments = pathname.split("/").filter(Boolean);

  // Detect lang segment
  let langSegment = undefined;
  if (
    segments.length > 0 &&
    (segments[0] === params.lang ||
      (Array.isArray(params.lang) && params.lang.includes(segments[0])))
  ) {
    langSegment = segments[0];
    segments = segments.slice(1);
  }

  // Lookup table for segment translations
  const segmentTranslations: Record<string, string> = {
    aktuellt: t("post.page_title"),
    current: t("post.page_title"),
    // Add more segment translations as needed
  };

  // Build breadcrumb items with lang segment in hrefs
  const langPrefix = langSegment ? `/${langSegment}` : "";
  const breadcrumbs = [
    { name: t("home.page_title"), href: langPrefix || "/" },
    ...segments.map((segment, idx) => {
      const href =
        langPrefix +
        (segments.length > 0 ? "/" + segments.slice(0, idx + 1).join("/") : "");
      let name = decodeURIComponent(segment.replace(/-/g, " "));
      if (segmentTranslations[segment]) {
        name = segmentTranslations[segment];
      }

      return { name, href };
    }),
  ];

  // If labelOverrides is provided, override breadcrumb names by position (0 = Home, 1 = first segment, etc.)
  if (labelOverrides && Array.isArray(labelOverrides)) {
    labelOverrides.forEach(({ override, position }) => {
      const idx = position < 0 ? breadcrumbs.length + position : position;
      if (override && breadcrumbs[idx]) {
        breadcrumbs[idx].name = override;
      }
    });
  }

  return (
    <nav
      aria-label={t("common.breadcrumbs")}
      className={`${styles.root} ${className}`}
    >
      <ol className={olClassName}>
        {breadcrumbs.map((crumb, idx) => (
          <li key={crumb.href}>
            {idx < breadcrumbs.length - 1 ? (
              <>
                <Link href={crumb.href}>{crumb.name}</Link>
                <span> &gt; </span>
              </>
            ) : (
              <span className={styles.currentPage}>{crumb.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
