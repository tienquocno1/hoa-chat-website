import Link from 'next/link'
import { FlaskConical, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gradient-to-br from-brand-500 to-brand-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-brand-500/30">
          <FlaskConical className="w-10 h-10 text-white" />
        </div>
        <h1 className="font-heading font-bold text-6xl text-brand-900 mb-2">404</h1>
        <h2 className="font-heading font-semibold text-2xl text-gray-900 mb-3">
          Trang không tìm thấy
        </h2>
        <p className="text-gray-600 mb-8">
          Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển.
        </p>
        <Link href="/" className="btn-primary inline-flex">
          <ArrowLeft size={18} />
          Về trang chủ
        </Link>
      </div>
    </div>
  )
}
