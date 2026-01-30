import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies, draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { Params } from "next/dist/server/request/params";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Volvo Friends",
  description: "FÖR OSS VOLVOENTUSIASTER",
  // TODO: Add language-specific metadata for English pages
  // TODO: Add Open Graph images for social media sharing
  // TODO: Add Twitter Card metadata
};

export default async function RootLayout({
  children,
  ...props
}: Readonly<{
  children: React.ReactNode;
  params: Promise<Params>;
}>) {
  const params = await props.params;
  const lang = params.lang ?? "sv";

  // Read theme from cookie (default to 'system')
  const theme = (await cookies()).get("lightmode")?.value || "system";
  let htmlClass = "lightmode-native";
  if (theme === "light") htmlClass = "lightmode-light";
  if (theme === "dark") htmlClass = "lightmode-dark";

  return (
    <html lang={lang as string} className={htmlClass}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
