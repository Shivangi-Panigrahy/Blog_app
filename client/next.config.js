/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  serverExternalPackages: ['bcrypt', 'pg'], // updated key
};

module.exports = nextConfig;
