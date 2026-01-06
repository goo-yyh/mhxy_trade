import { z } from 'zod';

export const phoneSchema = z.string().regex(/^1\d{10}$/, '请输入正确的手机号');

export const passwordSchema = z
  .string()
  .min(8, '密码至少8位')
  .max(20, '密码最多20位')
  .regex(/^(?=.*[A-Za-z])(?=.*\d)/, '密码需包含字母和数字');

export const smsCodeSchema = z.string().regex(/^\d{6}$/, '验证码为6位数字');

export const loginByPasswordSchema = z.object({
  phone: phoneSchema,
  password: passwordSchema,
  rememberMe: z.boolean().optional(),
});

export const loginBySmsSchema = z.object({
  phone: phoneSchema,
  code: smsCodeSchema,
});

export const registerSchema = z.object({
  phone: phoneSchema,
  code: smsCodeSchema,
  password: passwordSchema,
});
