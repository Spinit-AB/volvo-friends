import styles from "./page.module.css";
import { useT } from "@/locales/utils/useT";
import { useLinkWithLang } from "@/locales/utils/useLinkWithLang";
import Link from "@/components/link/Link";

export default function Home({
  params,
}: {
  params: { lang?: string | string[] };
}) {
  const t = useT(params);
  const to = useLinkWithLang(params);

  return (
    <div className={`page-container ${styles.intro}`}>
      <h1 style={{ fontFamily: "var(--font-family-display)" }}>
        Den här sidan är under konstruktion
      </h1>
      <p>
        För att kika runt börja med att gå till{" "}
        <Link href={to("aktuellt")}>{t("post.page_title")}</Link>
      </p>
    </div>
  );
}
