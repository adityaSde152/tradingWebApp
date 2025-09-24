import { createContext, useState, useEffect, useContext } from "react";
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
      console.error("Refresh token error:", err.response?.data || err?.message);
    }
  };

  //  Fetch User Function
  const fetchUser = async () => {
    try {
      const res = await getUser();
      setUser(res?.userData);
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  };

  // Check if user is logged in on mount
  useEffect(() => {
    fetchUser();
  }, []);

  // Start refresh token loop when user exists
  useEffect(() => {
    if (!user) return; // No user = No refresh

    refreshToken(); // Refresh immediately on login

    const interval = setInterval(refreshToken, 60 * 1000);
    return () => clearInterval(interval);
  }, [user]);

  const value = {
    user,
    setUser,
    isLoading,
    setIsLoading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
