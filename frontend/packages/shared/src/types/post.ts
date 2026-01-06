export type PostType =
  | 'sell_equipment'
  | 'sell_account'
  | 'sell_pet'
  | 'buy_equipment'
  | 'buy_account'
  | 'buy_pet';

export type PostStatus =
  | 'draft'
  | 'pending'
  | 'published'
  | 'rejected'
  | 'sold'
  | 'closed'
  | 'deleted';

export interface PostAuthor {
  id: number;
  nickname: string;
  avatar: string | null;
  postCount?: number;
}

export interface PostListItem {
  id: number;
  title: string;
  type: PostType;
  category: string;
  gameServer: string;
  price: number;
  thumbnail: string | null;
  tags: string[];
  author: PostAuthor;
  likeCount: number;
  followCount: number;
  viewCount: number;
  createdAt: string;
}

export interface PostReply {
  id: number;
  content: string;
  images: string[];
  status: 'pending' | 'published' | 'rejected' | 'deleted';
  createdAt: string;
}

export interface PostDetail extends PostListItem {
  content: string;
  images: string[];
  status: PostStatus;
  rejectReason?: string;
  isLiked: boolean;
  isFollowed: boolean;
  replies: PostReply[];
  updatedAt: string;
  publishedAt?: string;
}

export interface CreatePostPayload {
  title: string;
  type: PostType;
  category: string;
  gameServer: string;
  price: number;
  content: string;
  images: string[];
  tags: string[];
  isDraft: boolean;
}

export interface PostFilterParams {
  page?: number;
  pageSize?: number;
  type?: PostType;
  category?: string;
  gameServer?: string;
  tags?: string;
  priceMin?: number;
  priceMax?: number;
  keyword?: string;
  sort?: 'latest' | 'likes' | 'follows' | 'price_asc' | 'price_desc';
}
