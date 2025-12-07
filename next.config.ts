import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["api.microlink.io", "cdn.simpleicons.org", "picsum.photos"],
  },

  // ⬇️ Add these
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
