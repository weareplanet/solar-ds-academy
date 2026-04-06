/** @type {import('next').NextConfig} */
// Use `basePath` only in production to avoid serving assets under
// a prefixed path during local development.
const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? '/solar-ds-academy' : '';
const nextConfig = {
  output: 'export',
  ...(isProduction ? { basePath } : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
