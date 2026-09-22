'use client'

import { Phone, MessageCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/types'

export default function FloatingContact() {
  return (
    <div className="fixed bottom-4 sm:bottom-6 right-3 sm:right-5 z-50 flex flex-col gap-2.5 sm:gap-3">
      {/* Zalo */}
      <a
        href={SITE_CONFIG.zaloHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Zalo"
        className="float-btn group relative"
      >
        <div className="w-11 h-11 sm:w-[52px] sm:h-[52px] bg-[#0068ff] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/40 hover:scale-110 transition-transform duration-200">
          <span className="text-white font-bold text-lg sm:text-xl leading-none">Z</span>
        </div>
        {/* Tooltip – desktop only */}
        <span className="hidden lg:block absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat Zalo
        </span>
        <span className="absolute inset-0 rounded-xl sm:rounded-2xl bg-[#0068ff] animate-ping opacity-20 pointer-events-none" />
      </a>

      {/* Messenger */}
      <a
        href={SITE_CONFIG.messengerHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Messenger"
        className="float-btn group relative"
      >
        <div className="w-11 h-11 sm:w-[52px] sm:h-[52px] bg-gradient-to-br from-[#0078ff] to-[#a334fa] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/40 hover:scale-110 transition-transform duration-200">
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <span className="hidden lg:block absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat Messenger
        </span>
      </a>

      {/* Phone */}
      <a
        href={SITE_CONFIG.phoneHref}
        aria-label="Gọi điện"
        className="float-btn group relative"
      >
        <div className="w-11 h-11 sm:w-[52px] sm:h-[52px] bg-gradient-to-br from-green-500 to-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl shadow-green-500/40 hover:scale-110 transition-transform duration-200">
          <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <span className="hidden lg:block absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {SITE_CONFIG.phone}
        </span>
        <span className="absolute inset-0 rounded-xl sm:rounded-2xl bg-green-500 animate-ping opacity-20 pointer-events-none" />
      </a>
    </div>
  )
}
