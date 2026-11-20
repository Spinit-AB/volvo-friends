"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import { Select } from "@/components/forms/Select";
import { t } from "@/locales/translate";
import { STORY_PAGE_SIZES, STORY_PAGE_SIZE_STORAGE_KEY } from "@/utils/storyPagination";

export function StoryPageSize({ lang, pageSize, categoryUrl }: {
  lang: string;
  pageSize: number;
  categoryUrl: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  useEffect(() => {
    // Shared URLs take priority; otherwise restore this browser's preference.
    if (searchParams.has("pageSize")) return;
    try {
      const saved = localStorage.getItem(STORY_PAGE_SIZE_STORAGE_KEY);
      if (!saved || !STORY_PAGE_SIZES.includes(Number(saved)) || Number(saved) === pageSize) return;
      const query = new URLSearchParams(searchParams.toString());
      query.set("pageSize", saved);
      router.replace(`${categoryUrl}?${query}${window.location.hash}`, { scroll: false });
    } catch {
      // Browsing still works when browser storage is unavailable.
    }
  }, [categoryUrl, pageSize, router, searchParams]);
  return (
    <Select label={t("stories.per_page", lang)} color="teal"
      options={STORY_PAGE_SIZES.map(String)} value={String(pageSize)} disabled={pending}
      onChange={(event) => {
        const size = event.target.value;
        try {
          localStorage.setItem(STORY_PAGE_SIZE_STORAGE_KEY, size);
        } catch {
          // The selected size still works through the URL.
        }
        const query = new URLSearchParams(searchParams.toString());
        query.delete("page");
        query.set("pageSize", size);
        startTransition(() => router.push(`${categoryUrl}?${query}#stories-list`));
      }} />
  );
}
