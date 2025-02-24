import { queryOptions } from "@tanstack/react-query";
import { analytics, users, routes } from "../api/admin";

const analyticsQuery = () => {
  return queryOptions({
    queryKey: ["analytics"],
    queryFn: analytics,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    refetchIntervalInBackground: true,
  });
};

const usersQuery = () => {
  return queryOptions({
    queryKey: ["users"],
    queryFn: users,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    refetchIntervalInBackground: true,
  });
};

const routesQuery = () => {
  return queryOptions({
    queryKey: ["routes"],
    queryFn: routes,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    refetchIntervalInBackground: true,
  });
};

export { analyticsQuery, usersQuery, routesQuery };
