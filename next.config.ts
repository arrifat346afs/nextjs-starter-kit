/** @type {import('next').NextConfig} */
import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
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
    loaderFile: './image-loader.ts',
  },
  experimental: {
    reactCompiler: true,
  },
  pageExtensions: ["ts", "tsx", "mdx"],
  // Optimize for Cloudflare Workers
  output: 'standalone',
};

const withMDX = createMDX({});

export default withMDX(nextConfig);