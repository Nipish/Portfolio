/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow optimised images from your own domain + any CDN you add icons from
  images: {
    remotePatterns: [
      // Add external image hosts here if needed, e.g.:
      // { protocol: 'https', hostname: 'your-cdn.com' },
    ],
  },

  // Strict mode catches subtle React bugs during development
  reactStrictMode: true,
};

export default nextConfig;
