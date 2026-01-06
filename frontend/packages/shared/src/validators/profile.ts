import { z } from 'zod';

export const nicknameSchema = z.string().min(2, '昵称至少2个字符').max(12, '昵称最多12个字符');

export const bioSchema = z.string().max(200, '简介最多200个字符');

export const contactInfoSchema = z.string().max(100, '联系方式最多100个字符');

export const updateProfileSchema = z.object({
  nickname: nicknameSchema.optional(),
  avatar: z.string().url().optional(),
  bio: bioSchema.optional(),
  gameServer: z.string().optional(),
  contactInfo: contactInfoSchema.optional(),
});
