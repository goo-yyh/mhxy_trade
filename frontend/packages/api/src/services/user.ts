import type { AxiosInstance } from 'axios';
import type {
  ApiResponse,
  User,
  UpdateProfilePayload,
  UserProfile,
  PaginatedData,
  PostListItem,
} from '@mhxy/shared/types';

export function createUserService(client: AxiosInstance) {
  return {
    getProfile() {
      return client.get<ApiResponse<User>>('/user/profile');
    },

    updateProfile(data: UpdateProfilePayload) {
      return client.put<ApiResponse<User>>('/user/profile', data);
    },

    updatePassword(data: { oldPassword?: string; code?: string; newPassword: string }) {
      return client.put<ApiResponse<null>>('/user/password', data);
    },

    getPublicProfile(id: number) {
      return client.get<ApiResponse<UserProfile>>(`/users/${id}`);
    },

    getUserPosts(id: number, params: { page?: number; pageSize?: number }) {
      return client.get<ApiResponse<PaginatedData<PostListItem>>>(`/users/${id}/posts`, { params });
    },

    getMyPosts(params: { page?: number; pageSize?: number; status?: string }) {
      return client.get<ApiResponse<PaginatedData<PostListItem>>>('/user/posts', { params });
    },

    getMyFollows(params: { page?: number; pageSize?: number }) {
      return client.get<ApiResponse<PaginatedData<PostListItem>>>('/user/follows', { params });
    },
  };
}
