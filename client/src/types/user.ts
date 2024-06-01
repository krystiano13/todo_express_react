export interface User {
  email: string;
  username: string;
}

export interface UserContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
