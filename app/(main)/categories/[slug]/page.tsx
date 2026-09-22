import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { categoryBySlugQuery, productsByCategoryQuery, allCategorySlugsQuery } from '@/sanity/lib/queries'
import { Category, ProductCard, SITE_CONFIG } from '@/lib/types'
import ProductCardComponent from '@/components/products/ProductCard'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(allCategorySlugsQuery)
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await client.fetch<Category>(categoryBySlugQuery, { slug })
  if (!category) return {}

  const title = category.name
  const description = category.description || `Xem tất cả sản phẩm ${category.name} tại ${SITE_CONFIG.name}. Chất lượng cao, giá cạnh tranh.`

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      url: `${SITE_CONFIG.url}/categories/${slug}`,
    },
    alternates: { canonical: `${SITE_CONFIG.url}/categories/${slug}` },
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const [category, products] = await Promise.all([
    client.fetch<Category>(categoryBySlugQuery, { slug }, { next: { revalidate: 3600 } }),
    client.fetch<ProductCard[]>(productsByCategoryQuery, { slug }, { next: { revalidate: 3600 } }),
  ])

  if (!category) notFound()

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Trang chủ',
        item: SITE_CONFIG.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Sản phẩm',
        item: `${SITE_CONFIG.url}/products`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: category.name,
        item: `${SITE_CONFIG.url}/categories/${slug}`,
      },
    ],
  }

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description,
    url: `${SITE_CONFIG.url}/categories/${slug}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: products.length,
      itemListElement: products.map((prod, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: prod.name,
        url: `${SITE_CONFIG.url}/products/${prod.slug?.current}`,
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-900 to-brand-700 py-12 lg:py-16">
        <div className="section-container">
          <nav className="text-sm text-white/60 mb-3 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white transition-colors">Sản phẩm</Link>
            <span>/</span>
            <span className="text-white">{category.name}</span>
          </nav>
          <h1 className="font-heading font-bold text-3xl lg:text-4xl text-white mb-2">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-white/70 max-w-2xl">{category.description}</p>
          )}
          <p className="text-white/50 text-sm mt-2">{products.length} sản phẩm</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="section-container py-10 lg:py-14">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product, idx) => (
              <ProductCardComponent key={product._id} product={product} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg font-medium mb-2">Chưa có sản phẩm trong danh mục này</p>
            <Link href="/products" className="text-brand-600 hover:underline">← Xem tất cả sản phẩm</Link>
          </div>
        )}
      </div>
    </div>
  )
}
