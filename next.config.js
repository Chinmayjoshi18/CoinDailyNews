/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'images.unsplash.com',
      'source.unsplash.com',
      'coinmarketcap.com',
      'coingecko.com'
    ],
  },
  // Production optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Environment variables - accessible on the client side
  publicRuntimeConfig: {
    // Will be available on both server and client
    APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  // Add any headers required for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;