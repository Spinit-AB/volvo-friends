"use client";
import { useLinkWithLang } from "@/locales/utils/useLinkWithLang";
import { useT } from "@/locales/utils/useT";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Breadcrumbs = ({
  params,
  labelOverrides,
}: {
  params: { lang?: string | string[] };
  labelOverrides?: { override: string; position: number }[];
}) => {
  const t = useT(params);
  const to = useLinkWithLang(params);
  const pathname = usePathname();
  // Split path and filter out empty segments
  let segments = pathname.split("/").filter(Boolean);

  // Remove the [lang] segment if present as the first segment
  if (
    segments.length > 0 &&
    (segments[0] === params.lang ||
      (Array.isArray(params.lang) && params.lang.includes(segments[0])))
  ) {
    segments = segments.slice(1);
  }

  // Lookup table for segment translations
  const segmentTranslations: Record<string, string> = {
    aktuellt: t("posts.page_title") || "Aktuellt",
    // Add more segment translations as needed
  };

  // Build breadcrumb items
  const breadcrumbs = [
    { name: t("home.page_title"), href: "/" },
    ...segments.map((segment, idx) => {
      const href = "/" + segments.slice(0, idx + 1).join("/");
      let name = decodeURIComponent(segment.replace(/-/g, " "));
      if (segmentTranslations[segment]) {
        name = segmentTranslations[segment];
      }

      return { name, href };
    }),
  ];

  // If labelOverrides is provided, override breadcrumb names by position (after 'home')
  // position: 0 = first segment after home, 1 = second, etc.
  if (labelOverrides && Array.isArray(labelOverrides)) {
    labelOverrides.forEach(({ override, position }) => {
      const idx = position + 1; // +1 because 0 is home
      if (override && breadcrumbs[idx]) {
        breadcrumbs[idx].name = override;
      }
    });
  }

  return (
    <nav aria-label="Breadcrumb">
      <ol>
        {breadcrumbs.map((crumb, idx) => (
          <li key={crumb.href} style={{ display: "inline" }}>
            {idx < breadcrumbs.length - 1 ? (
              <>
                <Link href={crumb.href}>{crumb.name}</Link>
                <span> &gt; </span>
              </>
            ) : (
              <span>{crumb.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
