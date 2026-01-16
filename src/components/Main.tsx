"use client";
import React, { useEffect, useRef } from "react";

export default function Main({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setMinHeight = () => {
      const footer = document.querySelector("#site-footer");
      const nav = document.querySelector("#site-nav");
      if (footer && nav && mainRef.current) {
        const footerHeight = footer.getBoundingClientRect().height;
        const navHeight = nav.getBoundingClientRect().height;
        mainRef.current.style.minHeight = `calc(100dvh - ${footerHeight}px - ${navHeight}px)`;
      }
    };
    setMinHeight();
    window.addEventListener("resize", setMinHeight);
    return () => {
      window.removeEventListener("resize", setMinHeight);
    };
  }, []);

  return <main ref={mainRef}>{children}</main>;
}
