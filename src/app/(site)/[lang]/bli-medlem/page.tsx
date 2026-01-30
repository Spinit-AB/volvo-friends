import { Header } from "@/components/header/Header";
import { useT } from "@/locales/utils/useT";
import styles from "./BecomeMember.module.css";
import { LocalePageRedirects } from "@/locales/LocalePageRedirects";
import { useLang } from "@/locales/utils/useLang";
import { getPathsByLang } from "@/locales/pageSlugUtils";
import { TColor } from "@/utils/types";

const BecomeMemberPage = async (props: {
  params: { lang?: string | string[] };
}) => {
  const params = await props.params;
  return <AwaitedBecomeMember params={params} />;
};

export default BecomeMemberPage;

export const AwaitedBecomeMember = ({
  params,
}: {
  params: { lang?: string | string[] };
}) => {
  const t = useT(params);
  const lang = useLang(params);
  const canonicalSlug = getPathsByLang(lang).member;

  const color: TColor = "red";

  return (
    <>
      <div className={`footer-theme-${color}`} />

      <LocalePageRedirects lang={lang} canonicalSlug={canonicalSlug} />
      <Header title={t("member.page_title")} color={color} />
      <div className={`page-container ${color} ${styles.root}`}>
        <div className={`breakout page-container ${styles.firstSection}`}>
          <p>
            Välkommen att bli medlem i föreningen Volvo Friends - sprid gärna
            detta till personer i din vänkrets som kan vara intresserade av att
            bli medlemmar. Du kan välja mellan enskilt medlemskap och
            familjemedlemskap.
          </p>
        </div>
        <section
          className="page-container breakout"
          aria-describedby="single-member-heading"
        >
          <h2 id="single-member-heading" className="text-cardheader-novum-sm">
            Enskilt medlemskap:
          </h2>
          <ul>
            <li>
              Du stödjer vår förening Volvo Friends och dess aktiviteter genom
              din medlemsavgift
            </li>
            <li>
              Du har möjlighet att ytterligare stödja föreningen och
              Volvobolagen genom att aktivt deltaga som
              guide/instruktör/tekniker i samband med vissa arrangemang
              och/eller underhåll av World of Volvo eller Volvobolagens
              veteranfordon, bistå i Volvos Historiska Arkiv m.m.
            </li>
          </ul>
        </section>
        <section
          className="breakout page-container"
          aria-describedby="family-member-heading"
        >
          <h2 id="family-member-heading" className="text-cardheader-novum-sm">
            Familjemedlemskap
          </h2>
          <ul>
            <li>
              Du och din partner har samma förmåner som den enskilde medlemmen
              för en rabatterad gemensam medlemsavgift.
            </li>
          </ul>
        </section>
        <div className="breakout page-container">
          <p>
            Till vissa av föreningens arrangemang kan vi vilja bjuda in även
            personer som ännu inte är medlemmar i syfte att marknadsföra vår
            förening och värva nya medlemmar. I dessa fall kommer vi i inbjudan
            att be er ta med en eller flera vänner till arrangemanget.
          </p>
        </div>
        <section
          className="breakout page-container"
          aria-describedby="fee-heading"
        >
          <h2 id="fee-heading" className="text-cardheader-novum-sm">
            Medlemsavgift
          </h2>
          <p>
            Avgiften kan betalas såsom en årsavgift år för år eller som ett
            livstids medlemskap.
          </p>
          <p>
            Årsavgift: 300 kr (400 för familjemedlemskap). Livstids medlemskap:
            3000 kr (4000 kr för familjemedlemskap).
          </p>
          <p>
            Medlemsavgiften betalas in på bankgiro: 222–4087 till Volvo Friends.
            Medlemsavgiften kan även betalas in via Volvo Friends Swish: 123 228
            6094.
          </p>
          <p>Gåvor och bidrag emotses med stor tacksamhet.</p>
          <p>
            Skicka dina uppgifter om namn, adress, telefon samt e-post till{" "}
            <a href="mailto:medlem@volvofriends.com">medlem@volvofriends.com</a>
            . Meddela gärna också om du är intresserad av att delta mer aktivt i
            föreningsaktiviteter eller arbetsgrupper.
          </p>
          <p>
            <strong>
              OBS! All information från oss skickas via email, varför det är
              viktigt att uppge epost-adressen!
            </strong>
          </p>
        </section>
        <section
          className={`breakout page-container ${styles.lastSection}`}
          aria-describedby="address-heading"
        >
          <h2 id="address-heading" className="text-cardheader-novum-sm">
            Alternativt kan anmälan postas till adress:
          </h2>
          <address className={styles.address}>
            <span>Volvo Friends c/o World of Volvo</span>
            <span>Lyckholms Torg 1, 412 63 Göteborg</span>
            <span>Lars-Erik Roos, Styrelseordförande Volvo Friends</span>
            <span>Organisationsnummer 802457–5477</span>
            <span>
              E-post:{" "}
              <a href="mailto:kontakt@volvofriends.com">
                kontakt@volvofriends.com
              </a>
            </span>
          </address>
        </section>
      </div>
    </>
  );
};
