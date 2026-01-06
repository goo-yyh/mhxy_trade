import { AxiosInstance } from 'axios';
import { ApiResponse, Category, Tag, GameServer } from '@mhxy/shared/types';

export function createCommonService(client: AxiosInstance) {
  return {
    getCategories() {
      return client.get<ApiResponse<Category[]>>('/categories');
    },

    getHotTags(limit?: number) {
      return client.get<ApiResponse<Tag[]>>('/tags/hot', { params: { limit } });
    },

    searchTags(keyword: string, limit?: number) {
      return client.get<ApiResponse<Tag[]>>('/tags/search', { params: { keyword, limit } });
    },

    getGameServers() {
      return client.get<ApiResponse<GameServer[]>>('/game-servers');
    },
  };
}
