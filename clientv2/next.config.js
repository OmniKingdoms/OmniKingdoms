/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["infura-ipfs.io"],
  },
};

module.exports = nextConfig;
