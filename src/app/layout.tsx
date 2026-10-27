import AnalyticsProvider from "@/components/AnalyticsProvider";
import { SITE_META } from "@/content/siteContent";
import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || SITE_META.defaultUrl,
  ),
  title: SITE_META.title,
  description: SITE_META.description,
  keywords: SITE_META.keywords,
  authors: [{ name: SITE_META.authorName }],
  openGraph: {
    title: SITE_META.openGraph.title,
    description: SITE_META.openGraph.description,
    images: [SITE_META.openGraph.image],
    type: "website",
    locale: SITE_META.openGraph.locale,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#24564f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen bg-surface text-on-surface antialiased flex flex-col selection:bg-primary-fixed selection:text-primary">
        <AnalyticsProvider />
        {children}
      </body>
    </html>
  );
}
