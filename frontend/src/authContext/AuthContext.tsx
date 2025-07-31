import { jwtDecode } from "jwt-decode";

import {  useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "./context";

type User = {
  userId: string;
  username: string;
};


const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const token = Cookies.get("token");
    console.log("Access token from cookie :",token)
    
    if (token) {
      try {
        const decodedUser = jwtDecode<User>(token);
        setUser(decodedUser);
        setAuthToken(token);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, currentUser: user ,loading, setUser, setAuthToken}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
