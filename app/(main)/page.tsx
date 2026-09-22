import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { allCategoriesQuery, featuredProductsQuery } from '@/sanity/lib/queries'
import { Category, ProductCard, SITE_CONFIG } from '@/lib/types'
import HeroSection from '@/components/home/HeroSection'
import CategoryGrid from '@/components/home/CategoryGrid'
import CapabilitiesSection from '@/components/home/CapabilitiesSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import WhyUsSection from '@/components/home/WhyUsSection'
import ContactCTA from '@/components/home/ContactCTA'

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  logo: `${SITE_CONFIG.url}/logo.png`,
  description: SITE_CONFIG.description,
  telephone: SITE_CONFIG.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE_CONFIG.address,
    addressCountry: 'VN',
  },
  sameAs: [SITE_CONFIG.messengerHref],
}

export default async function HomePage() {
  const [categories, featuredProducts] = await Promise.all([
    client.fetch<Category[]>(allCategoriesQuery, {}, { next: { revalidate: 60 } }),
    client.fetch<ProductCard[]>(featuredProductsQuery, {}, { next: { revalidate: 60 } }),
  ])

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HeroSection />
      <CategoryGrid categories={categories} />
      <CapabilitiesSection />
      <FeaturedProducts products={featuredProducts} />
      <WhyUsSection />
      <ContactCTA />
    </>
  )
}
