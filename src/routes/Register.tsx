export default function Register() {
  return (
    <div className="flex flex-col justify-center items-center">
      <form className="flex flex-col gap-4 bg-base-100 p-8 rounded-sm shadow-md border-t-4 border-t-primary">
        <header className="mb-2 text-2xl text-primary font-bold">
          <h1>Register</h1>
        </header>
        <div className="form-control">
          <label htmlFor="username" className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            id="username"
            placeholder="Type here your username"
            className="input input-bordered max-w-xs"
          />
        </div>
        <div className="form-control">
          <label htmlFor="password" className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            id="password"
            placeholder="Type here your password"
            className="input input-bordered max-w-xs"
          />
        </div>
        <div className="form-control">
          <label htmlFor="passwordConfirmation" className="label">
            <span className="label-text">Repeat password</span>
          </label>
          <input
            type="password"
            id="passwordConfirmation"
            placeholder="Repeat your password here"
            className="input input-bordered max-w-xs"
          />
        </div>
        <button className="btn btn-primary btn-block mt-4">
          Create account
        </button>
      </form>
    </div>
  );
}
