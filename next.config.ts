import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blog.ariakish.com",
      },
      {
        protocol: "https",
        hostname: "clubapi.ariakish.com",
      },
    ],
  },
};

export default nextConfig;
