import { useEffect, useState } from 'react';
import { useAuthRefreshQuery } from '../services/auth/auth.service';
import { useAuthStore } from '../stores/auth.store';
import { useUserStore } from '../stores/user.store';
import { getUserProfile } from '../services/user/users.service';

export function useAutoLogin() {
  const [isLoading, setLoading] = useState<boolean>(true);

  const {
    data: jwt,
    isLoading: isJwtLoading,
    isError: isJwtError,
  } = useAuthRefreshQuery();

  const { isLoggedIn, login, logout } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    login: state.login,
    logout: state.logout,
  }));

  const { setProfile, resetProfile } = useUserStore((state) => ({
    setProfile: state.setProfile,
    resetProfile: state.resetProfile,
  }));

  const [isProfileError, setProfileError] = useState<boolean>(false);

  useEffect(() => {
    if (jwt) {
      login(jwt);
      setLoading(false);
    } else if (!jwt && !isJwtLoading) {
      setLoading(false);
    }
  }, [jwt, isJwtLoading]);

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        try {
          const userProfile = await getUserProfile();
          setProfile(userProfile);
        } catch (error) {
          setProfileError(true);
        }
      })();
    } else {
      resetProfile();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isJwtError) {
      logout();
    }
  }, [isJwtError]);

  return {
    isLoading,
    isError: isJwtError || isProfileError,
  };
}
