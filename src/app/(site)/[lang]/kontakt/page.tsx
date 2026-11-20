import type { Metadata } from "next";
import { Header } from "@/components/header/Header";
import { PortableTextWrapper } from "@/components/PortableTextWrapper";
import { LocalePageRedirects } from "@/locales/LocalePageRedirects";
import { getPathsByLang } from "@/locales/pageSlugUtils";
import { getLang } from "@/locales/utils/useLang";
import { t } from "@/locales/translate";
import { fetchContactPage } from "@/sanity/lib/queries";
import styles from "@/components/content/ContentPage.module.css";
import contactStyles from "./Contact.module.css";

const ContactPage = async (props: {
  params: Promise<{ slug: string; lang?: string | string[] }>;
}) => {
  const params = await props.params;

  const lang = getLang(params.lang);
  const canonicalSlug = getPathsByLang(lang).contact;
  const data = await fetchContactPage(lang);

  return (
    <>
      <div className="footer-theme-green" />
      <LocalePageRedirects lang={lang} canonicalSlug={canonicalSlug} />
      <Header title={data?.title || t("contact.page_title", lang)} color="green" />
      <div className={`page-container green ${styles.root} ${contactStyles.links}`}>
        {data?.preamble ? (
          <div className={`breakout page-container ${styles.firstSection} ${!data.sections?.length ? styles.lastSection : ""}`}>
            <p>{data.preamble}</p>
          </div>
        ) : null}
        {data?.sections?.map((section, index, sections) => (
          <section
            key={section._key}
            className={`page-container breakout ${index === 0 && !data.preamble ? styles.firstSection : ""} ${index === sections.length - 1 ? styles.lastSection : ""}`}
            aria-labelledby={`contact-${section._key}`}
          >
            <h2 id={`contact-${section._key}`} className="text-cardheader-novum-sm">
              {section.title}
              {section.link?.href ? (
                <>: <a href={section.link.href}>{section.link.label}</a></>
              ) : null}
            </h2>
            {section.content ? <PortableTextWrapper value={section.content} /> : null}
          </section>
        ))}
      </div>
    </>
  );
};

export default ContactPage;

export async function generateMetadata({ params }: {
  params: Promise<{ lang?: string | string[] }>;
}): Promise<Metadata> {
  const lang = getLang((await params).lang);
  return { title: t("contact.page_title", lang) };
}
