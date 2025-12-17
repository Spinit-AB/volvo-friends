import Link from "next/link";
import styles from "./page.module.css";
import { useT } from "@/src/utils/useT";
import { useLinkWithLang } from "@/src/utils/useLinkWithLang";

export default function Home({
  params,
}: {
  params: { lang?: string | string[] };
}) {
  const t = useT(params);
  const to = useLinkWithLang(params);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1 style={{ fontFamily: "var(--font-family-display)" }}>
            To get started, edit the page.tsx file.
          </h1>
          <p>
            Looking for a starting point or more instructions? Head over to{" "}
            <Link href={to("aktuellt")}>{t("post.page_title")}</Link>
          </p>
        </div>
        <div className={styles.ctas}></div>
      </main>
    </div>
  );
}
