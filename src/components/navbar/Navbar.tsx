"use client";

import { useState } from "react";
import { useLinkWithLang } from "@/src/utils/useLinkWithLang";
import { useT } from "@/src/utils/useT";
import { Params } from "next/dist/server/request/params";
import Link from "next/link";
import NavLink from "../navlink/NavLink";
import { BurgerWrapper } from "./BurgerWrapper";
import styles from "./Navbar.module.css";

export const Navbar = ({ params }: { params: Params }) => {
  const t = useT(params);
  const to = useLinkWithLang(params);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleNavLinkClick = () => setMenuOpen(false);

  return (
    <nav className={styles.root}>
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
            <NavLink href={to("/")} onClick={handleNavLinkClick}>
              {t("home.page_title")}
            </NavLink>
          </li>
          <li>
            <NavLink
              href={to("aktuellt")}
              onClick={handleNavLinkClick}
              matchSubpath
            >
              {t("post.page_title")}
            </NavLink>
          </li>
        </ul>
      </BurgerWrapper>
    </nav>
  );
};
