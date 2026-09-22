import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Package } from 'lucide-react'
import { ProductCard } from '@/lib/types'
import { urlFor } from '@/sanity/lib/image'

interface ProductCardProps {
  product: ProductCard
  index?: number
}

export default function ProductCardComponent({ product, index = 0 }: ProductCardProps) {
  const imageUrl =
    product.images?.[0]
      ? urlFor(product.images[0]).width(400).height(300).url()
      : null

  return (
    <Link
      href={`/products/${product.slug?.current}`}
      className="product-card group block"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Image */}
      <div className="relative w-full h-36 sm:h-44 lg:h-48 bg-gray-50 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100">
            <Package className="w-10 h-10 sm:w-12 sm:h-12 text-brand-300" />
          </div>
        )}
        {/* Category badge */}
        {product.categoryName && (
          <div className="absolute top-2 left-2">
            <span className="category-badge shadow-sm text-[10px] sm:text-xs">{product.categoryName}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <h3 className="font-heading font-semibold text-gray-900 group-hover:text-brand-700 transition-colors duration-200 line-clamp-2 mb-1 sm:mb-2 text-sm sm:text-base leading-snug">
          {product.name}
        </h3>

        {product.shortDescription && (
          <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mb-2 sm:mb-3 leading-relaxed hidden sm:block">
            {product.shortDescription}
          </p>
        )}

        {/* Meta - only on larger cards */}
        <div className="hidden sm:flex items-center justify-between text-xs text-gray-400">
          {product.origin && (
            <span className="flex items-center gap-1">
              <MapPin size={11} />
              {product.origin}
            </span>
          )}
          {product.unit && (
            <span className="bg-gray-100 px-2 py-0.5 rounded-md font-medium">
              /{product.unit}
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="mt-2 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-100">
          <span className="text-brand-600 font-semibold text-xs sm:text-sm group-hover:text-brand-700 flex items-center gap-1">
            Liên hệ báo giá
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
