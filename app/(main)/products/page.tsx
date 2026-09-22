import type { Metadata } from 'next'
import { Suspense } from 'react'
import { client } from '@/sanity/lib/client'
import { allProductsQuery, allCategoriesQuery } from '@/sanity/lib/queries'
import { ProductCard, Category, SITE_CONFIG } from '@/lib/types'
import { DEFAULT_CATEGORIES } from '@/lib/categories'
import ProductsClient from './ProductsClient'

export const metadata: Metadata = {
  title: 'Tất Cả Sản Phẩm | ' + SITE_CONFIG.name,
  description: `Khám phá hàng trăm sản phẩm hóa chất công nghiệp tại ${SITE_CONFIG.name}. Đầy đủ 23 danh mục: dung môi, phụ gia, hóa chất công nghiệp cho mọi ngành sản xuất.`,
  openGraph: {
    title: `Sản Phẩm | ${SITE_CONFIG.name}`,
    description: 'Đa dạng 1000+ sản phẩm hóa chất công nghiệp chất lượng cao',
  },
}

export default async function ProductsPage() {
  const [products, sanityCategories] = await Promise.all([
    client.fetch<ProductCard[]>(allProductsQuery, {}, { next: { revalidate: 60 } }),
    client.fetch<Category[]>(allCategoriesQuery, {}, { next: { revalidate: 60 } }),
  ])

  const categories = (sanityCategories && sanityCategories.length > 0) ? sanityCategories : DEFAULT_CATEGORIES

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-brand-900 to-brand-700 py-12 lg:py-16">
        <div className="section-container">
          <nav className="text-sm text-white/60 mb-3" aria-label="Breadcrumb">
            <a href="/" className="hover:text-white transition-colors">Trang chủ</a>
            <span className="mx-2">/</span>
            <span className="text-white">Sản phẩm</span>
          </nav>
          <h1 className="font-heading font-bold text-3xl lg:text-4xl text-white mb-2">
            Tất Cả Sản Phẩm
          </h1>
          <p className="text-white/70">
            Cung cấp đầy đủ sản phẩm từ {categories.length} danh mục hóa chất chuyên dụng
          </p>
        </div>
      </div>

      {/* Products with Client-side Filter — wrapped in Suspense for useSearchParams */}
      <Suspense fallback={<div className="section-container py-12 text-center text-gray-500">Đang tải sản phẩm...</div>}>
        <ProductsClient products={products} categories={categories} />
      </Suspense>
    </div>
  )
}
