import { createApiClient } from '@mhxy/api';
import {
  createAuthService,
  createUserService,
  createPostService,
  createContactService,
  createNotificationService,
  createPointsService,
  createCommonService,
  createUploadService,
} from '@mhxy/api';
import { getToken, clearToken } from '@mhxy/shared/utils';

const baseURL = import.meta.env.VITE_API_BASE_URL as string;

const client = createApiClient({
  baseURL,
  getToken,
  onUnauthorized: () => {
    clearToken();
  },
});

export const authService = createAuthService(client);
export const userService = createUserService(client);
export const postService = createPostService(client);
export const contactService = createContactService(client);
export const notificationService = createNotificationService(client);
export const pointsService = createPointsService(client);
export const commonService = createCommonService(client);
export const uploadService = createUploadService(client);
