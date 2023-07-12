/** @type {import('next').NextConfig} */
const middleware = require('./src/middleware.ts');

const nextConfig = {
  async redirects() {
    return [
      { source: '/:path*', destination: '/:path*', middleware },
    ];
}
}


module.exports = nextConfig
