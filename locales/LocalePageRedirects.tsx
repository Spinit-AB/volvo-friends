"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const LocalePageRedirects = ({
  lang,
  canonicalSlug,
  segmentIndex = -1,
}: {
  lang: "sv" | string;
  canonicalSlug: string;
  segmentIndex?: number; // which segment to replace, default last
}) => {
  const pathname = usePathname();

  const router = useRouter();
  useEffect(() => {
    if (lang && canonicalSlug && pathname) {
      const segments = pathname.split("/").filter(Boolean);
      let idx = segmentIndex;
      if (idx < 0) idx = segments.length + idx; // support negative index
      if (
        segments.length > 0 &&
        idx >= 0 &&
        idx < segments.length &&
        segments[idx] !== canonicalSlug
      ) {
        const newSegments = [...segments];
        newSegments[idx] = canonicalSlug;
        const newPath = "/" + newSegments.join("/");
        if (newPath !== pathname) {
          router.replace(newPath);
        }
      }
    }
  }, [lang, canonicalSlug, segmentIndex, pathname, router]);
  return null;
};
