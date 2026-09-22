import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const q = searchParams.get('q')?.trim() || ''
  const limit = Math.min(parseInt(searchParams.get('limit') || '5'), 10)

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] })
  }

  try {
    const searchQuery = groq`
      *[_type == "product" && (
        name match $q ||
        shortDescription match $q ||
        category->name match $q ||
        tags[] match $q
      )] | order(featured desc, _createdAt desc) [0..$limit] {
        _id,
        name,
        slug,
        shortDescription,
        "categoryName": category->name,
        "categorySlug": category->slug,
      }
    `

    const results = await client.fetch(
      searchQuery,
      { q: `*${q}*`, limit: limit - 1 },
      { next: { revalidate: 60 } }
    )

    return NextResponse.json({ results })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ results: [] }, { status: 500 })
  }
}