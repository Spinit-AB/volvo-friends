"use client";

import { getPathsByLang } from "@/locales/pageSlugUtils";
import { useLinkWithLang } from "@/locales/utils/useLinkWithLang";
import { useT } from "@/locales/utils/useT";
import Link from "next/link";
import { useState } from "react";
import { Lightmode } from "../lightmode/Lightmode";
import NavLink from "../link/NavLink";
import { BurgerWrapper } from "./BurgerWrapper";
import styles from "./Navbar.module.css";

export const Navbar = ({
  params,
  showStories,
}: {
  params: { lang?: string | string[] };
  showStories: boolean;
}) => {
  const t = useT(params);
  const to = useLinkWithLang(params);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleNavLinkClick = () => setMenuOpen(false);

  const lang =
    params.lang && Array.isArray(params.lang)
      ? params.lang[0]
      : params.lang || "sv";
  const paths = getPathsByLang(lang);
  return (
    <nav className={styles.root} id="site-nav">
      <div className={styles.logoSlot}>
        <a className={styles.skipLink} href="#main-content">{t("common.skip_to_content")}</a>
        <Link
          lang="en"
          href={to("")}
          className={`text-display-md ${styles.logo}`}
        >
          Volvo Friends
        </Link>
      </div>
      <BurgerWrapper isOpen={menuOpen} setIsOpen={setMenuOpen} t={t} wideMenu={showStories}>
        <ul>
          <li>
            <NavLink
              href={to("/")}
              onClick={handleNavLinkClick}
              size="lg"
              activeClassName={styles.activeLink}
            >
              {t("home.page_title")}
            </NavLink>
          </li>
          <li>
            <NavLink
              href={to(paths.current)}
              onClick={handleNavLinkClick}
              matchSubpath
              size="lg"
              activeClassName={styles.activeLink}
            >
              {t("post.page_title")}
            </NavLink>
          </li>
          {showStories ? (
            <li>
              <NavLink href={to(paths.stories)} onClick={handleNavLinkClick}
                matchSubpath size="lg" activeClassName={styles.activeLink}>
                {t("stories.page_title")}
              </NavLink>
            </li>
          ) : null}
          <li>
            <NavLink
              href={to(paths.about)}
              onClick={handleNavLinkClick}
              matchSubpath
              size="lg"
              activeClassName={styles.activeLink}
            >
              {t("about.page_title")}
            </NavLink>
          </li>
          <li>
            <NavLink
              href={to(paths.member)}
              onClick={handleNavLinkClick}
              matchSubpath
              size="lg"
              activeClassName={styles.activeLink}
            >
              {t("member.page_title")}
            </NavLink>
          </li>
          <li>
            <NavLink
              href={to(paths.contact)}
              onClick={handleNavLinkClick}
              matchSubpath
              size="lg"
              activeClassName={styles.activeLink}
            >
              {t("contact.page_title")}
            </NavLink>
          </li>
        </ul>
        <Lightmode
          t={t}
          selectClassName={styles.lightmode}
          wrapperClassName={styles.lightmodeWrapper}
        />
      </BurgerWrapper>
    </nav>
  );
};
