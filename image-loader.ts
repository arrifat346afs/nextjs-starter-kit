import type { ImageLoaderProps } from 'next/image';

export default function cloudflareLoader({ src, width, quality }: ImageLoaderProps) {
  const params = [`width=${width}`];
  
  if (quality) {
    params.push(`quality=${quality}`);
  }
  
  // If the image is hosted on your domain, you can use relative URLs
  if (src.startsWith('/')) {
    return `${src}?${params.join('&')}`;
  }
  
  // For external images, return the URL as is
  // Cloudflare's Image Optimizer will handle it
  return src;
}
