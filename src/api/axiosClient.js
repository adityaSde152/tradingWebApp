import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: `http://localhost:4000`,
  withCredentials: true,
});

// Request Interceptor -> Attaching tokens to every request
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => Promise.reject(error)
);

export default api;
