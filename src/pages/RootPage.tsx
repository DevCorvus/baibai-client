import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/navbar/Navbar';
import { useAuthRefreshQuery } from '../services/auth/auth.service';
import AppLoading from '../components/states/AppLoading';
import AppError from '../components/states/AppError';
import { useAuthStore } from '../stores/auth.store';

export default function RootPage() {
  const { data, isLoading, isError } = useAuthRefreshQuery();
  const { login, logout } = useAuthStore((state) => ({
    login: state.login,
    logout: state.logout,
  }));

  useEffect(() => {
    if (data) {
      login(data);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      logout();
    }
  }, [isError]);

  if (isLoading) return <AppLoading />;
  if (isError) return <AppError />;

  return (
    <>
      <Navbar />
      <main className="container mx-auto p-10">
        <Outlet />
      </main>
      <Toaster />
    </>
  );
}
