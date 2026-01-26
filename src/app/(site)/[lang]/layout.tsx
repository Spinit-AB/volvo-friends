import { Footer } from "@/components/footer/Footer";
import Main from "@/components/Main";
import { Navbar } from "@/components/navbar/Navbar";
import "../../globals.css";

export default async function SiteLayout({
  children,
  ...props
}: {
  children: React.ReactNode;
  params: Promise<{ lang?: string | string[] }>;
}) {
  const params = await props.params;

  return (
    <>
      <Navbar params={params} />
      <Main>{children}</Main>
      <Footer params={params} />
    </>
  );
}
