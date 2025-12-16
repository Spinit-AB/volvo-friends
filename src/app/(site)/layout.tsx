import "../globals.css";
import type { ReactNode } from "react";
import { Navbar } from "@/components/navbar/Navbar";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}
