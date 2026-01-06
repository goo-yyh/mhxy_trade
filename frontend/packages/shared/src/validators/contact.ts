import { z } from 'zod';

export const contactMessageSchema = z
  .string()
  .min(10, '留言至少10个字符')
  .max(200, '留言最多200个字符');

export const createContactRequestSchema = z.object({
  postId: z.number(),
  message: contactMessageSchema,
});
