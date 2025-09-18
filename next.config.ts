import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Completely ignore ESLint during build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Completely ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
  experimental: {
    // Disable strict mode to be more permissive
    forceSwcTransforms: true,
  },
  images: {
    domains: ['blog.torisoftt.com', 'images.unsplash.com'],
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Disable linting completely during build
  swcMinify: true,
};

export default nextConfig;
