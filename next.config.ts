import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'www.carloschnouda.info',
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

export default nextConfig;