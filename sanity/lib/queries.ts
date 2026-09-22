import { groq } from 'next-sanity'

// ─── Category Queries ──────────────────────────────────────────────
export const allCategoriesQuery = groq`
  *[_type == "category"] | order(order asc) {
    _id,
    name,
    slug,
    description,
    image,
    order
  }
`

export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    image,
  }
`

// ─── Product Queries ───────────────────────────────────────────────
export const allProductsQuery = groq`
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    slug,
    shortDescription,
    featured,
    origin,
    unit,
    "images": images[0..0],
    "categoryName": category->name,
    "categorySlug": category->slug,
  }
`

export const featuredProductsQuery = groq`
  *[_type == "product" && featured == true] | order(_createdAt desc) [0..7] {
    _id,
    name,
    slug,
    shortDescription,
    origin,
    "images": images[0..0],
    "categoryName": category->name,
    "categorySlug": category->slug,
  }
`

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    shortDescription,
    description,
    specifications,
    origin,
    unit,
    tags,
    images,
    seo,
    "category": category-> {
      _id,
      name,
      slug,
    }
  }
`

export const productsByCategoryQuery = groq`
  *[_type == "product" && category->slug.current == $slug] | order(_createdAt desc) {
    _id,
    name,
    slug,
    shortDescription,
    origin,
    "images": images[0..0],
    "categoryName": category->name,
    "categorySlug": category->slug,
  }
`

export const relatedProductsQuery = groq`
  *[_type == "product" && category->slug.current == $categorySlug && slug.current != $currentSlug] | order(_createdAt desc) [0..3] {
    _id,
    name,
    slug,
    shortDescription,
    "images": images[0..0],
    "categoryName": category->name,
    "categorySlug": category->slug,
  }
`

export const allProductSlugsQuery = groq`
  *[_type == "product"] { "slug": slug.current }
`

export const allCategorySlugsQuery = groq`
  *[_type == "category"] { "slug": slug.current }
`
