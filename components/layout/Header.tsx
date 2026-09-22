'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, FlaskConical, Search } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/types'
import SearchModal from './SearchModal'

const navLinks = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Sản phẩm', href: '/products' },
  { label: 'Liên hệ', href: '/contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()

  const isHomePage = pathname === '/'
  // On server/before mount, default to transparent for home page to avoid flash
  const isTransparent = isHomePage && !scrolled

  // Robust cross-browser scroll detection for mobile, tablet & desktop
  const handleScroll = useCallback(() => {
    const scrollPos =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0
    setScrolled(scrollPos > 8)
  }, [])

  useEffect(() => {
    setMounted(true)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  // Close mobile menu when navigating
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <header
        suppressHydrationWarning
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
          isTransparent && !isOpen
            ? 'bg-transparent'
            : 'bg-white shadow-sm'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:scale-110 transition-transform duration-200">
                <FlaskConical className="w-5 h-5 text-white" />
              </div>
              <div className="leading-tight">
                <span className={`font-heading font-bold text-lg transition-colors duration-200 ${
                  isTransparent && !isOpen ? 'text-white' : 'text-brand-900'
                }`}>
                  {SITE_CONFIG.shortName}
                </span>
                <p className={`text-xs transition-colors duration-200 ${
                  isTransparent && !isOpen ? 'text-white/70' : 'text-gray-500'
                }`}>
                  Hóa Chất Công Nghiệp
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.href + link.label}
                    href={link.href}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                      active
                        ? isTransparent
                          ? 'bg-white/20 text-white'
                          : 'bg-brand-600 text-white shadow-sm'
                        : isTransparent
                        ? 'text-white/90 hover:text-white hover:bg-white/10'
                        : 'text-gray-700 hover:text-brand-600 hover:bg-brand-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}

              {/* Search Button — Desktop */}
              <button
                id="header-search-btn"
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Tìm kiếm sản phẩm"
                className={`p-2 rounded-lg transition-all duration-200 cursor-pointer ${
                  isTransparent
                    ? 'text-white/90 hover:text-white hover:bg-white/10'
                    : 'text-gray-700 hover:text-brand-600 hover:bg-brand-50'
                }`}
              >
                <Search size={18} />
              </button>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-2">
              <a href={SITE_CONFIG.phoneHref} className="btn-accent text-sm py-2.5 px-5">
                📞 {SITE_CONFIG.phone}
              </a>
            </div>

            {/* Mobile right group: search + hamburger */}
            <div className="flex lg:hidden items-center gap-1">
              <button
                id="header-search-btn-mobile"
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Tìm kiếm sản phẩm"
                className={`p-2.5 rounded-xl transition-all duration-150 active:scale-90 touch-manipulation cursor-pointer ${
                  isTransparent && !isOpen ? 'text-white active:bg-white/20' : 'text-gray-700 active:bg-gray-100'
                }`}
              >
                <Search size={22} className="pointer-events-none" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={`p-2.5 rounded-xl transition-all duration-150 active:scale-90 touch-manipulation cursor-pointer ${
                  isTransparent && !isOpen ? 'text-white active:bg-white/20' : 'text-gray-700 active:bg-gray-100'
                }`}
                aria-label={isOpen ? 'Đóng menu' : 'Mở menu'}
                aria-expanded={isOpen}
              >
                <div className="w-6 h-6 relative flex items-center justify-center pointer-events-none">
                  <X
                    size={24}
                    className={`absolute inset-0 transition-all duration-200 ease-out ${
                      isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75'
                    }`}
                  />
                  <Menu
                    size={24}
                    className={`absolute inset-0 transition-all duration-200 ease-out ${
                      isOpen ? 'opacity-0 -rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Backdrop */}
        <div
          onClick={() => setIsOpen(false)}
          className={`lg:hidden fixed inset-0 top-16 bg-black/40 transition-opacity duration-200 ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        />

        {/* Mobile Menu Dropdown - Silky smooth GPU transition without page reflow */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-2xl transition-all duration-200 ease-out ${
            isOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto visible'
              : 'opacity-0 -translate-y-2 pointer-events-none invisible'
          }`}
        >
          <div className="section-container py-3 space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                    active
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'text-gray-700 hover:text-brand-600 active:bg-brand-50 hover:bg-brand-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="pt-2 border-t border-gray-100">
              <a href={SITE_CONFIG.phoneHref} className="btn-accent w-full justify-center text-sm py-3">
                📞 Gọi ngay: {SITE_CONFIG.phone}
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
