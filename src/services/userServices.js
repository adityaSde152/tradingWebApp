import api from "../api/axiosClient";

// Get User API
export const getUser = async () => {
  const res = await api.get("/api/user/get-profile");
  return res.data;
};

// Update User
export const updateProfile = async (data) => {
  const res = await api.post("/api/user/update-profile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
