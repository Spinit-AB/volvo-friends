import React from "react";
import styles from "./Footer.module.css";
import { fetchFooter } from "@/sanity/lib/queries";
import { useT } from "@/locales/utils/useT";
import { TFooter } from "@/sanity/models/TFooter";
import { Grill } from "../graphics/Grill";
import { ExternalLink } from "../link/ExternalLink";

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
    <footer className={`page-container ${styles.root}`} id="site-footer">
      <h2 className="full-width text-display-sm ">Volvo Friends</h2>

      <div className={`breakout ${styles.grid}`}>
        <section className={styles.col}>
          <h3 className="text-cardheader-sm">{t("footer.documents")}</h3>
          <ul>
            {footer?.documents?.map((doc) => {
              const fileUrl = doc.asset?.url;
              if (!fileUrl) return null;
              return (
                <li key={doc._key}>
                  {fileUrl && (
                    <ExternalLink
                      href={fileUrl}
                      download
                      className="text-base-bold"
                      style={{ marginLeft: 8 }}
                    >
                      {doc.title}
                    </ExternalLink>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
        <section className={styles.col}>
          <h3 className="text-cardheader-sm">{t("footer.address")}</h3>{" "}
          <address className="text-base">
            {footer?.address?.map((adr, i) => (
              <React.Fragment key={i}>
                <span className={i === 0 ? "text-base-bold" : "text-base"}>
                  {adr}
                </span>
                <br />
              </React.Fragment>
            ))}
          </address>
        </section>
        <section className={styles.col}>
          <h3 className="text-cardheader-sm">{t("footer.links")}</h3>
          <ul>
            {footer?.links?.map((link) => (
              <li key={link._key}>
                <ExternalLink
                  href={link.url}
                  className="text-base-bold"
                  target="_blank"
                >
                  {link.title}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <Grill className={styles.grill} />
    </footer>
  );
};
