import Image from 'next/image'
import { CheckCircle2, ShieldCheck, Truck } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/types'

export default function CapabilitiesSection() {
  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-14 lg:mb-16">
          <span className="inline-block text-brand-600 font-bold text-xs sm:text-sm uppercase tracking-wider bg-brand-50 px-3.5 py-1.5 rounded-full mb-3 border border-brand-100">
            Năng lực vận hành & Kho bãi
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-4">
            Hạ Tầng Hiện Đại — <span className="gradient-text">Chuẩn Quốc Tế</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {SITE_CONFIG.name} đầu tư đồng bộ hệ thống kiểm nghiệm chất lượng nghiêm ngặt và đội xe tải vận chuyển chuyên dụng, cam kết mang đến sự an tâm tuyệt đối cho các nhà máy sản xuất.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Card 1: Lab & Quality */}
          <div className="group bg-gradient-to-b from-gray-50 to-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
            {/* Image Container */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <Image
                src="/images/lab-quality.jpg"
                alt="Phòng kiểm định chất lượng hóa chất"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Floating badges */}
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                <ShieldCheck size={14} className="text-accent-400" />
                Chuẩn COA & MSDS
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-xs uppercase tracking-wider font-semibold text-accent-300">Năng lực kiểm nghiệm</span>
                <p className="font-heading font-bold text-lg">Kiểm Tra Chất Lượng Từng Lô Hàng</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                  Mỗi lô hóa chất nhập về và xuất xưởng đều trải qua quy trình đánh giá nghiêm ngặt về nồng độ, độ tinh khiết, độ nhớt và các tiêu chuẩn vật lý - hóa học đặc thù.
                </p>
                <ul className="space-y-3">
                  {[
                    'Đầy đủ phiếu kiểm nghiệm chất lượng (COA) và bảng dữ liệu an toàn (MSDS)',
                    'Nguồn gốc minh bạch từ các nhà sản xuất hóa chất hàng đầu trong & ngoài nước',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                      <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Card 2: Transport & Fleet */}
          <div className="group bg-gradient-to-b from-gray-50 to-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
            {/* Image Container */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <Image
                src="/images/delivery-truck.jpg"
                alt="Đội xe tải vận chuyển hóa chất chuyên dụng"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Floating badges */}
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                <Truck size={14} className="text-accent-400" />
                Giao Hàng 24/7
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-xs uppercase tracking-wider font-semibold text-accent-300">Logistics hóa chất</span>
                <p className="font-heading font-bold text-lg">Đội Xe Tải Vận Chuyển Chuyên Dụng Toàn Quốc</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                  Sở hữu đội ngũ xe tải đạt chuẩn an toàn PCCC, sẵn sàng đáp ứng tiến độ sản xuất liên tục cho các nhà máy, khu công nghiệp.
                </p>
                <ul className="space-y-3">
                  {[
                    'Giao nhanh trong 2-4 giờ tại khu vực trọng điểm và giao nhanh toàn quốc',
                    'Đội ngũ tài xế được đào tạo chuyên sâu về an toàn hóa chất & quy định vận tải',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                      <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}