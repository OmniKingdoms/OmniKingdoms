/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["infura-ipfs.io", "ipfs.io"],
  },
};

module.exports = nextConfig;
