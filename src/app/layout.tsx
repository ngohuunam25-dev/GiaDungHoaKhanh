import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import AnalyticsProvider from "@/components/AnalyticsProvider";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://giadunghoakhanh.vn"),
  title: "Lồng Bàn Inox Hoa Khánh - Che Đậy Thức Ăn Tiện Lợi & Bảo Vệ Bữa Cơm Gia Đình",
  description:
    "Lồng bàn Inox 304 chuẩn xưởng Hoa Khánh. Thiết kế mắt lưới vi sợi khít chặn 100% ruồi muỗi côn trùng, thoáng khí không đọng sương, sáng bóng trọn đời, đồng kiểm tận nơi.",
  keywords: [
    "lồng bàn inox",
    "lồng bàn inox 304",
    "lồng bàn hoa khánh",
    "đậy thức ăn inox",
    "chống ruồi muỗi",
    "lồng bàn đậy mâm cơm",
  ],
  authors: [{ name: "Xưởng Inox Hoa Khánh" }],
  openGraph: {
    title: "Lồng Bàn Inox 304 Hoa Khánh - Giữ Trọn Vị Ngon Bữa Cơm",
    description:
      "Chất liệu Inox SUS 304 không gỉ, đậy kín sạch sẽ, vệ sinh nhanh chóng trong 15 giây. Giao hàng toàn quốc, kiểm tra trước khi trả tiền.",
    images: ["/images/gallery-1.jpg"],
    type: "website",
    locale: "vi_VN",
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
