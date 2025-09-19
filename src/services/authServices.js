import api from "../api/axiosClient";
import Cookies from "js-cookie";

// User Register API
export const registerUser = async (data) => {
  const res = await api.post("/api/auth/register", data);
  Cookies.set("accessToken", res.data.accessToken);
  return res.data;
};

// User Login API
export const loginUser = async (data) => {
  const res = await api.post("/api/auth/login", data);
  Cookies.set("accessToken", res.data.accessToken);
  return res.data;
};

// Verify-OTP API
export const verifyOtp = async (data) => {
  const res = await api.post("/api/auth/verify-otp", data);
  return res.data;
};

// Refresh access Token API
export const refreshAccessToken = async () => {
  const res = await api.post("/api/auth/refresh");
  Cookies.set("accessToken", res.data.accessToken);
  return res.data;
};
