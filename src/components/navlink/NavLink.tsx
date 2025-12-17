"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "./NavLink.module.css";

interface NavLinkProps extends React.ComponentProps<typeof Link> {
  activeClassName?: string;
  className?: string;
  matchSubpath?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  className = "",
  activeClassName = "",
  matchSubpath = false,
  children,
  ...props
}) => {
  const pathname = usePathname();
  // If href is an object (as allowed by next/link), convert to string
  const hrefString = typeof href === "string" ? href : href?.toString() || "";
  // Normalize both pathname and hrefString to ignore a single trailing slash at the very end (except for root)
  const normalize = (str: string) => {
    if (str === "/") return "/";
    return str.endsWith("/") ? str.slice(0, -1) : str;
  };
  const normalizedPath = normalize(pathname);
  const normalizedHref = normalize(hrefString);
  let isActive = normalizedPath === normalizedHref;
  if (
    matchSubpath &&
    normalizedPath.startsWith(normalizedHref) &&
    normalizedHref !== "/"
  ) {
    // Ensure that /aktuellt matches /aktuellt/slug but not /aktuellt2
    isActive =
      normalizedPath === normalizedHref ||
      (normalizedPath.startsWith(normalizedHref + "/") &&
        normalizedHref.length > 0);
  }
  return (
    <Link
      href={href}
      className={
        `text-base-bold ${styles.root} ${className}` +
        (isActive ? `${styles.active} ${activeClassName ?? ""}` : "")
      }
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavLink;
