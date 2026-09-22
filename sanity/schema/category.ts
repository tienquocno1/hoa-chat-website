import { defineType, defineField } from 'sanity'

export const categorySchema = defineType({
  name: 'category',
  title: 'Danh mục',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Tên danh mục',
      type: 'string',
      validation: (Rule) => Rule.required().error('Tên danh mục là bắt buộc'),
    }),
    defineField({
      name: 'slug',
      title: 'Đường dẫn (Slug)',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Mô tả ngắn',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Hình ảnh đại diện',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Thứ tự hiển thị',
      type: 'number',
      initialValue: 99,
    }),
  ],
  preview: {
    select: { title: 'name', media: 'image' },
  },
  orderings: [
    { title: 'Thứ tự', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Tên A-Z', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] },
  ],
})
