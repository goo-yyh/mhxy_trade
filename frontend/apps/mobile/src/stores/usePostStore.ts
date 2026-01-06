import { create } from 'zustand';
import type { PostFilterParams } from '@mhxy/shared/types';

interface PostState {
  filter: PostFilterParams;
  setFilter: (filter: PostFilterParams) => void;
}

export const usePostStore = create<PostState>((set) => ({
  filter: { page: 1, pageSize: 20 },
  setFilter: (filter) => set({ filter }),
}));
