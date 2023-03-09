import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-lg flex flex-col gap-4 p-6 bg-base-100 rounded-md">
      <p className="text-center text-secondary font-medium">
        Page not found.{' '}
        <Link to={'/'} className="link link-primary">
          Go home
        </Link>
      </p>
    </div>
  );
}
