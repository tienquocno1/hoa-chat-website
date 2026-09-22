// Types cho toàn bộ project

export interface SanitySlug {
  current: string
}

export interface SanityImage {
  _key?: string
  _type: string
  asset: { _ref: string; _type: string }
  hotspot?: { x: number; y: number; height: number; width: number }
  alt?: string
}

export interface Category {
  _id: string
  name: string
  slug: SanitySlug
  description?: string
  image?: SanityImage
  order?: number
}

export interface ProductCard {
  _id: string
  name: string
  slug: SanitySlug
  shortDescription?: string
  featured?: boolean
  origin?: string
  unit?: string
  images: SanityImage[]
  categoryName: string
  categorySlug: SanitySlug
}

export interface Specification {
  key: string
  value: string
}

export interface Product extends ProductCard {
  description?: any[] // PortableText blocks
  specifications?: Specification[]
  tags?: string[]
  category: {
    _id: string
    name: string
    slug: SanitySlug
  }
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

// Site config
export const SITE_CONFIG = {
  name: 'Hóa Chất Hải Vân',
  shortName: 'Hải Vân',
  tagline: 'Nhà cung cấp hóa chất công nghiệp uy tín hàng đầu',
  description:
    'Công ty TNHH Hóa Chất Hải Vân - chuyên cung cấp hóa chất công nghiệp, dung môi, phụ gia chất lượng cao cho các ngành sản xuất. Giao hàng toàn quốc.',
  url: 'https://hoachahaivan.vn',
  phone: '0931237825',
  phoneHref: 'tel:+84931237825',
  zalo: '0931237825',
  zaloHref: 'https://zalo.me/0931237825',
  messengerHref: 'https://m.me/hoachahaivan',
  address: '123 Đường Công Nghiệp, KCN Bình Dương',
  email: 'contact@hoachahaivan.vn',
  workingHours: 'Thứ 2 - Thứ 7: 7:30 - 17:30',
} as const
