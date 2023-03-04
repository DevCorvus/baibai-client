import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.store';
import ShoppingCartLink from './ShoppingCartLink';
import LogoutButton from './LogoutButton';
import { HiBars3, HiPlus, HiRectangleStack } from 'react-icons/hi2';

export default function Navbar() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <nav className="bg-primary">
      <div className="container mx-auto navbar text-slate-50 flex justify-between flex-wrap">
        <div>
          <Link to={'/'} className="btn btn-ghost text-xl">
            Products
          </Link>
        </div>
        {isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <HiBars3 className="text-2xl" />
            </label>
            <ul className="menu dropdown-content bg-primary w-44 mt-2 rounded-b-box">
              <li className="bordered">
                <Link to={'products/add'}>
                  <HiPlus className="text-2xl" />
                  Add product
                </Link>
              </li>
              <li>
                <Link to={`products?username=${'corvus'}`}>
                  <HiRectangleStack className="text-2xl" />
                  My products
                </Link>
              </li>
              <li>
                <ShoppingCartLink />
              </li>
              <li>
                <LogoutButton />
              </li>
            </ul>
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
