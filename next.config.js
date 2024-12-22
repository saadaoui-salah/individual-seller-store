/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images: {
    domains: ["127.0.0.1"],
  },
  experimental: {
    middleware: true,
  },
};

module.exports = nextConfig;