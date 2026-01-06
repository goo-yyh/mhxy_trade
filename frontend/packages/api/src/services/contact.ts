import type { AxiosInstance } from 'axios';
import type {
  ApiResponse,
  PaginatedData,
  ContactRequestReceived,
  ContactRequestSent,
  CreateContactRequestPayload,
  HandleContactRequestPayload,
} from '@mhxy/shared/types';

export function createContactService(client: AxiosInstance) {
  return {
    create(data: CreateContactRequestPayload) {
      return client.post<ApiResponse<{ id: number; status: string }>>('/contact-requests', data);
    },

    getSent(params: { page?: number; pageSize?: number; status?: string }) {
      return client.get<ApiResponse<PaginatedData<ContactRequestSent>>>('/contact-requests/sent', {
        params,
      });
    },

    getReceived(params: { page?: number; pageSize?: number; status?: string }) {
      return client.get<ApiResponse<PaginatedData<ContactRequestReceived>>>(
        '/contact-requests/received',
        { params }
      );
    },

    handle(id: number, data: HandleContactRequestPayload) {
      return client.put<ApiResponse<null>>(`/contact-requests/${id}/handle`, data);
    },
  };
}
