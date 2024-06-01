import { createContext, useState, useEffect } from "react";
import type { UserContext as User, User as UserType } from "../types/user";

export const UserContext = createContext<User>({
  User: {
    user: null,
    setUser: () => {},
  },
  LoggedIn: {
    loggedIn: false,
    setLoggedIn: () => {},
  },
});

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/auth/status", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.user) {
          setUser({ email: data.user });
          setLoggedIn(true);
        }
      });
  }, [user, loggedIn]);

  return (
    <UserContext.Provider
      value={{
        User: { user: user, setUser: setUser },
        LoggedIn: { loggedIn: loggedIn, setLoggedIn: setLoggedIn },
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
