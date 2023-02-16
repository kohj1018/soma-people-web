/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: []
  },
  env: {
    SIGNIN_CALLBACK_URL: process.env.SIGNIN_CALLBACK_URL
  }
}

module.exports = nextConfig
