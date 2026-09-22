import Link from 'next/link'
import { FlaskConical, Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/types'

const categories = [
  'Dung môi công nghiệp',
  'Hóa chất công nghiệp',
  'Hóa chất dệt nhuộm',
  'Hóa chất tẩy rửa',
  'Phụ gia thực phẩm',
  'Hóa chất xử lí nước thải',
]

const quickLinks = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Tất cả sản phẩm', href: '/products' },
  { label: 'Liên hệ', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-white">
      {/* Main footer */}
      <div className="section-container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-heading font-bold text-lg">{SITE_CONFIG.shortName}</p>
                <p className="text-xs text-white/60">Hóa Chất Công Nghiệp</p>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              Nhà cung cấp hóa chất công nghiệp uy tín, chất lượng cao phục vụ mọi ngành sản xuất. Giao hàng toàn quốc.
            </p>
            {/* Social / Contact Icons */}
            <div className="flex gap-3">
              <a
                href={SITE_CONFIG.zaloHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-colors duration-200 text-sm font-bold"
                aria-label="Zalo"
              >
                Z
              </a>
              <a
                href={SITE_CONFIG.messengerHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                aria-label="Messenger"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href={SITE_CONFIG.phoneHref}
                className="w-10 h-10 bg-white/10 hover:bg-green-500 rounded-lg flex items-center justify-center transition-colors duration-200"
                aria-label="Phone"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 bg-accent-400 rounded-full" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Danh mục sản phẩm</h3>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat}>
                  <span className="text-white/70 text-sm flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-accent-400 rounded-full" />
                    {cat}
                  </span>
                </li>
              ))}
              <li>
                <Link href="/products" className="text-accent-400 hover:text-accent-300 text-sm font-medium transition-colors">
                  Xem tất cả →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li>
                <a href={SITE_CONFIG.phoneHref} className="flex items-start gap-3 text-white/70 hover:text-white text-sm transition-colors group">
                  <Phone size={16} className="mt-0.5 shrink-0 group-hover:text-green-400 transition-colors" />
                  <span>{SITE_CONFIG.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-start gap-3 text-white/70 hover:text-white text-sm transition-colors group">
                  <Mail size={16} className="mt-0.5 shrink-0 group-hover:text-blue-400 transition-colors" />
                  <span>{SITE_CONFIG.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/70 text-sm">
                  <MapPin size={16} className="mt-0.5 shrink-0" />
                  <span>{SITE_CONFIG.address}</span>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/70 text-sm">
                  <Clock size={16} className="mt-0.5 shrink-0" />
                  <span>{SITE_CONFIG.workingHours}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/50">
          <p>© {new Date().getFullYear()} Công ty TNHH {SITE_CONFIG.name}. Tất cả quyền được bảo lưu.</p>
          <p className="text-xs">Thiết kế bởi {SITE_CONFIG.shortName} Tech</p>
        </div>
      </div>
    </footer>
  )
}
