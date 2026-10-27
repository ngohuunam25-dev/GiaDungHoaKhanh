import LandingPage from "@/components/LandingPage";
import { SITE_META } from "@/content/siteContent";
import { sanityClient } from "@/lib/sanity";
import { type LandingPage as LandingPageType } from "@/types/landingPage.type";
import { Metadata } from "next";

async function getLandingPageData(): Promise<LandingPageType | null> {
  try {
    const QUERY = `*[_type == "landingPage"][0]`;
    const page = await sanityClient.fetch(QUERY);
    return page;
  } catch (error) {
    console.error("Error fetching landing page data:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getLandingPageData();

  const title = pageData?.title;
  const businessSettings = pageData?.businessSettings;

  return {
    title: title || SITE_META.title,
    description: SITE_META.description,
    keywords: SITE_META.keywords,
    authors: [
      {
        name: businessSettings?.brandName || SITE_META.authorName,
      },
    ],
    openGraph: {
      title: title || SITE_META.openGraph.title,
      description: SITE_META.description,
      images: [SITE_META.openGraph.image],
      type: "website",
      locale: SITE_META.openGraph.locale,
      siteName: businessSettings?.companyName || SITE_META.title,
    },
    twitter: {
      card: "summary_large_image",
      title: title || SITE_META.openGraph.title,
      description: SITE_META.description,
      images: [SITE_META.openGraph.image],
    },
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || SITE_META.defaultUrl,
    ),
  };
}

export default async function Home() {
  const pageData = await getLandingPageData();
  if (pageData === null) return <>404 not found!</>;
  return <LandingPage {...pageData} />;
}
