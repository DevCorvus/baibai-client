import axios from 'axios';
import { API_URL } from '../config/constants';
import { useAuthStore } from '../stores/auth.store';
import { authRefresh } from '../services/auth.service';

export const axiosInstance = axios.create({ baseURL: API_URL });

axiosInstance.interceptors.request.use((config) => {
  const authStore = useAuthStore.getState();

  if (authStore.isLoggedIn) {
    const jwt = authStore.getTokens();
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt.access_token}`;
      return config;
    }
  }
  config.headers.Authorization = '';
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }

    const authStore = useAuthStore.getState();
    const jwt = authStore.getTokens();

    if (jwt) {
      try {
        const newJwt = await authRefresh(jwt.refresh_token);
        authStore.login(newJwt);
      } catch (refreshError) {
        authStore.logout();
        return Promise.reject(refreshError);
      }
    } else {
      return Promise.reject(error);
    }
  }
);
