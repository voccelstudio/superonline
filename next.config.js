/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/superonline',
  assetPrefix: '/superonline/',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
