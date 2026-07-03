import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cozybakesinc.apianca.online",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
