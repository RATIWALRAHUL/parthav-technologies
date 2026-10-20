import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["node:sqlite"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    devtoolSegmentExplorer: false,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Disabling persistent packfile cache on Windows prevents ENOENT 0.pack.gz corruption
      config.cache = false;
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/services/web-mobile-development/:path*",
        destination: "/services/web-development/:path*",
      },
      {
        source: "/services/web-mobile-development",
        destination: "/services/web-development",
      },
    ];
  },
};

export default nextConfig;
