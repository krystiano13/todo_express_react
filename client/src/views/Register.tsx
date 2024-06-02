import { NavLink } from "react-router-dom";

export function Register() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <form className="form-appear flex flex-col items-center gap-10 pt-16 pb-16 pl-8 pr-8 bg-white form-shadow">
        <input
          className="outline-0 input-shadow p-2 min-w-72 transition-all"
          type="email"
          placeholder="Your email"
          required
          name="email"
        />
        <input
          className="outline-0 input-shadow p-2 min-w-72 transition-all"
          type="text"
          placeholder="Username"
          required
          name="username"
        />
        <input
          className="outline-0 input-shadow p-2 min-w-72 transition-all"
          type="password"
          placeholder="Password"
          required
          name="password"
        />
        <button
          className="p-2 pl-6 pr-6 text-white bg-emerald-500 min-w-72 hover:bg-emerald-400 transition-colors"
          type="submit"
        >
          Create Account
        </button>
        <NavLink
          className="hover:text-emerald-500 transition-colors"
          to="/login"
        >
          Already have an account?
        </NavLink>
      </form>
    </div>
  );
}
