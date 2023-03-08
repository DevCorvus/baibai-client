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
  const { login, logout } = useAuthStore((state) => ({
    login: state.login,
    logout: state.logout,
  }));
  const setProfile = useUserStore((state) => state.setProfile);

  const [isProfileError, setProfileError] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      (async () => {
        try {
          login(data);
          const userProfile = await getUserProfile();
          setProfile(userProfile);
        } catch (error) {
          setProfileError(true);
        }
      })();
    }
  }, [data]);

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
