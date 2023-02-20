import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.store';
import { toast } from 'react-hot-toast';

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
      <div className="container mx-auto navbar text-slate-50 flex justify-between">
        <div>
          <Link to={'/'} className="btn btn-ghost text-xl">
            Products
          </Link>
        </div>
        <ul className="menu menu-horizontal">
          {isLoggedIn ? (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
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
