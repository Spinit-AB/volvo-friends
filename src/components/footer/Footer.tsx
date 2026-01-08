import React from "react";
import styles from "./Footer.module.css";
import { fetchFooter } from "@/sanity/lib/queries";
import { useT } from "@/locales/utils/useT";
import { TFooter } from "@/sanity/models/TFooter";
import { Grill } from "../graphics/Grill";

export const Footer = async (props: {
  params: { lang?: string | string[] };
}) => {
  const footer = await fetchFooter();
  return <FetchedFooter {...props} footer={footer} />;
};

const FetchedFooter = ({
  params,
  footer,
}: {
  footer: TFooter | null;
  params: { lang?: string | string[] };
}) => {
  const t = useT(params);
  return (
    <footer className={styles.root}>
      <h2 className="text-display-sm ">Volvo Friends</h2>
      <hr />
      <div className={styles.grid}>
        <section className={styles.col}>
          <h3 className="text-cardheader-sm">{t("footer.documents")}</h3>
          <ul>
            {footer?.documents?.map((doc) => (
              <li key={doc._key}>{doc.title}</li>
            ))}
          </ul>
        </section>
        <section className={styles.col}>
          <h3 className="text-cardheader-sm">{t("footer.address")}</h3>{" "}
          <p className="text-base-bold">
            {footer?.address?.map((adr, i) => (
              <React.Fragment key={i}>
                <span className={i === 0 ? "text-base-bold" : "text-base"}>
                  {adr}
                </span>
                <br />
              </React.Fragment>
            ))}
          </p>
        </section>
        <section className={styles.col}>
          <h3 className="text-cardheader-sm">{t("footer.links")}</h3>
          <ul>
            {footer?.links?.map((link) => (
              <li key={link._key}>
                <a href={link.url} className="text-base-bold">
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <Grill className={styles.grill} />
    </footer>
  );
};
