/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // Ensure there's a trailing slash on routes
  trailingSlash: true,
  // Define the root path explicitly
  basePath: '',
};

module.exports = nextConfig;