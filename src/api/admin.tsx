import axios, { AxiosResponse, AxiosError } from "axios";

interface AnalyticsResponse {
  users: number;
}

interface ApiResponse<T> {
  status: boolean;
  data?: T;
  error?: string;
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

export { analytics };
