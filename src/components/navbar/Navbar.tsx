import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.store';
import ShoppingCartLink from './ShoppingCartLink';
import LogoutButton from './LogoutButton';

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
        <ul className="menu menu-horizontal">
          {isLoggedIn ? (
            <>
              <li>
                <ShoppingCartLink />
              </li>
              <li>
                <LogoutButton />
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
