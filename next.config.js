/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_MAILTRAP_API_TOKEN: process.env.NEXT_PUBLIC_MAILTRAP_API_TOKEN,
    NEXT_PUBLIC_MAILTRAP_INBOX_ID: process.env.NEXT_PUBLIC_MAILTRAP_INBOX_ID || '3744334',
  },
  images: {
    domains: ['images.unsplash.com', 'fakestoreapi.com'],
  },
};

module.exports = nextConfig; 