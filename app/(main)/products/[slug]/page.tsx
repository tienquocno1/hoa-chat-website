import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, MessageCircle, ChevronLeft, MapPin, Package, Tag } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { productBySlugQuery, allProductSlugsQuery, relatedProductsQuery } from '@/sanity/lib/queries'
import { Product, ProductCard, SITE_CONFIG } from '@/lib/types'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import ProductCardComponent from '@/components/products/ProductCard'
import ImageGallery from '@/components/products/ImageGallery'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(allProductSlugsQuery)
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await client.fetch<Product>(productBySlugQuery, { slug })
  if (!product) return {}

  const title = product.seo?.metaTitle || product.name
  const description = product.seo?.metaDescription || product.shortDescription || SITE_CONFIG.description
  const imageUrl = product.images?.[0] ? urlFor(product.images[0]).width(1200).height(630).url() : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.url}/products/${slug}`,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: title }] : [],
      type: 'website',
    },
    alternates: { canonical: `${SITE_CONFIG.url}/products/${slug}` },
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params
  const product = await client.fetch<Product>(
    productBySlugQuery,
    { slug },
    { next: { revalidate: 3600 } }
  )

  if (!product) notFound()

  // Related products (same category)
  const relatedProducts = product.category?.slug?.current
    ? await client.fetch<ProductCard[]>(
        relatedProductsQuery,
        {
          categorySlug: product.category.slug.current,
          currentSlug: slug,
        },
        { next: { revalidate: 3600 } }
      )
    : []

  // JSON-LD Product schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    image: product.images?.map((img) => urlFor(img).width(800).url()),
    brand: { '@type': 'Organization', name: SITE_CONFIG.name },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'VND',
      price: 'Liên hệ',
      seller: { '@type': 'Organization', name: SITE_CONFIG.name },
      url: `${SITE_CONFIG.url}/products/${slug}`,
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="section-container py-8 lg:py-12">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-brand-600 transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-brand-600 transition-colors">Sản phẩm</Link>
            {product.category && (
              <>
                <span>/</span>
                <Link href={`/categories/${product.category.slug?.current}`} className="hover:text-brand-600 transition-colors">
                  {product.category.name}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 mb-12">
            {/* Image Gallery */}
            <ImageGallery images={product.images || []} productName={product.name} />

            {/* Product Info */}
            <div>
              {product.category && (
                <Link
                  href={`/categories/${product.category.slug?.current}`}
                  className="category-badge mb-3 inline-block hover:bg-brand-100 transition-colors"
                >
                  {product.category.name}
                </Link>
              )}

              <h1 className="font-heading font-bold text-2xl lg:text-3xl text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              {product.shortDescription && (
                <p className="text-gray-600 leading-relaxed mb-6 text-base">
                  {product.shortDescription}
                </p>
              )}

              {/* Quick specs */}
              <div className="flex flex-wrap gap-3 mb-6">
                {product.origin && (
                  <div className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
                    <MapPin size={14} className="text-brand-500" />
                    Xuất xứ: <strong>{product.origin}</strong>
                  </div>
                )}
                {product.unit && (
                  <div className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
                    <Package size={14} className="text-brand-500" />
                    Đơn vị: <strong>{product.unit}</strong>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="bg-brand-50 border border-brand-100 rounded-2xl p-5 mb-6">
                <p className="text-sm text-brand-600 font-medium mb-1">Giá bán</p>
                <p className="font-heading font-bold text-2xl text-brand-700">Liên hệ báo giá</p>
                <p className="text-sm text-gray-500 mt-1">Giá tốt nhất theo số lượng đặt hàng</p>
              </div>

              {/* Contact Buttons */}
              <div className="space-y-3">
                <a
                  href={SITE_CONFIG.phoneHref}
                  className="flex items-center justify-center gap-3 bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 active:scale-95 shadow-lg shadow-brand-600/25 text-lg w-full"
                >
                  <Phone size={22} />
                  Gọi ngay: {SITE_CONFIG.phone}
                </a>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={SITE_CONFIG.zaloHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#0068ff] hover:bg-[#0055cc] text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 active:scale-95"
                  >
                    <span className="font-bold text-lg">Z</span>
                    Chat Zalo
                  </a>
                  <a
                    href={SITE_CONFIG.messengerHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#0078ff] to-[#a334fa] hover:opacity-90 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 active:scale-95"
                  >
                    <MessageCircle size={18} />
                    Messenger
                  </a>
                </div>
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="mt-5 flex items-center gap-2 flex-wrap">
                  <Tag size={14} className="text-gray-400" />
                  {product.tags.map((tag) => (
                    <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Specifications Table */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-10">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <h2 className="font-heading font-semibold text-lg text-gray-900">Thông Số Kỹ Thuật</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {product.specifications.map((spec, i) => (
                  <div key={i} className={`flex px-6 py-3.5 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <span className="w-1/2 text-sm font-medium text-gray-600">{spec.key}</span>
                    <span className="w-1/2 text-sm text-gray-900 font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {product.description && product.description.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 mb-10">
              <h2 className="font-heading font-semibold text-xl text-gray-900 mb-5">Mô Tả Sản Phẩm</h2>
              <div className="prose prose-gray max-w-none prose-headings:font-heading prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed">
                <PortableText value={product.description} />
              </div>
            </div>
          )}

          {/* Related Products */}
          {relatedProducts && relatedProducts.length > 0 && (
            <div>
              <h2 className="font-heading font-bold text-2xl text-gray-900 mb-6">Sản Phẩm Liên Quan</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {relatedProducts.map((p, idx) => (
                  <ProductCardComponent key={p._id} product={p} index={idx} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
