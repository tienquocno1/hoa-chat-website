'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Package, X, Maximize2, ZoomIn } from 'lucide-react'
import { SanityImage } from '@/lib/types'
import { urlFor } from '@/sanity/lib/image'

interface ImageGalleryProps {
  images: SanityImage[]
  productName: string
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selected, setSelected] = useState(0)
  const [isZooming, setIsZooming] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Safe image helper
  const getImageUrl = useCallback((img: SanityImage | undefined, width = 1200, height = 1200) => {
    if (!img) return null
    try {
      return urlFor(img).width(width).height(height).url()
    } catch {
      return null
    }
  }, [])

  const currentImage = images[selected]
  const currentImageUrl = getImageUrl(currentImage, 1200, 1200)
  const lightboxImageUrl = getImageUrl(currentImage, 1800, 1800)

  // Next / Prev handlers
  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    setSelected((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    setSelected((prev) => (prev + 1) % images.length)
  }, [images.length])

  // Desktop hover zoom - only on devices with fine pointer (mouse)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100))
    setZoomPos({ x, y })
  }

  // Keyboard navigation & lock scroll when lightbox is open
  useEffect(() => {
    if (!isLightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false)
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isLightboxOpen, handlePrev, handleNext])

  if (!images || images.length === 0 || !currentImageUrl) {
    return (
      <div className="aspect-square bg-gradient-to-br from-brand-50 to-brand-100 rounded-2xl flex flex-col items-center justify-center border border-gray-100 text-brand-300">
        <Package className="w-16 h-16 sm:w-20 sm:h-20 mb-2 opacity-60" />
        <span className="text-sm font-medium text-gray-400">Đang cập nhật hình ảnh</span>
      </div>
    )
  }

  return (
    <div className="space-y-4 select-none">
      {/* Main Image Stage */}
      <div
        ref={containerRef}
        onClick={() => setIsLightboxOpen(true)}
        onMouseEnter={() => setIsZooming(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setIsZooming(false)
          setZoomPos({ x: 50, y: 50 })
        }}
        className="relative aspect-square bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm cursor-zoom-in group touch-manipulation"
        title="Nhấn để phóng to toàn màn hình"
      >
        {/* Main Image with smooth zoom transform */}
        <div
          className="w-full h-full relative transition-transform ease-out pointer-events-none"
          style={{
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
            transform: isZooming ? 'scale(2.2)' : 'scale(1)',
            transitionDuration: isZooming ? '0.08s' : '0.25s',
          }}
        >
          <Image
            src={currentImageUrl}
            alt={currentImage.alt || productName}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-3"
            priority
            draggable={false}
          />
        </div>

        {/* Desktop Zoom hint */}
        <div
          className={`hidden md:flex absolute bottom-3 right-3 z-10 items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/65 text-white text-xs font-medium pointer-events-none transition-opacity duration-200 ${
            isZooming ? 'opacity-0' : 'opacity-80'
          }`}
        >
          <ZoomIn size={14} className="text-amber-400" />
          Rê chuột để phóng to
        </div>

        {/* Maximize Fullscreen Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            setIsLightboxOpen(true)
          }}
          aria-label="Xem ảnh toàn màn hình"
          className="absolute top-3 right-3 z-20 w-11 h-11 rounded-xl bg-white/95 hover:bg-white shadow-md border border-gray-200/80 flex items-center justify-center text-gray-700 hover:text-brand-600 transition-all active:scale-90 cursor-pointer"
          title="Mở ảnh toàn màn hình"
        >
          <Maximize2 size={18} className="pointer-events-none" />
        </button>

        {/* Prev/Next arrows on main image if multiple images */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Ảnh trước"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 hover:bg-white rounded-xl shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:text-brand-600 transition-all active:scale-90 cursor-pointer md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronLeft size={20} className="pointer-events-none" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Ảnh tiếp theo"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 hover:bg-white rounded-xl shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:text-brand-600 transition-all active:scale-90 cursor-pointer md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronRight size={20} className="pointer-events-none" />
            </button>
          </>
        )}

        {/* Mobile helper badge */}
        <div className="md:hidden absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-lg bg-black/60 text-white text-[11px] font-medium pointer-events-none">
          Chạm để mở to
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
          {images.map((img, idx) => {
            const thumbUrl = getImageUrl(img, 160, 160)
            if (!thumbUrl) return null
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelected(idx)}
                aria-label={`Xem hình ${idx + 1}`}
                className={`relative w-[72px] h-[72px] shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-150 bg-white cursor-pointer active:scale-95 ${
                  idx === selected
                    ? 'border-brand-600 ring-2 ring-brand-300 shadow-sm scale-105'
                    : 'border-gray-200 opacity-70 hover:opacity-100 hover:border-gray-400'
                }`}
              >
                <Image
                  src={thumbUrl}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  className="object-contain p-1"
                  draggable={false}
                />
              </button>
            )
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal - Always silky smooth with hardware acceleration */}
      <div
        className={`fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center transition-opacity duration-200 ease-out ${
          isLightboxOpen
            ? 'opacity-100 pointer-events-auto visible'
            : 'opacity-0 pointer-events-none invisible'
        }`}
        onClick={() => setIsLightboxOpen(false)}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsLightboxOpen(false)}
          aria-label="Đóng toàn màn hình"
          className="absolute top-4 right-4 z-50 w-12 h-12 bg-white/15 hover:bg-white/25 text-white rounded-full flex items-center justify-center transition-all active:scale-90 cursor-pointer"
          title="Đóng (Esc)"
        >
          <X size={24} className="pointer-events-none" />
        </button>

        {/* Counter Badge */}
        {images.length > 1 && (
          <div className="absolute top-5 left-5 z-50 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-mono font-medium">
            {selected + 1} / {images.length}
          </div>
        )}

        {/* Lightbox Main Image Stage */}
        <div
          className={`relative w-[92vw] max-w-5xl h-[75vh] max-h-[850px] flex items-center justify-center transition-all duration-200 ease-out ${
            isLightboxOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {lightboxImageUrl && (
            <Image
              src={lightboxImageUrl}
              alt={currentImage.alt || productName}
              fill
              className="object-contain select-none"
              priority
              sizes="90vw"
            />
          )}
        </div>

        {/* Prev / Next buttons in Lightbox */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Ảnh trước"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/15 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all active:scale-90 cursor-pointer"
              title="Ảnh trước (Mũi tên trái)"
            >
              <ChevronLeft size={28} className="pointer-events-none" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Ảnh tiếp theo"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/15 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all active:scale-90 cursor-pointer"
              title="Ảnh tiếp theo (Mũi tên phải)"
            >
              <ChevronRight size={28} className="pointer-events-none" />
            </button>
          </>
        )}

        {/* Caption */}
        <div className="absolute bottom-5 inset-x-0 text-center text-white/75 text-sm px-4 pointer-events-none">
          <p className="font-medium line-clamp-1">{productName}</p>
          <span className="text-xs text-white/50 mt-0.5 inline-block">Chạm ngoài ảnh hoặc bấm Esc để đóng</span>
        </div>
      </div>
    </div>
  )
}
