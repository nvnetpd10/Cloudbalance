import axios from "axios";
import { getToken, login, logout } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

const refreshApi = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


let refreshPromise = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = refreshApi.post("/auth/refresh");
        }

        const res = await refreshPromise;
        refreshPromise = null;

        const newAccessToken = res.data?.accessToken;
        if (!newAccessToken) throw new Error("No access token");

        login(null, newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        refreshPromise = null;
        logout();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
