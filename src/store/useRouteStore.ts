import { JeepneyRouteType, LocationType, RouteType } from "@/type";
import { create } from "zustand";
import { produce } from "immer";

interface TROute {
  inbound: LocationType[] | null;
  outbound: LocationType[] | null;
  id: string | null;
  name: string | null;
  setRoutes: (data: JeepneyRouteType) => void;
  reOrderRoutes: (
    type: RouteType,
    sourceIndex: number,
    destinationIndex: number
  ) => void;
  addRoutes: (type: RouteType) => void;
  deleteRoute: (type: RouteType, index: number) => void;
}

const newRoute: LocationType = {
  name: "",
  isOutBound: false,
  order: null,
  location: { lat: null, lng: null },
  routeNo: null,
  stops: [],
};

export const useRoute = create<TROute>((set) => ({
  inbound: null,
  outbound: null,
  id: null,
  name: null,
  setRoutes: (data: JeepneyRouteType) =>
    set(
      produce<TROute>((state) => {
        state.inbound =
          data.waypoints.filter((route) => !route.isOutBound) || null;
        state.outbound =
          data.waypoints.filter((route) => route.isOutBound) || null;
        state.id = data._id;
        state.name = data.routeName;
      })
    ),

  reOrderRoutes: (type, sourceIndex, destinationIndex) =>
    set(
      produce<TROute>((state) => {
        const routes = type === "outbound" ? state.outbound : state.inbound;
        if (routes) {
          const [movedRoute] = routes.splice(sourceIndex, 1);
          routes.splice(destinationIndex, 0, movedRoute);
        }
      })
    ),

  addRoutes: (type) =>
    set(
      produce<TROute>((state) => {
        if (type === "inbound") {
          state.inbound = state.inbound
            ? [...state.inbound, newRoute]
            : [newRoute];
        } else {
          state.outbound = state.outbound
            ? [...state.outbound, newRoute]
            : [newRoute];
        }
      })
    ),

  deleteRoute: (type, index) =>
    set(
      produce<TROute>((state) => {
        const isOutBound = type === "outbound";
        const fromList = isOutBound ? state.outbound : state.inbound;

        if (!fromList) return;

        fromList.splice(index, 1);
      })
    ),
}));
