import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../lib/axios';

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

interface JwtPayload {
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
