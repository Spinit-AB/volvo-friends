import { Header } from "@/components/header/Header";
import { useT } from "@/locales/utils/useT";
import styles from "./About.module.css";
import { useLang } from "@/locales/utils/useLang";
import { getPathsByLang } from "@/locales/pageSlugUtils";
import { LocalePageRedirects } from "@/locales/LocalePageRedirects";
import { TColor } from "@/utils/types";

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
  const lang = useLang(params);
  const canonicalSlug = getPathsByLang(lang).about;
  const color: TColor = "blue";
  return (
    <>
      <div className={`footer-theme-${color}`} />
      <LocalePageRedirects lang={lang} canonicalSlug={canonicalSlug} />
      <Header title={t("about.title")} color={color} />
      <div className={`page-container ${color} ${styles.root}`}>
        <section
          className={`breakout page-container ${styles.firstSection}`}
          aria-describedby="welcome-heading"
        >
          <h2 id="welcome-heading" className="text-cardheader-novum-md">
            Välkommen till Volvo Friends!
          </h2>
          <p>
            Volvo Friends (f.d. Volvo Museums Vänner) består av
            Volvoentusiaster, nuvarande och före detta Volvoanställda samt många
            andra fordonsintresserade. Vi är en ideell förening som bildades
            2010 och registrerades formellt den 24 januari 2011 under namnet
            Volvo Museums Vänner. På årsmötet den 21 aug. 2024 ändrades
            föreningens namn till Volvo Friends.
          </p>
          <p>
            Föreningens syfte är att på olika sätt stödja och samarbeta med
            Volvobolagen och World of Volvo genom att t.ex. stimulera till besök
            på World of Volvo, biträda vid underhåll och renovering av fordon,
            bevara och vidmakthålla Volvos historia och hjälpa till vid olika
            aktiviteter arrangerade av framför allt föreningen och World of
            Volvo,
          </p>
          <p>
            Önskar du bli medlem eller lämna ett bidrag finner du mer info på
            sidan Bli medlem. I början av 2026, är vi ca 480 medlemmar.
          </p>
          <p>
            Medlemsavgiften är 300 kr/år eller 3000 kr livslångt och 400 kr/år
            eller 4000 kr livslångt för ett familjemedlemskap och betalas in på
            Bg 222-4087. Medlemsavgiften kan även betalas in via Swish:123 228
            6094
          </p>
        </section>
        <section
          aria-describedby="board-heading"
          className={`breakout page-container ${styles.lastSection}`}
        >
          <h2 id="board-heading" className="text-cardheader-novum-md">
            Styrelse Volvo Friends
          </h2>

          <ul>
            <li>Lars-Erik Roos (Ordförande)</li>
            <li>Margareta Benjaminsson (Sekreterare)</li>
            <li>Jan-Erik Wäne (Kassör)</li>
            <li>Ingrid Alm</li>
            <li>Robert Ferm</li>
            <li>Hans Gustafsson</li>
            <li>Lisa Jensäter</li>
            <li>Roger Johansson</li>
            <li>Tommy Kohle</li>
            <li>Eva Lahti</li>
            <li>Mats Nilsson</li>
            <li>Viktoria Wallner (repr. World of Volvo)</li>
          </ul>
        </section>
      </div>
    </>
  );
};
