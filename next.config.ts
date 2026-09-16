import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  webpack: (config, { dev }) => {
    if (dev) {
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
