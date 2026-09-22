import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Phone } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/types'

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden bg-brand-950">
      {/* Background Hero Image with Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-warehouse.jpg"
          alt={`Tổng kho hóa chất ${SITE_CONFIG.name}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Multi-stage dark gradient overlays to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/85 to-brand-900/65 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-transparent to-brand-950/70 pointer-events-none" />
        <div className="absolute inset-0 bg-brand-950/25 pointer-events-none" />
      </div>

      {/* Decorative ambient lighting & grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-brand-500/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="section-container relative z-10 py-20 lg:py-32 pt-28 lg:pt-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white/95 text-xs sm:text-sm font-medium px-3.5 sm:px-4 py-2 rounded-full mb-5 sm:mb-6 shadow-lg animate-fade-in">
            <span className="w-2.5 h-2.5 bg-accent-400 rounded-full animate-pulse shrink-0" />
            Nhà phân phối hóa chất uy tín — {SITE_CONFIG.name}
          </div>

          {/* Heading */}
          <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white leading-tight mb-5 sm:mb-6 animate-slide-up">
            Hóa Chất <span className="text-accent-400">Công Nghiệp</span> Chất Lượng Cao
          </h1>

          <p className="text-white/85 text-base sm:text-lg lg:text-xl leading-relaxed mb-7 sm:mb-8 max-w-2xl animate-slide-up drop-shadow-sm">
            Cung cấp đa dạng hóa chất công nghiệp, dung môi, phụ gia cho{' '}
            <strong className="text-white font-semibold">23+ ngành sản xuất</strong>. Đầy đủ chứng nhận COA/MSDS, chất lượng đảm bảo, giá cạnh tranh và giao hàng toàn quốc.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-12 animate-slide-up">
            <Link href="/products" className="btn-accent text-sm sm:text-base py-3 sm:py-3.5 px-6 sm:px-7 justify-center shadow-lg shadow-accent-500/25">
              Xem sản phẩm <ArrowRight size={18} />
            </Link>
            <a href={SITE_CONFIG.phoneHref} className="btn-ghost text-sm sm:text-base py-3 sm:py-3.5 px-6 sm:px-7 justify-center backdrop-blur-sm border-white/30 hover:bg-white/20">
              <Phone size={18} /> Gọi tư vấn ngay
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 border-t border-white/20 pt-6 sm:pt-8 animate-fade-in backdrop-blur-sm bg-black/15 rounded-2xl p-4 sm:p-6 border border-white/10">
            {[
              { number: '10+', label: 'Năm kinh nghiệm' },
              { number: '1000+', label: 'Sản phẩm' },
              { number: '1000+', label: 'Khách hàng tin chọn' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl text-white">{stat.number}</p>
                <p className="text-white/70 text-xs sm:text-sm mt-0.5 leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-white/50 animate-bounce z-10">
        <span className="text-xs font-medium tracking-widest uppercase">Cuộn xuống</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  )
}