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
