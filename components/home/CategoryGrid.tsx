'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Category, SITE_CONFIG } from '@/lib/types'
import { CATEGORIES_DATA, StaticCategory } from '@/lib/categories'
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react'

interface CategoryGridProps {
  categories?: Category[]
}

export default function CategoryGrid({ categories = [] }: CategoryGridProps) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeftState, setScrollLeftState] = useState(0)



  // Merge Sanity data with default 23 rich categories
  const displayCategories: (StaticCategory & { productCount?: number })[] = CATEGORIES_DATA.map((staticCat) => {
    const sanityMatch = categories.find((c) => c.slug?.current === staticCat.slug)
    return {
      ...staticCat,
      name: sanityMatch?.name || staticCat.name,
      description: sanityMatch?.description || staticCat.description,
    }
  })

  // Update navigation buttons state
  const checkScrollability = useCallback(() => {
    const el = sliderRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }, [])

  useEffect(() => {
    const el = sliderRef.current
    if (!el) return

    checkScrollability()
    el.addEventListener('scroll', checkScrollability, { passive: true })
    window.addEventListener('resize', checkScrollability)

    return () => {
      el.removeEventListener('scroll', checkScrollability)
      window.removeEventListener('resize', checkScrollability)
    }
  }, [checkScrollability])

  // Scroll controls
  const scroll = (direction: 'left' | 'right') => {
    const el = sliderRef.current
    if (!el) return
    const cardWidth = 280
    const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  // Mouse Drag to Scroll handlers with movement threshold to avoid blocking clicks
  const [hasMoved, setHasMoved] = useState(false)

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only handle primary (left) mouse button
    if (e.button !== 0) return
    const el = sliderRef.current
    if (!el) return
    setIsDragging(true)
    setHasMoved(false)
    setStartX(e.pageX - el.offsetLeft)
    setScrollLeftState(el.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const el = sliderRef.current
    if (!el) return
    const x = e.pageX - el.offsetLeft
    const diff = Math.abs(x - startX)
    // Only treat as drag if mouse moved more than 8 pixels
    if (diff > 8) {
      setHasMoved(true)
      e.preventDefault()
      const walk = (x - startX) * 1.4
      el.scrollLeft = scrollLeftState - walk
    }
  }

  const handleMouseUpOrLeave = () => {
    setIsDragging(false)
    setTimeout(() => setHasMoved(false), 50)
  }

  // Schema.org ItemList JSON-LD for rich Google Indexing
  const categoryItemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Danh Mục Hóa Chất Công Nghiệp - Hóa Chất Hải Vân',
    description: 'Danh mục 23 nhóm hóa chất công nghiệp, dung môi, phụ gia chuyên dụng chuẩn quốc tế.',
    numberOfItems: displayCategories.length,
    itemListElement: displayCategories.map((cat, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: cat.name,
      url: `${SITE_CONFIG.url}/products?category=${cat.slug}`,
      description: cat.description,
    })),
  }

  return (
    <section
      id="danh-muc-san-pham"
      className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden"
      aria-labelledby="category-section-title"
    >
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryItemListSchema) }}
      />

      <div className="section-container">
        {/* Section Header with Top-Right "Xem tất cả" and Slider Nav Buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 lg:mb-12">
          {/* Left Title Area */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/60 text-brand-700 text-xs font-semibold tracking-wide uppercase mb-3">
              <Sparkles size={13} className="text-accent-500" />
              <span>Hệ Thống Sản Phẩm Đạt Chuẩn</span>
            </div>
            <h2 id="category-section-title" className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-gray-900 tracking-tight leading-tight">
              Đa Dạng <span className="gradient-text">23 Danh Mục Hóa Chất</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
              Cung cấp hóa chất chuyên dụng & nguyên liệu kỹ thuật cao phục vụ hơn 20 ngành sản xuất công nghiệp chủ lực trên toàn quốc.
            </p>
          </div>

          {/* Right Action Area: "Xem tất cả" Link & Slider Navigation */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 self-start md:self-end">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-50 hover:bg-brand-600 text-brand-700 hover:text-white font-medium text-xs sm:text-sm border border-brand-200 hover:border-brand-600 transition-all duration-300 shadow-sm group"
              title="Xem tất cả 23 danh mục sản phẩm"
            >
              <span>Xem tất cả danh mục</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            {/* Prev / Next Carousel Controls */}
            <div className="flex items-center gap-1.5" role="group" aria-label="Điều hướng danh mục">
              <button
                type="button"
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                aria-label="Xem danh mục trước"
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-200 touch-manipulation ${
                  canScrollLeft
                    ? 'bg-white border-gray-200 text-gray-700 hover:bg-brand-50 hover:border-brand-300 hover:text-brand-700 shadow-sm active:scale-95'
                    : 'bg-gray-100 border-gray-200 text-gray-300 cursor-not-allowed'
                }`}
              >
                <ChevronLeft size={20} className="pointer-events-none" />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                aria-label="Xem danh mục tiếp theo"
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-200 touch-manipulation ${
                  canScrollRight
                    ? 'bg-white border-gray-200 text-gray-700 hover:bg-brand-50 hover:border-brand-300 hover:text-brand-700 shadow-sm active:scale-95'
                    : 'bg-gray-100 border-gray-200 text-gray-300 cursor-not-allowed'
                }`}
              >
                <ChevronRight size={20} className="pointer-events-none" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Carousel Slider Container */}
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent ${
            isDragging ? 'cursor-grabbing snap-none select-none' : 'md:cursor-grab snap-x snap-mandatory'
          }`}
          style={{
            scrollbarWidth: 'thin',
            WebkitOverflowScrolling: 'touch',
            overscrollBehaviorX: 'contain',
          }}
          tabIndex={0}
          role="region"
          aria-label="Băng chuyền 23 danh mục sản phẩm"
        >
          {displayCategories.map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              onClick={(e) => {
                if (hasMoved) e.preventDefault()
              }}
              className="group relative w-[240px] sm:w-[260px] lg:w-[280px] h-[340px] shrink-0 snap-start rounded-2xl overflow-hidden border border-gray-200/80 lg:hover:border-brand-400/80 shadow-sm lg:hover:shadow-xl lg:hover:shadow-brand-600/15 transition-[shadow,border-color,transform] duration-300 lg:hover:-translate-y-1.5 flex flex-col justify-between p-5 focus:outline-none focus:ring-2 focus:ring-brand-500 touch-manipulation"
              title={`Khám phá sản phẩm ${cat.name}`}
            >
              {/* Background Theme Image with smooth zoom */}
              <div className="absolute inset-0 z-0 bg-gray-100">
                <Image
                  src={cat.image}
                  alt={`Hóa chất ${cat.name} - ${SITE_CONFIG.name}`}
                  fill
                  sizes="(max-width: 640px) 240px, (max-width: 1024px) 260px, 280px"
                  className="object-cover object-center transition-transform duration-700 ease-out lg:group-hover:scale-110"
                  priority={idx < 4}
                  loading={idx < 4 ? undefined : 'lazy'}
                />
                {/* Gradient at bottom only: ensures crystal clear text legibility without tinting photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              </div>

              {/* Top Row: Icon Badge & Index Indicator */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 text-2xl shadow-sm lg:group-hover:bg-white/25 lg:group-hover:scale-105 transition-all duration-300">
                  {cat.icon}
                </span>
                <span className="text-xs font-mono font-medium text-white/70 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Bottom Row: Category Name, Description & Interactive CTA */}
              <div className="relative z-10">
                <h3 className="text-lg font-heading font-bold text-white group-hover:text-amber-300 transition-colors duration-200 line-clamp-2 leading-snug mb-2">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed mb-4 font-normal">
                  {cat.shortDesc || cat.description}
                </p>

                {/* Micro CTA Button */}
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 group-hover:text-white transition-colors duration-200">
                  <span className="underline decoration-white/40 group-hover:decoration-amber-300 underline-offset-4">
                    Xem sản phẩm
                  </span>
                  <ArrowRight
                    size={13}
                    className="text-amber-400 lg:group-hover:translate-x-1.5 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Glowing Bottom Accent Line on hover */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brand-400 via-accent-400 to-brand-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>
          ))}
        </div>

        {/* Mobile helper notice */}
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500 lg:hidden px-1">
          <span>← Vuốt ngang để xem thêm {displayCategories.length} danh mục →</span>
          <Link href="/products" className="text-brand-600 font-medium">
            Xem tất cả
          </Link>
        </div>
      </div>
    </section>
  )
}
