import { getLang } from "@/locales/utils/useLang";
import { Footer } from "@/components/footer/Footer";
import Main from "@/components/Main";
import { Navbar } from "@/components/navbar/Navbar";
import { fetchStoriesVisibility } from "@/sanity/lib/stories";
import "../../globals.css";

export default async function SiteLayout({
  children,
  ...props
}: {
  children: React.ReactNode;
  params: Promise<{ lang?: string | string[] }>;
}) {
  const params = await props.params;
  const lang = getLang(params.lang);
  const showStories = await fetchStoriesVisibility(lang);

  return (
    <>
      <Navbar params={params} showStories={showStories} />
      <Main>{children}</Main>
      <Footer params={params} />
    </>
  );
}
