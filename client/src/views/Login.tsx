import { useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export function Login() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = await new FormData(e.target as HTMLFormElement);

    await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          userContext.User.setUser({ email: formData.get("email") as string });
          userContext.LoggedIn.setLoggedIn(true);
          navigate("/");
        }
      });
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="form-appear flex flex-col items-center gap-10 pt-16 pb-16 pl-8 pr-8 bg-white form-shadow"
      >
        <input
          className="outline-0 input-shadow p-2 min-w-72 transition-all"
          type="email"
          placeholder="Your email"
          required
          name="email"
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
          Log In
        </button>
      </form>
    </div>
  );
}
