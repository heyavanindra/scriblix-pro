import { createContext } from "react";

type User = {
  userId: string;
  rname: string;
};



export const AuthContext = createContext<{
  authToken?: string | null;
  currentUser?: User | null;
  loading?: boolean;
  setUser?: React.Dispatch<React.SetStateAction<User | null>>;
  setAuthToken?: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  authToken: null,
  currentUser: null,
});
