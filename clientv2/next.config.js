/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "bafybeihfvy2hmcnvpax6anx3tgx53qie4nj32eqtuehsu2g5c5hx3ukxc4.ipfs.nftstorage.link",
    ],
  },
};

module.exports = nextConfig;
