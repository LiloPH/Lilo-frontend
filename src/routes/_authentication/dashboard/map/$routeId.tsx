/* eslint-disable @typescript-eslint/no-unused-vars */
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import Swal from "sweetalert2";
import { Skeleton } from "@/components/ui/skeleton";
import WaypointControl from "@/components/map/WaypointControl";
import MapControl from "@/components/map/MapControl";
import { JeepneyRouteType } from "@/type";
import { getOneRouteQuery } from "@/options/routesQuery";
import { useRoute } from "@/store/useRouteStore";
import StopControl from "@/components/map/StopControl";
import { showStore } from "@/store/showStore";
import { reverseGeocode } from "@/lib/reverseGeocode";

const mapContainerStyle = {
  width: "100%",
  height: "90dvh",
  padding: "0",
};

const center = {
  lat: 10.7202,
  lng: 122.5621,
};

const bounds = {
  north: 10.7902,
  south: 10.6502,
  east: 122.6321,
  west: 122.4921,
};

export const Route = createFileRoute("/_authentication/dashboard/map/$routeId")(
  {
    loader: async ({ params }) => {
      await queryClient.prefetchQuery(getOneRouteQuery(params.routeId));
    },
    component: MapComponent,
  }
);

function MapComponent() {
  const { routeId } = Route.useParams();
  const { setRoutes, selectedStop, setWaypointData, isPlacing, setIsPlacing } =
    useRoute();
  const { showStopControl } = showStore();

  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery(getOneRouteQuery(routeId));
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [activeControls, setActiveControls] = useState({
    zoom: false,
    streetView: false,
    mapType: false,
    fullscreen: false,
  });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API as string,
    libraries: ["places"],
  });

  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    if (!event.latLng || !isPlacing?.placing) return;

    const location = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    if (isPlacing) {
      const name = await reverseGeocode(location);
      await setWaypointData(
        isPlacing.type,
        isPlacing.waypointIndex,
        location,
        name
      );

      setIsPlacing({
        placing: false,
        type: isPlacing.type,
        waypointIndex: isPlacing.waypointIndex,
        locationType: isPlacing.locationType,
      });
    }
  };

  useEffect(() => {
    setRoutes(data?.data as unknown as JeepneyRouteType);
  }, [data, setRoutes]);

  const onLoad = useCallback((map: google.maps.Map) => {
    if (!map) return;

    const googleBounds = new window.google.maps.LatLngBounds();
    googleBounds.extend({ lat: bounds.north, lng: bounds.east });
    googleBounds.extend({ lat: bounds.south, lng: bounds.west });
    map.fitBounds(googleBounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map) {
      map.setOptions({
        draggableCursor: isPlacing?.placing ? "crosshair" : "cursor",
      });
    }
  }, [isPlacing, map]);

  if (loadError) {
    Swal.fire({
      title: "Error",
      text: "Failed to load Google Maps",
      icon: "error",
      confirmButtonText: "OK",
    }).then(() => {
      navigate({ to: "/dashboard/routes" });
    });
    return <div>Error loading maps</div>;
  }

  if (error) {
    Swal.fire({
      title: "Error",
      text: `Failed to load route data: ${error.message}`,
      icon: "error",
      confirmButtonText: "OK",
    }).then(() => {
      navigate({ to: "/dashboard/routes" });
    });
    return <div>Error loading route data: {error.message}</div>;
  }

  if (!isLoaded || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen p-4">
        <Skeleton className="w-full h-full rounded-md bg-gray-300" />
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        onClick={handleMapClick}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          mapId: import.meta.env.VITE_MAP_ID,
          draggableCursor: isPlacing?.placing ? "crosshair" : "cursor",
        }}
      >
        {/* Map markers and other components will go here */}
      </GoogleMap>
      {showStopControl && <StopControl />}
      <WaypointControl />
      {map && (
        <MapControl
          map={map}
          activeControls={activeControls}
          setActiveControls={setActiveControls}
        />
      )}
    </div>
  );
}
