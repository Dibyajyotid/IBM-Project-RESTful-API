import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    return localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;
  });

  const [user, setUser] = useState(() => {
    return localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
  });

  useEffect(() => {
    if (authTokens) {
      localStorage.setItem("authTokens", JSON.stringify(authTokens));
    } else {
      localStorage.removeItem("authTokens");
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [authTokens, user]);

  const login = (tokens, userData) => {
    console.log("Saving tokens:", tokens);
    setAuthTokens(tokens);
    setUser(userData);
  };

  const logout = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ authTokens, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
