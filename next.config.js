/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: []
  },
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    APPLE_CLIENT_ID: process.env.APPLE_CLIENT_ID,
    APPLE_CLIENT_SECRET: process.env.APPLE_CLIENT_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    SIGNIN_CALLBACK_URL: process.env.SIGNIN_CALLBACK_URL,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
    GOOGLE_DRIVE_CLIENT_ID: process.env.GOOGLE_DRIVE_CLIENT_ID,
    GOOGLE_DRIVE_API_KEY: process.env.GOOGLE_DRIVE_API_KEY,
    GOOGLE_DRIVE_ACCESS_TOKEN: process.env.GOOGLE_DRIVE_ACCESS_TOKEN,
    GOOGLE_DRIVE_TARGET_FOLDER_ID: process.env.GOOGLE_DRIVE_TARGET_FOLDER_ID
  }
}

module.exports = nextConfig
