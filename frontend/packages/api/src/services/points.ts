import type { AxiosInstance } from 'axios';
import type { ApiResponse, PaginatedData } from '@mhxy/shared/types';

export interface PointsRecord {
  id: number;
  type: string;
  amount: number;
  balance: number;
  description: string;
  createdAt: string;
}

export function createPointsService(client: AxiosInstance) {
  return {
    getRecords(params: { page?: number; pageSize?: number }) {
      return client.get<ApiResponse<PaginatedData<PointsRecord>>>('/points/records', { params });
    },
  };
}
