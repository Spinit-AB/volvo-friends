import { Header } from "@/components/header/Header";
import { useT } from "@/locales/utils/useT";

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
      <div className="footer-theme-blue" />
      <Header title={t("about.title")} color={"blue"} />
      <div className="page-container">
        <p>
          Volvo Friends består av en grupp Volvoentusiaster, Volvoanställda,
          Volvopensionärer samt många andra fordonsintresserade vilka
          tillsammans har beslutat att bilda den ideella föreningen Volvo
          Museums Vänner. Föreningen har nu nytt namn från Volvo Museums Vänner
          till Volvo Friends. Detta beslut togs vid årsmötet i september 2024.
        </p>
        <p>
          Föreningens syfte är att på olika sätt, och i samarbete med, stödja
          Volvo World genom att t.ex. stimulera till besök på World of Volvo,
          biträda vid underhåll och renovering av fordon, hjälpa till vid olika
          av World of Volvo och Volvo Friends arrangerade evenemang mm.
        </p>
        <p>
          Vi söker ständigt fler medlemmar och bidrag till föreningen; hur just
          du kan bli medlem eller lämna ett bidrag finner du mer info om på
          sidan Bli medlem.
        </p>
        <p>
          Medlemsavgiften är SEK 300/år eller SEK 3000 livslångt och betalas in
          på Bg 222-4087.
        </p>
      </div>
    </>
  );
};
