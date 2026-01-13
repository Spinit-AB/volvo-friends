import styles from "./page.module.css";
import { useT } from "@/locales/utils/useT";
import { useLinkWithLang } from "@/locales/utils/useLinkWithLang";
import { Hero } from "@/components/hero/Hero";

export default function Home({
  params,
}: {
  params: { lang?: string | string[] };
}) {
  const t = useT(params);
  const to = useLinkWithLang(params);

  return (
    <>
      <div className="footer-theme-orange" />
      <Hero
        title={t("landing.title")}
        subtitle={t("landing.subtitle")}
        image={{ src: "", alt: "Temp alt to just show the image" }}
        callToAction={[
          {
            href: to("aktuellt"),
            text: t("post.page_title"),
            forcePalette: "light",
            color: "teal",
          },
          {
            href: params.lang === "sv" ? to("aktuellt") : to("current"),
            text: t("post.page_title"),
            variant: "outlined",
            color: "white",
          },
          {
            href: to("aktuellt"),
            text: t("post.page_title"),
            variant: "ghost",
            color: "teal",
            forcePalette: "light",
          },
        ]}
        color={"blue"}
      />
    </>
  );
}
