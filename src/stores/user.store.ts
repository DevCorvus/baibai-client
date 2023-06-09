import { create } from 'zustand';
import { UserProfile } from '../interfaces/user';

interface UserState {
  profile: UserProfile | null;
  setProfile(user: UserProfile): void;
  resetProfile(): void;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  setProfile(userProfile: UserProfile) {
    set({ profile: userProfile });
  },
  resetProfile() {
    set({ profile: null });
  },
}));
