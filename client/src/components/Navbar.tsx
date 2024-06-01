import { NavLink } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

export function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext.user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [userContext.user]);

  return (
    <nav className="w-[100vw] fixed p-4 flex justify-start items-center gap-8 form-shadow">
      <NavLink to="/">Home</NavLink>
      {!loggedIn && (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </>
      )}

      {loggedIn && (
        <>
          <p>
            {userContext.user !== null ? userContext.user.username : "Guest"}
          </p>
          <NavLink to="/logout">Logout</NavLink>
        </>
      )}
    </nav>
  );
}
