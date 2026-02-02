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
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Volvo Friends",
    description: "FÖR OSS VOLVOENTUSIASTER",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Volvo Friends",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Volvo Friends",
    description: "FÖR OSS VOLVOENTUSIASTER",
    images: ["/og-image.png"],
  },
  // TODO: Add language-specific metadata for English pages
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Volvo Friends",
              description: "FÖR OSS VOLVOENTUSIASTER",
              url: "https://www.volvofriends.com",
              logo: "https://www.volvofriends.com/icon.png",
              sameAs: [],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                url: "https://www.volvofriends.com/contact",
              },
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
