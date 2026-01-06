import { AxiosInstance } from 'axios';
import { ApiResponse, User } from '@mhxy/shared/types';

export interface LoginResponse {
  token: string;
  expiresIn: number;
  user: User;
}

export interface RegisterResponse {
  token: string;
  user: User;
}

export function createAuthService(client: AxiosInstance) {
  return {
    sendSms(phone: string, type: 'register' | 'login' | 'reset_password') {
      return client.post<ApiResponse<{ expireIn: number }>>('/auth/sms/send', {
        phone,
        type,
      });
    },

    register(phone: string, code: string, password: string) {
      return client.post<ApiResponse<RegisterResponse>>('/auth/register', {
        phone,
        code,
        password,
      });
    },

    loginByPassword(phone: string, password: string, rememberMe = false) {
      return client.post<ApiResponse<LoginResponse>>('/auth/login/password', {
        phone,
        password,
        rememberMe,
      });
    },

    loginBySms(phone: string, code: string) {
      return client.post<ApiResponse<LoginResponse>>('/auth/login/sms', {
        phone,
        code,
      });
    },

    logout() {
      return client.post<ApiResponse<null>>('/auth/logout');
    },
  };
}
