import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['blog.torisoftt.com', 'images.unsplash.com', 'flagcdn.com', 'i.ibb.co'],
  }
};

export default nextConfig;
