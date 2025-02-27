import { createContext, useContext, useState, useEffect } from "react";

// Create Auth Context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    const storedTokens = localStorage.getItem("authTokens");
    return storedTokens ? JSON.parse(storedTokens) : null;
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Sync state with localStorage when authTokens or user changes
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

  // Function to handle login
  const login = (tokens, userData) => {
    setAuthTokens(tokens);
    setUser(userData);
  };

  // Function to handle logout
  const logout = () => {
    setAuthTokens(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authTokens, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication data
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
