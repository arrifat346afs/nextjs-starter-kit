/**
 * Cloudflare image loader for Next.js
 * @param {Object} params - Image loader parameters
 * @param {string} params.src - Image source URL
 * @param {number} params.width - Desired image width
 * @param {number} params.quality - Desired image quality
 * @returns {string} - Transformed image URL
 */
function cloudflareLoader({ src, width, quality }) {
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

module.exports = cloudflareLoader;
