import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import "../styles/Navbar.css";

export function Navbar() {
  const userContext = useContext(UserContext);

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
          <NavLink to="/logout">Logout</NavLink>
        </>
      )}
    </nav>
  );
}
