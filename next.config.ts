import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "store.fastly.steamstatic.com",
      },
      {
        protocol: "https",
        hostname: "cdn.cdkeys.com",
      },
    ],
  },
};

export default nextConfig;
