import axios, { AxiosError, AxiosResponse } from "axios";

interface ApiResponse<T> {
  status: boolean;
  error?: string | null;
  data?: T | null;
}

interface RouteDetails {
  _id: string;
  routeNo: number;
  routeName: string;
  routeColor: string;
  status: string;
}

interface CreateRouteParams {
  routeNo: number;
  routeName: string;
  routeColor: string;
}

const createRoute = async ({
  routeNo,
  routeName,
  routeColor,
}: CreateRouteParams): Promise<ApiResponse<RouteDetails>> => {
  try {
    const route: AxiosResponse<RouteDetails> = await axios.post("/routes", {
      routeNo,
      routeName,
      routeColor,
    });

    return { status: true, data: route.data };
  } catch (error) {
    const axiosError = error as AxiosError<{ error?: { message?: string } }>;
    const errMessage =
      axiosError.response?.data?.error?.message ||
      axiosError.message ||
      "An unknown error occurred";

    return { status: false, error: errMessage };
  }
};

const getOneRoute = async (id: string) => {
  try {
    const route: AxiosResponse<ApiResponse<RouteDetails>> = await axios.get(
      `/routes/${id}`
    );

    return { status: true, data: route.data };
  } catch (error) {
    const axiosError = error as AxiosError<{ error?: { message?: string } }>;
    const errMessage =
      axiosError.response?.data?.error?.message ||
      axiosError.message ||
      "An unknown error occurred";

    return { status: false, error: errMessage };
  }
};

const deleteRoute = async (id: string) => {
  try {
    const deletedRoute: AxiosResponse<ApiResponse<{ message: string }>> =
      await axios.delete(`/routes/${id}`);

    return {
      status: true,
      data: deletedRoute.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ error?: { message?: string } }>;
    const errMessage =
      axiosError.response?.data?.error?.message ||
      axiosError.message ||
      "An unknown error occurred";

    return { status: false, error: errMessage };
  }
};

export { getOneRoute, deleteRoute, createRoute };
