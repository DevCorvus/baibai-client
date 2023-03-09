import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/navbar/Navbar';
import { useAuthRefreshQuery } from '../services/auth/auth.service';
import AppLoading from '../components/states/AppLoading';
import AppError from '../components/states/AppError';
import { useAuthStore } from '../stores/auth.store';
import { getUserProfile } from '../services/user/users.service';
import { useUserStore } from '../stores/user.store';

export default function RootPage() {
  const { data, isLoading, isError } = useAuthRefreshQuery();
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
    if (data) {
      login(data);
    }
  }, [data]);

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
    if (isError) {
      logout();
    }
  }, [isError]);

  if (isLoading) return <AppLoading />;
  if (isError || isProfileError) return <AppError />;

  return (
    <>
      <Navbar />
      <main className="container mx-auto p-4 md:p-10">
        <Outlet />
      </main>
      <Toaster />
    </>
  );
}
