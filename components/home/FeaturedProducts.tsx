import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ProductCard } from '@/lib/types'
import ProductCardComponent from '@/components/products/ProductCard'

interface FeaturedProductsProps {
  products: ProductCard[]
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (!products || products.length === 0) return null

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-block text-brand-600 font-semibold text-sm uppercase tracking-widest mb-3">
              Sản phẩm tiêu biểu
            </span>
            <h2 className="section-title">
              Sản Phẩm <span className="gradient-text">Nổi Bật</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-semibold transition-colors group shrink-0"
          >
            Xem tất cả
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <ProductCardComponent key={product._id} product={product} index={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
