import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { allProductSlugsQuery, allCategorySlugsQuery } from '@/sanity/lib/queries'
import { SITE_CONFIG } from '@/lib/types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [productSlugs, categorySlugs] = await Promise.all([
    client.fetch<{ slug: string }[]>(allProductSlugsQuery),
    client.fetch<{ slug: string }[]>(allCategorySlugsQuery),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_CONFIG.url}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_CONFIG.url}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((p) => ({
    url: `${SITE_CONFIG.url}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const categoryRoutes: MetadataRoute.Sitemap = categorySlugs.map((c) => ({
    url: `${SITE_CONFIG.url}/categories/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  return [...staticRoutes, ...categoryRoutes, ...productRoutes]
}
