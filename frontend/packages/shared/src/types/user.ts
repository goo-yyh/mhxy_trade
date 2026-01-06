export interface User {
  id: number;
  phone: string;
  nickname: string | null;
  avatar: string | null;
  bio: string | null;
  gameServer: string | null;
  contactInfo?: string;
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
