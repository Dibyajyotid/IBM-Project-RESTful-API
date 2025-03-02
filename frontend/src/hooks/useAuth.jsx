// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [authTokens, setAuthTokens] = useState(() => {
//     return localStorage.getItem("authTokens")
//       ? JSON.parse(localStorage.getItem("authTokens"))
//       : null;
//   });

//   const [user, setUser] = useState(() => {
//     return localStorage.getItem("user")
//       ? JSON.parse(localStorage.getItem("user"))
//       : null;
//   });

//   useEffect(() => {
//     if (authTokens) {
//       localStorage.setItem("authTokens", JSON.stringify(authTokens));
//     } else {
//       localStorage.removeItem("authTokens");
//     }

//     if (user) {
//       localStorage.setItem("user", JSON.stringify(user));
//     } else {
//       localStorage.removeItem("user");
//     }
//   }, [authTokens, user]);

//   const login = (tokens, userData) => {
//     console.log("Saving tokens:", tokens);
//     setAuthTokens(tokens);
//     setUser(userData);
//   };

//   const logout = () => {
//     setAuthTokens(null);
//     setUser(null);
//     localStorage.removeItem("authTokens");
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ authTokens, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
// export default AuthProvider;

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

  const [isAdmin, setIsAdmin] = useState(false);

  // ✅ Automatically check authentication using `/api/auth/check-auth`
  useEffect(() => {
    const checkAuth = async () => {
      if (!authTokens) return; // Stop if no token exists

      try {
        const { data } = await axios.get(
          "http://localhost:5090/api/auth/check-auth",
          {
            withCredentials: true,
          }
        );

        setUser(data);
        setIsAdmin(data.role === "admin");

        // ✅ Store user in localStorage
        localStorage.setItem("user", JSON.stringify(data));
      } catch (error) {
        console.error("Auth check failed:", error);
        logout(); // If error, logout user
      }
    };

    checkAuth();
  }, [authTokens]); // ✅ Runs when `authTokens` change

  // ✅ Sync auth state with localStorage
  useEffect(() => {
    if (authTokens) {
      localStorage.setItem("authTokens", JSON.stringify(authTokens));
    } else {
      localStorage.removeItem("authTokens");
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setIsAdmin(user.role === "admin");
    } else {
      localStorage.removeItem("user");
      setIsAdmin(false);
    }
  }, [authTokens, user]);

  // ✅ Login function
  const login = (tokens, userData) => {
    console.log("Saving tokens:", tokens);
    setAuthTokens(tokens);
    setUser(userData);
    setIsAdmin(userData.role === "admin");

    // ✅ Store in localStorage
    localStorage.setItem("authTokens", JSON.stringify(tokens));
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // ✅ Logout function
  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5090/api/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Logout failed:", error);
    }

    setAuthTokens(null);
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ authTokens, user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook for using auth
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
