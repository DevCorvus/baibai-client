import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.store';
import ShoppingCartLink from './ShoppingCartLink';
import LogoutButton from './LogoutButton';
import { HiBars3, HiPlus, HiRectangleStack } from 'react-icons/hi2';
import { useUserStore } from '../../stores/user.store';

export default function Navbar() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const userProfile = useUserStore((state) => state.profile);

  return (
    <nav className="bg-primary">
      <div className="container mx-auto navbar text-slate-50 flex justify-between flex-wrap">
        <div>
          <Link to={'/'} className="btn btn-ghost text-xl">
            Baibai
          </Link>
        </div>
        {isLoggedIn && userProfile ? (
          <div className="flex items-center gap-2">
            <span>{userProfile.username}</span>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <HiBars3 className="text-2xl" />
              </label>
              <ul className="menu dropdown-content bg-primary w-44 mt-2 rounded-b-box">
                <li>
                  <ShoppingCartLink />
                </li>
                <li className="bordered">
                  <Link to={'products/add'}>
                    <HiPlus className="text-2xl" />
                    Add product
                  </Link>
                </li>
                <li>
                  <Link to={`products?username=${userProfile.username}`}>
                    <HiRectangleStack className="text-2xl" />
                    My products
                  </Link>
                </li>
                <li>
                  <LogoutButton />
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <ul className="menu menu-horizontal">
            <li>
              <Link to={'/login'}>Login</Link>
            </li>
            <li>
              <Link to={'/register'}>Register</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
