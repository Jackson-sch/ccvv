/** @type {import('next').NextConfig} */
const nextConfig = {
  // cloudinary
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: '',
      }
    ]
  },

  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
