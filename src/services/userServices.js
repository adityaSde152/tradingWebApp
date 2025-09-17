import api from "../api/axiosClient";

// Get User API
export const getUser = async () => {
  const res = await api.get("/api/user/get-profile");
  return res.data;
};