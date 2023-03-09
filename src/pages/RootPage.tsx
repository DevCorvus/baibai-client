import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/navbar/Navbar';
import AppLoading from '../components/states/AppLoading';
import AppError from '../components/states/AppError';
import { useAutoLogin } from '../hooks/useAutoLogin';

export default function RootPage() {
  const { isLoading, isError } = useAutoLogin();

  if (isLoading) return <AppLoading />;
  if (isError) return <AppError />;

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
