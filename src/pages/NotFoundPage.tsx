import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="centered-fixed-container">
      <div className="flex items-center justify-center gap-2">
        <p className="text-secondary font-medium">Page not found.</p>
        <Link to={'/'} className="link link-primary">
          Go home
        </Link>
      </div>
    </div>
  );
}
