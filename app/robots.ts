import { MetadataRoute } from 'next'

// Add static export configuration
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/dashboard/',
    },
    sitemap: 'https://nextstarter.xyz/sitemap.xml',
  }
}