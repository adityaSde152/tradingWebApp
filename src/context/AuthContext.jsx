import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { refreshAccessToken } from "../services/authServices";
import { getUser } from "../services/userServices";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Refresh Access Token every 2 min
  const refreshToken = async () => {
    try {
      const res = await refreshAccessToken();
    } catch (err) {
      console.error("Refresh token error:", err.response?.data || err.message);
    }
  };

  const fetchUser = async () => {
    const user = await getUser();
    setUser(user.userData);
  };

  useEffect(() => {
    refreshToken();
    fetchUser();

    const interval = setInterval(refreshToken, 2 * 58 * 1000);
    return () => clearInterval(interval);
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    setIsLoading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
