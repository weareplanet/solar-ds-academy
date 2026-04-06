/** @type {import('next').NextConfig} */
// Use `basePath` only in production to avoid serving assets under
// a prefixed path during local development.
const isProduction = process.env.NODE_ENV === 'production';
const nextConfig = {
  output: 'export',
  ...(isProduction ? { basePath: '/solar-ds-academy' } : {}),
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
