import axios from "axios";
import { refreshToken } from "./auth";
import { useAuthStore } from "@/store/authStore";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await refreshToken();

        if (refreshResponse.status && refreshResponse.data) {
          axios.defaults.headers.common["authorization"] =
            `Bearer ${refreshResponse.data.id_token}`;
          axios.defaults.headers.common["x-api-key"] = refreshResponse.data.key;

          const authStore = useAuthStore.getState();
          authStore.setAuth(true);
          authStore.setUser(refreshResponse.data.user);

          return axios(originalRequest);
        }
      } catch (refreshError) {
        const authStore = useAuthStore.getState();
        authStore.setAuth(false);
        authStore.setUser(null);

        delete axios.defaults.headers.common["authorization"];
        delete axios.defaults.headers.common["x-api-key"];
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
