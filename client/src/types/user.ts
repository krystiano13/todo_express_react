export interface User {
  email: string;
}

export interface UserContext {
  User: {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
  };
  LoggedIn: {
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

export interface AuthError {
  location: string;
  msg: string;
  type: string;
  value: string;
  path: string;
}
