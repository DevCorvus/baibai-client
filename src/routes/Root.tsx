import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/navbar/Navbar';

export default function Root() {
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
