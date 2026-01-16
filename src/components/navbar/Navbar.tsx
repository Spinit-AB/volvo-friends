"use client";

import { getPathsByLang } from "@/locales/pageSlugUtils";
import { useLinkWithLang } from "@/locales/utils/useLinkWithLang";
import { useT } from "@/locales/utils/useT";
import Link from "next/link";
import { useState } from "react";
import NavLink from "../link/NavLink";
import { BurgerWrapper } from "./BurgerWrapper";
import styles from "./Navbar.module.css";

export const Navbar = ({
  params,
}: {
  params: { lang?: string | string[] };
}) => {
  const t = useT(params);
  const to = useLinkWithLang(params);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleNavLinkClick = () => setMenuOpen(false);

  const lang =
    params.lang && Array.isArray(params.lang)
      ? params.lang[0]
      : params.lang || "sv";
  const postsPageSlug = getPathsByLang(lang).current;
  return (
    <nav className={styles.root} id="site-nav">
      <Link
        lang="en"
        href={to("")}
        className={`text-display-md ${styles.logo}`}
      >
        Volvo Friends
      </Link>
      <BurgerWrapper isOpen={menuOpen} setIsOpen={setMenuOpen}>
        <ul>
          <li>
            <NavLink href={to("/")} onClick={handleNavLinkClick} size="lg">
              {t("home.page_title")}
            </NavLink>
          </li>
          <li>
            <NavLink
              href={to(postsPageSlug)}
              onClick={handleNavLinkClick}
              matchSubpath
              size="lg"
            >
              {t("post.page_title")}
            </NavLink>
          </li>
        </ul>
      </BurgerWrapper>
    </nav>
  );
};
