import { z } from 'zod';

export const postTitleSchema = z.string().min(5, '标题至少5个字符').max(50, '标题最多50个字符');

export const postContentSchema = z
  .string()
  .min(20, '详情至少20个字符')
  .max(5000, '详情最多5000个字符');

export const postPriceSchema = z.number().min(0, '价格需大于等于0');

export const postTagsSchema = z.array(z.string()).max(5, '标签最多5个');

export const postImagesSchema = z.array(z.string().url()).max(9, '图片最多9张');

export const createPostSchema = z.object({
  title: postTitleSchema,
  type: z.string(),
  category: z.string(),
  gameServer: z.string(),
  price: postPriceSchema,
  content: postContentSchema,
  images: postImagesSchema.optional().default([]),
  tags: postTagsSchema.optional().default([]),
  isDraft: z.boolean(),
});
