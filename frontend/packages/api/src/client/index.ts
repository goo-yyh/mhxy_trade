import axios from 'axios';
import type { AxiosError, AxiosInstance } from 'axios';
import type { ApiResponse } from '@mhxy/shared/types';

export interface ApiClientConfig {
  baseURL: string;
  getToken: () => string | null;
  onUnauthorized: () => void;
  onError?: (error: Error) => void;
}

type ApiClientError = Error & { code?: number };

export function createApiClient(config: ApiClientConfig): AxiosInstance {
  const client = axios.create({
    baseURL: config.baseURL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.request.use(
    (requestConfig) => {
      const token = config.getToken();
      if (token) {
        requestConfig.headers.Authorization = `Bearer ${token}`;
      }
      return requestConfig;
    },
    (error) => Promise.reject(error)
  );

  client.interceptors.response.use(
    (response) => {
      const data = response.data as ApiResponse<unknown>;
      if (data.code !== 0) {
        const error: ApiClientError = new Error(data.message);
        error.code = data.code;
        throw error;
      }
      return response;
    },
    (error: AxiosError<ApiResponse<unknown>>) => {
      if (error.response?.status === 401) {
        config.onUnauthorized();
      }

      const message = error.response?.data?.message || error.message;
      const customError: ApiClientError = new Error(message);
      customError.code = error.response?.data?.code;

      config.onError?.(customError);
      return Promise.reject(customError);
    }
  );

  return client;
}
