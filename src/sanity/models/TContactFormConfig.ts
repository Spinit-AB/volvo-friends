import type { TBecomeMemberPage } from "./TAboutBecomeMemberPage";

export type TContactPage = Pick<TBecomeMemberPage, "preamble"> & {
  title?: string;
  sections?: Array<NonNullable<TBecomeMemberPage["sections"]>[number] & {
    link?: { label: string; href: string };
  }>;
};
