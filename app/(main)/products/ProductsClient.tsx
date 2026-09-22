'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search, SlidersHorizontal, X, ChevronDown, ChevronUp, Sparkles } from 'lucide-react'
import { ProductCard, Category } from '@/lib/types'
import ProductCardComponent from '@/components/products/ProductCard'

interface ProductsClientProps {
  products: ProductCard[]
  categories: Category[]
}

const ITEMS_PER_PAGE = 12
const FEATURED_SLUG = '__featured__'

export default function ProductsClient({ products, categories }: ProductsClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const initialCategory = searchParams.get('category') || null

  const [search, setSearch] = useState(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory)
  const [page, setPage] = useState(1)
  const [filterOpen, setFilterOpen] = useState(false)

  // Sync state when URL params change
  useEffect(() => {
    const q = searchParams.get('q') || ''
    const cat = searchParams.get('category') || null
    setSearch(q)
    setSelectedCategory(cat)
    setPage(1)
  }, [searchParams])

  const featuredCount = useMemo(() => products.filter((p) => p.featured).length, [products])

  const filtered = useMemo(() => {
    let result = products

    if (selectedCategory === FEATURED_SLUG) {
      // Virtual "featured" category
      result = result.filter((p) => p.featured)
    } else if (selectedCategory) {
      result = result.filter((p) => p.categorySlug?.current === selectedCategory)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription?.toLowerCase().includes(q) ||
          p.categoryName?.toLowerCase().includes(q)
      )
    }

    return result
  }, [products, search, selectedCategory])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const handleCategoryChange = (slug: string | null) => {
    setSelectedCategory(slug)
    setPage(1)
    const params = new URLSearchParams(searchParams.toString())
    if (slug) {
      params.set('category', slug)
    } else {
      params.delete('category')
    }
    const queryStr = params.toString()
    router.replace(queryStr ? `/products?${queryStr}` : '/products', { scroll: false })
  }

  const handleSearch = (value: string) => {
    setSearch(value)
    setPage(1)
    const params = new URLSearchParams(searchParams.toString())
    if (value.trim()) {
      params.set('q', value)
    } else {
      params.delete('q')
    }
    const queryStr = params.toString()
    router.replace(queryStr ? `/products?${queryStr}` : '/products', { scroll: false })
  }

  // Get display name for active category filter tag
  const getActiveCategoryName = () => {
    if (selectedCategory === FEATURED_SLUG) return 'Sản Phẩm Nổi Bật'
    return categories.find((c) => c.slug?.current === selectedCategory)?.name || selectedCategory
  }

  const FilterContent = () => (
    <>
      {/* Search inside filter */}
      <div className="mb-4">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
          />
          {search && (
            <button onClick={() => handleSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Category list */}
      <div className="space-y-1">
        {/* All products */}
        <button
          onClick={() => handleCategoryChange(null)}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
            !selectedCategory ? 'bg-brand-600 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span>Tất cả sản phẩm</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${!selectedCategory ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
            {products.length}
          </span>
        </button>

        {/* ⭐ Featured Virtual Category - FIRST */}
        {featuredCount > 0 && (
          <button
            onClick={() => handleCategoryChange(FEATURED_SLUG)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
              selectedCategory === FEATURED_SLUG
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-amber-700 hover:bg-amber-50 border border-amber-200'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Sparkles size={14} className={selectedCategory === FEATURED_SLUG ? 'text-white' : 'text-amber-500'} />
              Sản Phẩm Nổi Bật
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${selectedCategory === FEATURED_SLUG ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-600'}`}>
              {featuredCount}
            </span>
          </button>
        )}

        {/* Separator */}
        <div className="border-t border-gray-100 my-2" />

        {/* Real categories */}
        {categories.map((cat) => {
          const count = products.filter((p) => p.categorySlug?.current === cat.slug?.current).length
          const isActive = selectedCategory === cat.slug?.current
          return (
            <button
              key={cat._id}
              onClick={() => handleCategoryChange(cat.slug?.current ?? null)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                isActive ? 'bg-brand-600 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="truncate pr-2">{cat.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold shrink-0 ${isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>
    </>
  )

  return (
    <div className="section-container py-8 lg:py-12">
      {/* ── Mobile layout: search + filter toggle ── */}
      <div className="lg:hidden mb-4 space-y-3">
        {/* Search bar */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-3 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all shadow-sm"
          />
          {search && (
            <button onClick={() => handleSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter toggle button */}
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors w-full justify-between"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-brand-600" />
            Lọc theo danh mục ({categories.length})
            {selectedCategory && (
              <span className="bg-brand-600 text-white text-xs px-2 py-0.5 rounded-full">1</span>
            )}
          </span>
          {filterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {/* Collapsible filter panel on mobile */}
        {filterOpen && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-4">
            {/* Featured chip first */}
            {featuredCount > 0 && (
              <div className="mb-3">
                <button
                  onClick={() => { handleCategoryChange(FEATURED_SLUG); setFilterOpen(false) }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedCategory === FEATURED_SLUG
                      ? 'bg-amber-500 text-white'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  <Sparkles size={12} />
                  Sản Phẩm Nổi Bật ({featuredCount})
                </button>
              </div>
            )}
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Danh mục ({categories.length})</p>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              <button
                onClick={() => { handleCategoryChange(null); setFilterOpen(false) }}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  !selectedCategory ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tất cả ({products.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => { handleCategoryChange(cat.slug?.current ?? null); setFilterOpen(false) }}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedCategory === cat.slug?.current
                      ? 'bg-brand-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active filter tags */}
        {(selectedCategory || search) && (
          <div className="flex flex-wrap items-center gap-2">
            {search && (
              <span className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 text-xs font-medium px-3 py-1.5 rounded-full">
                🔍 "{search}"
                <button onClick={() => handleSearch('')} className="hover:text-red-500 ml-0.5">
                  <X size={12} />
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${
                selectedCategory === FEATURED_SLUG
                  ? 'bg-amber-50 text-amber-700'
                  : 'bg-brand-50 text-brand-700'
              }`}>
                {selectedCategory === FEATURED_SLUG && <Sparkles size={11} />}
                {getActiveCategoryName()}
                <button onClick={() => handleCategoryChange(null)} className="hover:text-red-500 ml-0.5">
                  <X size={12} />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* ── Desktop layout: sidebar + grid ── */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:w-72 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24">
            <div className="flex items-center justify-between font-heading font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-brand-600" />
                <span>Danh Mục Sản Phẩm</span>
              </div>
              <span className="text-xs text-gray-400 font-normal">{categories.length} danh mục</span>
            </div>
            <FilterContent />
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Results info */}
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <p className="text-gray-600 text-sm">
              <strong>{filtered.length}</strong> sản phẩm
              {search && (
                <span className="text-brand-700"> khớp với "<strong>{search}</strong>"</span>
              )}
              {selectedCategory && !search && (
                <span>
                  {' '}trong{' '}
                  <span className={`font-semibold ${selectedCategory === FEATURED_SLUG ? 'text-amber-600' : 'text-brand-700'}`}>
                    {selectedCategory === FEATURED_SLUG && '⭐ '}
                    {getActiveCategoryName()}
                  </span>
                </span>
              )}
            </p>

            {selectedCategory && (
              <button
                onClick={() => handleCategoryChange(null)}
                className="text-xs text-brand-600 hover:text-brand-800 font-medium underline"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>

          {/* Product Grid */}
          {paginated.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
              {paginated.map((product, idx) => (
                <ProductCardComponent key={product._id} product={product} index={idx} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <Search size={40} className="mx-auto mb-4 text-gray-300" />
              <p className="text-base font-semibold text-gray-800 mb-2">Chưa có sản phẩm trong danh mục này</p>
              <p className="text-sm text-gray-500 mb-5">Danh mục đang được cập nhật thêm sản phẩm mới từ nhà máy.</p>
              <button
                onClick={() => handleCategoryChange(null)}
                className="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-medium text-sm hover:bg-brand-700 transition-colors shadow-sm"
              >
                Xem tất cả sản phẩm
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center flex-wrap gap-2 mt-8 lg:mt-10">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => { setPage(p); window.scrollTo({ top: 200, behavior: 'smooth' }) }}
                  className={`w-10 h-10 rounded-xl font-medium text-sm transition-all ${
                    p === page
                      ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/25'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
