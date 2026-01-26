import { ContactForm } from "@/components/forms/ContactForm";
import { getLang } from "@/locales/utils/useLang";

const ContactPage = async (props: {
  params: Promise<{ slug: string; lang?: string | string[] }>;
}) => {
  const params = await props.params;

  const lang = getLang(params.lang);

  return (
    <>
      <ContactForm
        lang={lang}
        subjects={["Övrigt", "Frågor till Styrelsen", "Bidra till arkivet"]}
        color={"green"}
      />
    </>
  );
};

export default ContactPage;
