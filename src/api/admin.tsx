import axios, { AxiosResponse, AxiosError } from "axios";

interface AnalyticsResponse {
  users: number;
}

interface ApiResponse<T> {
  status: boolean;
  data?: T;
  error?: string;
}

interface UserResponse {
  _id: string;
  name: string;
  email: string;
  picture: string;
}

interface RouteLog {
  changedBy: string | null;
  message: string | null;
  time: string | null;
}

interface Route {
  _id: string;
  routeNo: number | string;
  routeName: string;
  routeColor: string;
  status: "completed" | "empty" | string;
  lastChange: RouteLog;
}

interface RoutesResponse {
  totalRoutes: number;
  routes: Route[];
}

const analytics = async (): Promise<ApiResponse<AnalyticsResponse>> => {
  try {
    const response: AxiosResponse<AnalyticsResponse> =
      await axios.get("/admin");
    return { status: true, data: response.data };
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ error?: { message?: string } }>;
    const errMessage =
      axiosError.response?.data?.error?.message ||
      axiosError.message ||
      "An unknown error occurred";

    return { status: false, error: errMessage };
  }
};

const users = async (): Promise<ApiResponse<UserResponse>> => {
  try {
    const response: AxiosResponse<UserResponse> =
      await axios.get("/admin/users");
    return { status: true, data: response.data };
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ error?: { message?: string } }>;
    const errMessage =
      axiosError.response?.data?.error?.message ||
      axiosError.message ||
      "An unknown error occurred";

    return { status: false, error: errMessage };
  }
};

const routes = async (): Promise<ApiResponse<RoutesResponse>> => {
  try {
    const response: AxiosResponse<RoutesResponse> =
      await axios.get("/admin/routes");
    return { status: true, data: response.data };
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ error?: { message?: string } }>;
    const errMessage =
      axiosError.response?.data?.error?.message ||
      axiosError.message ||
      "An unknown error occurred";

    return { status: false, error: errMessage };
  }
};

export { analytics, users, routes };
