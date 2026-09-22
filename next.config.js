/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow all local network devices (phones, tablets, PCs) in development
  allowedDevOrigins: [
    '192.168.0.*',
    '192.168.1.*',
    '192.168.*.*',
    '192.168.0.105',
    '192.168.0.106',
    '192.168.0.105:3000',
    '192.168.0.106:3000',
    'localhost',
    'localhost:3000',
    '127.0.0.1',
    '127.0.0.1:3000',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
}

module.exports = nextConfig
