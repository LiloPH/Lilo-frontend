import { queryOptions } from "@tanstack/react-query";
import { getOneRoute } from "@/api/jeepneyRoutes";

const getOneRouteQuery = (id: string) => {
  return queryOptions({
    queryKey: ["route", id],
    queryFn: () => getOneRoute(id),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    refetchIntervalInBackground: true,
  });
};

export { getOneRouteQuery };
