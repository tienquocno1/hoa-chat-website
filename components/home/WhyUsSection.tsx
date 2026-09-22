import { ShieldCheck, Truck, Award, Users, Clock, Phone } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/types'

const features = [
  {
    icon: ShieldCheck,
    color: 'from-blue-500 to-blue-600',
    title: 'Chất lượng đảm bảo',
    description: 'Hóa chất đạt tiêu chuẩn quốc tế, có kiểm định chất lượng và giấy phép đầy đủ.',
  },
  {
    icon: Truck,
    color: 'from-green-500 to-green-600',
    title: 'Giao hàng toàn quốc',
    description: 'Vận chuyển đến tận nơi trên cả nước, đóng gói an toàn theo quy định hóa chất.',
  },
  {
    icon: Award,
    color: 'from-accent-400 to-accent-600',
    title: '10+ năm kinh nghiệm',
    description: 'Đội ngũ chuyên gia giàu kinh nghiệm, tư vấn chuyên sâu cho từng ngành sản xuất.',
  },
  {
    icon: Users,
    color: 'from-purple-500 to-purple-600',
    title: '1000+ khách hàng',
    description: 'Được tin tưởng bởi hàng ngàn doanh nghiệp sản xuất trên toàn quốc.',
  },
  {
    icon: Clock,
    color: 'from-pink-500 to-pink-600',
    title: 'Hỗ trợ nhanh chóng',
    description: 'Phản hồi trong vòng 30 phút, tư vấn miễn phí mọi thắc mắc về sản phẩm.',
  },
  {
    icon: Phone,
    color: 'from-brand-500 to-brand-700',
    title: 'Giá cạnh tranh',
    description: 'Cam kết giá tốt nhất thị trường, chiết khấu hấp dẫn cho đơn hàng số lượng lớn.',
  },
]

export default function WhyUsSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-500/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-accent-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Tại sao chọn chúng tôi
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">
            Cam Kết Chất Lượng &{' '}
            <span className="text-accent-400">Dịch Vụ Tốt Nhất</span>
          </h2>
          <p className="text-white/70 max-w-xl mx-auto">
            {SITE_CONFIG.name} luôn đặt chất lượng và sự hài lòng của khách hàng lên hàng đầu
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-white text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p className="text-white/70 mb-5 text-lg">
            Liên hệ ngay để được tư vấn và báo giá miễn phí
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={SITE_CONFIG.phoneHref} className="btn-accent">
              📞 Gọi ngay: {SITE_CONFIG.phone}
            </a>
            <a href={SITE_CONFIG.zaloHref} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              💬 Nhắn tin Zalo
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}