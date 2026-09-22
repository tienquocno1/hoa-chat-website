import type { Metadata } from 'next'
import { Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Liên Hệ',
  description: `Liên hệ ${SITE_CONFIG.name} để được tư vấn và báo giá hóa chất công nghiệp. Điện thoại: ${SITE_CONFIG.phone}. Hỗ trợ qua Zalo, Messenger.`,
}

const contactMethods = [
  {
    icon: Phone,
    label: 'Điện thoại',
    value: SITE_CONFIG.phone,
    href: SITE_CONFIG.phoneHref,
    description: 'Gọi trực tiếp để tư vấn nhanh',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
  },
  {
    icon: MessageCircle,
    label: 'Zalo',
    value: `Zalo: ${SITE_CONFIG.zalo}`,
    href: SITE_CONFIG.zaloHref,
    description: 'Nhắn tin Zalo để báo giá nhanh',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
  },
  {
    icon: MessageCircle,
    label: 'Messenger',
    value: 'Facebook Messenger',
    href: SITE_CONFIG.messengerHref,
    description: 'Chat qua Messenger tiện lợi',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
  },
  {
    icon: Mail,
    label: 'Email',
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
    description: 'Gửi email yêu cầu báo giá',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
  },
]

export default function ContactPage() {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-900 to-brand-700 py-12 lg:py-20">
        <div className="section-container text-center">
          <h1 className="font-heading font-bold text-4xl lg:text-5xl text-white mb-4">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Đội ngũ chuyên gia luôn sẵn sàng tư vấn và hỗ trợ bạn 24/7
          </p>
        </div>
      </div>

      <div className="section-container py-12 lg:py-16">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {contactMethods.map((method) => {
            const Icon = method.icon
            return (
              <a
                key={method.label}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`group ${method.bgColor} border border-${method.textColor.split('-')[1]}-100 rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <p className="font-heading font-semibold text-gray-900 mb-1">{method.label}</p>
                <p className={`font-bold ${method.textColor} mb-2`}>{method.value}</p>
                <p className="text-gray-500 text-sm">{method.description}</p>
              </a>
            )
          })}
        </div>

        {/* Info + CTA */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Company info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
            <h2 className="font-heading font-bold text-xl text-gray-900 mb-6">Thông Tin Công Ty</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-0.5">Địa chỉ</p>
                  <p className="text-gray-600 text-sm">{SITE_CONFIG.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-0.5">Giờ làm việc</p>
                  <p className="text-gray-600 text-sm">{SITE_CONFIG.workingHours}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-0.5">Điện thoại</p>
                  <a href={SITE_CONFIG.phoneHref} className="text-brand-600 font-bold text-sm hover:underline">
                    {SITE_CONFIG.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick contact CTA */}
          <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-7 text-white">
            <h2 className="font-heading font-bold text-xl mb-3">Cần Tư Vấn Ngay?</h2>
            <p className="text-white/75 mb-6 leading-relaxed">
              Liên hệ ngay để được báo giá chi tiết và tư vấn lựa chọn hóa chất phù hợp nhất cho nhu cầu sản xuất của bạn.
            </p>
            <div className="space-y-3">
              <a
                href={SITE_CONFIG.phoneHref}
                className="flex items-center gap-3 bg-white text-brand-700 font-bold py-3.5 px-5 rounded-xl hover:bg-gray-50 transition-colors w-full justify-center text-lg"
              >
                <Phone size={20} />
                {SITE_CONFIG.phone}
              </a>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={SITE_CONFIG.zaloHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white/15 border border-white/30 text-white font-semibold py-3 px-4 rounded-xl hover:bg-white/25 transition-colors"
                >
                  <span className="font-bold">Z</span> Zalo
                </a>
                <a
                  href={SITE_CONFIG.messengerHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white/15 border border-white/30 text-white font-semibold py-3 px-4 rounded-xl hover:bg-white/25 transition-colors"
                >
                  <MessageCircle size={16} /> Messenger
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
