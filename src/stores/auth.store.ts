import { create } from 'zustand';
import { JwtPayload } from '../services/auth/auth.service';
import {
  ACCESS_TOKEN_KEYWORD,
  REFRESH_TOKEN_KEYWORD,
} from '../config/constants';

interface AuthState {
  isLoggedIn: boolean;
  login(payload: JwtPayload): void;
  logout(): void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  login({ access_token, refresh_token }: JwtPayload) {
    localStorage.setItem(ACCESS_TOKEN_KEYWORD, access_token);
    localStorage.setItem(REFRESH_TOKEN_KEYWORD, refresh_token);
    set({ isLoggedIn: true });
  },
  logout() {
    localStorage.removeItem(ACCESS_TOKEN_KEYWORD);
    localStorage.removeItem(REFRESH_TOKEN_KEYWORD);
    set({ isLoggedIn: false });
  },
}));
