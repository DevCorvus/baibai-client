import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar bg-primary text-slate-50 flex justify-between">
      <div>
        <Link to={'/'} className="btn btn-ghost text-xl">
          Products
        </Link>
      </div>
      <ul className="menu menu-horizontal">
        <li>
          <Link to={'/login'}>Login</Link>
        </li>
        <li>
          <Link to={'/register'}>Register</Link>
        </li>
      </ul>
    </nav>
  );
}
