/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "seo-heist.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dwdwn8b5ye.ufs.sh",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ansubkhan.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/**",
      },
    ],
    // Use Cloudflare Image Optimizer for image optimization
    loader: 'custom',
    loaderFile: './image-loader.js',
    // Disable image optimization for static export
    unoptimized: true,
  },
  experimental: {
    reactCompiler: true,
  },
  pageExtensions: ["ts", "tsx", "mdx"],
  // Use standalone output for Cloudflare Workers
  output: 'standalone',
  // Configure webpack to optimize bundle size
  webpack: (config, { dev, isServer }) => {
    // Split chunks more aggressively to stay under Cloudflare's 25MB limit
    config.optimization.splitChunks = {
      chunks: 'all',
      maxInitialRequests: 30,
      maxAsyncRequests: 30,
      minSize: 10000,
      maxSize: 15 * 1024 * 1024, // 15 MB max chunk size (well under the 25MB limit)
    };

    // Disable source maps in production to reduce bundle size
    if (!dev) {
      config.devtool = false;
    }

    return config;
  },
};

module.exports = nextConfig;
