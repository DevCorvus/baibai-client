import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../lib/axios';
import { REFRESH_TOKEN_KEYWORD } from '../../config/constants';

interface UserDto {
  username: string;
  password: string;
}

export function useRegisterMutation() {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: async (user: UserDto) => {
      const { data } = await axiosInstance.post('/users', user);
      return data;
    },
  });
}

export interface JwtPayload {
  access_token: string;
  refresh_token: string;
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: async (credentials: UserDto) => {
      const { data } = await axiosInstance.post<JwtPayload>(
        '/auth/login',
        credentials
      );
      return data;
    },
  });
}

export async function authRefresh(refreshToken: string): Promise<JwtPayload> {
  const { data } = await axiosInstance.post<JwtPayload>('/auth/refresh', {
    refresh_token: refreshToken,
  });
  return data;
}

export function useAuthRefreshQuery() {
  return useQuery({
    queryKey: ['authRefresh'],
    queryFn: async () => {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEYWORD);

      if (!refreshToken) return null;

      const data = await authRefresh(refreshToken);

      return data;
    },
    retry: false,
  });
}
