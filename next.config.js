const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
});
const { version: APP_VERSION } = require('./package.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  env: {
    APP_VERSION,
  },
};

module.exports = withPWA(nextConfig);
