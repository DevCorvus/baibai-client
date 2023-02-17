import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchemaType, registerSchema } from '../schemas/register.schema';

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(registerSchema) });

  const onSubmit: SubmitHandler<RegisterSchemaType> = (data) =>
    console.log(data);

  return (
    <div className="flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 bg-base-100 p-8 rounded-sm shadow-md border-t-4 border-t-primary"
      >
        <header className="mb-2 text-2xl text-primary font-bold">
          <h1>Register</h1>
        </header>
        <div className="form-control">
          <label htmlFor="username" className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            {...register('username')}
            type="text"
            id="username"
            placeholder="Type here your username"
            className="input input-bordered max-w-xs"
          />
          {errors.username && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.username.message}
              </span>
            </label>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="password" className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            {...register('password')}
            type="password"
            id="password"
            placeholder="Type here your password"
            className="input input-bordered max-w-xs"
          />
          {errors.password && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.password.message}
              </span>
            </label>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="passwordConfirmation" className="label">
            <span className="label-text">Repeat password</span>
          </label>
          <input
            {...register('passwordConfirmation')}
            type="password"
            id="passwordConfirmation"
            placeholder="Repeat your password here"
            className="input input-bordered max-w-xs"
          />
          {errors.passwordConfirmation && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.passwordConfirmation.message}
              </span>
            </label>
          )}
        </div>
        <button type="submit" className="btn btn-primary btn-block mt-4">
          Create account
        </button>
      </form>
    </div>
  );
}
