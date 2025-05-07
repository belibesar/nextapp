import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.static-src.com',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
  }
};

export default nextConfig;
