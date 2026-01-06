import { createApiClient } from '@mhxy/api';

const ADMIN_TOKEN_KEY = 'mhxy_admin_token';

export function getAdminToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const client = createApiClient({
  baseURL,
  getToken: getAdminToken,
  onUnauthorized: () => {
    clearAdminToken();
  },
});

export const adminAuthService = {
  login(username: string, password: string) {
    return client.post('/admin/auth/login', { username, password });
  },
  getProfile() {
    return client.get('/admin/profile');
  },
};

export { client };
