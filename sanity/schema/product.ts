import { defineType, defineField } from 'sanity'

export const productSchema = defineType({
  name: 'product',
  title: 'Sản phẩm',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Tên sản phẩm',
      type: 'string',
      validation: (Rule) => Rule.required().error('Tên sản phẩm là bắt buộc'),
    }),
    defineField({
      name: 'slug',
      title: 'Đường dẫn (Slug)',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Danh mục',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Sản phẩm nổi bật',
      type: 'boolean',
      initialValue: false,
      description: 'Hiển thị trên trang chủ',
    }),
    defineField({
      name: 'images',
      title: 'Hình ảnh sản phẩm',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Mô tả hình ảnh (Alt text)',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).error('Cần ít nhất 1 hình ảnh'),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Mô tả ngắn',
      type: 'text',
      rows: 3,
      description: 'Hiển thị trên card sản phẩm (tối đa 150 ký tự)',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'description',
      title: 'Mô tả đầy đủ',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'specifications',
      title: 'Thông số kỹ thuật',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'key', type: 'string', title: 'Thông số' },
            { name: 'value', type: 'string', title: 'Giá trị' },
          ],
          preview: {
            select: { title: 'key', subtitle: 'value' },
          },
        },
      ],
    }),
    defineField({
      name: 'unit',
      title: 'Đơn vị',
      type: 'string',
      description: 'VD: kg, lít, thùng, bao...',
    }),
    defineField({
      name: 'origin',
      title: 'Xuất xứ',
      type: 'string',
      description: 'VD: Việt Nam, Trung Quốc, Hàn Quốc...',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Meta Title',
          description: 'Để trống sẽ dùng tên sản phẩm (tối đa 60 ký tự)',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          description: 'Để trống sẽ dùng mô tả ngắn (tối đa 160 ký tự)',
          rows: 3,
          validation: (Rule) => Rule.max(160),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category.name',
      media: 'images.0',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `📁 ${subtitle}` : 'Chưa có danh mục',
        media,
      }
    },
  },
  orderings: [
    { title: 'Tên A-Z', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] },
    { title: 'Mới nhất', name: 'createdDesc', by: [{ field: '_createdAt', direction: 'desc' }] },
  ],
})
