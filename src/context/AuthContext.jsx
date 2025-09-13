import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  // Login/Register
  const saveAccessToken = (token) => {
    setAccessToken(token);
  };

  // Refresh Access Token every 2 min
  const refreshAccessToken = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/refresh",
        {},
        { withCredentials: true } // refresh token
      );

      if (res.data.success) {
        setAccessToken(res.data.accessToken);
      }
    } catch (err) {
      console.error("Refresh token error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (!accessToken) return; // If not token do not refresh
    const interval = setInterval(refreshAccessToken, 2 * 60 * 1000);
    console.log(accessToken);
    return () => clearInterval(interval);
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, saveAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
