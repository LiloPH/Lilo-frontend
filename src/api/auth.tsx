/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
}

interface AuthData {
  key: string;
  id_token: string;
  user: User;
}

interface LoginResponse {
  status: boolean;
  error?: string | null;
  data?: AuthData | null;
}

interface ApiError {
  error: {
    message: string;
  };
}

const login = async (code: string): Promise<LoginResponse> => {
  try {
    const { data } = await axios.post<AuthData>("/auth/admin-login", { code });

    axios.defaults.headers.common["authorization"] = `Bearer ${data.id_token}`;
    axios.defaults.headers.common["x-api-key"] = data.key;

    return { status: true, data, error: null };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data as ApiError;
      const message = errorData.error?.message || "Login failed";
      return { status: false, error: message, data: null };
    }
    const defaultError = "An unexpected error occurred. Please try again.";
    return { status: false, error: defaultError, data: null };
  }
};

const logout = async () => {
  try {
    await axios.delete("/auth/admin-logout");
    return { status: true, data: "success" };
  } catch (error) {
    return {
      status: false,
      error: "An unexpected error occurred. Please try again.",
      data: null,
    };
  }
};

export { login, logout };
