import { Navbar } from "@/components/navbar/Navbar";
import "../../globals.css";
import { Footer } from "@/components/footer/Footer";

export default async function SiteLayout({
  children,
  ...props
}: {
  children: React.ReactNode;
  params: { lang?: string | string[] };
}) {
  const params = await props.params;
  return (
    <>
      <Navbar params={params} />
      <main>{children}</main>
      <Footer params={params} />
    </>
  );
}
