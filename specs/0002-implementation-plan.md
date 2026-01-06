# 梦幻西游交易贴吧 - 前端实现计划

> 文档版本：v1.0
> 创建日期：2026-01-06
> 基于：0001-spec-claude.md

---

## 目录

1. [项目结构设计](#1-项目结构设计)
2. [公共模块设计](#2-公共模块设计)
3. [移动端实现计划](#3-移动端实现计划)
4. [PC端实现计划](#4-pc端实现计划)
5. [后台管理系统实现计划](#5-后台管理系统实现计划)
6. [开发阶段规划](#6-开发阶段规划)
7. [测试策略](#7-测试策略)

---

## 1. 项目结构设计

### 1.1 Monorepo 整体结构

```
frontend/
├── apps/
│   ├── mobile/              # H5 移动端应用
│   ├── pc/                  # PC 端应用
│   └── manage/              # 后台管理系统
│
├── packages/
│   ├── shared/              # 共享代码包
│   │   ├── types/           # TypeScript 类型定义
│   │   ├── utils/           # 工具函数
│   │   ├── constants/       # 常量定义
│   │   ├── hooks/           # 通用 React Hooks
│   │   └── validators/      # 表单验证规则
│   │
│   ├── api/                 # API 请求层
│   │   ├── client/          # HTTP 客户端配置
│   │   ├── services/        # API 服务模块
│   │   └── types/           # API 相关类型
│   │
│   ├── ui/                  # 共享 UI 组件（基础组件）
│   │   ├── components/      # 基础组件
│   │   └── styles/          # 共享样式
│   │
│   ├── eslint-config/       # ESLint 配置
│   └── typescript-config/   # TypeScript 配置
│
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

### 1.2 移动端项目结构

```
apps/mobile/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/              # 静态资源
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── components/          # 业务组件
│   │   ├── common/          # 通用业务组件
│   │   │   ├── Header/
│   │   │   ├── TabBar/
│   │   │   ├── Empty/
│   │   │   ├── Loading/
│   │   │   └── ErrorBoundary/
│   │   │
│   │   ├── post/            # 帖子相关组件
│   │   │   ├── PostCard/
│   │   │   ├── PostList/
│   │   │   ├── PostDetail/
│   │   │   ├── PostForm/
│   │   │   ├── PostFilter/
│   │   │   ├── ImageUploader/
│   │   │   └── ReplyItem/
│   │   │
│   │   ├── user/            # 用户相关组件
│   │   │   ├── UserAvatar/
│   │   │   ├── UserInfo/
│   │   │   └── ProfileForm/
│   │   │
│   │   └── notification/    # 通知相关组件
│   │       ├── NotificationItem/
│   │       └── NotificationList/
│   │
│   ├── pages/               # 页面组件
│   │   ├── Home/
│   │   ├── Search/
│   │   ├── PostDetail/
│   │   ├── PostCreate/
│   │   ├── PostEdit/
│   │   ├── Mine/
│   │   ├── Profile/
│   │   ├── MyPosts/
│   │   ├── MyFollows/
│   │   ├── ContactRequests/
│   │   ├── Notifications/
│   │   ├── Settings/
│   │   ├── Login/
│   │   └── Register/
│   │
│   ├── stores/              # Zustand 状态管理
│   │   ├── useAuthStore.ts
│   │   ├── useUserStore.ts
│   │   ├── usePostStore.ts
│   │   └── useNotificationStore.ts
│   │
│   ├── hooks/               # 自定义 Hooks
│   │   ├── useAuth.ts
│   │   ├── useInfiniteScroll.ts
│   │   ├── usePullRefresh.ts
│   │   └── useCountdown.ts
│   │
│   ├── services/            # API 服务调用（封装）
│   │   └── index.ts
│   │
│   ├── router/              # 路由配置
│   │   ├── index.tsx
│   │   └── guards.tsx
│   │
│   ├── styles/              # 全局样式
│   │   └── global.css
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

### 1.3 PC端项目结构

```
apps/pc/
├── public/
│   └── favicon.ico
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   │
│   │   ├── (auth)/          # 认证相关页面组
│   │   │   ├── login/
│   │   │   └── register/
│   │   │
│   │   ├── post/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   ├── create/
│   │   │   │   └── page.tsx
│   │   │   └── [id]/edit/
│   │   │       └── page.tsx
│   │   │
│   │   ├── user/
│   │   │   ├── page.tsx
│   │   │   ├── posts/
│   │   │   ├── follows/
│   │   │   ├── contacts/
│   │   │   ├── points/
│   │   │   └── settings/
│   │   │
│   │   ├── notifications/
│   │   │   └── page.tsx
│   │   │
│   │   └── u/
│   │       └── [id]/
│   │           └── page.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── Sidebar/
│   │   │   └── UserDropdown/
│   │   │
│   │   ├── post/
│   │   │   ├── PostCard/
│   │   │   ├── PostList/
│   │   │   ├── PostDetail/
│   │   │   ├── PostForm/
│   │   │   ├── PostFilter/
│   │   │   ├── PostSidebar/
│   │   │   └── ReplyList/
│   │   │
│   │   ├── user/
│   │   │   ├── UserCard/
│   │   │   ├── ProfileForm/
│   │   │   └── PointsRecord/
│   │   │
│   │   ├── notification/
│   │   │   └── NotificationPopover/
│   │   │
│   │   └── common/
│   │       ├── AuthModal/
│   │       ├── ImageUploader/
│   │       ├── RichTextEditor/
│   │       └── Pagination/
│   │
│   ├── stores/
│   │   ├── useAuthStore.ts
│   │   ├── useUserStore.ts
│   │   └── useNotificationStore.ts
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useModal.ts
│   │
│   ├── providers/
│   │   ├── QueryProvider.tsx
│   │   └── AuthProvider.tsx
│   │
│   └── styles/
│       └── globals.css
│
├── next.config.js
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

### 1.4 后台管理系统项目结构

```
apps/manage/
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx         # 重定向到 dashboard
│   │   │
│   │   ├── login/
│   │   │   └── page.tsx
│   │   │
│   │   ├── (dashboard)/     # 需要登录的页面组
│   │   │   ├── layout.tsx   # 带侧边栏的布局
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── audit/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── posts/
│   │   │   │   ├── replies/
│   │   │   │   └── contacts/
│   │   │   │
│   │   │   ├── posts/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │
│   │   │   ├── users/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │
│   │   │   ├── content/
│   │   │   │   ├── categories/
│   │   │   │   ├── tags/
│   │   │   │   └── servers/
│   │   │   │
│   │   │   ├── system/
│   │   │   │   ├── admins/
│   │   │   │   ├── points/
│   │   │   │   └── settings/
│   │   │   │
│   │   │   └── logs/
│   │   │       └── page.tsx
│   │   │
│   │   └── api/             # API Routes（如需要）
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AdminLayout/
│   │   │   ├── Sidebar/
│   │   │   ├── Header/
│   │   │   └── Breadcrumb/
│   │   │
│   │   ├── dashboard/
│   │   │   ├── StatCard/
│   │   │   ├── ChartCard/
│   │   │   └── TodoList/
│   │   │
│   │   ├── audit/
│   │   │   ├── AuditList/
│   │   │   ├── AuditDetail/
│   │   │   └── AuditActions/
│   │   │
│   │   ├── post/
│   │   │   ├── PostTable/
│   │   │   └── PostDetail/
│   │   │
│   │   ├── user/
│   │   │   ├── UserTable/
│   │   │   └── UserDetail/
│   │   │
│   │   └── common/
│   │       ├── DataTable/
│   │       ├── SearchForm/
│   │       ├── StatusTag/
│   │       └── ConfirmModal/
│   │
│   ├── stores/
│   │   ├── useAdminStore.ts
│   │   └── useAuditStore.ts
│   │
│   ├── hooks/
│   │   ├── useAdminAuth.ts
│   │   └── useAuditActions.ts
│   │
│   ├── providers/
│   │   └── AdminAuthProvider.tsx
│   │
│   └── styles/
│       └── globals.css
│
├── next.config.js
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

---

## 2. 公共模块设计

### 2.1 类型定义 (packages/shared/types)

#### 2.1.1 用户相关类型

```typescript
// packages/shared/types/user.ts

export interface User {
  id: number;
  phone: string;
  nickname: string | null;
  avatar: string | null;
  bio: string | null;
  gameServer: string | null;
  contactInfo?: string;  // 仅本人可见
  points: number;
  createdAt: string;
}

export interface UserProfile extends User {
  postCount?: number;
}

export interface UpdateProfilePayload {
  nickname?: string;
  avatar?: string;
  bio?: string;
  gameServer?: string;
  contactInfo?: string;
}
```

#### 2.1.2 帖子相关类型

```typescript
// packages/shared/types/post.ts

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
```

#### 2.1.3 联系方式申请类型

```typescript
// packages/shared/types/contact.ts

export type AuditStatus = 'pending' | 'approved' | 'rejected';
export type OwnerStatus = 'pending' | 'approved' | 'rejected';

export interface ContactRequestSent {
  id: number;
  post: {
    id: number;
    title: string;
    thumbnail: string | null;
  };
  message: string;
  auditStatus: AuditStatus;
  ownerStatus: OwnerStatus | null;
  contactInfo?: string;
  createdAt: string;
}

export interface ContactRequestReceived {
  id: number;
  post: {
    id: number;
    title: string;
  };
  requester: {
    id: number;
    nickname: string;
    avatar: string | null;
  };
  message: string;
  auditStatus: AuditStatus;
  ownerStatus: OwnerStatus | null;
  createdAt: string;
}

export interface CreateContactRequestPayload {
  postId: number;
  message: string;
}

export interface HandleContactRequestPayload {
  action: 'approve' | 'reject';
  reason?: string;
}
```

#### 2.1.4 通知相关类型

```typescript
// packages/shared/types/notification.ts

export type NotificationType =
  | 'system'
  | 'audit'
  | 'like'
  | 'follow'
  | 'contact_request'
  | 'contact_reply'
  | 'points';

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  content: string;
  relatedId?: number;
  relatedType?: string;
  isRead: boolean;
  createdAt: string;
}

export interface UnreadCount {
  total: number;
  byType: Record<NotificationType, number>;
}
```

#### 2.1.5 通用类型

```typescript
// packages/shared/types/common.ts

export interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

export interface PaginatedData<T> {
  list: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface Category {
  id: number | string;
  name: string;
  children?: Category[];
}

export interface Tag {
  id: number;
  name: string;
  count?: number;
}

export interface GameServer {
  id: string;
  name: string;
}
```

### 2.2 API 服务层 (packages/api)

#### 2.2.1 HTTP 客户端配置

```typescript
// packages/api/client/index.ts

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { ApiResponse } from '@mhxy/shared/types';

export interface ApiClientConfig {
  baseURL: string;
  getToken: () => string | null;
  onUnauthorized: () => void;
  onError?: (error: Error) => void;
}

export function createApiClient(config: ApiClientConfig): AxiosInstance {
  const client = axios.create({
    baseURL: config.baseURL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 请求拦截器
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

  // 响应拦截器
  client.interceptors.response.use(
    (response) => {
      const data = response.data as ApiResponse<unknown>;
      if (data.code !== 0) {
        const error = new Error(data.message);
        (error as any).code = data.code;
        throw error;
      }
      return response;
    },
    (error: AxiosError<ApiResponse<unknown>>) => {
      if (error.response?.status === 401) {
        config.onUnauthorized();
      }

      const message = error.response?.data?.message || error.message;
      const customError = new Error(message);
      (customError as any).code = error.response?.data?.code;

      config.onError?.(customError);
      return Promise.reject(customError);
    }
  );

  return client;
}
```

#### 2.2.2 API 服务模块

```typescript
// packages/api/services/auth.ts

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
    // 发送验证码
    sendSms(phone: string, type: 'register' | 'login' | 'reset_password') {
      return client.post<ApiResponse<{ expireIn: number }>>('/auth/sms/send', {
        phone,
        type,
      });
    },

    // 用户注册
    register(phone: string, code: string, password: string) {
      return client.post<ApiResponse<RegisterResponse>>('/auth/register', {
        phone,
        code,
        password,
      });
    },

    // 密码登录
    loginByPassword(phone: string, password: string, rememberMe = false) {
      return client.post<ApiResponse<LoginResponse>>('/auth/login/password', {
        phone,
        password,
        rememberMe,
      });
    },

    // 验证码登录
    loginBySms(phone: string, code: string) {
      return client.post<ApiResponse<LoginResponse>>('/auth/login/sms', {
        phone,
        code,
      });
    },
  };
}

// packages/api/services/user.ts

import { AxiosInstance } from 'axios';
import { ApiResponse, User, UpdateProfilePayload } from '@mhxy/shared/types';

export function createUserService(client: AxiosInstance) {
  return {
    // 获取当前用户信息
    getProfile() {
      return client.get<ApiResponse<User>>('/user/profile');
    },

    // 更新用户信息
    updateProfile(data: UpdateProfilePayload) {
      return client.put<ApiResponse<User>>('/user/profile', data);
    },

    // 修改密码
    updatePassword(data: { oldPassword?: string; code?: string; newPassword: string }) {
      return client.put<ApiResponse<null>>('/user/password', data);
    },
  };
}

// packages/api/services/post.ts

import { AxiosInstance } from 'axios';
import {
  ApiResponse,
  PaginatedData,
  PostListItem,
  PostDetail,
  CreatePostPayload,
  PostFilterParams,
} from '@mhxy/shared/types';

export function createPostService(client: AxiosInstance) {
  return {
    // 获取帖子列表
    getList(params: PostFilterParams) {
      return client.get<ApiResponse<PaginatedData<PostListItem>>>('/posts', { params });
    },

    // 获取帖子详情
    getDetail(id: number) {
      return client.get<ApiResponse<PostDetail>>(`/posts/${id}`);
    },

    // 创建帖子
    create(data: CreatePostPayload) {
      return client.post<ApiResponse<{ id: number; status: string }>>('/posts', data);
    },

    // 更新帖子
    update(id: number, data: CreatePostPayload) {
      return client.put<ApiResponse<{ id: number; status: string }>>(`/posts/${id}`, data);
    },

    // 删除帖子
    delete(id: number) {
      return client.delete<ApiResponse<null>>(`/posts/${id}`);
    },

    // 更新帖子状态
    updateStatus(id: number, status: 'sold' | 'closed') {
      return client.put<ApiResponse<null>>(`/posts/${id}/status`, { status });
    },

    // 添加回复
    addReply(id: number, content: string, images: string[]) {
      return client.post<ApiResponse<{ id: number; status: string }>>(`/posts/${id}/replies`, {
        content,
        images,
      });
    },

    // 点赞/取消点赞
    toggleLike(id: number) {
      return client.post<ApiResponse<{ isLiked: boolean; likeCount: number }>>(`/posts/${id}/like`);
    },

    // 关注/取消关注
    toggleFollow(id: number) {
      return client.post<ApiResponse<{ isFollowed: boolean; followCount: number }>>(`/posts/${id}/follow`);
    },

    // 获取我的帖子
    getMyPosts(params: { page?: number; pageSize?: number; status?: string }) {
      return client.get<ApiResponse<PaginatedData<PostListItem>>>('/user/posts', { params });
    },

    // 获取我关注的帖子
    getMyFollows(params: { page?: number; pageSize?: number }) {
      return client.get<ApiResponse<PaginatedData<PostListItem>>>('/user/follows', { params });
    },
  };
}

// packages/api/services/contact.ts

import { AxiosInstance } from 'axios';
import {
  ApiResponse,
  PaginatedData,
  ContactRequestSent,
  ContactRequestReceived,
  CreateContactRequestPayload,
  HandleContactRequestPayload,
} from '@mhxy/shared/types';

export function createContactService(client: AxiosInstance) {
  return {
    // 提交联系方式申请
    create(data: CreateContactRequestPayload) {
      return client.post<ApiResponse<{ id: number; status: string }>>('/contact-requests', data);
    },

    // 获取我发出的申请
    getSentList(params: { page?: number; pageSize?: number; status?: string }) {
      return client.get<ApiResponse<PaginatedData<ContactRequestSent>>>('/contact-requests/sent', { params });
    },

    // 获取我收到的申请
    getReceivedList(params: { page?: number; pageSize?: number; status?: string }) {
      return client.get<ApiResponse<PaginatedData<ContactRequestReceived>>>('/contact-requests/received', { params });
    },

    // 处理申请
    handle(id: number, data: HandleContactRequestPayload) {
      return client.put<ApiResponse<null>>(`/contact-requests/${id}/handle`, data);
    },
  };
}

// packages/api/services/notification.ts

import { AxiosInstance } from 'axios';
import { ApiResponse, PaginatedData, Notification, UnreadCount } from '@mhxy/shared/types';

export function createNotificationService(client: AxiosInstance) {
  return {
    // 获取通知列表
    getList(params: { page?: number; pageSize?: number; type?: string; isRead?: boolean }) {
      return client.get<ApiResponse<PaginatedData<Notification> & { unreadCount: number }>>('/notifications', { params });
    },

    // 标记已读
    markAsRead(ids: number[]) {
      return client.put<ApiResponse<null>>('/notifications/read', { ids });
    },

    // 获取未读数量
    getUnreadCount() {
      return client.get<ApiResponse<UnreadCount>>('/notifications/unread-count');
    },
  };
}

// packages/api/services/common.ts

import { AxiosInstance } from 'axios';
import { ApiResponse, Category, Tag, GameServer } from '@mhxy/shared/types';

export function createCommonService(client: AxiosInstance) {
  return {
    // 上传图片
    uploadImage(file: File) {
      const formData = new FormData();
      formData.append('file', file);
      return client.post<ApiResponse<{ url: string; thumbnail: string }>>('/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },

    // 获取分类列表
    getCategories() {
      return client.get<ApiResponse<Category[]>>('/categories');
    },

    // 获取热门标签
    getHotTags(limit = 20) {
      return client.get<ApiResponse<Tag[]>>('/tags/hot', { params: { limit } });
    },

    // 获取服务器列表
    getGameServers() {
      return client.get<ApiResponse<GameServer[]>>('/game-servers');
    },
  };
}

// packages/api/services/points.ts

import { AxiosInstance } from 'axios';
import { ApiResponse, PaginatedData } from '@mhxy/shared/types';

export interface PointRecord {
  id: number;
  type: string;
  amount: number;
  balance: number;
  description: string;
  createdAt: string;
}

export function createPointsService(client: AxiosInstance) {
  return {
    // 获取积分记录
    getRecords(params: { page?: number; pageSize?: number; type?: string }) {
      return client.get<ApiResponse<PaginatedData<PointRecord> & { currentBalance: number }>>('/points/records', { params });
    },
  };
}
```

#### 2.2.3 API 统一导出

```typescript
// packages/api/index.ts

import { AxiosInstance } from 'axios';
import { createApiClient, ApiClientConfig } from './client';
import { createAuthService } from './services/auth';
import { createUserService } from './services/user';
import { createPostService } from './services/post';
import { createContactService } from './services/contact';
import { createNotificationService } from './services/notification';
import { createCommonService } from './services/common';
import { createPointsService } from './services/points';

export function createApi(config: ApiClientConfig) {
  const client = createApiClient(config);

  return {
    client,
    auth: createAuthService(client),
    user: createUserService(client),
    post: createPostService(client),
    contact: createContactService(client),
    notification: createNotificationService(client),
    common: createCommonService(client),
    points: createPointsService(client),
  };
}

export type Api = ReturnType<typeof createApi>;

export * from './client';
export * from './services/auth';
export * from './services/user';
export * from './services/post';
export * from './services/contact';
export * from './services/notification';
export * from './services/common';
export * from './services/points';
```

### 2.3 工具函数 (packages/shared/utils)

```typescript
// packages/shared/utils/format.ts

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

// 格式化时间
export function formatTime(time: string, format = 'YYYY-MM-DD HH:mm'): string {
  return dayjs(time).format(format);
}

// 相对时间
export function formatRelativeTime(time: string): string {
  return dayjs(time).fromNow();
}

// 格式化价格
export function formatPrice(price: number): string {
  return `¥${price.toLocaleString('zh-CN')}`;
}

// 格式化数量（千、万）
export function formatCount(count: number): string {
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1)}万`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}千`;
  }
  return count.toString();
}

// 手机号脱敏
export function maskPhone(phone: string): string {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

// packages/shared/utils/storage.ts

const TOKEN_KEY = 'mhxy_token';
const USER_KEY = 'mhxy_user';

export const storage = {
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  },

  getUser<T>(): T | null {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  setUser<T>(user: T): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUser(): void {
    localStorage.removeItem(USER_KEY);
  },

  clear(): void {
    this.removeToken();
    this.removeUser();
  },
};

// packages/shared/utils/validators.ts

import { z } from 'zod';

// 手机号验证
export const phoneSchema = z
  .string()
  .length(11, '请输入11位手机号')
  .regex(/^1[3-9]\d{9}$/, '请输入有效的手机号');

// 验证码验证
export const smsCodeSchema = z
  .string()
  .length(6, '请输入6位验证码')
  .regex(/^\d{6}$/, '验证码格式不正确');

// 密码验证
export const passwordSchema = z
  .string()
  .min(8, '密码至少8位')
  .max(20, '密码最多20位')
  .regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/, '密码需包含字母和数字');

// 昵称验证
export const nicknameSchema = z
  .string()
  .min(2, '昵称至少2个字符')
  .max(12, '昵称最多12个字符');

// 帖子标题验证
export const postTitleSchema = z
  .string()
  .min(5, '标题至少5个字符')
  .max(50, '标题最多50个字符');

// 申请留言验证
export const contactMessageSchema = z
  .string()
  .min(10, '留言至少10个字符')
  .max(200, '留言最多200个字符');
```

### 2.4 常量定义 (packages/shared/constants)

```typescript
// packages/shared/constants/post.ts

export const POST_TYPES = [
  { value: 'sell_equipment', label: '出售装备' },
  { value: 'sell_account', label: '出售账号' },
  { value: 'sell_pet', label: '出售召唤兽' },
  { value: 'buy_equipment', label: '收购装备' },
  { value: 'buy_account', label: '收购账号' },
  { value: 'buy_pet', label: '收购召唤兽' },
] as const;

export const POST_STATUS = {
  draft: { label: '草稿', color: 'default' },
  pending: { label: '待审核', color: 'processing' },
  published: { label: '已发布', color: 'success' },
  rejected: { label: '已拒绝', color: 'error' },
  sold: { label: '已售出', color: 'warning' },
  closed: { label: '已关闭', color: 'default' },
  deleted: { label: '已删除', color: 'default' },
} as const;

export const POST_SORT_OPTIONS = [
  { value: 'latest', label: '最新发布' },
  { value: 'likes', label: '最多点赞' },
  { value: 'follows', label: '最多关注' },
  { value: 'price_asc', label: '价格从低到高' },
  { value: 'price_desc', label: '价格从高到低' },
] as const;

// packages/shared/constants/points.ts

export const POINT_RULES = {
  register: { amount: 100, description: '新用户注册' },
  daily_login: { amount: 10, description: '每日登录' },
  login_streak_7: { amount: 50, description: '连续登录7天' },
  be_liked: { amount: 1, description: '帖子被点赞', dailyLimit: 50 },
  be_followed: { amount: 2, description: '帖子被关注', dailyLimit: 100 },
  contact_approved: { amount: 10, description: '联系申请被同意' },
  complete_profile: { amount: 50, description: '完善个人资料' },
  publish_post: { amount: -10, description: '发布帖子' },
  reply_post: { amount: -5, description: '回复帖子' },
  request_contact: { amount: -20, description: '申请联系方式' },
} as const;

// packages/shared/constants/notification.ts

export const NOTIFICATION_TYPES = {
  system: { label: '系统通知', icon: 'bell' },
  audit: { label: '审核通知', icon: 'file-check' },
  like: { label: '点赞', icon: 'heart' },
  follow: { label: '关注', icon: 'star' },
  contact_request: { label: '联系申请', icon: 'message' },
  contact_reply: { label: '申请回复', icon: 'mail' },
  points: { label: '积分变动', icon: 'coin' },
} as const;
```

---

## 3. 移动端实现计划

### 3.1 基础设施搭建

#### 3.1.1 项目初始化
- [ ] 配置 Vite + React 19 + TypeScript
- [ ] 配置 TailwindCSS 4.x
- [ ] 配置 Antd Mobile 5.x
- [ ] 配置 React Router 7.x
- [ ] 配置 React Query 5.x
- [ ] 配置 Zustand 5.x
- [ ] 配置环境变量

#### 3.1.2 API 层集成
- [ ] 创建 API 客户端实例
- [ ] 配置请求/响应拦截器
- [ ] 集成 @mhxy/api 包

#### 3.1.3 状态管理
- [ ] 实现 useAuthStore（认证状态）
- [ ] 实现 useUserStore（用户信息）
- [ ] 实现 useNotificationStore（通知状态）

### 3.2 通用组件开发

#### 3.2.1 布局组件
- [ ] Header 组件（顶部导航栏）
- [ ] TabBar 组件（底部导航栏）
- [ ] PageContainer 组件（页面容器）
- [ ] SafeArea 组件（安全区域适配）

#### 3.2.2 基础业务组件
- [ ] Empty 组件（空状态）
- [ ] Loading 组件（加载状态）
- [ ] ErrorBoundary 组件（错误边界）
- [ ] InfiniteList 组件（无限滚动列表）
- [ ] PullRefresh 组件（下拉刷新）
- [ ] ImageUploader 组件（图片上传）
- [ ] ImageViewer 组件（图片预览）

### 3.3 用户模块开发

#### 3.3.1 登录页面 (/login)
- [ ] 密码登录表单
- [ ] 验证码登录表单
- [ ] 切换登录方式
- [ ] 表单验证
- [ ] 记住我功能
- [ ] 跳转注册

#### 3.3.2 注册页面 (/register)
- [ ] 手机号输入
- [ ] 验证码获取（倒计时）
- [ ] 密码设置
- [ ] 用户协议勾选
- [ ] 注册成功后自动登录

#### 3.3.3 我的页面 (/mine)
- [ ] 用户信息展示
- [ ] 积分展示
- [ ] 功能入口列表
  - 我的帖子
  - 我的关注
  - 联系方式申请
  - 通知消息
  - 设置
- [ ] 登录/未登录状态切换

#### 3.3.4 个人信息编辑页 (/mine/profile)
- [ ] 头像上传
- [ ] 昵称修改
- [ ] 个人简介
- [ ] 游戏服务器选择
- [ ] 联系方式设置

#### 3.3.5 设置页面 (/settings)
- [ ] 通知设置
- [ ] 账号安全（修改密码）
- [ ] 关于我们
- [ ] 退出登录

### 3.4 帖子模块开发

#### 3.4.1 首页 (/)
- [ ] 顶部搜索栏
- [ ] 分类快捷入口
- [ ] 帖子列表（无限滚动）
- [ ] 下拉刷新
- [ ] 底部发布按钮

#### 3.4.2 搜索页面 (/search)
- [ ] 搜索框（自动聚焦）
- [ ] 搜索历史
- [ ] 热门搜索
- [ ] 筛选面板
  - 类型筛选
  - 分类筛选
  - 服务器筛选
  - 价格区间
  - 排序方式
- [ ] 搜索结果列表

#### 3.4.3 帖子详情页 (/post/:id)
- [ ] 图片轮播/预览
- [ ] 帖子基本信息
- [ ] 标签展示
- [ ] 详情内容
- [ ] 作者信息
- [ ] 作者补充（回复列表）
- [ ] 底部操作栏
  - 点赞按钮
  - 关注按钮
  - 获取联系方式按钮

#### 3.4.4 发布帖子页 (/post/create)
- [ ] 帖子类型选择
- [ ] 分类选择
- [ ] 服务器选择
- [ ] 标题输入
- [ ] 价格输入
- [ ] 详情编辑（富文本）
- [ ] 图片上传（最多9张）
- [ ] 标签选择/输入
- [ ] 保存草稿
- [ ] 提交审核

#### 3.4.5 编辑帖子页 (/post/:id/edit)
- [ ] 复用发布帖子表单
- [ ] 加载现有帖子数据
- [ ] 状态提示

#### 3.4.6 我的帖子页 (/mine/posts)
- [ ] 状态筛选 Tab
- [ ] 帖子列表
- [ ] 帖子操作（编辑/删除/更新状态）

#### 3.4.7 我的关注页 (/mine/follows)
- [ ] 关注的帖子列表
- [ ] 取消关注

#### 3.4.8 帖子卡片组件 (PostCard)
- [ ] 缩略图
- [ ] 标题
- [ ] 类型/分类标签
- [ ] 价格
- [ ] 服务器
- [ ] 作者信息
- [ ] 点赞/关注数

### 3.5 联系方式申请模块开发

#### 3.5.1 申请联系方式弹窗
- [ ] 留言输入
- [ ] 积分提示
- [ ] 提交申请

#### 3.5.2 联系方式申请页 (/mine/contact-requests)
- [ ] Tab 切换（我发出的/我收到的）
- [ ] 发出的申请列表
  - 帖子信息
  - 申请状态
  - 联系方式（已通过时显示）
- [ ] 收到的申请列表
  - 申请者信息
  - 申请留言
  - 处理按钮（同意/拒绝）

### 3.6 通知模块开发

#### 3.6.1 通知页面 (/notifications)
- [ ] 通知类型筛选
- [ ] 通知列表
- [ ] 未读标记
- [ ] 点击跳转
- [ ] 标记已读

#### 3.6.2 通知入口（TabBar 角标）
- [ ] 未读数量展示
- [ ] 实时更新

### 3.7 路由与权限

- [ ] 路由配置
- [ ] 登录态守卫
- [ ] 页面切换动画
- [ ] 返回按钮处理

---

## 4. PC端实现计划

### 4.1 基础设施搭建

#### 4.1.1 项目初始化
- [ ] 配置 Next.js 16 App Router
- [ ] 配置 TailwindCSS 4.x
- [ ] 配置 Ant Design 5.x
- [ ] 配置 React Query 5.x
- [ ] 配置 Zustand 5.x
- [ ] 配置环境变量

#### 4.1.2 Provider 配置
- [ ] QueryClientProvider
- [ ] AntdProvider（主题配置）
- [ ] AuthProvider

### 4.2 布局组件开发

#### 4.2.1 全局布局
- [ ] Header 组件
  - Logo
  - 搜索框
  - 导航链接
  - 用户信息/登录按钮
  - 通知入口
- [ ] Footer 组件

#### 4.2.2 用户中心布局
- [ ] 侧边导航菜单
- [ ] 内容区域

### 4.3 通用组件开发

#### 4.3.1 认证相关
- [ ] AuthModal 组件（登录/注册弹窗）
- [ ] LoginForm 组件
- [ ] RegisterForm 组件

#### 4.3.2 帖子相关
- [ ] PostCard 组件（卡片模式）
- [ ] PostListItem 组件（列表模式）
- [ ] PostFilter 组件（筛选面板）
- [ ] PostSidebar 组件（作者信息/推荐）
- [ ] ImageUploader 组件
- [ ] RichTextEditor 组件

#### 4.3.3 通用组件
- [ ] Pagination 组件
- [ ] Empty 组件
- [ ] Loading 组件

### 4.4 页面开发

#### 4.4.1 首页 (/)
- [ ] 三栏布局
  - 左侧：分类导航
  - 中间：帖子列表
  - 右侧：热门推荐
- [ ] 帖子列表展示
- [ ] 筛选条件
- [ ] 排序切换
- [ ] 分页

#### 4.4.2 帖子详情页 (/post/[id])
- [ ] 两栏布局
- [ ] 帖子内容
- [ ] 图片画廊
- [ ] 作者信息侧边栏
- [ ] 操作按钮
- [ ] 回复列表
- [ ] 相关推荐

#### 4.4.3 发布帖子页 (/post/create)
- [ ] 发布表单
- [ ] 富文本编辑器
- [ ] 图片上传
- [ ] 预览功能

#### 4.4.4 个人中心 (/user)
- [ ] 个人信息
- [ ] 子页面路由
  - 我的帖子 (/user/posts)
  - 我的关注 (/user/follows)
  - 联系方式申请 (/user/contacts)
  - 积分记录 (/user/points)
  - 账号设置 (/user/settings)

#### 4.4.5 通知中心 (/notifications)
- [ ] 通知列表
- [ ] 类型筛选
- [ ] 批量标记已读

#### 4.4.6 用户主页 (/u/[id])
- [ ] 用户信息
- [ ] 用户发布的帖子

### 4.5 SEO 优化

- [ ] 页面 metadata 配置
- [ ] generateMetadata 动态配置
- [ ] sitemap.xml 生成
- [ ] robots.txt 配置

---

## 5. 后台管理系统实现计划

### 5.1 基础设施搭建

#### 5.1.1 项目初始化
- [ ] 配置 Next.js 16 App Router
- [ ] 配置 TailwindCSS 4.x
- [ ] 配置 Ant Design 5.x（暗色主题支持）
- [ ] 配置 React Query 5.x
- [ ] 配置 Zustand 5.x

#### 5.1.2 管理员认证
- [ ] 管理员 API 服务
- [ ] useAdminStore 状态管理
- [ ] AdminAuthProvider

### 5.2 布局组件开发

#### 5.2.1 管理后台布局
- [ ] AdminLayout 组件
- [ ] Sidebar 组件（侧边导航）
- [ ] Header 组件
- [ ] Breadcrumb 组件

#### 5.2.2 侧边栏菜单配置
```typescript
const menuItems = [
  { key: 'dashboard', icon: 'dashboard', label: '仪表盘' },
  {
    key: 'audit',
    icon: 'audit',
    label: '审核管理',
    children: [
      { key: 'audit/posts', label: '帖子审核' },
      { key: 'audit/replies', label: '回复审核' },
      { key: 'audit/contacts', label: '联系申请审核' },
    ],
  },
  { key: 'posts', icon: 'file-text', label: '帖子管理' },
  { key: 'users', icon: 'user', label: '用户管理' },
  {
    key: 'content',
    icon: 'database',
    label: '内容管理',
    children: [
      { key: 'content/categories', label: '分类管理' },
      { key: 'content/tags', label: '标签管理' },
      { key: 'content/servers', label: '服务器配置' },
    ],
  },
  {
    key: 'system',
    icon: 'setting',
    label: '系统管理',
    children: [
      { key: 'system/admins', label: '管理员管理' },
      { key: 'system/points', label: '积分配置' },
      { key: 'system/settings', label: '系统设置' },
    ],
  },
  { key: 'logs', icon: 'history', label: '操作日志' },
];
```

### 5.3 通用组件开发

#### 5.3.1 数据表格
- [ ] DataTable 组件（基于 Ant Design Table）
- [ ] 分页配置
- [ ] 排序配置
- [ ] 筛选功能

#### 5.3.2 搜索表单
- [ ] SearchForm 组件
- [ ] 快速搜索
- [ ] 高级搜索展开

#### 5.3.3 状态标签
- [ ] StatusTag 组件
- [ ] 不同状态颜色映射

#### 5.3.4 操作确认
- [ ] ConfirmModal 组件
- [ ] 批量操作确认

### 5.4 页面开发

#### 5.4.1 登录页 (/login)
- [ ] 管理员登录表单
- [ ] 记住账号

#### 5.4.2 仪表盘 (/dashboard)
- [ ] 数据概览卡片
  - 用户总数/今日新增
  - 帖子总数/今日新增
  - 待审核数量
- [ ] 待办事项列表
- [ ] 数据统计图表
  - 用户增长趋势
  - 帖子发布趋势
  - 审核通过率

#### 5.4.3 审核管理

##### 帖子审核 (/audit/posts)
- [ ] 待审核帖子列表
- [ ] 帖子详情预览
- [ ] 审核操作（通过/拒绝）
- [ ] 拒绝原因输入
- [ ] 批量审核

##### 回复审核 (/audit/replies)
- [ ] 待审核回复列表
- [ ] 回复内容预览
- [ ] 关联帖子信息
- [ ] 审核操作

##### 联系申请审核 (/audit/contacts)
- [ ] 待审核申请列表
- [ ] 申请详情
- [ ] 申请者信息
- [ ] 审核操作

#### 5.4.4 帖子管理 (/posts)
- [ ] 帖子列表
- [ ] 多条件筛选
- [ ] 帖子详情弹窗
- [ ] 状态管理
- [ ] 删除操作

#### 5.4.5 用户管理 (/users)
- [ ] 用户列表
- [ ] 用户搜索
- [ ] 用户详情页
  - 基本信息
  - 发布的帖子
  - 积分记录
  - 操作日志
- [ ] 用户状态管理（禁用/启用）

#### 5.4.6 内容管理

##### 分类管理 (/content/categories)
- [ ] 分类树形列表
- [ ] 新增分类
- [ ] 编辑分类
- [ ] 删除分类
- [ ] 排序调整

##### 标签管理 (/content/tags)
- [ ] 标签列表
- [ ] 新增标签
- [ ] 编辑标签
- [ ] 设置热门
- [ ] 合并标签

##### 服务器配置 (/content/servers)
- [ ] 服务器列表
- [ ] 新增服务器
- [ ] 编辑服务器
- [ ] 启用/禁用

#### 5.4.7 系统管理

##### 管理员管理 (/system/admins)
- [ ] 管理员列表
- [ ] 新增管理员
- [ ] 编辑管理员
- [ ] 重置密码
- [ ] 禁用账号

##### 积分配置 (/system/points)
- [ ] 积分规则列表
- [ ] 编辑积分数值
- [ ] 每日上限配置

##### 系统设置 (/system/settings)
- [ ] 基础配置
- [ ] 审核配置
- [ ] 安全配置

#### 5.4.8 操作日志 (/logs)
- [ ] 日志列表
- [ ] 时间筛选
- [ ] 操作类型筛选
- [ ] 操作人筛选

### 5.5 功能增强

#### 5.5.1 快捷键支持
- [ ] 审核页面快捷键
  - `A` 通过
  - `R` 拒绝
  - `N` 下一条
  - `P` 上一条

#### 5.5.2 实时通知
- [ ] 新审核项提醒
- [ ] WebSocket 连接（可选）

---

## 6. 开发阶段规划

### 阶段一：基础架构

**目标**：完成 Monorepo 基础架构和公共模块

**任务清单**：
- [ ] Monorepo 配置（pnpm workspace + turbo）
- [ ] packages/shared 包开发
  - [ ] 类型定义
  - [ ] 工具函数
  - [ ] 常量定义
- [ ] packages/api 包开发
  - [ ] HTTP 客户端
  - [ ] API 服务模块
- [ ] 各应用基础配置
  - [ ] TypeScript 配置
  - [ ] ESLint 配置
  - [ ] TailwindCSS 配置

### 阶段二：移动端核心功能

**目标**：完成移动端核心功能开发

**任务清单**：
- [ ] 用户认证功能
  - [ ] 登录页面
  - [ ] 注册页面
  - [ ] 认证状态管理
- [ ] 帖子浏览功能
  - [ ] 首页帖子列表
  - [ ] 帖子详情页
  - [ ] 搜索筛选功能
- [ ] 帖子发布功能
  - [ ] 发布表单
  - [ ] 编辑功能
  - [ ] 我的帖子

### 阶段三：移动端完整功能

**目标**：完成移动端所有功能

**任务清单**：
- [ ] 互动功能
  - [ ] 点赞功能
  - [ ] 关注功能
  - [ ] 联系方式申请
- [ ] 个人中心
  - [ ] 个人信息管理
  - [ ] 我的关注
  - [ ] 通知消息
- [ ] 设置功能
  - [ ] 通知设置
  - [ ] 账号安全

### 阶段四：PC端开发

**目标**：完成 PC 端功能开发

**任务清单**：
- [ ] 布局与导航
- [ ] 首页与列表
- [ ] 帖子详情
- [ ] 发布功能
- [ ] 个人中心
- [ ] 通知中心

### 阶段五：后台管理系统

**目标**：完成后台管理系统开发

**任务清单**：
- [ ] 管理员认证
- [ ] 仪表盘
- [ ] 审核功能
  - [ ] 帖子审核
  - [ ] 回复审核
  - [ ] 联系申请审核
- [ ] 内容管理
- [ ] 用户管理
- [ ] 系统配置

### 阶段六：优化与测试

**目标**：性能优化和测试

**任务清单**：
- [ ] 性能优化
  - [ ] 代码分割
  - [ ] 图片优化
  - [ ] 缓存策略
- [ ] 单元测试
- [ ] E2E 测试
- [ ] 兼容性测试

---

## 7. 测试策略

### 7.1 单元测试

**工具**：Vitest + React Testing Library

**测试范围**：
- 工具函数
- 自定义 Hooks
- Zustand Store
- 核心组件

**示例**：
```typescript
// packages/shared/utils/__tests__/format.test.ts
import { describe, it, expect } from 'vitest';
import { formatPrice, formatCount, maskPhone } from '../format';

describe('formatPrice', () => {
  it('should format price with currency symbol', () => {
    expect(formatPrice(5000)).toBe('¥5,000');
    expect(formatPrice(10000.5)).toBe('¥10,000.5');
  });
});

describe('formatCount', () => {
  it('should format count with units', () => {
    expect(formatCount(999)).toBe('999');
    expect(formatCount(1500)).toBe('1.5千');
    expect(formatCount(15000)).toBe('1.5万');
  });
});

describe('maskPhone', () => {
  it('should mask middle digits', () => {
    expect(maskPhone('13800138000')).toBe('138****8000');
  });
});
```

### 7.2 组件测试

**示例**：
```typescript
// apps/mobile/src/components/post/__tests__/PostCard.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PostCard } from '../PostCard';

const mockPost = {
  id: 1,
  title: '测试帖子',
  type: 'sell_equipment' as const,
  category: '武器',
  gameServer: '长安城',
  price: 5000,
  thumbnail: null,
  tags: ['高伤害'],
  author: { id: 1, nickname: '测试用户', avatar: null },
  likeCount: 10,
  followCount: 5,
  viewCount: 100,
  createdAt: '2024-01-01T00:00:00Z',
};

describe('PostCard', () => {
  it('should render post title', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('测试帖子')).toBeInTheDocument();
  });

  it('should render formatted price', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('¥5,000')).toBeInTheDocument();
  });
});
```

### 7.3 E2E 测试

**工具**：Playwright

**测试场景**：
- 用户注册流程
- 用户登录流程
- 发布帖子流程
- 申请联系方式流程

**示例**：
```typescript
// e2e/mobile/login.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test('should login with password', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[name="phone"]', '13800138000');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/');
    await expect(page.locator('.user-avatar')).toBeVisible();
  });

  test('should show error for wrong password', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[name="phone"]', '13800138000');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    await expect(page.locator('.error-message')).toContainText('密码错误');
  });
});
```

### 7.4 兼容性测试

**移动端**：
- iOS Safari 15+
- Android Chrome 90+
- 微信内置浏览器

**PC端**：
- Chrome 90+
- Firefox 90+
- Safari 15+
- Edge 90+

**屏幕尺寸**：
- 移动端：375px - 428px
- 平板：768px - 1024px
- PC端：1280px+

---

## 附录

### A. 开发规范

#### A.1 Git 提交规范

```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 重构
perf: 性能优化
test: 测试相关
chore: 构建/工具相关
```

#### A.2 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件 | PascalCase | PostCard.tsx |
| Hook | camelCase，use 前缀 | useAuth.ts |
| 工具函数 | camelCase | formatPrice.ts |
| 常量 | UPPER_SNAKE_CASE | POST_TYPES |
| 类型 | PascalCase | PostListItem |
| CSS 类 | kebab-case / Tailwind | post-card |

#### A.3 目录组织规范

```
ComponentName/
├── index.tsx          # 主组件
├── ComponentName.tsx  # 组件实现（如果较复杂）
├── types.ts           # 类型定义（如果需要）
├── hooks.ts           # 组件内部 hooks（如果需要）
└── styles.css         # 组件样式（如果需要）
```

### B. 环境变量

```env
# .env.development
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_UPLOAD_URL=http://localhost:3000/api/v1/upload

# .env.production
VITE_API_BASE_URL=https://api.mhxy-trade.com/api/v1
VITE_UPLOAD_URL=https://api.mhxy-trade.com/api/v1/upload
```

```env
# Next.js apps
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_UPLOAD_URL=http://localhost:3000/api/v1/upload
```

---

*文档结束*
