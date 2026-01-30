import { ContactForm } from "@/components/forms/ContactForm";
import { LocalePageRedirects } from "@/locales/LocalePageRedirects";
import { getPathsByLang } from "@/locales/pageSlugUtils";
import { getLang } from "@/locales/utils/useLang";

const ContactPage = async (props: {
  params: Promise<{ slug: string; lang?: string | string[] }>;
}) => {
  const params = await props.params;

  const lang = getLang(params.lang);
  const canonicalSlug = getPathsByLang(lang).contact;
  return (
    <>
      <div className="footer-theme-green" />
      <LocalePageRedirects lang={lang} canonicalSlug={canonicalSlug} />
      <ContactForm
        lang={lang}
        subjects={["Övrigt", "Frågor till Styrelsen", "Bidra till arkivet"]}
        color={"green"}
      />
    </>
  );
};

export default ContactPage;
