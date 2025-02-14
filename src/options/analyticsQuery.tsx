import { queryOptions } from "@tanstack/react-query";
import { analytics } from "../api/admin";

const analyticsQuery = () => {
  return queryOptions({
    queryKey: ["analytics"],
    queryFn: analytics,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};

export { analyticsQuery };
