import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.store';
import { toast } from 'react-hot-toast';
import { HiShoppingCart, HiArrowLeftOnRectangle } from 'react-icons/hi2';

export default function Navbar() {
  const { isLoggedIn, logout } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    logout: state.logout,
  }));

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  return (
    <nav className="bg-primary">
      <div className="container mx-auto navbar text-slate-50 flex justify-between flex-wrap">
        <div>
          <Link to={'/'} className="btn btn-ghost text-xl">
            Products
          </Link>
        </div>
        <ul className="menu menu-horizontal">
          {isLoggedIn ? (
            <>
              <li>
                <Link
                  to={'/shopping-cart'}
                  className="tooltip tooltip-bottom"
                  data-tip="Shopping cart"
                >
                  <HiShoppingCart className="text-2xl" />
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="tooltip tooltip-bottom"
                  data-tip="Logout"
                >
                  <HiArrowLeftOnRectangle className="text-2xl" />
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={'/login'}>Login</Link>
              </li>
              <li>
                <Link to={'/register'}>Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
