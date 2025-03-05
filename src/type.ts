export type RouteType = "inbound" | "outbound";

export interface StopType {
  name: string;
  order: number;
  location: { lat: number; lng: number };
  routeNo: number;
}

export interface LocationType {
  name: string;
  isOutBound: boolean;
  order: number | null;
  location: { lat: number | null; lng: number | null };
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
