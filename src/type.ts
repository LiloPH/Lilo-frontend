export type RouteType = "inbound" | "outbound";
export type Location = { lat: number | null; lng: number | null };
export type LocType = "waypoint" | "stop";

export interface StopType {
  name: string;
  order: number | null;
  location: Location;
  routeNo: number | null;
}

export interface LocationType {
  name: string;
  isOutBound: boolean;
  order: number | null;
  location: Location;
  routeNo: number | null;
  stops: StopType[];
}

export interface JeepneyRouteType {
  _id: string;
  routeNo: number;
  routeName: string;
  routeColor: string;
  waypoints: LocationType[];
  status: string;
}
