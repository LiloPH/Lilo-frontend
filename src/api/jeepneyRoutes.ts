import axios, { AxiosError, AxiosResponse } from "axios";
import { JeepneyRouteType } from "@/type";

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

type GetRouteResponse = ApiResponse<JeepneyRouteType>;
type CreateRouteResponse = ApiResponse<RouteDetails>;
type DeleteResponse = ApiResponse<{ message: string }>;

const getOneRoute = async (id: string) => {
  try {
    const route: AxiosResponse<GetRouteResponse> = await axios.get(
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

interface CreateRouteParams {
  routeNo: number;
  routeName: string;
  routeColor: string;
}

const createRoute = async ({
  routeNo,
  routeName,
  routeColor,
}: CreateRouteParams) => {
  try {
    const route: AxiosResponse<CreateRouteResponse> = await axios.post(
      "/routes",
      { routeNo, routeName, routeColor }
    );

    return {
      status: true,
      data: route.data.data,
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

const deleteRoute = async (id: string) => {
  try {
    const deletedRoute: AxiosResponse<DeleteResponse> = await axios.delete(
      `/routes/${id}`
    );

    return {
      status: true,
      data: deletedRoute.data.data,
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
