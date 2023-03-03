import toast from 'react-hot-toast';
import { HiArrowLeftOnRectangle } from 'react-icons/hi2';
import { useAuthStore } from '../../stores/auth.store';

export default function LogoutButton() {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  return (
    <button
      onClick={handleLogout}
      className="tooltip tooltip-bottom"
      data-tip="Logout"
    >
      <HiArrowLeftOnRectangle className="text-2xl" />
    </button>
  );
}
