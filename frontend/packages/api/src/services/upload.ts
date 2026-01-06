import type { AxiosInstance } from 'axios';
import type { ApiResponse } from '@mhxy/shared/types';

export interface UploadResponse {
  url: string;
  thumbnail: string;
}

export function createUploadService(client: AxiosInstance) {
  return {
    uploadImage(file: File) {
      const formData = new FormData();
      formData.append('file', file);
      return client.post<ApiResponse<UploadResponse>>('/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
  };
}
