import Link from "next/link";
import styles from "./page.module.css";
import { useT } from "@/locales/utils/useT";
import { useLinkWithLang } from "@/locales/utils/useLinkWithLang";

export default function Home({
  params,
}: {
  params: { lang?: string | string[] };
}) {
  const t = useT(params);
  const to = useLinkWithLang(params);

  return (
    <div className={styles.intro}>
      <h1 style={{ fontFamily: "var(--font-family-display)" }}>
        To get started, edit the page.tsx file.
      </h1>
      <p>
        Looking for a starting point or more instructions? Head over to{" "}
        <Link href={to("aktuellt")}>{t("post.page_title")}</Link>
      </p>
    </div>
  );
}
