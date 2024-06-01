import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import "../styles/Navbar.css";

export function Navbar() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  function logOut() {
    fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      userContext.LoggedIn.setLoggedIn(false);
      userContext.User.setUser(null);
      navigate("/login");
    });
  }

  return (
    <nav className="w-[100vw] fixed p-4 flex justify-start items-center gap-10 form-shadow">
      <NavLink to="/">Home</NavLink>
      {!userContext.LoggedIn.loggedIn && (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </>
      )}

      {userContext.LoggedIn.loggedIn && (
        <>
          <p>
            {userContext.User.user !== null
              ? userContext.User.user.email
              : "Guest"}
          </p>
          <a onClick={logOut} href="#">
            Logout
          </a>
        </>
      )}
    </nav>
  );
}
