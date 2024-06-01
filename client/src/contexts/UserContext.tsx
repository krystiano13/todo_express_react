import { createContext, useState, useEffect } from "react";
import type { UserContext as User, User as UserType } from "../types/user";

export const UserContext = createContext<User>({
  user: null,
  setUser: () => {},
});

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserType | null>(null);
  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </UserContext.Provider>
  );
}
