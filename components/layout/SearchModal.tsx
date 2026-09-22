'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, Loader2, ArrowRight, Package } from 'lucide-react'

interface SearchResult {
  _id: string
  name: string
  slug: { current: string }
  shortDescription?: string
  categoryName: string
  categorySlug?: { current: string }
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

  const handleClose = useCallback(() => {
    inputRef.current?.blur()
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
    onClose()
  }, [onClose])

  // Auto-focus input on desktop when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setResults([])
      if (typeof window !== 'undefined' && window.innerWidth >= 768) {
        inputRef.current?.focus()
      }
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleClose])

  // Fast debounced search
  const handleQueryChange = useCallback((value: string) => {
    setQuery(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (!value.trim()) {
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true)
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(value.trim())}&limit=5`)
        const data = await res.json()
        setResults(data.results || [])
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 250)
  }, [])

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!query.trim()) return
    router.push(`/products?q=${encodeURIComponent(query.trim())}`)
    handleClose()
  }

  const handleSelectProduct = (slug: string) => {
    router.push(`/products/${slug}`)
    handleClose()
  }

  const handleViewAll = () => {
    if (!query.trim()) return
    router.push(`/products?q=${encodeURIComponent(query.trim())}`)
    handleClose()
  }

  return (
    <div
      className={`fixed inset-0 z-[100] transition-all duration-200 ease-out ${
        isOpen
          ? 'opacity-100 pointer-events-auto visible'
          : 'opacity-0 pointer-events-none invisible'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/65 transition-opacity duration-200 cursor-pointer"
        onClick={handleClose}
      />

      {/* Modal Box with smooth scale + slide */}
      <div
        className={`relative top-[6vh] sm:top-[10vh] mx-auto w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-xl md:max-w-2xl transition-all duration-200 ease-out ${
          isOpen
            ? 'scale-100 translate-y-0 opacity-100'
            : 'scale-95 -translate-y-2 opacity-0'
        }`}
      >
        <div className="bg-white rounded-2xl shadow-2xl shadow-black/25 overflow-hidden border border-gray-100">
          {/* Search Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2.5 p-3 sm:p-4 border-b border-gray-100">
            <div className="w-5 h-5 shrink-0 text-brand-600 ml-1">
              {loading
                ? <Loader2 size={20} className="animate-spin text-brand-500" />
                : <Search size={20} className="text-gray-400" />
              }
            </div>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Tìm kiếm sản phẩm hóa chất..."
              className="flex-1 text-base text-gray-900 placeholder:text-gray-400 bg-transparent outline-none min-w-0"
            />
            {query && (
              <button
                type="button"
                onClick={() => handleQueryChange('')}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                title="Xóa nội dung"
              >
                <X size={16} className="pointer-events-none" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-medium text-gray-400 bg-gray-100 rounded-lg border border-gray-200">
              ESC
            </kbd>
            {/* Dedicated Close button (X) */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Đóng hộp tìm kiếm"
              className="p-2 -mr-1 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-gray-100 active:bg-gray-200 active:scale-95 transition-all touch-manipulation cursor-pointer shrink-0"
            >
              <X size={22} className="pointer-events-none" />
            </button>
          </form>

          {/* Results */}
          {query.trim() && (
            <div className="max-h-80 overflow-y-auto">
              {results.length > 0 ? (
                <>
                  <ul className="py-2">
                    {results.map((item) => (
                      <li key={item._id}>
                        <button
                          onClick={() => handleSelectProduct(item.slug.current)}
                          className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-brand-50 transition-colors group"
                        >
                          <div className="w-9 h-9 rounded-xl bg-brand-100 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-brand-200 transition-colors">
                            <Package size={16} className="text-brand-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 group-hover:text-brand-700 truncate">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                              {item.shortDescription || item.categoryName}
                            </p>
                          </div>
                          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full shrink-0 mt-0.5 whitespace-nowrap">
                            {item.categoryName}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>

                  {/* View all button */}
                  <div className="border-t border-gray-100 px-4 py-3">
                    <button
                      onClick={handleViewAll}
                      className="w-full flex items-center justify-between px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-xl transition-colors group"
                    >
                      <span>Xem tất cả kết quả cho "{query}"</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </>
              ) : !loading ? (
                <div className="flex flex-col items-center py-10 text-gray-400">
                  <Search size={32} className="mb-3 text-gray-300" />
                  <p className="text-sm font-medium">Không tìm thấy sản phẩm nào</p>
                  <p className="text-xs mt-1">Thử từ khóa khác</p>
                </div>
              ) : (
                <div className="flex items-center justify-center py-10">
                  <Loader2 size={24} className="animate-spin text-brand-400" />
                </div>
              )}
            </div>
          )}

          {/* Empty state hint */}
          {!query.trim() && (
            <div className="px-4 py-6 text-center">
              <p className="text-sm text-gray-400">Gõ tên sản phẩm, danh mục hoặc ứng dụng...</p>
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {['Dung môi', 'Hóa chất sơn', 'Xử lý nước', 'Phụ gia thực phẩm'].map((hint) => (
                  <button
                    key={hint}
                    onClick={() => handleQueryChange(hint)}
                    className="text-xs bg-gray-100 hover:bg-brand-50 hover:text-brand-700 text-gray-600 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {hint}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
