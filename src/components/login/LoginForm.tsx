import { FormEvent } from 'react';
import { useLoginMutation } from '../../services/auth.service';
import { useNavigate, useLocation } from 'react-router';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../../stores/auth.store';
import { useSearchParams } from 'react-router-dom';

export default function LoginForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mutation = useLoginMutation();

  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (username && password) {
      mutation.mutate(
        { username, password },
        {
          onSuccess: (data) => {
            login(data);

            toast.success(`Welcome ${username}!`);

            const urlRef = searchParams.get('ref');

            if (urlRef) {
              navigate(urlRef);
            } else {
              navigate('/');
            }
          },
        }
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-base-100 p-8 rounded-sm shadow-md border-t-4 border-t-primary"
    >
      <header className="mb-2 text-2xl text-primary font-bold">
        <h1>Login</h1>
      </header>
      <div className="form-control">
        <label htmlFor="username" className="label">
          <span className="label-text">Username</span>
        </label>
        <input
          required
          type="text"
          id="username"
          name="username"
          placeholder="Type here your username"
          className="input input-bordered max-w-xs"
          defaultValue={location.state?.username || ''}
        />
      </div>
      <div className="form-control">
        <label htmlFor="password" className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          required
          type="password"
          id="password"
          name="password"
          placeholder="Type here your password"
          className="input input-bordered max-w-xs"
        />
      </div>
      <button
        type="submit"
        disabled={mutation.isLoading}
        className={`btn btn-primary btn-block mt-4
          ${mutation.isLoading ? 'loading' : ''}`}
      >
        Enter
      </button>
    </form>
  );
}
