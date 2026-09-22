import Link from 'next/link'
import { Phone, MessageCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/types'

export default function ContactCTA() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="section-container">
        <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-3xl p-8 lg:p-12 relative overflow-hidden text-center">
          {/* Decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-white mb-4">
              Cần Tư Vấn Sản Phẩm?
            </h2>
            <p className="text-white/75 text-lg mb-8 max-w-xl mx-auto">
              Đội ngũ chuyên gia của chúng tôi sẵn sàng hỗ trợ bạn 24/7. Liên hệ ngay để được báo giá tốt nhất!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={SITE_CONFIG.phoneHref}
                className="inline-flex items-center justify-center gap-3 bg-white text-brand-700 font-bold px-8 py-4 rounded-2xl hover:bg-gray-50 transition-colors shadow-lg text-lg"
              >
                <Phone size={22} />
                {SITE_CONFIG.phone}
              </a>
              <a
                href={SITE_CONFIG.zaloHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white/15 backdrop-blur-sm border-2 border-white/30 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/20 transition-colors text-lg"
              >
                <MessageCircle size={22} />
                Nhắn tin Zalo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
