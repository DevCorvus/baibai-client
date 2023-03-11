import { axiosInstance } from '../lib/axios';
import { UserProfile } from '../interfaces/user';

export async function getUserProfile(): Promise<UserProfile> {
  const { data } = await axiosInstance.get<UserProfile>('/users/profile');
  return data;
}
