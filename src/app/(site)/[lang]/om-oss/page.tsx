import { Header } from "@/components/header/Header";
import { getLang } from "@/locales/utils/useLang";
import { useT } from "@/locales/utils/useT";
import React from "react";

const AboutPage = async (props: { params: { lang?: string | string[] } }) => {
  const params = await props.params;

  return <AwaitedAbout params={params} />;
};

export default AboutPage;

export const AwaitedAbout = ({
  params,
}: {
  params: { lang?: string | string[] };
}) => {
  const t = useT(params);
  return (
    <>
      <Header title={t("about.title")} color={"blue"} />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus
        cum, fugit reprehenderit optio est ducimus aliquid soluta quis ratione
        recusandae maxime nobis, quasi tenetur voluptatem sint, iure expedita?
        Perferendis, id.
      </p>
      {/* Add your content here */}
    </>
  );
};
