import type { AxiosInstance } from 'axios';
import type {
  ApiResponse,
  PaginatedData,
  PostListItem,
  PostDetail,
  CreatePostPayload,
  PostFilterParams,
} from '@mhxy/shared/types';

export function createPostService(client: AxiosInstance) {
  return {
    getList(params: PostFilterParams) {
      return client.get<ApiResponse<PaginatedData<PostListItem>>>('/posts', { params });
    },

    getDetail(id: number) {
      return client.get<ApiResponse<PostDetail>>(`/posts/${id}`);
    },

    create(data: CreatePostPayload) {
      return client.post<ApiResponse<{ id: number; status: string }>>('/posts', data);
    },

    update(id: number, data: CreatePostPayload) {
      return client.put<ApiResponse<{ id: number; status: string }>>(`/posts/${id}`, data);
    },

    delete(id: number) {
      return client.delete<ApiResponse<null>>(`/posts/${id}`);
    },

    updateStatus(id: number, status: 'sold' | 'closed') {
      return client.put<ApiResponse<null>>(`/posts/${id}/status`, { status });
    },

    addReply(id: number, content: string, images: string[]) {
      return client.post<ApiResponse<{ id: number; status: string }>>(`/posts/${id}/replies`, {
        content,
        images,
      });
    },

    toggleLike(id: number) {
      return client.post<ApiResponse<{ isLiked: boolean; likeCount: number }>>(`/posts/${id}/like`);
    },

    toggleFollow(id: number) {
      return client.post<ApiResponse<{ isFollowed: boolean; followCount: number }>>(
        `/posts/${id}/follow`
      );
    },
  };
}
