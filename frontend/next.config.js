/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'ugfzve5ltt9m2e8a.public.blob.vercel-storage.com',
      },
    ],
  },
};

module.exports = nextConfig;
