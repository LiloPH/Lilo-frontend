import {
  JeepneyRouteType,
  Location,
  LocationType,
  RouteType,
  StopType,
} from "@/type";
import { create } from "zustand";
import { produce } from "immer";
import { reverseGeocode } from "@/lib/reverseGeocode";

interface SelectedRouteInfo {
  waypointIndex: number;
  type: RouteType;
}

interface isPlacingType {
  waypointIndex: number;
  type: RouteType;
  placing: boolean;
}

interface TROute {
  inbound: LocationType[] | null;
  outbound: LocationType[] | null;
  id: string | null;
  name: string | null;
  selectedStop: StopType[] | null;
  selectedRouteInfo: SelectedRouteInfo | null;
  isPlacing: isPlacingType | null;
  setIsPlacing: ({ waypointIndex, type, placing }: isPlacingType) => void;
  setRoutes: (data: JeepneyRouteType) => void;
  reOrderRoutes: (
    type: RouteType,
    sourceIndex: number,
    destinationIndex: number
  ) => void;
  addRoutes: (type: RouteType) => void;
  deleteRoute: (type: RouteType, index: number) => void;
  setSelectedStop: (type: RouteType, index: number) => void;
  addStop: (type: RouteType | null, index: number) => void;
  setWaypointName: (type: RouteType, index: number, name: string) => void;
  setWaypointData: (
    type: RouteType,
    index: number,
    location: Location,
    name?: string
  ) => Promise<void>;
}

const newRoute: LocationType = {
  name: "",
  isOutBound: false,
  order: null,
  location: { lat: null, lng: null },
  routeNo: null,
  stops: [],
};

const newStop: StopType = {
  name: "Stop",
  order: null,
  location: { lat: null, lng: null },
  routeNo: null,
};

export const useRoute = create<TROute>((set) => ({
  inbound: null,
  outbound: null,
  id: null,
  name: null,
  selectedStop: null,
  selectedRouteInfo: null,
  isPlacing: null,
  setIsPlacing: ({ waypointIndex, type, placing }) =>
    set(
      produce<TROute>((state) => {
        state.isPlacing = { waypointIndex, type, placing };
      })
    ),
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

  setSelectedStop: (type, index) => {
    set(
      produce<TROute>((state) => {
        const routeType = type === "inbound" ? state.inbound : state.outbound;

        state.selectedRouteInfo = { waypointIndex: index, type: type };

        if (!routeType || !routeType[index]) {
          state.selectedStop = null;
          return;
        }

        state.selectedStop =
          routeType[index].stops.length > 0 ? routeType[index].stops : [];
      })
    );
  },

  addStop: (type, index) => {
    set(
      produce<TROute>((state) => {
        if (!type || index === undefined) return;

        const routeList = type === "inbound" ? state.inbound : state.outbound;
        if (!routeList || !routeList[index]) return;

        routeList[index].stops.push({ ...newStop });

        state.selectedStop = routeList[index].stops;
        state.selectedRouteInfo = { waypointIndex: index, type: type };
      })
    );
  },

  setWaypointName: (type, index, name) => {
    set(
      produce<TROute>((state) => {
        const routeList = type === "inbound" ? state.inbound : state.outbound;

        if (!routeList || routeList.length <= index) {
          if (type === "inbound") {
            state.inbound = state.inbound || [];
            while (state.inbound.length <= index) {
              state.inbound.push({ ...newRoute });
            }
            state.inbound[index].name = name;
            state.inbound[index].isOutBound = false;
          } else {
            state.outbound = state.outbound || [];
            while (state.outbound.length <= index) {
              state.outbound.push({ ...newRoute });
            }
            state.outbound[index].name = name;
            state.outbound[index].isOutBound = true;
          }
          return;
        }

        routeList[index].name = name;

        routeList[index].isOutBound = type === "outbound";
      })
    );
  },

  setWaypointData: async (type, index, location, name?) => {
    if (!location) return;

    const address = name ? await reverseGeocode(location) : null;

    set(
      produce<TROute>((state) => {
        const routeList = type === "inbound" ? state.inbound : state.outbound;

        if (!routeList || routeList.length <= index) return;

        routeList[index].location = location;
        if (name) {
          routeList[index].name = address || name;
        }
      })
    );
  },
}));
