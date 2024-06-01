export function Login() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <form className="form-appear flex flex-col items-center gap-10 pt-16 pb-16 pl-8 pr-8 bg-white form-shadow">
        <input
          className="outline-0 input-shadow p-2 min-w-72 transition-all cursor-pointer"
          type="email"
          placeholder="Your email"
          required
        />
        <input
          className="outline-0 input-shadow p-2 min-w-72 transition-all cursor-pointer"
          type="password"
          placeholder="Password"
          required
        />
        <button
          className="p-2 pl-6 pr-6 text-white bg-emerald-500 min-w-72 hover:bg-emerald-400 transition-colors"
          type="submit"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
