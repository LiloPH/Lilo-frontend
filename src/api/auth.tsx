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

interface RefreshTokenData {
  id_token: string;
  key: string;
  user: User;
}
interface RefreshTokenResponse {
  status: boolean;
  error?: string | null;
  data?: RefreshTokenData | null;
}

const login = async (code: string): Promise<LoginResponse> => {
  try {
    const { data } = await axios.post<AuthData>("/auth/admin-login", { code });

    axios.defaults.headers.common["authorization"] = `Bearer ${data.id_token}`;
    axios.defaults.headers.common["x-api-key"] = data.key;

    return { status: true, data, error: null };
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response?.data &&
      error.response.status === 401 &&
      error.response.data.error.message
    ) {
      const errorMessage = error.response.data.error.message;
      return { status: false, error: errorMessage, data: null };
    }
    return {
      status: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
};

const logout = async () => {
  try {
    await axios.delete("/auth/admin-logout");
    return { status: true, data: "success" };
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response?.data &&
      error.response.status === 401 &&
      error.response.data.error.message
    ) {
      const errorMessage = error.response.data.error.message;
      return { status: false, error: errorMessage, data: null };
    }
    return {
      status: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
};

const refreshToken = async (): Promise<RefreshTokenResponse> => {
  try {
    const { data } = await axios.get<RefreshTokenData>("/auth/admin-refresh");
    return { status: true, data };
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response?.data &&
      error.response.status === 401 &&
      error.response.data.error.message
    ) {
      const errorMessage = error.response.data.error.message;
      return { status: false, error: errorMessage, data: null };
    }
    return {
      status: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
};
export { login, logout, refreshToken };
