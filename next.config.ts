import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-782545dfd1bd489da66e218b7f0779a6.r2.dev",
      },
    ],
  },
};

export default nextConfig;
