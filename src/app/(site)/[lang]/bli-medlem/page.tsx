import { Header } from "@/components/header/Header";
import { useT } from "@/locales/utils/useT";
import styles from "./BecomeMember.module.css";
import { LocalePageRedirects } from "@/locales/LocalePageRedirects";
import { getLang, useLang } from "@/locales/utils/useLang";
import { getPathsByLang } from "@/locales/pageSlugUtils";
import { TColor } from "@/utils/types";
import { fetchBecomeMemberPage } from "@/sanity/lib/queries";
import { TBecomeMemberPage } from "@/sanity/models/TAboutBecomeMemberPage";
import {
  PortableAddressWrapper,
  PortableTextWrapper,
} from "@/components/PortableTextWrapper";

const BecomeMemberPage = async (props: {
  params: { lang?: string | string[] };
}) => {
  const params = await props.params;
  const lang = getLang(params.lang);
  const becomeMemberData = await fetchBecomeMemberPage({ language: lang });
  return <AwaitedBecomeMember params={params} data={becomeMemberData} />;
};

export default BecomeMemberPage;

export const AwaitedBecomeMember = ({
  params,
  data,
}: {
  params: { lang?: string | string[] };
  data: TBecomeMemberPage | null;
}) => {
  const t = useT(params);
  const lang = useLang(params);
  const canonicalSlug = getPathsByLang(lang).member;

  const color: TColor = "red";

  // You can now use becomeMemberData in your component
  return (
    <>
      <div className={`footer-theme-${color}`} />

      <LocalePageRedirects lang={lang} canonicalSlug={canonicalSlug} />
      <Header title={t("member.page_title")} color={color} />
      <div className={`page-container ${color} ${styles.root}`}>
        {data?.preamble ? (
          <div className={`breakout page-container ${styles.firstSection}`}>
            <p>{data.preamble}</p>
          </div>
        ) : null}

        {data?.sections?.map((section, index) => (
          <section
            key={section._key}
            className={`page-container breakout ${index === 0 && !data?.preamble ? styles.firstSection : ""}`}
            aria-describedby={section._key + "header"}
          >
            <h2
              id={section._key + "header"}
              className="text-cardheader-novum-sm"
            >
              {section.title ?? t("member.adress_title")}
            </h2>
            {section.content ? (
              <PortableTextWrapper value={section.content} />
            ) : null}
          </section>
        ))}

        {data?.address ? (
          <section
            className={`breakout page-container ${styles.lastSection}`}
            aria-describedby="address-heading"
          >
            <h2 id="address-heading" className="text-cardheader-novum-sm">
              {data.addressTitle}
            </h2>
            <address className={styles.address}>
              <PortableAddressWrapper value={data.address} />
            </address>
          </section>
        ) : null}
      </div>
    </>
  );
};
