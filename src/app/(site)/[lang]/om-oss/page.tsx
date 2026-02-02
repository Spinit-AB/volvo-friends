import { Header } from "@/components/header/Header";
import { PortableTextWrapper } from "@/components/PortableTextWrapper";
import { LocalePageRedirects } from "@/locales/LocalePageRedirects";
import { getPathsByLang } from "@/locales/pageSlugUtils";
import { getLang, useLang } from "@/locales/utils/useLang";
import { useT } from "@/locales/utils/useT";
import { fetchAboutPage } from "@/sanity/lib/queries";
import { TAboutPage } from "@/sanity/models/TAboutBecomeMemberPage";
import { TColor } from "@/utils/types";
import styles from "./About.module.css";

const AboutPage = async (props: { params: { lang?: string | string[] } }) => {
  const params = await props.params;
  const lang = getLang(params.lang);
  const data = await fetchAboutPage({ language: lang });

  return <AwaitedAbout params={params} data={data} />;
};

export default AboutPage;

export const AwaitedAbout = ({
  params,
  data,
}: {
  params: { lang?: string | string[] };
  data: TAboutPage | null;
}) => {
  const t = useT(params);
  const lang = useLang(params);
  const canonicalSlug = getPathsByLang(lang).about;
  const color: TColor = "blue";
  return (
    <>
      <div className={`footer-theme-${color}`} />
      <LocalePageRedirects lang={lang} canonicalSlug={canonicalSlug} />
      <Header title={t("about.title")} color={color} />
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
              {section.title}
            </h2>
            {section.content ? (
              <PortableTextWrapper value={section.content} />
            ) : null}
          </section>
        ))}

        <section
          aria-describedby="board-heading"
          className={`breakout page-container ${styles.lastSection}`}
        >
          <h2 id="board-heading" className="text-cardheader-novum-sm">
            {t("about.board_title")}
          </h2>

          <ul>
            {data?.boardMembers?.map((member) => (
              <li key={member._key}>
                {member.name} {member.role ? ` (${member.role})` : ""}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};
